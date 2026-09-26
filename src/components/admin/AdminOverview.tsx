import React from 'react';
import { useApp } from '../../context/AppContext';
import { DroneRadarMap } from '../simulation/DroneRadarMap';
import {
  Users,
  Store,
  Package,
  Navigation,
  MapPin,
  DollarSign,
  TrendingUp,
  Shield,
  Activity,
  ArrowRight,
  Play
} from 'lucide-react';

export const AdminOverview: React.FC = () => {
  const {
    stores,
    orders,
    drones,
    deliveryStations,
    setActiveAdminTab,
    dispatchDroneSimulation
  } = useApp();

  const totalCustomers = 1248;
  const totalSellers = stores.length;
  const ordersToday = orders.length + 42;
  const activeDeliveries = orders.filter(
    o => o.status === 'DRONE_DISPATCHED' || o.status === 'DRONE_IN_TRANSIT'
  ).length;
  const availableDrones = drones.filter(d => d.status === 'AVAILABLE').length;
  const totalRevenue = orders.reduce((sum, o) => sum + o.total, 0) + 48250;

  const inFlightOrder = orders.find(
    o => o.status === 'DRONE_IN_TRANSIT' || o.status === 'DRONE_DISPATCHED'
  ) || orders[0];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Airspace Status */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 backdrop-blur-md">
        <div>
          <div className="flex items-center gap-2">
            <h1 className="text-xl sm:text-2xl font-bold text-white font-display">
              DROZONE Air Traffic Control Center
            </h1>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse">
              SIMULATION OPS LIVE
            </span>
          </div>
          <p className="text-xs text-slate-400 mt-1">
            Global network telemetry across 5 municipal skyports and automated aerial delivery corridors.
          </p>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveAdminTab('drones')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
          >
            <Navigation className="w-3.5 h-3.5" />
            Inspect Drone Fleet ({drones.length})
          </button>
        </div>
      </div>

      {/* 7 Key Admin Metrics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-3">
        
        {/* Total Customers */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Customers</span>
          <div className="text-xl font-bold text-white font-display">{totalCustomers}</div>
          <div className="text-[10px] text-emerald-400">+12 today</div>
        </div>

        {/* Total Sellers */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Sellers</span>
          <div className="text-xl font-bold text-white font-display">{totalSellers}</div>
          <div className="text-[10px] text-cyan-400">All Active</div>
        </div>

        {/* Orders Today */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Orders Today</span>
          <div className="text-xl font-bold text-white font-display">{ordersToday}</div>
          <div className="text-[10px] text-emerald-400">+18% vs avg</div>
        </div>

        {/* Active Deliveries */}
        <div className="p-4 rounded-xl bg-cyan-950/40 border border-cyan-500/40 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-cyan-300">In Sky Transit</span>
          <div className="text-xl font-bold text-cyan-400 font-display animate-pulse">{activeDeliveries}</div>
          <div className="text-[10px] text-cyan-300">Live Corridors</div>
        </div>

        {/* Available Drones */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Fleet Ready</span>
          <div className="text-xl font-bold text-emerald-400 font-display">{availableDrones} / {drones.length}</div>
          <div className="text-[10px] text-emerald-400">Batteries &gt; 80%</div>
        </div>

        {/* Delivery Stations */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">SkyPorts</span>
          <div className="text-xl font-bold text-white font-display">{deliveryStations.length} Hubs</div>
          <div className="text-[10px] text-slate-400">100% Online</div>
        </div>

        {/* Platform Revenue */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 space-y-1 col-span-2 sm:col-span-1">
          <span className="text-[10px] uppercase font-semibold text-slate-400">Revenue</span>
          <div className="text-xl font-bold text-white font-display">${totalRevenue.toLocaleString()}</div>
          <div className="text-[10px] text-emerald-400">+22.4% MoM</div>
        </div>

      </div>

      {/* Main Airspace Interactive Radar Map */}
      <div className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Activity className="w-4 h-4 text-cyan-400" />
            Live Metropolitan SkyCorridor Visualization
          </span>
          <button
            onClick={() => setActiveAdminTab('zones')}
            className="text-cyan-400 hover:text-cyan-300 flex items-center gap-1 font-semibold"
          >
            Open Full Geofence Manager <ArrowRight className="w-3 h-3" />
          </button>
        </div>

        <DroneRadarMap showAllDrones={true} height="h-[420px]" />
      </div>

      {/* Quick Ops Controls: Drones & Active Flights */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        
        {/* Active Flights Table */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Active Airspace Dispatches</span>
            </h3>
            <button
              onClick={() => setActiveAdminTab('orders')}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              All Orders →
            </button>
          </div>

          <div className="space-y-2.5 text-xs">
            {orders.slice(0, 4).map(o => (
              <div
                key={o.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex items-center justify-between gap-2"
              >
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-bold text-white">#{o.id}</span>
                    <span className="text-slate-400">{o.storeName}</span>
                  </div>
                  <div className="text-[11px] text-cyan-400 mt-0.5">
                    Target: {o.deliveryStationName.split(' - ')[0]}
                  </div>
                </div>

                <div className="text-right">
                  <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {o.status.replace(/_/g, ' ')}
                  </span>
                  <div className="text-[10px] text-slate-400 mt-0.5 font-mono">
                    Drone: {o.droneId || 'Unassigned'}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Drone Fleet Quick Status */}
        <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Shield className="w-4 h-4 text-cyan-400" />
              <span>Fleet Readiness & Telemetry</span>
            </h3>
            <button
              onClick={() => setActiveAdminTab('drones')}
              className="text-xs text-cyan-400 hover:text-cyan-300"
            >
              Fleet Control →
            </button>
          </div>

          <div className="grid grid-cols-2 gap-2 text-xs">
            {drones.slice(0, 4).map(d => (
              <div
                key={d.id}
                className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 space-y-1.5"
              >
                <div className="flex items-center justify-between">
                  <span className="font-bold text-white font-mono">{d.id}</span>
                  <span className={`text-[10px] font-bold px-1.5 py-0.5 rounded ${
                    d.status === 'AVAILABLE'
                      ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                      : d.status === 'DELIVERING'
                      ? 'bg-cyan-950 text-cyan-300 border border-cyan-800'
                      : 'bg-amber-950 text-amber-300 border border-amber-800'
                  }`}>
                    {d.status}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400 truncate">{d.model}</div>
                <div className="flex items-center justify-between pt-1 text-[11px]">
                  <span className="text-slate-500">Battery:</span>
                  <span className="font-mono font-bold text-emerald-400">{d.battery}%</span>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>

    </div>
  );
};
