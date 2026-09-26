import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Package,
  Clock,
  CheckCircle2,
  Navigation,
  ArrowRight,
  Filter,
  Search,
  Store,
  User,
  MapPin,
  Play
} from 'lucide-react';

export const SellerOrders: React.FC = () => {
  const { stores, orders, updateOrderStatus, dispatchDroneSimulation } = useApp();
  const currentStore = stores[0];

  const storeOrders = orders.filter(o => o.storeId === currentStore.id);

  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');

  const filteredOrders = storeOrders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.items.some(i => i.product.name.toLowerCase().includes(q))
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Merchant Order Fulfillment Center
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Process customer orders through the 4 store phases: New → Accepted → Preparing → Ready for Drone.
        </p>
      </div>

      {/* Filter and Search Bar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="flex items-center gap-2 overflow-x-auto w-full md:w-auto">
          {[
            { id: 'all', label: 'All Orders' },
            { id: 'ORDER_PLACED', label: 'New Orders' },
            { id: 'STORE_ACCEPTED', label: 'Accepted' },
            { id: 'PACKAGE_PREPARING', label: 'Preparing' },
            { id: 'READY_FOR_DRONE', label: 'Ready for Drone' },
            { id: 'DRONE_IN_TRANSIT', label: 'Airborne' }
          ].map(f => (
            <button
              key={f.id}
              onClick={() => setStatusFilter(f.id)}
              className={`px-3 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                statusFilter === f.id
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-sm'
                  : 'bg-slate-950 text-slate-300 hover:text-white border border-slate-800'
              }`}
            >
              {f.label}
            </button>
          ))}
        </div>

        <div className="relative w-full md:w-64">
          <input
            type="text"
            placeholder="Search by Order ID or item..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
      </div>

      {/* Orders Cards List */}
      <div className="space-y-4">
        {filteredOrders.length === 0 ? (
          <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-2">
            <Package className="w-10 h-10 text-slate-500 mx-auto" />
            <h3 className="text-sm font-semibold text-white">No orders matching this criteria</h3>
          </div>
        ) : (
          filteredOrders.map(order => {
            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all space-y-4 shadow-lg"
              >
                {/* Header */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="text-base font-bold text-white font-display">
                        Order #{order.id}
                      </span>
                      <span className="px-2.5 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
                        {order.status.replace(/_/g, ' ')}
                      </span>
                    </div>
                    <div className="text-xs text-slate-400 flex items-center gap-2">
                      <User className="w-3.5 h-3.5 text-slate-400" />
                      <span>{order.customerName} ({order.customerPhone})</span>
                      <span>•</span>
                      <span>Placed at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-white font-display">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-cyan-400">
                      Weight: {order.totalWeightKg} kg (Payload OK)
                    </div>
                  </div>
                </div>

                {/* Items in order */}
                <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-3">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-3 p-2.5 rounded-xl bg-slate-950/70 border border-slate-800/80">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-11 h-11 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0 text-xs">
                        <div className="font-semibold text-white truncate">{item.product.name}</div>
                        <div className="text-slate-400 text-[11px]">Qty: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Footer and Lifecycle Stepper */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-2 border-t border-slate-800/80 text-xs">
                  <div className="flex items-center gap-2 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Locker Drop: <strong className="text-white">{order.deliveryStationName}</strong></span>
                  </div>

                  {/* Merchant stage action buttons */}
                  <div className="flex items-center gap-2 w-full sm:w-auto justify-end">
                    {order.status === 'ORDER_PLACED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'STORE_ACCEPTED')}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors"
                      >
                        1. Accept Order
                      </button>
                    )}

                    {order.status === 'STORE_ACCEPTED' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'PACKAGE_PREPARING')}
                        className="px-4 py-2 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold transition-colors"
                      >
                        2. Start Packing Pod
                      </button>
                    )}

                    {order.status === 'PACKAGE_PREPARING' && (
                      <button
                        onClick={() => updateOrderStatus(order.id, 'READY_FOR_DRONE')}
                        className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold transition-colors"
                      >
                        3. Mark Ready for Drone
                      </button>
                    )}

                    {order.status === 'READY_FOR_DRONE' && (
                      <button
                        onClick={() => dispatchDroneSimulation(order.id)}
                        className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold transition-colors flex items-center gap-1.5 shadow-md shadow-cyan-500/20"
                      >
                        <Play className="w-3.5 h-3.5 fill-current" />
                        4. Launch Drone Simulation
                      </button>
                    )}

                    {order.status !== 'ORDER_PLACED' && order.status !== 'STORE_ACCEPTED' && order.status !== 'PACKAGE_PREPARING' && order.status !== 'READY_FOR_DRONE' && (
                      <span className="text-[11px] text-cyan-400 flex items-center gap-1 font-medium">
                        <Navigation className="w-3.5 h-3.5 animate-pulse" />
                        Package Airborne / En Route
                      </span>
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
