import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  Navigation,
  ArrowRight,
  TrendingUp,
  AlertCircle,
  Play,
  RotateCcw
} from 'lucide-react';

export const SellerDashboard: React.FC = () => {
  const {
    stores,
    products,
    orders,
    setActiveSellerTab,
    updateOrderStatus,
    requestDronePickup,
    dispatchDroneSimulation
  } = useApp();

  const currentStore = stores[0]; // Marcus Vance's "SkyGrocers Fresh Mart"
  const storeProducts = products.filter(p => p.storeId === currentStore.id);
  const storeOrders = orders.filter(o => o.storeId === currentStore.id);

  const pendingOrders = storeOrders.filter(
    o => o.status === 'ORDER_PLACED' || o.status === 'STORE_ACCEPTED' || o.status === 'PACKAGE_PREPARING'
  );
  const readyForDroneOrders = storeOrders.filter(o => o.status === 'READY_FOR_DRONE');
  const inFlightOrders = storeOrders.filter(
    o => o.status === 'DRONE_DISPATCHED' || o.status === 'DRONE_IN_TRANSIT'
  );
  const completedOrders = storeOrders.filter(
    o => o.status === 'DELIVERED_TO_STATION' || o.status === 'CUSTOMER_PICKUP'
  );

  const todayRevenue = storeOrders.reduce((sum, o) => sum + o.total, 0);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Merchant Title & Status Banner */}
      <div className="p-6 rounded-2xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/40 border border-slate-800 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 backdrop-blur-md">
        <div className="flex items-center gap-4">
          <img
            src={currentStore.image}
            alt={currentStore.storeName}
            className="w-14 h-14 rounded-2xl object-cover ring-2 ring-cyan-500/30"
          />
          <div>
            <div className="flex items-center gap-2">
              <h1 className="text-xl font-bold text-white font-display">
                {currentStore.storeName}
              </h1>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                ROOFTOP PAD #1 ACTIVE
              </span>
            </div>
            <p className="text-xs text-slate-400 mt-0.5">
              Merchant Operator: {currentStore.owner} • Category: {currentStore.category}
            </p>
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setActiveSellerTab('orders')}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
          >
            Manage Orders ({pendingOrders.length})
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        {/* Today's Revenue */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Today's Sky Sales
            </span>
            <div className="text-2xl font-bold text-white font-display">
              ${todayRevenue.toFixed(2)}
            </div>
            <div className="text-[10px] text-emerald-400 flex items-center gap-1">
              <TrendingUp className="w-3 h-3" />
              <span>+18.4% vs last week</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            <DollarSign className="w-5 h-5" />
          </div>
        </div>

        {/* Pending Orders */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Pending Fulfillment
            </span>
            <div className="text-2xl font-bold text-white font-display">
              {pendingOrders.length}
            </div>
            <div className="text-[10px] text-amber-400 flex items-center gap-1">
              <Clock className="w-3 h-3" />
              <span>Avg prep time: 4.8 min</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-amber-950/80 text-amber-400 border border-amber-800/40">
            <Package className="w-5 h-5" />
          </div>
        </div>

        {/* Ready for Drone Pickup */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Ready for Drone
            </span>
            <div className="text-2xl font-bold text-cyan-400 font-display">
              {readyForDroneOrders.length}
            </div>
            <div className="text-[10px] text-cyan-400 flex items-center gap-1">
              <Navigation className="w-3 h-3 animate-pulse" />
              <span>Awaiting Liftoff</span>
            </div>
          </div>
          <div className="p-3 rounded-xl bg-cyan-950/80 text-cyan-400 border border-cyan-800/40">
            <Navigation className="w-5 h-5" />
          </div>
        </div>

        {/* Active Products */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between">
          <div className="space-y-1">
            <span className="text-[11px] text-slate-400 uppercase tracking-wider font-semibold">
              Catalog Products
            </span>
            <div className="text-2xl font-bold text-white font-display">
              {storeProducts.length}
            </div>
            <div className="text-[10px] text-slate-400">
              In-stock & Drone-certified
            </div>
          </div>
          <div className="p-3 rounded-xl bg-slate-950 text-slate-300 border border-slate-800">
            <CheckCircle2 className="w-5 h-5" />
          </div>
        </div>

      </div>

      {/* Immediate Attention: Drone Pickup Queue */}
      {readyForDroneOrders.length > 0 && (
        <div className="p-5 rounded-2xl bg-cyan-950/40 border border-cyan-500/30 space-y-4 backdrop-blur-md">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400 animate-pulse" />
              <div>
                <h3 className="text-sm font-bold text-white font-display">
                  Packages Staged at Launchpad ({readyForDroneOrders.length})
                </h3>
                <p className="text-xs text-slate-400">
                  Thermal aero-pod packed and locked. Request immediate aerial dispatch.
                </p>
              </div>
            </div>
            <button
              onClick={() => setActiveSellerTab('pickup')}
              className="text-xs text-cyan-400 hover:text-cyan-300 font-semibold"
            >
              Open Pickup Terminal →
            </button>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {readyForDroneOrders.map(order => (
              <div
                key={order.id}
                className="p-4 rounded-xl bg-slate-900/90 border border-slate-800 flex items-center justify-between gap-3"
              >
                <div>
                  <div className="text-xs font-bold text-white">Order #{order.id}</div>
                  <div className="text-[11px] text-slate-400">
                    Destination: {order.deliveryStationName.split(' - ')[0]}
                  </div>
                  <div className="text-[10px] text-cyan-400 mt-1">
                    Weight: {order.totalWeightKg} kg • Assigned: {order.droneId || 'DZ-001'}
                  </div>
                </div>

                <button
                  onClick={() => dispatchDroneSimulation(order.id)}
                  className="px-3.5 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md shadow-cyan-500/20"
                >
                  <Play className="w-3.5 h-3.5 fill-current" />
                  Dispatch Drone
                </button>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Orders In Workflow */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white font-display">
              Recent Store Orders
            </h2>
            <p className="text-xs text-slate-400">
              Advance packages through fulfillment stages
            </p>
          </div>
          <button
            onClick={() => setActiveSellerTab('orders')}
            className="text-xs text-cyan-400 hover:text-cyan-300"
          >
            View all ({storeOrders.length})
          </button>
        </div>

        <div className="space-y-3">
          {storeOrders.slice(0, 4).map(order => (
            <div
              key={order.id}
              className="p-4 rounded-xl bg-slate-950/70 border border-slate-800/80 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 text-xs"
            >
              <div className="space-y-1">
                <div className="flex items-center gap-2">
                  <span className="font-bold text-white">#{order.id}</span>
                  <span className="text-slate-400">by {order.customerName}</span>
                  <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                    {order.status.replace(/_/g, ' ')}
                  </span>
                </div>
                <div className="text-[11px] text-slate-400">
                  {order.items.map(i => `${i.quantity}x ${i.product.name}`).join(', ')}
                </div>
              </div>

              {/* Status transition controls */}
              <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                {order.status === 'ORDER_PLACED' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'STORE_ACCEPTED')}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs"
                  >
                    Accept Order
                  </button>
                )}

                {order.status === 'STORE_ACCEPTED' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'PACKAGE_PREPARING')}
                    className="px-3 py-1.5 rounded-lg bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs"
                  >
                    Start Packing
                  </button>
                )}

                {order.status === 'PACKAGE_PREPARING' && (
                  <button
                    onClick={() => updateOrderStatus(order.id, 'READY_FOR_DRONE')}
                    className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs"
                  >
                    Mark Ready for Drone
                  </button>
                )}

                {order.status === 'READY_FOR_DRONE' && (
                  <button
                    onClick={() => dispatchDroneSimulation(order.id)}
                    className="px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1"
                  >
                    <Play className="w-3 h-3 fill-current" />
                    Launch Drone
                  </button>
                )}

                {order.status !== 'ORDER_PLACED' && order.status !== 'STORE_ACCEPTED' && order.status !== 'PACKAGE_PREPARING' && order.status !== 'READY_FOR_DRONE' && (
                  <span className="text-[11px] text-slate-400 italic">
                    Managed by SkyFleet Air Traffic
                  </span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
