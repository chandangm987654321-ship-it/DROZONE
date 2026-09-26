import React from 'react';
import { useApp } from '../../context/AppContext';
import { MapPin, Package, ShieldCheck, CheckCircle2, Lock, Radio } from 'lucide-react';

export const AdminStations: React.FC = () => {
  const { deliveryStations } = useApp();

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          DROZONE SkyPort Delivery Stations & Lockers
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Automated rooftop landing pads and temperature-controlled contactless pickup pods.
        </p>
      </div>

      {/* Stations Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {deliveryStations.map(station => {
          const occupancyPercent = Math.round((station.currentPackages / station.capacity) * 100);

          return (
            <div
              key={station.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between gap-2 pb-3 border-b border-slate-800">
                  <div>
                    <span className="text-[10px] font-mono uppercase text-cyan-400 font-bold">
                      {station.id.toUpperCase()}
                    </span>
                    <h3 className="text-sm font-bold text-white mt-0.5">
                      {station.name}
                    </h3>
                  </div>

                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800 flex items-center gap-1">
                    <Radio className="w-2.5 h-2.5 animate-pulse" />
                    {station.status}
                  </span>
                </div>

                <div className="mt-3 text-xs text-slate-400 space-y-1">
                  <div className="flex items-center gap-1.5 text-slate-300">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400 shrink-0" />
                    <span>{station.address}</span>
                  </div>
                  <div className="text-[11px] text-slate-500">
                    Urban Sector: {station.location}
                  </div>
                </div>

                {/* Locker Capacity Bar */}
                <div className="mt-4 p-3.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="text-slate-400">Pod Locker Capacity</span>
                    <span className="font-mono font-bold text-white">
                      {station.currentPackages} / {station.capacity} ({occupancyPercent}% full)
                    </span>
                  </div>

                  <div className="w-full bg-slate-900 h-2 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-gradient-to-r from-blue-500 to-cyan-400 rounded-full"
                      style={{ width: `${occupancyPercent}%` }}
                    />
                  </div>

                  <div className="flex items-center justify-between text-[11px] text-slate-400 pt-1">
                    <span>Available Pods: <strong className="text-emerald-400">{station.availablePods}</strong></span>
                    <span>Total Lockers: <strong>{station.lockerPods}</strong></span>
                  </div>
                </div>
              </div>

              {/* Station features */}
              <div className="pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span className="flex items-center gap-1 text-emerald-400">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  Auto-Locker Clamps Ready
                </span>
                <span className="font-mono text-cyan-400">Touchdown Pad #1</span>
              </div>
            </div>
          );
        })}
      </div>

    </div>
  );
};
