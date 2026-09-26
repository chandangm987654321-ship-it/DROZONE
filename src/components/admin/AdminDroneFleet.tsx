import React from 'react';
import { useApp } from '../../context/AppContext';
import { Drone, DroneStatus } from '../../types';
import {
  Navigation,
  BatteryCharging,
  Gauge,
  Compass,
  AlertTriangle,
  RotateCcw,
  Zap,
  ShieldAlert,
  Power,
  Play
} from 'lucide-react';

export const AdminDroneFleet: React.FC = () => {
  const { drones, updateDroneStatus, orders, dispatchDroneSimulation } = useApp();

  const statuses: DroneStatus[] = ['AVAILABLE', 'DELIVERING', 'CHARGING', 'MAINTENANCE', 'RETURNING'];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Autonomous Drone Fleet Telemetry & Readiness
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Simulated flight control status, battery health monitors, and payload diagnostics for the AeroGlide fleet.
        </p>
      </div>

      {/* Safety Notice Banner */}
      <div className="p-4 rounded-xl bg-slate-900/90 border border-cyan-500/30 flex items-start gap-3 text-xs text-slate-300">
        <ShieldAlert className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
        <div>
          <span className="font-bold text-white">Software Simulation Environment: </span>
          <span>
            This interface simulates autonomous flight state machines and battery discharge curves. 
            No physical RF link or real-world aircraft commands are generated.
          </span>
        </div>
      </div>

      {/* Fleet Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {drones.map(drone => {
          const isDelivering = drone.status === 'DELIVERING';
          const isCharging = drone.status === 'CHARGING';
          const isMaintenance = drone.status === 'MAINTENANCE';

          return (
            <div
              key={drone.id}
              className={`p-5 rounded-2xl border transition-all space-y-4 flex flex-col justify-between ${
                isDelivering
                  ? 'bg-slate-900/95 border-cyan-500/50 shadow-xl shadow-cyan-950/40 ring-1 ring-cyan-500/20'
                  : 'bg-slate-900/80 border-slate-800'
              }`}
            >
              {/* Header */}
              <div>
                <div className="flex items-center justify-between pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-2">
                    <div className="w-9 h-9 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800 flex items-center justify-center font-bold">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <h3 className="text-sm font-bold text-white font-mono">{drone.id}</h3>
                      <p className="text-[10px] text-slate-400">{drone.model}</p>
                    </div>
                  </div>

                  <span className={`px-2.5 py-1 rounded-full text-[10px] font-bold ${
                    isDelivering
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-700 animate-pulse'
                      : isCharging
                      ? 'bg-amber-950 text-amber-300 border border-amber-800'
                      : isMaintenance
                      ? 'bg-rose-950 text-rose-300 border border-rose-800'
                      : 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                  }`}>
                    {drone.status}
                  </span>
                </div>

                {/* Battery Bar & Stats */}
                <div className="mt-4 space-y-2">
                  <div className="flex items-center justify-between text-xs">
                    <span className="flex items-center gap-1.5 text-slate-400">
                      <BatteryCharging className="w-4 h-4 text-emerald-400" />
                      Battery Charge:
                    </span>
                    <span className="font-mono font-bold text-white">{drone.battery}%</span>
                  </div>

                  <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
                    <div
                      className={`h-full rounded-full transition-all ${
                        drone.battery > 50
                          ? 'bg-emerald-400'
                          : drone.battery > 25
                          ? 'bg-amber-400'
                          : 'bg-rose-500'
                      }`}
                      style={{ width: `${drone.battery}%` }}
                    />
                  </div>
                </div>

                {/* Telemetry specs grid */}
                <div className="grid grid-cols-2 gap-2 mt-4 text-xs">
                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase">Altitude</span>
                    <div className="font-mono font-bold text-white">
                      {isDelivering ? `${drone.altitudeMeters || 75} m AGL` : '0 m (Ground)'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase">Speed</span>
                    <div className="font-mono font-bold text-white">
                      {isDelivering ? `${drone.speedKmh || 54} km/h` : '0 km/h'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase">Assigned Order</span>
                    <div className="font-mono font-bold text-cyan-400 truncate">
                      {drone.assignedOrderId ? `#${drone.assignedOrderId}` : 'None (Idle)'}
                    </div>
                  </div>

                  <div className="p-2.5 rounded-xl bg-slate-950/70 border border-slate-800 space-y-0.5">
                    <span className="text-[10px] text-slate-500 uppercase">Completed Flights</span>
                    <div className="font-mono font-bold text-slate-200">
                      {drone.totalDeliveries} Missions
                    </div>
                  </div>
                </div>

                {/* Location string */}
                <div className="mt-3 p-2.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-300">
                  <span className="text-slate-500 text-[10px] block">Current Location / Pad</span>
                  <span className="font-semibold text-white">{drone.currentLocationName}</span>
                </div>
              </div>

              {/* Status override select */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between text-xs">
                <span className="text-[11px] text-slate-400">Simulation State:</span>
                <select
                  value={drone.status}
                  onChange={e => updateDroneStatus(drone.id, e.target.value as DroneStatus)}
                  className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-xs font-semibold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                >
                  {statuses.map(st => (
                    <option key={st} value={st}>
                      {st}
                    </option>
                  ))}
                </select>
              </div>

            </div>
          );
        })}
      </div>

    </div>
  );
};
