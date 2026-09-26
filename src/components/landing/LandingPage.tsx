import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Navigation,
  ArrowRight,
  Store,
  ShieldCheck,
  Zap,
  MapPin,
  Clock,
  CheckCircle2,
  Package,
  Layers,
  Sparkles,
  ChevronDown,
  ShoppingBag,
  TrendingUp,
  Cpu,
  Radio,
  Lock
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { setRole, setActiveCustomerTab, setActiveSellerTab, stores, products } = useApp();
  const [openFaq, setOpenFaq] = useState<number | null>(0);

  const faqs = [
    {
      q: 'How does drone delivery to a DROZONE Delivery Station work?',
      a: 'After you place an order, your local neighborhood merchant packs it into an aerodynamic, temperature-sealed AeroPod. An electric autonomous drone lifts off from the store rooftop and follows a pre-cleared, low-noise aerial corridor directly to your selected DROZONE Station rooftop, depositing it into a secure contactless locker.'
    },
    {
      q: 'How do I collect my order when it lands?',
      a: 'Once the drone drops off your AeroPod, you receive a notification with a unique 4-digit pickup PIN code. Walk up to the DROZONE Station locker pod, enter your code or scan your phone, and the locker door springs open automatically.'
    },
    {
      q: 'What is the maximum weight and delivery radius?',
      a: 'Each AeroGlide drone carries up to 3.5 kg (ideal for hot bakery items, cold brew, prescription medications, fresh produce, and tech chargers) within an 8-kilometer radius in under 15 minutes.'
    },
    {
      q: 'Is it safe and compliant with aviation regulations?',
      a: 'Yes. Our routing engine integrates real-time geofencing, automatic hospital/heliport no-fly zone avoidance, LiDAR terrain sensing, and quiet acoustic blade technology in full adherence with FAA / civil aviation safety standards.'
    },
    {
      q: 'How do local stores benefit from partnering with DROZONE?',
      a: 'Local merchants bypass traffic gridlock and expensive third-party road delivery fees. By utilizing rooftop pads or designated launchpoints, stores fulfill orders in 12-15 minutes and expand their radius to thousands of nearby residents.'
    }
  ];

  return (
    <div className="space-y-24 animate-in fade-in duration-300">
      
      {/* 1. Hero Section */}
      <section className="relative pt-12 pb-16 overflow-hidden">
        
        {/* Glow ambient background circles */}
        <div className="absolute top-1/4 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-gradient-to-r from-cyan-500/10 via-blue-500/15 to-transparent blur-3xl pointer-events-none rounded-full" />
        
        <div className="relative max-w-5xl mx-auto text-center space-y-6 px-4">
          
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/90 border border-cyan-500/30 text-cyan-300 text-xs font-semibold backdrop-blur-md shadow-xl">
            <span className="flex h-2 w-2 relative">
              <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-cyan-400 opacity-75"></span>
              <span className="relative inline-flex rounded-full h-2 w-2 bg-cyan-500"></span>
            </span>
            <span>Next-Gen Autonomous Sky Corridors Active in Metro Sector 1</span>
          </div>

          <h1 className="text-4xl sm:text-6xl lg:text-7xl font-extrabold text-white font-display tracking-tight leading-[1.08]">
            Your Order. <br />
            <span className="bg-gradient-to-r from-cyan-400 via-sky-300 to-blue-500 bg-clip-text text-transparent">
              From Store to Sky.
            </span>
          </h1>

          <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed">
            Connect with local stores and experience the next generation of fast delivery. 
            Zero-emission aerial logistics from merchant rooftops to automated neighborhood locker pods.
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3.5 pt-4">
            <button
              onClick={() => {
                setRole('customer');
                setActiveCustomerTab('home');
              }}
              className="px-7 py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105"
            >
              <ShoppingBag className="w-4 h-4" />
              Start Shopping
            </button>

            <button
              onClick={() => {
                setRole('seller');
                setActiveSellerTab('dashboard');
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-900/90 hover:bg-slate-800 text-slate-200 border border-slate-700 font-semibold text-sm flex items-center gap-2 transition-colors hover:border-slate-600"
            >
              <Store className="w-4 h-4 text-cyan-400" />
              Become a Seller
            </button>

            <button
              onClick={() => {
                setRole('admin');
              }}
              className="px-6 py-3.5 rounded-xl bg-slate-950 hover:bg-slate-900 text-cyan-400 border border-cyan-800/50 font-semibold text-sm flex items-center gap-2 transition-colors"
            >
              <Navigation className="w-4 h-4" />
              Explore Flight Control
            </button>
          </div>

          {/* Quick stats ticker */}
          <div className="pt-8 grid grid-cols-2 sm:grid-cols-4 gap-4 max-w-3xl mx-auto text-left">
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-white font-display">12-15 min</div>
              <div className="text-xs text-slate-400">Guaranteed Transit</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-cyan-400 font-display">0.0 g CO₂</div>
              <div className="text-xs text-slate-400">100% Electric Flight</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-white font-display">3.5 kg</div>
              <div className="text-xs text-slate-400">Payload Capacity</div>
            </div>
            <div className="p-3.5 rounded-xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <div className="text-xl sm:text-2xl font-extrabold text-emerald-400 font-display">5 Hubs</div>
              <div className="text-xs text-slate-400">Metropolitan Grid</div>
            </div>
          </div>

        </div>

        {/* Hero Visual Marketplace Showcase */}
        <div className="mt-12 max-w-5xl mx-auto px-4">
          <div className="rounded-3xl border border-cyan-500/20 overflow-hidden shadow-2xl bg-gradient-to-br from-slate-900 via-slate-900/90 to-cyan-950/40 p-6 sm:p-8">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 items-center">
              <div className="space-y-3 md:col-span-2">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-cyan-950 text-cyan-300 text-xs font-semibold border border-cyan-700/50">
                  <Zap className="w-3.5 h-3.5 text-cyan-400" />
                  <span>Next-Gen Local Commerce Logistics</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-bold text-white font-display">
                  Local Stores Direct to Rooftop SkyStations
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
                  Browse fresh bakery goods, daily groceries, organic produce, and tech essentials from your favorite neighborhood merchants. Zero traffic delays, delivered via automated electric sky routes in 10-15 minutes.
                </p>
                <div className="pt-2 flex flex-wrap gap-3">
                  <button
                    onClick={() => {
                      setRole('customer');
                      setActiveCustomerTab('home');
                    }}
                    className="px-5 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-105"
                  >
                    <ShoppingBag className="w-4 h-4" />
                    Shop Neighborhood Catalog
                  </button>
                </div>
              </div>
              <div className="grid grid-cols-2 gap-3 text-center">
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-extrabold text-cyan-400 font-display">12 Min</div>
                  <div className="text-[11px] text-slate-400 mt-1">Average Air Transit</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-extrabold text-emerald-400 font-display">100%</div>
                  <div className="text-[11px] text-slate-400 mt-1">Electric & Clean</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-extrabold text-white font-display">5 Hubs</div>
                  <div className="text-[11px] text-slate-400 mt-1">Metro SkyPorts</div>
                </div>
                <div className="p-4 rounded-2xl bg-slate-950/80 border border-slate-800">
                  <div className="text-2xl font-extrabold text-amber-400 font-display">3.5 kg</div>
                  <div className="text-[11px] text-slate-400 mt-1">Max Payload Pod</div>
                </div>
              </div>
            </div>
          </div>
        </div>

      </section>

      {/* 2. How DROZONE Works (4 Steps) */}
      <section className="max-w-6xl mx-auto px-4 space-y-12">
        <div className="text-center space-y-3">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Architecture & Workflow
          </span>
          <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
            How DROZONE Works
          </h2>
          <p className="text-xs sm:text-sm text-slate-400 max-w-xl mx-auto">
            From store shelf to automated skyport locker in 4 seamless stages.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          
          {/* Step 1 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-display text-slate-700 group-hover:text-cyan-400 transition-colors">
                  01
                </span>
                <div className="p-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                  <ShoppingBag className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white font-display">
                ORDER
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                Choose fresh breakfast, daily essentials, or tech parts from verified neighborhood partner stores.
              </p>
            </div>
            <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              Select destination SkyStation <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 2 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-display text-slate-700 group-hover:text-cyan-400 transition-colors">
                  02
                </span>
                <div className="p-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                  <Package className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white font-display">
                PREPARE
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The partner store prepares and packs your items inside a custom thermal-sealed AeroPod on their rooftop.
              </p>
            </div>
            <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              Average packing: 4.8 min <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 3 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-display text-slate-700 group-hover:text-cyan-400 transition-colors">
                  03
                </span>
                <div className="p-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                  <Navigation className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white font-display">
                FLY
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                An autonomous delivery drone transports the package via cleared urban sky corridors to a DROZONE station.
              </p>
            </div>
            <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              Cruise speed: 55 km/h <ArrowRight className="w-3 h-3" />
            </div>
          </div>

          {/* Step 4 */}
          <div className="p-6 rounded-2xl bg-slate-900/70 border border-slate-800 hover:border-cyan-500/40 transition-all flex flex-col justify-between space-y-4 group">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <span className="text-3xl font-extrabold font-display text-slate-700 group-hover:text-cyan-400 transition-colors">
                  04
                </span>
                <div className="p-2.5 rounded-xl bg-slate-950 text-cyan-400 border border-slate-800">
                  <Lock className="w-5 h-5" />
                </div>
              </div>
              <h3 className="text-base font-bold text-white font-display">
                COLLECT
              </h3>
              <p className="text-xs text-slate-400 leading-relaxed">
                The customer receives an instant SMS code and collects their package at the contactless SkyPort locker pod.
              </p>
            </div>
            <div className="text-[11px] text-cyan-400 font-medium flex items-center gap-1">
              Safe 24/7 locker pickup <ArrowRight className="w-3 h-3" />
            </div>
          </div>

        </div>
      </section>

      {/* 3. Local Stores Showcase */}
      <section className="max-w-6xl mx-auto px-4 space-y-8">
        <div className="flex flex-col md:flex-row items-start md:items-end justify-between gap-4">
          <div>
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Local Commerce
            </span>
            <h2 className="text-3xl font-extrabold text-white font-display mt-1">
              Empowering Neighborhood Merchants
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-lg">
              Partnering with neighborhood bakeries, bio-care clinics, grocers, and hardware providers to keep commerce hyper-local.
            </p>
          </div>
          <button
            onClick={() => {
              setRole('customer');
              setActiveCustomerTab('explore');
            }}
            className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-cyan-400 border border-slate-800 font-semibold text-xs flex items-center gap-1.5 transition-colors"
          >
            Explore all stores <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {stores.slice(0, 3).map(store => (
            <div
              key={store.id}
              onClick={() => {
                setRole('customer');
                setActiveCustomerTab('explore');
              }}
              className="glass-card group rounded-2xl overflow-hidden border border-slate-800 bg-slate-900/60 p-5 cursor-pointer space-y-4"
            >
              <div className="relative h-44 rounded-xl overflow-hidden bg-slate-950">
                <img
                  src={store.image}
                  alt={store.storeName}
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-800">
                  {store.category}
                </div>
              </div>

              <div>
                <h3 className="text-base font-bold text-white group-hover:text-cyan-300 transition-colors">
                  {store.storeName}
                </h3>
                <p className="text-xs text-slate-400 mt-1">{store.address}</p>
              </div>

              <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1 text-cyan-400">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>Rooftop Pad #1</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400">
                  <Clock className="w-3.5 h-3.5" />
                  <span>{store.deliveryTimeEst}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 4. Drone Technology & Delivery Stations */}
      <section className="max-w-6xl mx-auto px-4 grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
        
        <div className="space-y-6">
          <div className="space-y-2">
            <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
              Drone Technology & Infrastructure
            </span>
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Smart SkyStations & Autonomous AeroPods
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              DROZONE eliminates the danger of drones landing in private backyards. Drones travel exclusively between commercial rooftop launchpads and dedicated public rooftop SkyPorts.
            </p>
          </div>

          <div className="space-y-3 text-xs text-slate-300">
            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Cpu className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm">LiDAR Precision Descent</div>
                <p className="text-slate-400 mt-0.5">
                  Millimeter-accurate rooftop touchdown pads ensure zero human contact during aerial transit.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Lock className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm">Temperature-Regulated Lockers</div>
                <p className="text-slate-400 mt-0.5">
                  Hot bakery goods stay warm and fresh organic produce stays chilled in smart climate lockers.
                </p>
              </div>
            </div>

            <div className="p-4 rounded-xl bg-slate-900/80 border border-slate-800 flex items-start gap-3">
              <Radio className="w-5 h-5 text-cyan-400 shrink-0 mt-0.5" />
              <div>
                <div className="font-bold text-white text-sm">Acoustic Whispering Corridors</div>
                <p className="text-slate-400 mt-0.5">
                  Specially tuned multi-rotor blades generate under 58 dB, blending seamlessly into ambient city sound.
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Visual Showcase Card */}
        <div className="relative p-6 rounded-3xl bg-slate-900/90 border border-cyan-500/30 shadow-2xl space-y-5">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2">
              <Navigation className="w-5 h-5 text-cyan-400" />
              <span className="font-bold text-white font-display">AeroGlide V4 Heavy Lift Spec</span>
            </div>
            <span className="text-[10px] font-mono text-cyan-400 font-semibold px-2 py-0.5 rounded bg-cyan-950 border border-cyan-800">
              COMMERCIAL SKY RATED
            </span>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Top Velocity</div>
              <div className="text-lg font-bold text-white font-display">65 km/h</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Cruise Altitude</div>
              <div className="text-lg font-bold text-cyan-400 font-display">75 m AGL</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Payload Max</div>
              <div className="text-lg font-bold text-white font-display">3.50 kg</div>
            </div>
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800">
              <div className="text-slate-400 text-[10px] uppercase">Power Source</div>
              <div className="text-lg font-bold text-emerald-400 font-display">Solid-State LiPo</div>
            </div>
          </div>

          <div className="p-4 rounded-xl bg-slate-950/80 border border-slate-800 text-xs text-slate-300 flex items-center justify-between">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>Fleet Telemetry Link: SECURE 5G-UWB</span>
            </div>
            <span className="text-[11px] font-mono text-cyan-400">Pings: 24 ms</span>
          </div>
        </div>

      </section>

      {/* 5. Seller Benefits */}
      <section className="max-w-6xl mx-auto px-4 p-8 rounded-3xl bg-gradient-to-r from-slate-900 via-slate-900 to-cyan-950/50 border border-slate-800 space-y-8">
        <div className="max-w-2xl space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Merchant Economy
          </span>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-white font-display">
            Why Local Merchants Choose DROZONE
          </h2>
          <p className="text-xs sm:text-sm text-slate-300">
            Cut out 30% courier commissions and delivery vehicle congestion. Fulfill orders in minutes with an autonomous aerial pipeline.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 text-xs text-slate-300">
          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <TrendingUp className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">3x Delivery Radius</h3>
            <p className="text-slate-400 leading-relaxed">
              Reach customers up to 8 km away without worrying about traffic jams, bridges, or peak-hour congestion.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <Clock className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Under 15-Minute Speeds</h3>
            <p className="text-slate-400 leading-relaxed">
              Faster deliveries mean happier customers, higher reorder frequency, and fresh food delivered piping hot.
            </p>
          </div>

          <div className="p-5 rounded-2xl bg-slate-950/80 border border-slate-800 space-y-2">
            <CheckCircle2 className="w-6 h-6 text-cyan-400" />
            <h3 className="font-bold text-white text-sm">Zero Fleet Maintenance</h3>
            <p className="text-slate-400 leading-relaxed">
              DROZONE manages the drone fleet, battery charging hubs, and airspace compliance. You simply pack the order.
            </p>
          </div>
        </div>

        <div className="pt-2 flex justify-start">
          <button
            onClick={() => {
              setRole('seller');
              setActiveSellerTab('dashboard');
            }}
            className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm flex items-center gap-2 shadow-lg shadow-cyan-500/20 transition-all"
          >
            Launch Your Merchant Launchpad
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </section>

      {/* 6. FAQ Section */}
      <section className="max-w-4xl mx-auto px-4 space-y-8">
        <div className="text-center space-y-2">
          <span className="text-xs font-bold text-cyan-400 uppercase tracking-widest">
            Common Questions
          </span>
          <h2 className="text-3xl font-extrabold text-white font-display">
            Frequently Asked Questions
          </h2>
        </div>

        <div className="space-y-3">
          {faqs.map((faq, idx) => {
            const isOpen = openFaq === idx;
            return (
              <div
                key={idx}
                className="rounded-2xl border border-slate-800 bg-slate-900/80 overflow-hidden transition-all"
              >
                <button
                  onClick={() => setOpenFaq(isOpen ? null : idx)}
                  className="w-full p-4 sm:p-5 text-left flex items-center justify-between gap-4 text-sm font-bold text-white font-display hover:text-cyan-400 transition-colors"
                >
                  <span>{faq.q}</span>
                  <ChevronDown
                    className={`w-4 h-4 text-slate-400 shrink-0 transition-transform ${
                      isOpen ? 'rotate-180 text-cyan-400' : ''
                    }`}
                  />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 text-xs text-slate-300 leading-relaxed animate-in fade-in">
                    {faq.a}
                  </div>
                )}
              </div>
            );
          })}
        </div>
      </section>

      {/* 7. Call To Action Footer Banner */}
      <section className="max-w-5xl mx-auto px-4 text-center">
        <div className="p-8 sm:p-12 rounded-3xl bg-gradient-to-b from-slate-900 via-slate-900 to-cyan-950/60 border border-cyan-500/30 space-y-5 shadow-2xl relative overflow-hidden">
          <div className="relative z-10 space-y-3 max-w-xl mx-auto">
            <h2 className="text-3xl sm:text-4xl font-extrabold text-white font-display">
              Ready to Experience the Sky?
            </h2>
            <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">
              Order today or join as a partner merchant. Fast, electric, and autonomous local logistics is here.
            </p>
            <div className="pt-4 flex flex-wrap items-center justify-center gap-3">
              <button
                onClick={() => {
                  setRole('customer');
                  setActiveCustomerTab('home');
                }}
                className="px-6 py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-xl shadow-cyan-500/20 transition-all hover:scale-105"
              >
                Start Ordering Now
              </button>
              <button
                onClick={() => {
                  setRole('seller');
                  setActiveSellerTab('dashboard');
                }}
                className="px-6 py-3 rounded-xl bg-slate-900 hover:bg-slate-800 text-white border border-slate-700 font-semibold text-xs sm:text-sm transition-colors"
              >
                Merchant Sign Up
              </button>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};
