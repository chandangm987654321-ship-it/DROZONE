import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  TrendingUp,
  DollarSign,
  Package,
  Clock,
  CheckCircle2,
  Calendar,
  ArrowUpRight,
  Star,
  Navigation
} from 'lucide-react';

export const SellerAnalytics: React.FC = () => {
  const { stores, products, orders } = useApp();
  const currentStore = stores[0];

  const storeOrders = orders.filter(o => o.storeId === currentStore.id);
  const totalRevenue = storeOrders.reduce((sum, o) => sum + o.total, 0) + 12480;
  const completedDeliveries = storeOrders.filter(o => o.status === 'DELIVERED_TO_STATION' || o.status === 'CUSTOMER_PICKUP').length + 328;
  const totalOrderCount = storeOrders.length + 342;

  // Daily revenue data for simulated chart (Mon - Sun)
  const revenueDays = [
    { day: 'Mon', revenue: 1420, orders: 38 },
    { day: 'Tue', revenue: 1680, orders: 44 },
    { day: 'Wed', revenue: 1950, orders: 52 },
    { day: 'Thu', revenue: 1820, orders: 49 },
    { day: 'Fri', revenue: 2340, orders: 68 },
    { day: 'Sat', revenue: 2890, orders: 79 },
    { day: 'Sun', revenue: 2380, orders: 62 },
  ];

  const maxRevenue = Math.max(...revenueDays.map(d => d.revenue));

  const bestSelling = [
    { name: 'Artisan Cold Brew Coffee (4-Pack)', sales: 142, revenue: 1986.58, rating: 4.9 },
    { name: 'Gourmet Sourdough Loaf', sales: 98, revenue: 637.00, rating: 4.8 },
    { name: 'Eco Dish Soap & Sponge Kit', sales: 64, revenue: 592.00, rating: 4.6 },
    { name: 'Organic Almond Milk (1L)', sales: 58, revenue: 283.62, rating: 4.7 },
  ];

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Merchant Performance & Analytics
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Real-time metrics for store sales, autonomous flight deliveries, and prep speed.
        </p>
      </div>

      {/* KPI Stats Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Revenue</span>
            <DollarSign className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-display">
            ${totalRevenue.toLocaleString()}
          </div>
          <div className="text-[10px] text-emerald-400 flex items-center gap-1">
            <TrendingUp className="w-3 h-3" />
            <span>+24.6% past 30 days</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Total Deliveries</span>
            <Package className="w-4 h-4 text-cyan-400" />
          </div>
          <div className="text-2xl font-bold text-white font-display">
            {totalOrderCount}
          </div>
          <div className="text-[10px] text-cyan-400 flex items-center gap-1">
            <Navigation className="w-3 h-3" />
            <span>99.4% Sky Flight Success</span>
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Avg Prep Duration</span>
            <Clock className="w-4 h-4 text-amber-400" />
          </div>
          <div className="text-2xl font-bold text-amber-400 font-display">
            4.8 min
          </div>
          <div className="text-[10px] text-slate-400">
            Target: &lt; 6.0 minutes to launchpad
          </div>
        </div>

        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-2">
          <div className="flex items-center justify-between text-slate-400">
            <span className="text-[11px] uppercase tracking-wider font-semibold">Customer Rating</span>
            <Star className="w-4 h-4 text-amber-400 fill-amber-400" />
          </div>
          <div className="text-2xl font-bold text-white font-display">
            4.9 / 5.0
          </div>
          <div className="text-[10px] text-slate-400">
            From 280+ verified reviews
          </div>
        </div>

      </div>

      {/* Visual Revenue & Flight Volume Chart */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-5">
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white font-display">
              Weekly Sky Revenue & Order Volume
            </h2>
            <p className="text-xs text-slate-400">
              Aggregated daily drone dispatch throughput
            </p>
          </div>
          <span className="px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs text-cyan-400 font-mono">
            Past 7 Days
          </span>
        </div>

        {/* SVG/CSS Bar Chart with glowing tooltips */}
        <div className="pt-4">
          <div className="grid grid-cols-7 gap-2 sm:gap-4 items-end h-56">
            {revenueDays.map(item => {
              const heightPercent = Math.round((item.revenue / maxRevenue) * 100);
              return (
                <div key={item.day} className="flex flex-col items-center gap-2 h-full justify-end group">
                  <div className="opacity-0 group-hover:opacity-100 transition-opacity text-[10px] font-mono text-cyan-300 bg-slate-950 px-2 py-1 rounded border border-cyan-800 whitespace-nowrap shadow-lg">
                    ${item.revenue} ({item.orders} orders)
                  </div>
                  <div className="w-full max-w-[48px] bg-slate-950 rounded-t-xl h-full flex items-end p-1">
                    <div
                      className="w-full rounded-lg bg-gradient-to-t from-blue-600 to-cyan-400 group-hover:from-blue-500 group-hover:to-cyan-300 transition-all duration-300 shadow-md shadow-cyan-500/20"
                      style={{ height: `${heightPercent}%` }}
                    />
                  </div>
                  <span className="text-xs text-slate-400 font-medium group-hover:text-white">
                    {item.day}
                  </span>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Best-Selling Products Table */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
        <h2 className="text-base font-bold text-white font-display">
          Top-Dispatched Products (Sky Catalog)
        </h2>

        <div className="divide-y divide-slate-800 text-xs">
          {bestSelling.map((prod, idx) => (
            <div key={idx} className="py-3 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="w-6 h-6 rounded-lg bg-slate-950 border border-slate-800 text-cyan-400 font-bold flex items-center justify-center text-[11px] font-mono">
                  #{idx + 1}
                </span>
                <div>
                  <div className="font-semibold text-white">{prod.name}</div>
                  <div className="text-[11px] text-slate-400 flex items-center gap-2 mt-0.5">
                    <span>{prod.sales} total dispatches</span>
                    <span>•</span>
                    <span className="text-amber-400 flex items-center gap-0.5">
                      <Star className="w-3 h-3 fill-amber-400" />
                      {prod.rating}
                    </span>
                  </div>
                </div>
              </div>

              <div className="text-right">
                <div className="font-bold text-white font-display text-sm">
                  ${prod.revenue.toLocaleString()}
                </div>
                <div className="text-[10px] text-emerald-400">High Velocity</div>
              </div>
            </div>
          ))}
        </div>
      </div>

    </div>
  );
};
