import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShieldCheck,
  ShieldAlert,
  Gauge,
  Sliders,
  RotateCcw,
  Zap,
  Save,
  CheckCircle2
} from 'lucide-react';

export const AdminSettings: React.FC = () => {
  const { addToast } = useApp();

  const [maxAltitude, setMaxAltitude] = useState(120);
  const [maxPayload, setMaxPayload] = useState(3.5);
  const [returnToHomeBattery, setReturnToHomeBattery] = useState(25);
  const [maxWindSpeedKnots, setMaxWindSpeedKnots] = useState(18);
  const [acousticLimitDecibels, setAcousticLimitDecibels] = useState(58);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Flight Rules Updated', 'Simulated airspace parameters updated across all drones.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Aviation Safety & Flight Parameters
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Configure simulated airspace boundaries, acoustic noise ceilings, and automated fail-safes.
        </p>
      </div>

      <form onSubmit={handleSave} className="space-y-6">
        
        {/* Safe limitations card */}
        <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
            <ShieldCheck className="w-4 h-4 text-cyan-400" />
            <span>Airspace Operational Safety Thresholds</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-xs">
            <div>
              <label className="text-slate-400 block mb-1">
                Max Flight Ceiling (Meters Above Ground Level)
              </label>
              <input
                type="number"
                value={maxAltitude}
                onChange={e => setMaxAltitude(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">FAA Class-G ceiling: 120m (400ft)</span>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">
                Maximum Cargo Pod Weight (kg)
              </label>
              <input
                type="number"
                step="0.1"
                value={maxPayload}
                onChange={e => setMaxPayload(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">AeroGlide quad-rotor rating: 3.5 kg</span>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">
                Auto Return-to-Home Battery Level (%)
              </label>
              <input
                type="number"
                value={returnToHomeBattery}
                onChange={e => setReturnToHomeBattery(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Forces drone to divert to nearest station pod</span>
            </div>

            <div>
              <label className="text-slate-400 block mb-1">
                Urban Acoustic Noise Ceiling (dB at 50m)
              </label>
              <input
                type="number"
                value={acousticLimitDecibels}
                onChange={e => setAcousticLimitDecibels(Number(e.target.value))}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-white font-mono"
              />
              <span className="text-[10px] text-slate-500 mt-0.5 block">Whisper-quiet low-rpm carbon blades</span>
            </div>
          </div>
        </div>

        {/* Mandatory Safety Notice */}
        <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2 text-xs text-slate-400">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>FAA / EASA Autonomous Aviation Disclaimer</span>
          </div>
          <p className="text-[11px] leading-relaxed">
            "Drone delivery operations are subject to applicable aviation, safety, privacy and local regulations."
            This prototype application enforces strict software simulated barriers and does not control any physical aircraft or weapon systems.
          </p>
        </div>

        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-colors flex items-center gap-2"
          >
            <Save className="w-4 h-4" />
            Apply Airspace Safety Rules
          </button>
        </div>

      </form>

    </div>
  );
};
