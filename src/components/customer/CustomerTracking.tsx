import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { OrderStatus } from '../../types';
import { DroneRadarMap } from '../simulation/DroneRadarMap';
import {
  Navigation,
  Clock,
  CheckCircle2,
  Package,
  MapPin,
  Play,
  RotateCcw,
  Sparkles,
  Store,
  ChevronRight,
  ShieldCheck,
  BatteryCharging,
  Gauge,
  PhoneCall,
  Key
} from 'lucide-react';

const TRACKING_STEPS: { status: OrderStatus; label: string; desc: string }[] = [
  { status: 'ORDER_PLACED', label: 'Order Placed', desc: 'Order sent to partner store' },
  { status: 'STORE_ACCEPTED', label: 'Store Accepted', desc: 'Merchant verified and confirmed inventory' },
  { status: 'PACKAGE_PREPARING', label: 'Preparing', desc: 'Packing inside thermal aeropod' },
  { status: 'READY_FOR_DRONE', label: 'Package Ready', desc: 'Staged at store rooftop launchpad' },
  { status: 'DRONE_DISPATCHED', label: 'Drone Dispatched', desc: 'Lifting off into designated airspace' },
  { status: 'DRONE_IN_TRANSIT', label: 'In Sky Transit', desc: 'Cruising along low-noise corridor' },
  { status: 'DELIVERED_TO_STATION', label: 'Delivered to Station', desc: 'Package placed into contactless locker pod' },
  { status: 'CUSTOMER_PICKUP', label: 'Customer Pickup', desc: 'Completed and collected by customer' }
];

