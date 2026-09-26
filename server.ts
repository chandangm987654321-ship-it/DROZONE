import express from 'express';
import http from 'http';
import path from 'path';
import { fileURLToPath } from 'url';
import dotenv from 'dotenv';
import { WebSocketServer, WebSocket } from 'ws';
import { GoogleGenAI, LiveServerMessage, Modality } from '@google/genai';
import { createServer as createViteServer } from 'vite';

dotenv.config();

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const app = express();
const server = http.createServer(app);

app.use(express.json({ limit: '10mb' }));

// Initialize GoogleGenAI server-side with User-Agent header as required by guidelines
const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
  httpOptions: {
    headers: {
      'User-Agent': 'aistudio-build',
    },
  },
});

// System instruction providing rich context on DROZONE platform
const SYSTEM_INSTRUCTION = `You are DROZONE Copilot, the AI assistant for DROZONE — an autonomous drone delivery and aerial smart commerce platform.
You assist customers, merchants, and fleet operators with:
1. Real-time drone tracking, flight routes, airspace corridor safety, and landing pod status.
2. Product discovery, shopping recommendations (Groceries, Electronics, Bakery, Pharmacy), and order pricing.
3. Drone specs: Hexacopter drones, 15-20 min delivery windows, 4.5kg payload capacity, 55 km/h cruise speed, dual GPS & lidar obstacle avoidance, parachute emergency safety.
4. SkyStation lockers and rooftop launchpads.
Be helpful, energetic, concise, and safety-focused. When asked about current active orders, products, or drones, answer accurately based on the context. If you don't know an exact real-time live sensor value, give an intelligent estimate consistent with DROZONE aerial operations.`;

// -------------------------------------------------------------
// POST /api/chat: Multi-turn Chat using gemini-3.8-flash (Streaming SSE)
// -------------------------------------------------------------
app.post('/api/chat', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  // Set SSE response headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('Connection', 'keep-alive');
  res.flushHeaders?.();

  try {
    // Format conversation history for @google/genai
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    // Primary model: gemini-3.8-flash; fallback to gemini-3.1-flash-lite if quota exhausted
    let responseStream;
    try {
      responseStream = await ai.models.generateContentStream({
        model: 'gemini-3.8-flash',
        contents: formattedContents,
        config: {
          systemInstruction: SYSTEM_INSTRUCTION,
          temperature: 0.7,
        },
      });
    } catch (primaryErr: any) {
      if (primaryErr?.message?.includes('RESOURCE_EXHAUSTED') || primaryErr?.status === 429) {
        console.warn('gemini-3.8-flash quota exceeded, falling back to gemini-3.1-flash-lite');
        responseStream = await ai.models.generateContentStream({
          model: 'gemini-3.1-flash-lite',
          contents: formattedContents,
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
            temperature: 0.7,
          },
        });
      } else {
        throw primaryErr;
      }
    }

    for await (const chunk of responseStream) {
      const text = chunk.text;
      if (text) {
        res.write(`data: ${JSON.stringify({ text })}\n\n`);
      }
    }

    res.write('data: [DONE]\n\n');
    res.end();
  } catch (error: any) {
    console.error('Chat error:', error);
    let errorMessage = error?.message || 'Error communicating with Gemini';
    if (errorMessage.includes('RESOURCE_EXHAUSTED')) {
      errorMessage = 'Gemini API quota exceeded for this project. You can check your plan or select a billing-enabled API key in Settings > Secrets.';
    }
    res.write(`data: ${JSON.stringify({ error: errorMessage })}\n\n`);
    res.write('data: [DONE]\n\n');
    res.end();
  }
});

