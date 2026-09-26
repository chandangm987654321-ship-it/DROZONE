import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { DroneRadarMap } from '../simulation/DroneRadarMap';
import {
  ShieldAlert,
  ShieldCheck,
  Navigation,
  MapPin,
  Store,
  Layers,
  Activity,
  AlertTriangle
} from 'lucide-react';

export const AdminDeliveryZones: React.FC = () => {
  const { deliveryZones, stores, deliveryStations } = useApp();
  const [selectedZoneId, setSelectedZoneId] = useState<string | null>(null);

  const activeZones = deliveryZones.filter(z => z.type !== 'restricted');
  const restrictedZones = deliveryZones.filter(z => z.type === 'restricted');

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Geofenced Air Corridors & Restricted Zones
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Authorized Class-G urban flight paths, emergency hospital no-fly zones, and automated waypoint routing.
        </p>
      </div>

      {/* Interactive Airspace Radar Map */}
      <div className="space-y-2">
        <DroneRadarMap showAllDrones={true} height="h-[460px]" />
      </div>

      {/* Zones Breakdown */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Active Air Corridors */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
            <ShieldCheck className="w-4 h-4 text-emerald-400" />
            <span>Active Commercial Air Corridors ({activeZones.length})</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {activeZones.map(zone => (
              <div
                key={zone.id}
                className="p-3.5 rounded-xl bg-slate-950/70 border border-slate-800/80 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{zone.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                    {zone.status}
                  </span>
                </div>
                <p className="text-slate-400 text-[11px] leading-relaxed">
                  {zone.description}
                </p>
                <div className="flex items-center gap-3 pt-1 text-[10px] text-cyan-400 font-mono">
                  <span>Radius: {zone.radius} km</span>
                  <span>•</span>
                  <span>Altitude: 65m - 90m AGL</span>
                  <span>•</span>
                  <span>Max Speed: 65 km/h</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Restricted & No-Fly Zones */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
            <ShieldAlert className="w-4 h-4 text-rose-400" />
            <span>Restricted Airspace & Hospitals ({restrictedZones.length})</span>
          </div>

          <div className="space-y-2.5 text-xs">
            {restrictedZones.map(zone => (
              <div
                key={zone.id}
                className="p-3.5 rounded-xl bg-rose-950/20 border border-rose-900/60 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white">{zone.name}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950 text-rose-300 border border-rose-800">
                    {zone.status} (NO FLY)
                  </span>
                </div>
                <p className="text-slate-300 text-[11px] leading-relaxed">
                  {zone.description}
                </p>
                <div className="flex items-center gap-2 text-[10px] text-rose-400 font-medium pt-1">
                  <AlertTriangle className="w-3.5 h-3.5" />
                  <span>Immediate auto-reroute enforced by simulated autopilot firmware.</span>
                </div>
              </div>
            ))}

            {/* Regulatory Safety Card */}
            <div className="p-3.5 rounded-xl bg-slate-950 border border-slate-800 text-[11px] text-slate-400 space-y-1">
              <span className="font-semibold text-white">Geofence Compliance Notice:</span>
              <p>
                All simulated flight vectors automatically calculate quadratic bezier arcs skirting around restricted zones with a 500-meter safety buffer.
              </p>
            </div>
          </div>
        </div>

      </div>

    </div>
  );
};
