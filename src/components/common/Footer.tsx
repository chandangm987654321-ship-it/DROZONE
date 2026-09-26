import React from 'react';
import { useApp } from '../../context/AppContext';
import { Navigation, ShieldAlert, CheckCircle, Radio, Sparkles } from 'lucide-react';

export const Footer: React.FC = () => {
  const { setRole, setActiveCustomerTab, setActiveSellerTab, setActiveAdminTab } = useApp();

  return (
    <footer className="w-full bg-slate-950 border-t border-slate-900 mt-20 text-slate-400 text-sm">
      {/* Top CTA / Network status bar */}
      <div className="border-b border-slate-900/80 bg-slate-900/40 py-6 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-3 text-left">
            <div className="p-2 rounded-lg bg-cyan-950/60 border border-cyan-800/40 text-cyan-400">
              <Radio className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="font-semibold text-white text-sm flex items-center gap-2">
                Automated SkyCorridor Grid: ONLINE
                <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
              </div>
              <p className="text-xs text-slate-400">
                Simulated flight paths clear • Low-noise acoustic routes active across 5 metropolitan hubs
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 text-xs">
            <button
              onClick={() => {
                setRole('customer');
                setActiveCustomerTab('tracking');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 transition-colors font-medium flex items-center gap-1.5"
            >
              <Navigation className="w-3.5 h-3.5" />
              Test Live Flight Tracking
            </button>
            <button
              onClick={() => {
                setRole('seller');
                setActiveSellerTab('pickup');
              }}
              className="px-3.5 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 transition-colors font-medium"
            >
              Merchant Drone Dispatch
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-12">
          
          {/* Brand Col */}
          <div className="md:col-span-1 space-y-3">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500 flex items-center justify-center text-slate-950 font-bold">
                <Navigation className="w-4 h-4 -rotate-45" />
              </div>
              <span className="text-xl font-bold text-white font-display">
                DRO<span className="text-cyan-400">ZONE</span>
              </span>
            </div>
            <p className="text-xs text-slate-400 leading-relaxed">
              "Your Order. From Store to Sky."
              <br />
              Connecting local merchants to automated delivery stations via clean, electric, zero-emission aerial logistics.
            </p>
            <div className="flex items-center gap-2 text-[11px] text-emerald-400 font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              Zero-Emission Electric Fleet
            </div>
          </div>

          {/* Customer Portal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Customer Experience
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setRole('customer'); setActiveCustomerTab('home'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Nearby Stores & Products
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('customer'); setActiveCustomerTab('explore'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Explore Catalog & Search
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('customer'); setActiveCustomerTab('tracking'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Simulated Radar & Order Tracking
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('customer'); setActiveCustomerTab('orders'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Order History & Reorder
                </button>
              </li>
            </ul>
          </div>

          {/* Seller & Fleet Portal */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Merchant & Fleet Operations
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setRole('seller'); setActiveSellerTab('dashboard'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Merchant Dashboard
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('seller'); setActiveSellerTab('orders'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Order Fulfillment & Packing
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('seller'); setActiveSellerTab('pickup'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Request Rooftop Drone Pickup
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('admin'); setActiveAdminTab('drones'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Drone Fleet Telemetry & Battery
                </button>
              </li>
            </ul>
          </div>

          {/* Admin & Safety */}
          <div>
            <h4 className="text-xs font-bold uppercase tracking-wider text-white mb-3 font-display">
              Control & Compliance
            </h4>
            <ul className="space-y-2 text-xs">
              <li>
                <button
                  onClick={() => { setRole('admin'); setActiveAdminTab('overview'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Airspace Overview & Analytics
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('admin'); setActiveAdminTab('zones'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Delivery Corridors & Geofencing
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('admin'); setActiveAdminTab('stations'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Delivery Station Locker Hubs
                </button>
              </li>
              <li>
                <button
                  onClick={() => { setRole('public'); }}
                  className="hover:text-cyan-400 transition-colors"
                >
                  Safety Architecture & FAQ
                </button>
              </li>
            </ul>
          </div>

        </div>

        {/* Legal & Safety Mandatory Disclaimer Box */}
        <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 text-xs text-slate-400 space-y-2">
          <div className="flex items-center gap-2 text-amber-400 font-semibold">
            <ShieldAlert className="w-4 h-4 shrink-0" />
            <span>Operational Safety & Regulatory Notice</span>
          </div>
          <p className="text-[11px] leading-relaxed text-slate-400">
            Drone delivery operations are subject to applicable aviation, safety, privacy and local regulations. 
            This web application is a software MVP and simulation prototype for architectural demonstration and order lifecycle workflow. 
            It does not send live flight-control commands or release mechanisms to physical aircraft.
          </p>
        </div>

        <div className="mt-8 pt-6 border-t border-slate-900 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-400 gap-4">
          <p>© {new Date().getFullYear()} DROZONE Logistics Inc. All rights reserved.</p>
          <div className="flex items-center gap-4">
            <span className="hover:text-slate-300 cursor-pointer">Aviation Safety Charter</span>
            <span className="hover:text-slate-300 cursor-pointer">Merchant Terms</span>
            <span className="hover:text-slate-300 cursor-pointer">Simulated Telemetry API</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
