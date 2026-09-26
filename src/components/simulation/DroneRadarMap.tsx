import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Order, Drone, Store, DeliveryStation } from '../../types';
import {
  Navigation,
  Store as StoreIcon,
  MapPin,
  ShieldAlert,
  BatteryCharging,
  Gauge,
  Compass,
  Zap,
  Play,
  RotateCcw,
  CheckCircle2
} from 'lucide-react';

interface DroneRadarMapProps {
  orderId?: string; // If provided, highlights this specific order path
  interactive?: boolean;
  height?: string;
  showAllDrones?: boolean;
}

export const DroneRadarMap: React.FC<DroneRadarMapProps> = ({
  orderId,
  interactive = true,
  height = 'h-96 sm:h-[480px]',
  showAllDrones = true,
}) => {
  const {
    orders,
    drones,
    stores,
    deliveryStations,
    deliveryZones,
    advanceOrderSimulationStep,
    dispatchDroneSimulation
  } = useApp();

  const [selectedEntity, setSelectedEntity] = useState<{
    type: 'drone' | 'store' | 'station' | 'zone';
    id: string;
    data: any;
  } | null>(null);

  const [mapMode, setMapMode] = useState<'radar' | 'satellite' | 'corridors'>('corridors');

  const focusedOrder = orderId ? orders.find(o => o.id === orderId) : orders.find(o => o.status === 'DRONE_IN_TRANSIT' || o.status === 'DRONE_DISPATCHED') || orders[0];

  const sourceStore = focusedOrder ? stores.find(s => s.id === focusedOrder.storeId) : stores[0];
  const targetStation = focusedOrder ? deliveryStations.find(s => s.id === focusedOrder.deliveryStationId) : deliveryStations[0];
  const activeDrone = focusedOrder?.droneId ? drones.find(d => d.id === focusedOrder.droneId) : drones[1];

  // Coordinates calculation for SVG rendering (0-100 mapped to SVG viewbox 0 0 1000 700)
  const storeX = sourceStore ? (sourceStore.coordinates.x * 10) : 280;
  const storeY = sourceStore ? (sourceStore.coordinates.y * 7) : 245;
  const stationX = targetStation ? (targetStation.coordinates.x * 10) : 380;
  const stationY = targetStation ? (targetStation.coordinates.y * 7) : 315;

  // Midpoint flight curve for realistic flight arc
  const midX = (storeX + stationX) / 2 + 30;
  const midY = (storeY + stationY) / 2 - 40;

  // Drone position along the curve based on order progressPercent
  const progress = focusedOrder ? (focusedOrder.progressPercent || 50) / 100 : 0.6;
  const t = Math.max(0.1, Math.min(0.95, progress));
  // Quadratic bezier calculation
  const droneCurX = (1 - t) * (1 - t) * storeX + 2 * (1 - t) * t * midX + t * t * stationX;
  const droneCurY = (1 - t) * (1 - t) * storeY + 2 * (1 - t) * t * midY + t * t * stationY;

  return (
    <div className={`relative w-full ${height} rounded-2xl overflow-hidden border border-slate-800 bg-slate-950 select-none shadow-2xl flex flex-col`}>
      
      {/* Top Map Controls & Radar HUD Bar */}
      <div className="absolute top-3 left-3 right-3 z-20 flex flex-wrap items-center justify-between gap-2 pointer-events-none">
        
        {/* Airspace status */}
        <div className="pointer-events-auto flex items-center gap-2 bg-slate-900/90 border border-slate-800/90 px-3 py-1.5 rounded-xl backdrop-blur-md shadow-lg">
          <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
          <span className="text-xs font-semibold text-white tracking-wide">
            SKYCORRIDOR GRID #{focusedOrder ? focusedOrder.id : 'SECTOR-METRO'}
          </span>
          <span className="text-[10px] text-cyan-400 font-mono bg-cyan-950/80 px-1.5 py-0.5 rounded border border-cyan-800/40">
            ALT: 75M AGL
          </span>
        </div>

        {/* View mode toggle */}
        <div className="pointer-events-auto flex items-center gap-1 bg-slate-900/90 border border-slate-800 p-1 rounded-xl backdrop-blur-md">
          <button
            onClick={() => setMapMode('corridors')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
              mapMode === 'corridors' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Air Corridors
          </button>
          <button
            onClick={() => setMapMode('radar')}
            className={`px-2.5 py-1 text-[11px] font-medium rounded-lg transition-all ${
              mapMode === 'radar' ? 'bg-cyan-500 text-slate-950 font-bold' : 'text-slate-400 hover:text-white'
            }`}
          >
            Tactical Radar
          </button>
        </div>
      </div>

      {/* Main SVG Tactical Airspace Map */}
      <div className="relative flex-1 w-full h-full overflow-hidden bg-[#060c18]">
        
        {/* Radar concentric sweep circles (visual background) */}
        {mapMode === 'radar' && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center opacity-30">
            <div className="w-[600px] h-[600px] rounded-full border border-cyan-500/20 relative animate-pulse">
              <div className="absolute inset-16 rounded-full border border-cyan-500/20" />
              <div className="absolute inset-32 rounded-full border border-cyan-500/30" />
              <div className="absolute inset-48 rounded-full border border-cyan-500/40" />
              <div className="absolute top-0 bottom-0 left-1/2 w-[1px] bg-cyan-500/20 -translate-x-1/2" />
              <div className="absolute left-0 right-0 top-1/2 h-[1px] bg-cyan-500/20 -translate-y-1/2" />
              <div className="absolute inset-0 animate-radar origin-center bg-gradient-to-tr from-cyan-500/10 via-transparent to-transparent rounded-full" />
            </div>
          </div>
        )}

        {/* Tactical Grid Background */}
        <div
          className="absolute inset-0 opacity-15 pointer-events-none"
          style={{
            backgroundImage: `radial-gradient(circle at 1px 1px, #38bdf8 1px, transparent 0)`,
            backgroundSize: '24px 24px',
          }}
        />

        {/* SVG Drawing Canvas */}
        <svg
          viewBox="0 0 1000 700"
          className="w-full h-full object-cover"
          preserveAspectRatio="xMidYMid slice"
        >
          <defs>
            {/* Glow filters */}
            <filter id="glow-cyan" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="3" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            <filter id="glow-red" x="-20%" y="-20%" width="140%" height="140%">
              <feGaussianBlur stdDeviation="4" result="blur" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
            {/* Linear gradients for flight path */}
            <linearGradient id="flightGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#0284c7" stopOpacity="0.4" />
              <stop offset="50%" stopColor="#38bdf8" stopOpacity="0.9" />
              <stop offset="100%" stopColor="#10b981" stopOpacity="0.8" />
            </linearGradient>
          </defs>

          {/* Air Corridors & Geofences */}
          {deliveryZones.map(zone => {
            const zx = zone.coordinates.x * 10;
            const zy = zone.coordinates.y * 7;
            const isRestricted = zone.type === 'restricted';

            return (
              <g
                key={zone.id}
                className="cursor-pointer transition-opacity hover:opacity-100"
                onClick={() => setSelectedEntity({ type: 'zone', id: zone.id, data: zone })}
              >
                <circle
                  cx={zx}
                  cy={zy}
                  r={zone.radius * 7}
                  fill={isRestricted ? '#ef4444' : zone.color}
                  fillOpacity={isRestricted ? '0.12' : '0.07'}
                  stroke={isRestricted ? '#ef4444' : zone.color}
                  strokeWidth="1.5"
                  strokeDasharray={isRestricted ? '4 4' : undefined}
                />
                <text
                  x={zx}
                  y={zy - zone.radius * 7 - 6}
                  fill={isRestricted ? '#f87171' : '#94a3b8'}
                  fontSize="10"
                  textAnchor="middle"
                  fontFamily="Space Grotesk, sans-serif"
                  fontWeight="600"
                >
                  {zone.name.toUpperCase()}
                </text>
              </g>
            );
          })}

          {/* Secondary inter-station airways */}
          <line x1="200" y1="434" x2="380" y2="315" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="380" y1="315" x2="780" y2="364" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="380" y1="315" x2="550" y2="126" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />
          <line x1="380" y1="315" x2="520" y2="560" stroke="#0ea5e9" strokeWidth="1" strokeDasharray="3 3" opacity="0.3" />

          {/* Active Order Flight Path */}
          {focusedOrder && (
            <g>
              {/* Flight path curve shadow */}
              <path
                d={`M ${storeX} ${storeY} Q ${midX} ${midY} ${stationX} ${stationY}`}
                fill="none"
                stroke="#0369a1"
                strokeWidth="4"
                opacity="0.4"
              />
              {/* Animated dashed flight corridor */}
              <path
                d={`M ${storeX} ${storeY} Q ${midX} ${midY} ${stationX} ${stationY}`}
                fill="none"
                stroke="url(#flightGrad)"
                strokeWidth="2.5"
                strokeDasharray="6 6"
                filter="url(#glow-cyan)"
              >
                <animate
                  attributeName="stroke-dashoffset"
                  from="100"
                  to="0"
                  dur="4s"
                  repeatCount="indefinite"
                />
              </path>

              {/* Checkpoint Markers */}
              <circle cx={midX} cy={midY} r="4" fill="#38bdf8" />
              <text x={midX} y={midY - 8} fill="#38bdf8" fontSize="9" textAnchor="middle">
                CHECKPOINT CP-A2
              </text>
            </g>
          )}

          {/* Store Nodes */}
          {stores.map(store => {
            const sx = store.coordinates.x * 10;
            const sy = store.coordinates.y * 7;
            const isStoreActive = focusedOrder?.storeId === store.id;

            return (
              <g
                key={store.id}
                className="cursor-pointer"
                onClick={() => setSelectedEntity({ type: 'store', id: store.id, data: store })}
              >
                {isStoreActive && (
                  <circle cx={sx} cy={sy} r="18" fill="#38bdf8" opacity="0.2">
                    <animate attributeName="r" values="10;22;10" dur="3s" repeatCount="indefinite" />
                    <animate attributeName="opacity" values="0.4;0.05;0.4" dur="3s" repeatCount="indefinite" />
                  </circle>
                )}
                <circle
                  cx={sx}
                  cy={sy}
                  r="7"
                  fill="#0f172a"
                  stroke={isStoreActive ? '#38bdf8' : '#64748b'}
                  strokeWidth="2"
                />
                <circle cx={sx} cy={sy} r="3" fill={isStoreActive ? '#38bdf8' : '#94a3b8'} />
                <text
                  x={sx}
                  y={sy + 18}
                  fill={isStoreActive ? '#e0f2fe' : '#94a3b8'}
                  fontSize="10"
                  fontWeight={isStoreActive ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {store.storeName}
                </text>
              </g>
            );
          })}

          {/* Delivery Stations */}
          {deliveryStations.map(station => {
            const stX = station.coordinates.x * 10;
            const stY = station.coordinates.y * 7;
            const isTarget = focusedOrder?.deliveryStationId === station.id;

            return (
              <g
                key={station.id}
                className="cursor-pointer"
                onClick={() => setSelectedEntity({ type: 'station', id: station.id, data: station })}
              >
                {isTarget && (
                  <circle cx={stX} cy={stY} r="22" fill="#10b981" opacity="0.25">
                    <animate attributeName="r" values="12;26;12" dur="2s" repeatCount="indefinite" />
                  </circle>
                )}
                {/* Hexagon or landing pad icon */}
                <rect
                  x={stX - 9}
                  y={stY - 9}
                  width="18"
                  height="18"
                  rx="4"
                  fill="#0f172a"
                  stroke={isTarget ? '#10b981' : '#38bdf8'}
                  strokeWidth="2"
                />
                <text x={stX} y={stY + 4} fill={isTarget ? '#10b981' : '#38bdf8'} fontSize="9" fontWeight="bold" textAnchor="middle">
                  H
                </text>
                <text
                  x={stX}
                  y={stY + 22}
                  fill={isTarget ? '#34d399' : '#cbd5e1'}
                  fontSize="10"
                  fontWeight={isTarget ? 'bold' : 'normal'}
                  textAnchor="middle"
                >
                  {station.name.split(' - ')[0]}
                </text>
              </g>
            );
          })}

          {/* In-Flight Drone Position for Focused Order */}
          {focusedOrder && (
            <g
              transform={`translate(${droneCurX}, ${droneCurY})`}
              className="cursor-pointer"
              onClick={() => setSelectedEntity({ type: 'drone', id: activeDrone?.id || 'DZ-002', data: activeDrone })}
            >
              {/* Radar pulse ping */}
              <circle r="16" fill="#38bdf8" opacity="0.3">
                <animate attributeName="r" values="8;24;8" dur="1.5s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.6;0.0;0.6" dur="1.5s" repeatCount="indefinite" />
              </circle>

              {/* Drone Body Icon */}
              <circle r="10" fill="#0284c7" stroke="#ffffff" strokeWidth="1.5" />
              <polygon
                points="0,-6 5,4 -5,4"
                fill="#ffffff"
                transform="rotate(45)"
              />

              {/* Callout tag */}
              <rect x="14" y="-12" width="68" height="24" rx="4" fill="#0f172a" stroke="#38bdf8" strokeWidth="1" />
              <text x="48" y="2" fill="#e0f2fe" fontSize="8" fontWeight="bold" textAnchor="middle">
                {focusedOrder.droneId || 'DZ-002'} • {focusedOrder.progressPercent}%
              </text>
            </g>
          )}

          {/* Other Autonomous Drones in SkyFleet */}
          {showAllDrones && drones.map(d => {
            if (focusedOrder && d.id === focusedOrder.droneId) return null; // already rendered as main
            const dx = d.coords.x * 10;
            const dy = d.coords.y * 7;
            const isDelivering = d.status === 'DELIVERING';

            return (
              <g
                key={d.id}
                transform={`translate(${dx}, ${dy})`}
                className="cursor-pointer opacity-75 hover:opacity-100 transition-opacity"
                onClick={() => setSelectedEntity({ type: 'drone', id: d.id, data: d })}
              >
                <circle
                  r="6"
                  fill="#0f172a"
                  stroke={isDelivering ? '#38bdf8' : d.status === 'CHARGING' ? '#f59e0b' : '#64748b'}
                  strokeWidth="1.5"
                />
                <circle
                  r="2.5"
                  fill={isDelivering ? '#38bdf8' : d.status === 'CHARGING' ? '#f59e0b' : '#94a3b8'}
                />
                <text x="0" y="14" fill="#94a3b8" fontSize="8" textAnchor="middle">
                  {d.id}
                </text>
              </g>
            );
          })}

        </svg>

        {/* Selected Entity Drawer / Tooltip */}
        {selectedEntity && (
          <div className="absolute bottom-4 left-4 z-30 p-3.5 rounded-xl bg-slate-900/95 border border-cyan-500/40 backdrop-blur-md shadow-2xl max-w-xs text-xs text-white animate-in fade-in slide-in-from-bottom-2">
            <div className="flex items-center justify-between pb-2 border-b border-slate-800">
              <span className="font-bold text-cyan-400 uppercase tracking-wider text-[10px]">
                {selectedEntity.type} Telemetry
              </span>
              <button
                onClick={() => setSelectedEntity(null)}
                className="text-slate-400 hover:text-white text-xs px-1"
              >
                ✕
              </button>
            </div>
            
            {selectedEntity.type === 'drone' && (
              <div className="mt-2 space-y-1.5">
                <div className="flex justify-between">
                  <span className="text-slate-400">Drone ID:</span>
                  <span className="font-semibold">{selectedEntity.data.id}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Model:</span>
                  <span>{selectedEntity.data.model}</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Battery:</span>
                  <span className="text-emerald-400 font-semibold">{selectedEntity.data.battery}%</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Status:</span>
                  <span className="px-1.5 py-0.5 rounded text-[10px] bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {selectedEntity.data.status}
                  </span>
                </div>
              </div>
            )}

            {selectedEntity.type === 'store' && (
              <div className="mt-2 space-y-1">
                <div className="font-semibold text-white">{selectedEntity.data.storeName}</div>
                <div className="text-slate-400 text-[11px]">{selectedEntity.data.address}</div>
                <div className="text-cyan-400 font-mono text-[10px]">Rooftop Pad Alpha • Category: {selectedEntity.data.category}</div>
              </div>
            )}

            {selectedEntity.type === 'station' && (
              <div className="mt-2 space-y-1">
                <div className="font-semibold text-white">{selectedEntity.data.name}</div>
                <div className="text-slate-400 text-[11px]">
                  Lockers: {selectedEntity.data.currentPackages} / {selectedEntity.data.capacity} utilized
                </div>
                <div className="text-emerald-400 text-[10px]">Status: {selectedEntity.data.status} (Automated Pin Pickup)</div>
              </div>
            )}

            {selectedEntity.type === 'zone' && (
              <div className="mt-2 space-y-1">
                <div className="font-semibold text-white">{selectedEntity.data.name}</div>
                <div className="text-slate-400 text-[11px]">{selectedEntity.data.description}</div>
                <div className={`text-[10px] font-semibold ${selectedEntity.data.status === 'CLOSED' ? 'text-rose-400' : 'text-cyan-400'}`}>
                  Zone Status: {selectedEntity.data.status}
                </div>
              </div>
            )}
          </div>
        )}

      </div>

      {/* Bottom Telemetry HUD Bar */}
      <div className="p-3 bg-slate-900/90 border-t border-slate-800/80 backdrop-blur-md flex flex-wrap items-center justify-between gap-3 text-xs">
        
        {/* Telemetry Metrics */}
        <div className="flex items-center gap-4 sm:gap-6 flex-wrap">
          <div className="flex items-center gap-1.5">
            <Gauge className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Speed:</span>
            <span className="font-mono font-semibold text-white">
              {focusedOrder?.status === 'DRONE_IN_TRANSIT' ? '54.2 km/h' : focusedOrder?.status === 'DRONE_DISPATCHED' ? '32.0 km/h' : '0.0 km/h'}
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <Compass className="w-4 h-4 text-cyan-400" />
            <span className="text-slate-400">Altitude:</span>
            <span className="font-mono font-semibold text-white">
              {focusedOrder?.status === 'DRONE_IN_TRANSIT' ? '75 m' : focusedOrder?.status === 'DRONE_DISPATCHED' ? '45 m' : '0 m'} AGL
            </span>
          </div>

          <div className="flex items-center gap-1.5">
            <BatteryCharging className="w-4 h-4 text-emerald-400" />
            <span className="text-slate-400">Battery:</span>
            <span className="font-mono font-semibold text-emerald-300">
              {activeDrone?.battery || 84}%
            </span>
          </div>

          <div className="hidden md:flex items-center gap-1.5">
            <Zap className="w-4 h-4 text-amber-400" />
            <span className="text-slate-400">Wind Vector:</span>
            <span className="font-mono text-slate-300">3.4 kn NW (Optimal)</span>
          </div>
        </div>

        {/* Step Simulator button (Allows instant manual advancement for testing) */}
        {interactive && focusedOrder && (
          <div className="flex items-center gap-2">
            {focusedOrder.status === 'READY_FOR_DRONE' && (
              <button
                onClick={() => dispatchDroneSimulation(focusedOrder.id)}
                className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
              >
                <Play className="w-3.5 h-3.5 fill-current" />
                Dispatch Drone Simulation
              </button>
            )}

            {focusedOrder.status !== 'CUSTOMER_PICKUP' && focusedOrder.status !== 'READY_FOR_DRONE' && (
              <button
                onClick={() => advanceOrderSimulationStep(focusedOrder.id)}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 flex items-center gap-1.5 transition-colors"
                title="Fast forward to next lifecycle state"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                Step Simulation ({focusedOrder.status.replace(/_/g, ' ')})
              </button>
            )}

            {focusedOrder.status === 'CUSTOMER_PICKUP' && (
              <div className="flex items-center gap-1.5 text-emerald-400 font-medium">
                <CheckCircle2 className="w-4 h-4" />
                Order Completed & Picked Up
              </div>
            )}
          </div>
        )}
      </div>

    </div>
  );
};