// -------------------------------------------------------------
// POST /api/chat/sync: Non-streaming fallback endpoint
// -------------------------------------------------------------
app.post('/api/chat/sync', async (req, res) => {
  const { messages } = req.body;

  if (!messages || !Array.isArray(messages) || messages.length === 0) {
    return res.status(400).json({ error: 'Messages array is required' });
  }

  try {
    const formattedContents = messages.map((m: { role: string; content: string }) => ({
      role: m.role === 'assistant' || m.role === 'model' ? 'model' : 'user',
      parts: [{ text: m.content || '' }],
    }));

    const response = await ai.models.generateContent({
      model: 'gemini-3.8-flash',
      contents: formattedContents,
      config: {
        systemInstruction: SYSTEM_INSTRUCTION,
        temperature: 0.7,
      },
    });

    return res.json({ text: response.text });
  } catch (error: any) {
    console.error('Chat sync error:', error);
    return res.status(500).json({ error: error?.message || 'Error communicating with Gemini' });
  }
});

// -------------------------------------------------------------
// WebSocket /live: Real-time Audio using gemini-3.8-live (Live API)
// -------------------------------------------------------------
const wss = new WebSocketServer({ server, path: '/live' });

wss.on('connection', async (clientWs: WebSocket) => {
  console.log('Client connected to /live WebSocket');

  let session: any = null;

  try {
    session = await ai.live.connect({
      model: 'gemini-3.8-live',
      config: {
        responseModalities: [Modality.AUDIO],
        speechConfig: {
          voiceConfig: {
            prebuiltVoiceConfig: { voiceName: 'Zephyr' },
          },
        },
        systemInstruction: `${SYSTEM_INSTRUCTION} You are communicating via live real-time voice. Keep your spoken responses concise, punchy, conversational, and direct.`,
      },
      callbacks: {
        onmessage: (message: LiveServerMessage) => {
          // Model audio chunk
          const audio = message.serverContent?.modelTurn?.parts?.[0]?.inlineData?.data;
          if (audio && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ audio }));
          }

          // User interrupted the model
          if (message.serverContent?.interrupted && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ interrupted: true }));
          }

          // Turn complete
          if (message.serverContent?.turnComplete && clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ turnComplete: true }));
          }
        },
        onerror: (err: any) => {
          console.error('Live API Session Error:', err);
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ error: err?.message || 'Live API connection error' }));
          }
        },
        onclose: () => {
          console.log('Live API session closed by Gemini');
          if (clientWs.readyState === WebSocket.OPEN) {
            clientWs.send(JSON.stringify({ closed: true }));
          }
        },
      },
    });

    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ connected: true, model: 'gemini-3.8-live' }));
    }
  } catch (err: any) {
    console.error('Failed to establish Live session:', err);
    if (clientWs.readyState === WebSocket.OPEN) {
      clientWs.send(JSON.stringify({ error: 'Failed to connect to gemini-3.8-live: ' + (err?.message || err) }));
    }
    clientWs.close();
    return;
  }

  // Handle messages from client
  clientWs.on('message', (data) => {
    try {
      const parsed = JSON.parse(data.toString());

      // Client sending PCM 16kHz audio
      if (parsed.audio && session) {
        session.sendRealtimeInput({
          audio: {
            data: parsed.audio,
            mimeType: 'audio/pcm;rate=16000',
          },
        });
      }

      // Client sending text message or prompt
      if (parsed.text && session) {
        session.sendRealtimeInput({
          text: parsed.text,
        });
      }
    } catch (err) {
      console.error('Error forwarding client data to Live session:', err);
    }
  });

  clientWs.on('close', () => {
    console.log('Client disconnected from /live');
    if (session) {
      try {
        session.close();
      } catch (e) {
        // ignore
      }
    }
  });
});

// -------------------------------------------------------------
// Vite middleware in dev or static files in production
// -------------------------------------------------------------
async function setupApp() {
  const isDev = process.env.NODE_ENV !== 'production';

  if (isDev) {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: 'spa',
    });
    app.use(vite.middlewares);
  } else {
    app.use(express.static(path.resolve(__dirname, 'dist')));
    app.get('*', (_req, res) => {
      res.sendFile(path.resolve(__dirname, 'dist', 'index.html'));
    });
  }

  const PORT = Number(process.env.PORT) || 3000;
  server.listen(PORT, '0.0.0.0', () => {
    console.log(`DROZONE Full-Stack Server running on http://0.0.0.0:${PORT}`);
  });
}

setupApp().catch((err) => {
  console.error('Server startup error:', err);
});