export const CustomerTracking: React.FC = () => {
  const {
    orders,
    activeTrackingOrderId,
    setActiveTrackingOrderId,
    advanceOrderSimulationStep,
    dispatchDroneSimulation,
    completeCustomerPickup,
  } = useApp();

  // Find currently active tracked order or fallback to first order
  const order = orders.find(o => o.id === activeTrackingOrderId) || orders[0];

  if (!order) {
    return (
      <div className="text-center py-20 space-y-3">
        <h2 className="text-xl font-bold text-white">No active orders to track</h2>
        <p className="text-xs text-slate-400">Place an order to see live aerial radar tracking.</p>
      </div>
    );
  }

  const currentStepIndex = TRACKING_STEPS.findIndex(s => s.status === order.status);
  const isCompleted = order.status === 'CUSTOMER_PICKUP';
  const isDeliveredToStation = order.status === 'DELIVERED_TO_STATION';
  const isInFlight = order.status === 'DRONE_DISPATCHED' || order.status === 'DRONE_IN_TRANSIT';

  // Simulated pickup PIN code
  const lockerPin = `${order.id.slice(-3)}9`;

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Top Selector & Quick Status Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 p-5 rounded-2xl bg-slate-900/90 border border-slate-800 backdrop-blur-md">
        <div className="space-y-1">
          <div className="flex items-center gap-2">
            <span className="text-xs font-semibold uppercase tracking-wider text-cyan-400">
              SkyFlight Live Tracking
            </span>
            <span className="text-slate-600">•</span>
            <span className="text-xs font-mono text-slate-300">Order ID: #{order.id}</span>
          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-white font-display flex items-center gap-2">
            <span>Status:</span>
            <span className="text-cyan-400">{order.status.replace(/_/g, ' ')}</span>
          </h1>

          <p className="text-xs text-slate-400 flex items-center gap-1.5">
            <Store className="w-3.5 h-3.5 text-slate-400" />
            <span>Store: <strong className="text-white">{order.storeName}</strong></span>
            <span>•</span>
            <MapPin className="w-3.5 h-3.5 text-slate-400" />
            <span>Station: <strong className="text-white">{order.deliveryStationName}</strong></span>
          </p>
        </div>

        {/* Action Controls for Demo Testing */}
        <div className="flex flex-wrap items-center gap-2">
          {/* Order switcher if user has multiple orders */}
          {orders.length > 1 && (
            <select
              value={order.id}
              onChange={e => setActiveTrackingOrderId(e.target.value)}
              className="px-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-slate-200 focus:outline-none"
            >
              {orders.map(o => (
                <option key={o.id} value={o.id}>
                  #{o.id} ({o.status.replace(/_/g, ' ')})
                </option>
              ))}
            </select>
          )}

          {order.status === 'READY_FOR_DRONE' && (
            <button
              onClick={() => dispatchDroneSimulation(order.id)}
              className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-cyan-500/20 transition-all"
            >
              <Play className="w-3.5 h-3.5 fill-current" />
              Dispatch Drone
            </button>
          )}

          {isDeliveredToStation && (
            <button
              onClick={() => completeCustomerPickup(order.id)}
              className="px-4 py-2 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 shadow-md shadow-emerald-500/20 transition-all animate-bounce"
            >
              <CheckCircle2 className="w-3.5 h-3.5" />
              Unlock Locker & Collect Package
            </button>
          )}

          {!isCompleted && !isDeliveredToStation && (
            <button
              onClick={() => advanceOrderSimulationStep(order.id)}
              className="px-3 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-200 border border-slate-700 text-xs flex items-center gap-1.5 transition-colors"
              title="Fast-forward simulation step"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              Advance Step
            </button>
          )}
        </div>
      </div>

      {/* Simulated Map / Tactical Radar Interface */}
      <section className="space-y-2">
        <div className="flex items-center justify-between text-xs text-slate-400 px-1">
          <span className="font-semibold text-white flex items-center gap-1.5">
            <Navigation className="w-4 h-4 text-cyan-400" />
            Simulated Aerial Corridor Radar
          </span>
          <span className="text-[11px] text-cyan-400 font-mono">
            {order.droneId ? `Assigned Drone: ${order.droneId}` : 'Awaiting Drone Allocation'}
          </span>
        </div>

        <DroneRadarMap orderId={order.id} interactive={true} height="h-[380px] sm:h-[420px]" />
      </section>

      {/* Locker Pickup PIN Card (when arrived at station) */}
      {isDeliveredToStation && (
        <div className="p-6 rounded-2xl bg-gradient-to-r from-emerald-950/80 via-slate-900 to-cyan-950/80 border border-emerald-500/40 space-y-4 shadow-2xl animate-in zoom-in-95">
          <div className="flex items-start justify-between">
            <div className="space-y-1">
              <div className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-xs font-bold border border-emerald-500/40">
                <CheckCircle2 className="w-3.5 h-3.5" />
                Package Landed & Secured at Station
              </div>
              <h2 className="text-xl font-bold text-white font-display">
                Ready for Contactless Pickup!
              </h2>
              <p className="text-xs text-slate-300">
                Proceed to <strong>{order.deliveryStationName}</strong>. Type your 4-digit code on the locker keypad.
              </p>
            </div>

            <div className="text-right p-3 rounded-xl bg-slate-950/90 border border-emerald-500/30">
              <div className="text-[10px] text-slate-400 uppercase font-semibold flex items-center gap-1 justify-end">
                <Key className="w-3 h-3 text-emerald-400" />
                Locker PIN Code
              </div>
              <div className="text-2xl font-mono font-extrabold text-emerald-400 tracking-widest mt-0.5">
                {lockerPin}
              </div>
              <div className="text-[10px] text-slate-500">Pod Door #07</div>
            </div>
          </div>

          <div className="flex items-center justify-between pt-2 border-t border-slate-800/80">
            <span className="text-xs text-slate-400">
              Pick up within 24 hours. Temperature-controlled pod active.
            </span>
            <button
              onClick={() => completeCustomerPickup(order.id)}
              className="px-5 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs transition-colors shadow-lg shadow-emerald-500/20"
            >
              I Have Collected the Package
            </button>
          </div>
        </div>
      )}

      {/* 8-Stage Progress Timeline */}
      <div className="p-6 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-6">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <h2 className="text-base font-bold text-white font-display">
            Delivery Lifecycle Progress
          </h2>
          <span className="text-xs font-mono font-bold text-cyan-400">
            {order.progressPercent}% Completed
          </span>
        </div>

        {/* Horizontal Desktop / Vertical Mobile Timeline */}
        <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-8 gap-3">
          {TRACKING_STEPS.map((step, idx) => {
            const isPast = idx < currentStepIndex;
            const isCurrent = idx === currentStepIndex;
            const isFuture = idx > currentStepIndex;

            return (
              <div
                key={step.status}
                className={`p-3 rounded-xl border flex flex-col justify-between transition-all ${
                  isCurrent
                    ? 'bg-cyan-950/60 border-cyan-400 shadow-md shadow-cyan-500/10'
                    : isPast
                    ? 'bg-slate-950/70 border-emerald-500/40 text-slate-300'
                    : 'bg-slate-950/30 border-slate-800/80 text-slate-500 opacity-60'
                }`}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className={`text-[10px] font-bold font-mono ${
                    isCurrent ? 'text-cyan-400' : isPast ? 'text-emerald-400' : 'text-slate-600'
                  }`}>
                    0{idx + 1}
                  </span>
                  {isPast ? (
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  ) : isCurrent ? (
                    <div className="w-2.5 h-2.5 rounded-full bg-cyan-400 animate-ping" />
                  ) : (
                    <div className="w-2 h-2 rounded-full bg-slate-700" />
                  )}
                </div>

                <div>
                  <h4 className={`text-xs font-bold leading-tight ${
                    isCurrent ? 'text-white' : isPast ? 'text-slate-200' : 'text-slate-500'
                  }`}>
                    {step.label}
                  </h4>
                  <p className="text-[10px] text-slate-400 mt-1 line-clamp-2 leading-relaxed">
                    {step.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>

        {/* Current Checkpoint details */}
        <div className="p-4 rounded-xl bg-slate-950 border border-slate-800 flex items-center justify-between gap-4 text-xs">
          <div className="space-y-0.5">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Current Checkpoint</span>
            <p className="font-semibold text-white">
              {order.currentCheckpoint || 'In processing pipeline'}
            </p>
          </div>

          <div className="text-right">
            <span className="text-[10px] uppercase tracking-wider text-slate-400">Est. Flight Duration</span>
            <p className="font-semibold text-cyan-400 font-mono">
              {isCompleted ? 'Delivered' : `${order.estimatedDeliveryMinutes} Minutes`}
            </p>
          </div>
        </div>
      </div>

      {/* Order Package & Item Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        
        {/* Items in order */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <Package className="w-4 h-4 text-cyan-400" />
            <span>Items Inside Drone Pod</span>
          </h3>

          <div className="space-y-2 text-xs">
            {order.items.map((item, idx) => (
              <div key={idx} className="flex items-center justify-between py-1.5 border-b border-slate-800/80 last:border-none">
                <div className="flex items-center gap-2.5">
                  <img
                    src={item.product.image}
                    alt={item.product.name}
                    className="w-9 h-9 rounded-lg object-cover"
                  />
                  <div>
                    <div className="font-semibold text-white">{item.product.name}</div>
                    <div className="text-[10px] text-slate-400">Qty: {item.quantity} • {item.product.weightKg} kg each</div>
                  </div>
                </div>
                <div className="font-semibold text-white">
                  ${(item.price * item.quantity).toFixed(2)}
                </div>
              </div>
            ))}
          </div>

          <div className="pt-2 flex justify-between text-xs font-bold text-white border-t border-slate-800">
            <span>Total Weight & Amount:</span>
            <span className="text-cyan-400">{order.totalWeightKg} kg • ${order.total.toFixed(2)}</span>
          </div>
        </div>

        {/* Destination & Safety Info */}
        <div className="p-5 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Flight Destination & Drop Station</span>
          </h3>

          <div className="text-xs space-y-2 text-slate-300">
            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="font-semibold text-white">{order.deliveryStationName}</div>
              <p className="text-[11px] text-slate-400">Automated Smart Locker Terminal</p>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
              <div className="text-[11px] text-slate-400">Customer Registered Address</div>
              <p className="font-medium text-white">{order.deliveryAddress}</p>
            </div>
          </div>

          <div className="flex items-center gap-1.5 text-[11px] text-slate-400 pt-1">
            <ShieldCheck className="w-4 h-4 text-emerald-400 shrink-0" />
            <span>FAA Class-G simulation profile active. GPS & LiDAR auto-descent enabled.</span>
          </div>
        </div>

      </div>

    </div>
  );
};
