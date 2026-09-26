import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Store } from '../../types';
import {
  Store as StoreIcon,
  CheckCircle,
  Ban,
  MapPin,
  Package,
  DollarSign,
  Star,
  Search,
  Eye,
  X,
  ShieldCheck
} from 'lucide-react';

export const AdminSellers: React.FC = () => {
  const { stores, products, orders, approveSeller, suspendSeller } = useApp();
  const [searchQuery, setSearchQuery] = useState('');
  const [inspectStore, setInspectStore] = useState<Store | null>(null);

  const filteredStores = stores.filter(s => {
    if (!searchQuery.trim()) return true;
    const q = searchQuery.toLowerCase();
    return (
      s.storeName.toLowerCase().includes(q) ||
      s.owner.toLowerCase().includes(q) ||
      s.category.toLowerCase().includes(q)
    );
  });

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Partner Merchants & Rooftop Launchpads
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Verify merchant compliance, approve new store licenses, or suspend airspace dispatch access.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search stores by name, merchant, or category..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-slate-400">{filteredStores.length} registered merchants</span>
      </div>

      {/* Sellers Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {filteredStores.map(store => {
          const storeProductsCount = products.filter(p => p.storeId === store.id).length;
          const storeOrdersCount = orders.filter(o => o.storeId === store.id).length + store.totalOrders;
          const isActive = store.status === 'active';

          return (
            <div
              key={store.id}
              className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between space-y-4 shadow-lg"
            >
              <div>
                <div className="flex items-start justify-between gap-3">
                  <img
                    src={store.image}
                    alt={store.storeName}
                    className="w-14 h-14 rounded-xl object-cover ring-1 ring-slate-800 shrink-0"
                  />
                  <div className="flex-1 min-w-0">
                    <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950 text-cyan-300 border border-cyan-800">
                      {store.category}
                    </span>
                    <h3 className="text-sm font-bold text-white truncate mt-1">
                      {store.storeName}
                    </h3>
                    <div className="text-xs text-slate-400 flex items-center gap-1">
                      <Star className="w-3 h-3 text-amber-400 fill-amber-400" />
                      <span>{store.rating}</span>
                      <span>•</span>
                      <span>Owner: {store.owner}</span>
                    </div>
                  </div>
                </div>

                <div className="mt-3 pt-3 border-t border-slate-800 grid grid-cols-3 gap-2 text-center text-xs">
                  <div className="p-2 rounded-xl bg-slate-950/70">
                    <div className="text-[10px] text-slate-400">Products</div>
                    <div className="font-bold text-white font-display mt-0.5">{storeProductsCount}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70">
                    <div className="text-[10px] text-slate-400">Orders</div>
                    <div className="font-bold text-white font-display mt-0.5">{storeOrdersCount}</div>
                  </div>
                  <div className="p-2 rounded-xl bg-slate-950/70">
                    <div className="text-[10px] text-slate-400">Status</div>
                    <div className={`font-bold mt-0.5 text-[10px] ${isActive ? 'text-emerald-400' : 'text-rose-400'}`}>
                      {store.status.toUpperCase()}
                    </div>
                  </div>
                </div>
              </div>

              {/* Actions */}
              <div className="flex items-center justify-between pt-2 border-t border-slate-800 text-xs">
                <button
                  onClick={() => setInspectStore(store)}
                  className="p-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center gap-1 text-[11px]"
                >
                  <Eye className="w-3.5 h-3.5" />
                  View Details
                </button>

                <div className="flex items-center gap-2">
                  {isActive ? (
                    <button
                      onClick={() => suspendSeller(store.id)}
                      className="px-3 py-1.5 rounded-lg bg-rose-950/80 hover:bg-rose-900 border border-rose-800 text-rose-300 font-semibold flex items-center gap-1"
                    >
                      <Ban className="w-3 h-3" />
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => approveSeller(store.id)}
                      className="px-3 py-1.5 rounded-lg bg-emerald-950/80 hover:bg-emerald-900 border border-emerald-800 text-emerald-300 font-semibold flex items-center gap-1"
                    >
                      <CheckCircle className="w-3 h-3" />
                      Approve
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>

      {/* Inspect Store Details Modal */}
      {inspectStore && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in">
          <div className="relative w-full max-w-lg bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl p-6 space-y-4 text-xs text-slate-300">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h2 className="text-base font-bold text-white font-display">
                Merchant Airspace License: {inspectStore.storeName}
              </h2>
              <button onClick={() => setInspectStore(null)} className="text-slate-400 hover:text-white">
                <X className="w-5 h-5" />
              </button>
            </div>

            <div className="space-y-3">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Store Address & Pad</div>
                <div className="font-bold text-white">{inspectStore.address}</div>
                <div className="text-cyan-400 text-[11px]">Rooftop Pad Coordinates: X {inspectStore.coordinates.x}%, Y {inspectStore.coordinates.y}%</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Contact & Verification</div>
                <div className="font-bold text-white">{inspectStore.owner} ({inspectStore.email})</div>
                <div className="text-[11px] text-slate-400">Phone: {inspectStore.phone}</div>
              </div>

              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-[10px] text-slate-400 uppercase font-semibold">Lifetime Platform Volume</div>
                <div className="font-bold text-white font-display text-sm">${(inspectStore.revenue).toLocaleString()} Volume</div>
                <div className="text-emerald-400 text-[11px]">Clean safety record: 0 airspace violations reported</div>
              </div>
            </div>

            <div className="pt-2 flex justify-end">
              <button
                onClick={() => setInspectStore(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 text-slate-200 font-semibold"
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
