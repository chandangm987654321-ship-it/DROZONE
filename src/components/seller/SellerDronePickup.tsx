import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Navigation,
  Package,
  Weight,
  MapPin,
  Clock,
  CheckCircle2,
  AlertCircle,
  Play,
  RotateCcw,
  Sparkles,
  ShieldCheck
} from 'lucide-react';

export const SellerDronePickup: React.FC = () => {
  const {
    stores,
    orders,
    drones,
    requestDronePickup,
    dispatchDroneSimulation
  } = useApp();

  const currentStore = stores[0];
  const storeOrders = orders.filter(o => o.storeId === currentStore.id);

  // Orders that are either preparing, ready for drone, or currently in transit
  const pickupEligibleOrders = storeOrders.filter(
    o =>
      o.status === 'PACKAGE_PREPARING' ||
      o.status === 'READY_FOR_DRONE' ||
      o.status === 'DRONE_DISPATCHED' ||
      o.status === 'DRONE_IN_TRANSIT'
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Rooftop Drone Pickup Terminal
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Request automated drone touchdown at Store Launchpad #1 and monitor package transfer into aerial cargo clamps.
        </p>
      </div>

      {/* Launchpad Status Banner */}
      <div className="p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 flex flex-col md:flex-row items-start md:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-3.5">
          <div className="w-12 h-12 rounded-xl bg-cyan-950/80 border border-cyan-700/50 text-cyan-400 flex items-center justify-center shrink-0">
            <Navigation className="w-6 h-6 animate-pulse" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <h3 className="text-sm font-bold text-white">
                Launchpad Pad Alpha (Rooftop 102 Market St)
              </h3>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                LIDAR BEACON ONLINE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Wind: 3.2 kn NW • Clear Airspace Clearance • Auto-Clamps Ready
            </p>
          </div>
        </div>

        <div className="flex items-center gap-4 text-xs text-slate-300">
          <div>
            <span className="text-cyan-400 font-bold font-mono">3.5 KG</span> Max Pod Payload
          </div>
          <div className="hidden sm:block text-slate-600">•</div>
          <div>
            <span className="text-white font-bold font-mono">1.2 MIN</span> Avg Touchdown Time
          </div>
        </div>
      </div>

      {/* Orders Ready for Pickup */}
      <div className="space-y-4">
        {pickupEligibleOrders.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
            <Package className="w-12 h-12 text-slate-500 mx-auto" />
            <h3 className="text-base font-semibold text-white">No packages staged for pickup</h3>
            <p className="text-xs text-slate-400 max-w-sm mx-auto">
              Prepare a customer order and click "Mark Ready for Drone" to initiate aerial dispatch.
            </p>
          </div>
        ) : (
          pickupEligibleOrders.map(order => {
            const isReady = order.status === 'READY_FOR_DRONE';
            const isPreparing = order.status === 'PACKAGE_PREPARING';
            const isAirborne = order.status === 'DRONE_DISPATCHED' || order.status === 'DRONE_IN_TRANSIT';

            return (
              <div
                key={order.id}
                className={`p-6 rounded-2xl border transition-all space-y-4 ${
                  isReady
                    ? 'bg-slate-900/90 border-cyan-500/40 shadow-xl shadow-cyan-950/30'
                    : 'bg-slate-900/60 border-slate-800'
                }`}
              >
                {/* Header info */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pb-3 border-b border-slate-800">
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-display">
                        Order #{order.id}
                      </span>
                      <span className={`px-2.5 py-0.5 rounded text-[10px] font-bold ${
                        isReady
                          ? 'bg-cyan-500 text-slate-950'
                          : isAirborne
                          ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                          : 'bg-slate-950 text-amber-300 border border-amber-800'
                      }`}>
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 mt-0.5">
                      Destination Locker: {order.deliveryStationName}
                    </div>
                  </div>

                  {/* Weight badge */}
                  <div className="flex items-center gap-2 text-xs">
                    <span className="px-3 py-1.5 rounded-xl bg-slate-950 border border-slate-800 text-slate-300 font-mono flex items-center gap-1.5">
                      <Weight className="w-3.5 h-3.5 text-cyan-400" />
                      Weight: <strong className="text-white">{order.totalWeightKg} kg</strong>
                    </span>
                  </div>
                </div>

                {/* 6 Grid Specs demanded by prompt */}
                <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 text-xs">
                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Order ID</span>
                    <span className="font-bold text-white font-mono">{order.id}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Package Weight</span>
                    <span className="font-bold text-white font-mono">{order.totalWeightKg} kg</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Pickup Location</span>
                    <span className="font-bold text-slate-200 truncate block">Rooftop Pad Alpha</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Delivery Station</span>
                    <span className="font-bold text-slate-200 truncate block">{order.deliveryStationName.split(' - ')[0]}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Requested Drone</span>
                    <span className="font-bold text-cyan-400 font-mono">{order.droneId || 'DZ-001 (Auto)'}</span>
                  </div>

                  <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800/80">
                    <span className="text-[10px] uppercase text-slate-400 block mb-0.5">Pickup Status</span>
                    <span className="font-bold text-emerald-400 truncate block">
                      {isReady ? 'Ready for Lift' : isAirborne ? 'Airborne' : 'In Packing'}
                    </span>
                  </div>
                </div>

                {/* Main Action Buttons */}
                <div className="pt-2 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span>AeroPod safety seal verified. Auto-release safety pin enabled.</span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {isPreparing && (
                      <button
                        onClick={() => requestDronePickup(order.id)}
                        className="px-4 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-md shadow-cyan-500/20 transition-colors"
                      >
                        <Navigation className="w-4 h-4" />
                        Request Drone Pickup
                      </button>
                    )}

                    {isReady && (
                      <button
                        onClick={() => dispatchDroneSimulation(order.id)}
                        className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.02]"
                      >
                        <Play className="w-4 h-4 fill-current" />
                        Authorize Drone Liftoff & Sky Dispatch
                      </button>
                    )}

                    {isAirborne && (
                      <div className="px-4 py-2 rounded-xl bg-cyan-950/80 border border-cyan-800 text-cyan-300 flex items-center gap-2">
                        <Navigation className="w-4 h-4 animate-pulse" />
                        <span>Cruising to SkyPort Hub at 54 km/h</span>
                      </div>
                    )}
                  </div>
                </div>

              </div>
            );
          })
        )}
      </div>

    </div>
  );
};
