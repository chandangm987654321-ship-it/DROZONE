import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import {
  Search,
  Filter,
  Package,
  Navigation,
  User,
  Store,
  MapPin,
  Clock,
  ArrowRight,
  Eye,
  X
} from 'lucide-react';

const ALL_STATUSES: OrderStatus[] = [
  'ORDER_PLACED',
  'STORE_ACCEPTED',
  'PACKAGE_PREPARING',
  'READY_FOR_DRONE',
  'DRONE_DISPATCHED',
  'DRONE_IN_TRANSIT',
  'DELIVERED_TO_STATION',
  'CUSTOMER_PICKUP'
];

export const AdminOrders: React.FC = () => {
  const { orders, updateOrderStatus, dispatchDroneSimulation } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [statusFilter, setStatusFilter] = useState<string>('all');
  const [inspectOrder, setInspectOrder] = useState<typeof orders[0] | null>(null);

  const filteredOrders = orders.filter(o => {
    if (statusFilter !== 'all' && o.status !== statusFilter) return false;
    if (searchQuery.trim()) {
      const q = searchQuery.toLowerCase();
      return (
        o.id.toLowerCase().includes(q) ||
        o.customerName.toLowerCase().includes(q) ||
        o.storeName.toLowerCase().includes(q) ||
        o.deliveryStationName.toLowerCase().includes(q)
      );
    }
    return true;
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Global Airspace Orders Control
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time flight status supervision, customer/merchant verification, and manual corridor override.
        </p>
      </div>

      {/* Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search by Order ID, Customer, Store, Station..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>

        <div className="flex items-center gap-2 w-full md:w-auto">
          <select
            value={statusFilter}
            onChange={e => setStatusFilter(e.target.value)}
            className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
          >
            <option value="all">All Delivery States</option>
            {ALL_STATUSES.map(s => (
              <option key={s} value={s}>
                {s.replace(/_/g, ' ')}
              </option>
            ))}
          </select>

          <span className="text-xs text-slate-400 whitespace-nowrap">
            {filteredOrders.length} orders
          </span>
        </div>
      </div>

      {/* Table */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Order ID</th>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Partner Store</th>
                <th className="py-3.5 px-4">Delivery Station</th>
                <th className="py-3.5 px-4">Drone</th>
                <th className="py-3.5 px-4">Status / Override</th>
                <th className="py-3.5 px-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filteredOrders.map(order => (
                <tr key={order.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4 font-mono font-bold text-white">
                    #{order.id}
                  </td>

                  <td className="py-3 px-4">
                    <div className="font-semibold text-white">{order.customerName}</div>
                    <div className="text-[10px] text-slate-400">{order.customerPhone}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="font-medium text-slate-200">{order.storeName}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-cyan-400">{order.deliveryStationName.split(' - ')[0]}</span>
                  </td>

                  <td className="py-3 px-4 font-mono text-cyan-300">
                    {order.droneId || 'Unassigned'}
                  </td>

                  <td className="py-3 px-4">
                    <select
                      value={order.status}
                      onChange={e => updateOrderStatus(order.id, e.target.value as OrderStatus)}
                      className="px-2.5 py-1 rounded-lg bg-slate-950 border border-slate-700 text-[11px] font-semibold text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
                    >
                      {ALL_STATUSES.map(s => (
                        <option key={s} value={s}>
                          {s.replace(/_/g, ' ')}
                        </option>
                      ))}
                    </select>
                  </td>

                  <td className="py-3 px-4 text-right">
                    <button
                      onClick={() => setInspectOrder(order)}
                      className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="Inspect full details"
                    >
                      <Eye className="w-3.5 h-3.5" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Inspect Order Modal */}
      {inspectOrder && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-xs">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white font-display">
                Inspect Flight Order #{inspectOrder.id}
              </h2>
              <button onClick={() => setInspectOrder(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3 text-slate-300">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Customer Details</div>
                <div className="font-bold text-white">{inspectOrder.customerName} ({inspectOrder.customerEmail})</div>
                <div className="text-[11px] text-slate-400">{inspectOrder.deliveryAddress}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Merchant Origin</div>
                <div className="font-bold text-white">{inspectOrder.storeName}</div>
                <div className="text-[11px] text-slate-400">Launchpad Rooftop Alpha</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Destination Locker Pod</div>
                <div className="font-bold text-cyan-400">{inspectOrder.deliveryStationName}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
                <div className="text-[10px] text-slate-400 uppercase font-semibold mb-1">Manifest Items</div>
                <div className="space-y-1 text-slate-300">
                  {inspectOrder.items.map((i, idx) => (
                    <div key={idx} className="flex justify-between">
                      <span>{i.quantity}x {i.product.name}</span>
                      <span className="font-mono text-white">${(i.price * i.quantity).toFixed(2)}</span>
                    </div>
                  ))}
                  <div className="border-t border-slate-800 pt-1 flex justify-between font-bold text-white">
                    <span>Total Weight & Fee</span>
                    <span>{inspectOrder.totalWeightKg} kg • ${inspectOrder.total.toFixed(2)}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectOrder(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold text-xs"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

    </div>
  );
};
