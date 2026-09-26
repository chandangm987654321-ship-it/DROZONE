import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  MapPin,
  CreditCard,
  Navigation,
  ShieldCheck,
  CheckCircle2,
  Clock,
  ArrowRight,
  Sparkles,
  Lock
} from 'lucide-react';

export const CustomerCheckout: React.FC = () => {
  const {
    cart,
    cartTotal,
    cartWeight,
    currentUser,
    deliveryStations,
    placeOrder,
    setActiveCustomerTab
  } = useApp();

  const [selectedStationId, setSelectedStationId] = useState(deliveryStations[0]?.id || 'station_01');
  const [deliveryAddress, setDeliveryAddress] = useState(currentUser.address);
  const [paymentMethod, setPaymentMethod] = useState<'drozone_pay' | 'card' | 'apple_pay'>('drozone_pay');
  const [isProcessing, setIsProcessing] = useState(false);

  const deliveryFee = 2.50;
  const tax = parseFloat((cartTotal * 0.09).toFixed(2));
  const grandTotal = parseFloat((cartTotal + deliveryFee + tax).toFixed(2));

  const currentStation = deliveryStations.find(s => s.id === selectedStationId) || deliveryStations[0];

  const handleConfirmOrder = (e: React.FormEvent) => {
    e.preventDefault();
    if (cart.length === 0) return;

    setIsProcessing(true);

    // Simulate instant secure payment processing
    setTimeout(() => {
      placeOrder(selectedStationId, deliveryAddress);
      setIsProcessing(false);
    }, 1200);
  };

  if (cart.length === 0) {
    return (
      <div className="max-w-md mx-auto py-16 text-center space-y-3">
        <h2 className="text-xl font-bold text-white">Cart is empty</h2>
        <button
          onClick={() => setActiveCustomerTab('explore')}
          className="px-4 py-2 bg-cyan-500 text-slate-950 font-bold rounded-xl text-xs"
        >
          Return to Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Sky Checkout & Dispatch
        </h1>
        <p className="text-xs text-slate-400">
          Confirm your destination SkyPort station and simulated payment authorization.
        </p>
      </div>

      <form onSubmit={handleConfirmOrder} className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Left Form Column */}
        <div className="lg:col-span-2 space-y-5">
          
          {/* Section 1: Delivery Station Selection */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-4">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
              <Navigation className="w-4 h-4 text-cyan-400" />
              <span>Select Destination DROZONE SkyPort Station</span>
            </div>
            <p className="text-xs text-slate-400">
              Drones land autonomously on the rooftop pad and deposit your package directly into a secure contactless locker pod.
            </p>

            <div className="grid grid-cols-1 gap-2.5">
              {deliveryStations.map(station => {
                const isSelected = selectedStationId === station.id;
                return (
                  <div
                    key={station.id}
                    onClick={() => setSelectedStationId(station.id)}
                    className={`p-3.5 rounded-xl border cursor-pointer transition-all flex items-start justify-between ${
                      isSelected
                        ? 'border-cyan-500 bg-cyan-950/40 shadow-md'
                        : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                    }`}
                  >
                    <div className="space-y-1">
                      <div className="flex items-center gap-2">
                        <span className="text-xs font-bold text-white">
                          {station.name}
                        </span>
                        <span className="px-1.5 py-0.5 rounded text-[10px] font-semibold bg-emerald-950 text-emerald-300 border border-emerald-800">
                          {station.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-slate-400">{station.address}</p>
                      <div className="text-[10px] text-cyan-400 font-mono">
                        Available Pods: {station.availablePods} / {station.capacity}
                      </div>
                    </div>

                    <div className={`w-4 h-4 rounded-full border flex items-center justify-center mt-1 ${
                      isSelected ? 'border-cyan-400 bg-cyan-400' : 'border-slate-600'
                    }`}>
                      {isSelected && <div className="w-1.5 h-1.5 rounded-full bg-slate-950" />}
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

          {/* Section 2: Address confirmation */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
              <MapPin className="w-4 h-4 text-cyan-400" />
              <span>Customer Contact & Pickup Address</span>
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">
                Your Street Address (For SMS Pickup Verification)
              </label>
              <input
                type="text"
                value={deliveryAddress}
                onChange={e => setDeliveryAddress(e.target.value)}
                required
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="grid grid-cols-2 gap-3 pt-1">
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Name</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.name}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300"
                />
              </div>
              <div>
                <label className="text-[11px] text-slate-400 block mb-1">Phone (SMS Locker PIN)</label>
                <input
                  type="text"
                  disabled
                  value={currentUser.phone}
                  className="w-full px-3 py-2 rounded-xl bg-slate-950/60 border border-slate-800 text-xs text-slate-300"
                />
              </div>
            </div>
          </div>

          {/* Section 3: Simulated Payment Method */}
          <div className="p-5 rounded-2xl bg-slate-900/90 border border-slate-800 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2 text-sm font-bold text-white font-display">
                <CreditCard className="w-4 h-4 text-cyan-400" />
                <span>Simulated Payment Method</span>
              </div>
              <span className="text-[10px] text-emerald-400 font-semibold bg-emerald-950/80 px-2 py-0.5 rounded border border-emerald-800">
                Demo Mode (No Real Charges)
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              
              <button
                type="button"
                onClick={() => setPaymentMethod('drozone_pay')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'drozone_pay'
                    ? 'border-cyan-500 bg-cyan-950/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white">DROZONE Pay</span>
                  <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-2">Instant 1-Click Sky authorization</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('card')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'card'
                    ? 'border-cyan-500 bg-cyan-950/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white">Credit / Debit</span>
                  <CreditCard className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-2">Visa / Mastercard / Amex</div>
              </button>

              <button
                type="button"
                onClick={() => setPaymentMethod('apple_pay')}
                className={`p-3 rounded-xl border text-left flex flex-col justify-between transition-all ${
                  paymentMethod === 'apple_pay'
                    ? 'border-cyan-500 bg-cyan-950/50'
                    : 'border-slate-800 bg-slate-950/60 hover:border-slate-700'
                }`}
              >
                <div className="flex items-center justify-between w-full">
                  <span className="text-xs font-bold text-white">Digital Wallet</span>
                  <Lock className="w-3.5 h-3.5 text-slate-400" />
                </div>
                <div className="text-[11px] text-slate-400 mt-2">Apple Pay / Google Wallet</div>
              </button>

            </div>
          </div>

        </div>

        {/* Right Summary Column */}
        <div className="space-y-4">
          <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4">
            <h2 className="text-base font-bold text-white font-display border-b border-slate-800 pb-3">
              Order Breakdown
            </h2>

            {/* Items summary */}
            <div className="space-y-2 max-h-48 overflow-y-auto pr-1 text-xs">
              {cart.map(item => (
                <div key={item.product.id} className="flex justify-between text-slate-300">
                  <span className="truncate max-w-[170px]">
                    {item.quantity}x {item.product.name}
                  </span>
                  <span className="font-semibold text-white">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </span>
                </div>
              ))}
            </div>

            <div className="border-t border-slate-800 pt-3 space-y-2 text-xs text-slate-300">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span>${cartTotal.toFixed(2)}</span>
              </div>
              <div className="flex justify-between text-cyan-400">
                <span>Drone Flight Dispatch</span>
                <span>${deliveryFee.toFixed(2)}</span>
              </div>
              <div className="flex justify-between">
                <span>Municipal Clean Air Tax</span>
                <span>${tax.toFixed(2)}</span>
              </div>
              <div className="border-t border-slate-800 pt-2 flex justify-between text-base font-bold text-white font-display">
                <span>Total</span>
                <span className="text-cyan-400">${grandTotal.toFixed(2)}</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 text-[11px] text-slate-400 space-y-1">
              <div className="text-cyan-300 font-semibold flex items-center gap-1">
                <Clock className="w-3.5 h-3.5" />
                <span>Estimated Arrival: ~12-15 Mins</span>
              </div>
              <p>Destination: {currentStation.name}</p>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-3.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-all hover:scale-[1.01]"
            >
              {isProcessing ? (
                <div className="flex items-center gap-2">
                  <div className="w-4 h-4 border-2 border-slate-950 border-t-transparent rounded-full animate-spin" />
                  <span>Authorizing Sky Delivery...</span>
                </div>
              ) : (
                <>
                  <span>Confirm Order & Dispatch Drone</span>
                  <ArrowRight className="w-4 h-4" />
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-1.5 text-[10px] text-slate-500 text-center">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
              <span>Simulated Prototype • Instant Workflow Execution</span>
            </div>
          </div>
        </div>

      </form>

    </div>
  );
};
