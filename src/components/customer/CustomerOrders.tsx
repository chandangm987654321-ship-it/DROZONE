import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  Package,
  Clock,
  ArrowRight,
  RotateCcw,
  Navigation,
  CheckCircle2,
  MapPin,
  Store
} from 'lucide-react';

export const CustomerOrders: React.FC = () => {
  const {
    orders,
    addToCart,
    setActiveTrackingOrderId,
    setActiveCustomerTab,
    addToast
  } = useApp();

  const handleReorder = (order: typeof orders[0]) => {
    order.items.forEach(item => {
      addToCart(item.product, item.quantity);
    });
    addToast('Items Added', 'Reordered items placed in your delivery bag.', 'success');
    setActiveCustomerTab('cart');
  };

  const handleViewLiveTracking = (orderId: string) => {
    setActiveTrackingOrderId(orderId);
    setActiveCustomerTab('tracking');
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Order History & Reorder
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Review past and active sky flight deliveries dispatched through the DROZONE network.
        </p>
      </div>

      {orders.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <Package className="w-12 h-12 text-slate-500 mx-auto" />
          <h3 className="text-base font-semibold text-white">No orders yet</h3>
          <p className="text-xs text-slate-400">Order from local merchants to test drone dispatch.</p>
        </div>
      ) : (
        <div className="space-y-4">
          {orders.map(order => {
            const isCompleted = order.status === 'CUSTOMER_PICKUP';
            const isInFlight = order.status === 'DRONE_DISPATCHED' || order.status === 'DRONE_IN_TRANSIT';

            return (
              <div
                key={order.id}
                className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-slate-700 transition-all space-y-4"
              >
                {/* Header Row */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-3 border-b border-slate-800">
                  <div className="flex items-center gap-3">
                    <div className="p-2 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                      <Navigation className="w-4 h-4" />
                    </div>
                    <div>
                      <div className="text-sm font-bold text-white flex items-center gap-2">
                        <span>Order #{order.id}</span>
                        <span className={`px-2 py-0.5 rounded text-[10px] font-semibold ${
                          isCompleted
                            ? 'bg-emerald-950 text-emerald-300 border border-emerald-800'
                            : 'bg-cyan-950 text-cyan-300 border border-cyan-800 animate-pulse'
                        }`}>
                          {order.status.replace(/_/g, ' ')}
                        </span>
                      </div>
                      <div className="text-xs text-slate-400 flex items-center gap-2 mt-0.5">
                        <span>{new Date(order.createdAt).toLocaleDateString()} at {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}</span>
                        <span>•</span>
                        <span className="text-slate-300 font-medium">{order.storeName}</span>
                      </div>
                    </div>
                  </div>

                  <div className="text-right">
                    <div className="text-base font-bold text-white font-display">
                      ${order.total.toFixed(2)}
                    </div>
                    <div className="text-[11px] text-slate-400">
                      {order.items.reduce((s, i) => s + i.quantity, 0)} items ({order.totalWeightKg} kg)
                    </div>
                  </div>
                </div>

                {/* Items preview */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 text-xs">
                  {order.items.map((item, idx) => (
                    <div key={idx} className="flex items-center gap-2 p-2 rounded-xl bg-slate-950/60 border border-slate-800/80">
                      <img
                        src={item.product.image}
                        alt={item.product.name}
                        className="w-10 h-10 rounded-lg object-cover shrink-0"
                      />
                      <div className="min-w-0">
                        <div className="font-semibold text-white truncate">{item.product.name}</div>
                        <div className="text-[10px] text-slate-400">Qty: {item.quantity} • ${(item.price * item.quantity).toFixed(2)}</div>
                      </div>
                    </div>
                  ))}
                </div>

                {/* Station & Actions */}
                <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 pt-1 text-xs">
                  <div className="flex items-center gap-1.5 text-slate-400">
                    <MapPin className="w-3.5 h-3.5 text-cyan-400" />
                    <span>Locker Pod: <strong className="text-slate-200">{order.deliveryStationName}</strong></span>
                  </div>

                  <div className="flex items-center gap-2 w-full sm:w-auto">
                    <button
                      onClick={() => handleViewLiveTracking(order.id)}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <Navigation className="w-3.5 h-3.5" />
                      Live Radar View
                    </button>

                    <button
                      onClick={() => handleReorder(order)}
                      className="flex-1 sm:flex-none px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-semibold transition-colors flex items-center justify-center gap-1.5"
                    >
                      <RotateCcw className="w-3.5 h-3.5" />
                      Reorder Items
                    </button>
                  </div>
                </div>

              </div>
            );
          })}
        </div>
      )}

    </div>
  );
};
