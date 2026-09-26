import React from 'react';
import { ShieldCheck, Plane, AlertTriangle } from 'lucide-react';

export const SafetyBanner: React.FC = () => {
  return (
    <div className="bg-slate-900/90 border-b border-cyan-500/20 px-4 py-1.5 text-xs text-slate-300 backdrop-blur-md">
      <div className="max-w-7xl mx-auto flex flex-wrap items-center justify-between gap-2">
        <div className="flex items-center gap-2">
          <span className="flex h-2 w-2 relative">
            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
            <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
          </span>
          <span className="font-semibold text-cyan-400 tracking-wider text-[11px] uppercase">
            DROZONE Airspace Network v2.4 (Active Simulation)
          </span>
          <span className="hidden md:inline text-slate-500">•</span>
          <span className="hidden md:flex items-center gap-1 text-slate-400">
            <Plane className="w-3 h-3 text-cyan-400" /> 6 Drones in SkyFleet • 5 Active SkyPort Stations
          </span>
        </div>
        <div className="flex items-center gap-1.5 text-slate-400 hover:text-slate-200 transition-colors">
          <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
          <span className="text-[11px]">
            Drone operations subject to FAA/ICAO safety & local regulations. Software prototype.
          </span>
        </div>
      </div>
    </div>
  );
};
