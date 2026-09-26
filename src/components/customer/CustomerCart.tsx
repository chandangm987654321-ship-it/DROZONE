import React from 'react';
import { useApp } from '../../context/AppContext';
import {
  ShoppingBag,
  Trash2,
  ArrowRight,
  ShieldCheck,
  Scale,
  Navigation,
  Clock,
  Plus,
  Minus
} from 'lucide-react';

export const CustomerCart: React.FC = () => {
  const {
    cart,
    updateCartQuantity,
    removeFromCart,
    clearCart,
    cartTotal,
    cartWeight,
    setActiveCustomerTab
  } = useApp();

  const deliveryFee = cart.length > 0 ? 2.50 : 0;
  const tax = parseFloat((cartTotal * 0.09).toFixed(2));
  const grandTotal = parseFloat((cartTotal + deliveryFee + tax).toFixed(2));

  // Max payload warning for drone flight
  const MAX_DRONE_PAYLOAD_KG = 3.5;
  const isOverweight = cartWeight > MAX_DRONE_PAYLOAD_KG;

  if (cart.length === 0) {
    return (
      <div className="max-w-xl mx-auto py-16 text-center space-y-4 animate-in fade-in">
        <div className="w-16 h-16 rounded-3xl bg-slate-900 border border-slate-800 text-cyan-400 flex items-center justify-center mx-auto shadow-xl">
          <ShoppingBag className="w-8 h-8" />
        </div>
        <h2 className="text-xl font-bold text-white font-display">
          Your Sky Delivery Bag is Empty
        </h2>
        <p className="text-xs text-slate-400 max-w-sm mx-auto">
          Explore local grocery stores, bakeries, or tech items ready for 15-minute drone dispatch.
        </p>
        <button
          onClick={() => setActiveCustomerTab('explore')}
          className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs shadow-lg shadow-cyan-500/20 transition-all"
        >
          Browse Sky Catalog
        </button>
      </div>
    );
  }

  return (
    <div className="max-w-4xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      {/* Title & Clear */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white font-display">
            Sky Delivery Bag
          </h1>
          <p className="text-xs text-slate-400">
            Review your order before autonomous drone assignment
          </p>
        </div>
        <button
          onClick={clearCart}
          className="text-xs text-slate-400 hover:text-rose-400 flex items-center gap-1 transition-colors"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Clear All
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        
        {/* Cart Items List */}
        <div className="lg:col-span-2 space-y-3">
          {cart.map(item => (
            <div
              key={item.product.id}
              className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-4 backdrop-blur-md"
            >
              <div className="flex items-center gap-3">
                <img
                  src={item.product.image}
                  alt={item.product.name}
                  className="w-16 h-16 rounded-xl object-cover shrink-0 ring-1 ring-slate-800"
                />
                <div className="space-y-0.5">
                  <span className="text-[10px] text-cyan-400 font-medium">
                    {item.product.storeName}
                  </span>
                  <h3 className="text-sm font-semibold text-white leading-snug">
                    {item.product.name}
                  </h3>
                  <div className="text-xs text-slate-400 flex items-center gap-3 pt-0.5">
                    <span>${item.product.price.toFixed(2)} each</span>
                    <span>•</span>
                    <span>{(item.product.weightKg || 0.4)} kg</span>
                  </div>
                </div>
              </div>

              {/* Quantity & Delete */}
              <div className="flex items-center gap-4">
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity - 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Minus className="w-3 h-3" />
                  </button>
                  <span className="w-8 text-center text-xs font-bold text-white">
                    {item.quantity}
                  </span>
                  <button
                    onClick={() => updateCartQuantity(item.product.id, item.quantity + 1)}
                    className="w-7 h-7 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    <Plus className="w-3 h-3" />
                  </button>
                </div>

                <div className="text-right min-w-[70px]">
                  <div className="text-sm font-bold text-white font-display">
                    ${(item.product.price * item.quantity).toFixed(2)}
                  </div>
                  <button
                    onClick={() => removeFromCart(item.product.id)}
                    className="text-[11px] text-rose-400 hover:text-rose-300 mt-1"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))}

          {/* Drone Payload Meter */}
          <div className="p-4 rounded-2xl bg-slate-900/60 border border-slate-800 space-y-2">
            <div className="flex items-center justify-between text-xs">
              <span className="flex items-center gap-1.5 text-slate-300 font-medium">
                <Scale className="w-4 h-4 text-cyan-400" />
                Drone Pod Payload Weight:
              </span>
              <span className={`font-mono font-bold ${isOverweight ? 'text-rose-400' : 'text-cyan-400'}`}>
                {cartWeight} / {MAX_DRONE_PAYLOAD_KG} kg
              </span>
            </div>
            
            <div className="w-full bg-slate-950 h-2 rounded-full overflow-hidden">
              <div
                className={`h-full rounded-full transition-all duration-300 ${
                  isOverweight ? 'bg-rose-500' : 'bg-cyan-500'
                }`}
                style={{ width: `${Math.min(100, (cartWeight / MAX_DRONE_PAYLOAD_KG) * 100)}%` }}
              />
            </div>

            {isOverweight ? (
              <p className="text-[11px] text-rose-400">
                Warning: Drone payload limit exceeded. Please remove some items or place separate orders.
              </p>
            ) : (
              <p className="text-[11px] text-slate-400">
                Optimal weight for single AeroGlide drone transit.
              </p>
            )}
          </div>
        </div>

        {/* Order Summary & Proceed */}
        <div className="p-6 rounded-2xl bg-slate-900 border border-slate-800 space-y-4 h-fit">
          <h2 className="text-base font-bold text-white font-display border-b border-slate-800 pb-3">
            Summary
          </h2>

          <div className="space-y-2.5 text-xs text-slate-300">
            <div className="flex justify-between">
              <span>Subtotal ({cart.reduce((s, i) => s + i.quantity, 0)} items)</span>
              <span className="font-semibold text-white">${cartTotal.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span className="flex items-center gap-1">
                <Navigation className="w-3.5 h-3.5 text-cyan-400" />
                SkyDrone Flight Delivery
              </span>
              <span className="font-semibold text-cyan-400">${deliveryFee.toFixed(2)}</span>
            </div>

            <div className="flex justify-between">
              <span>Est. City Logistics Tax (9%)</span>
              <span className="text-slate-400">${tax.toFixed(2)}</span>
            </div>

            <div className="border-t border-slate-800 pt-3 flex justify-between items-baseline text-sm">
              <span className="font-bold text-white font-display">Total Amount</span>
              <span className="text-xl font-extrabold text-cyan-400 font-display">
                ${grandTotal.toFixed(2)}
              </span>
            </div>
          </div>

          <div className="p-3 rounded-xl bg-slate-950 border border-cyan-500/20 text-[11px] text-slate-300 space-y-1">
            <div className="flex items-center gap-1.5 text-cyan-400 font-semibold">
              <Clock className="w-3.5 h-3.5" />
              <span>Guaranteed Delivery Window: 12-15 Min</span>
            </div>
            <p className="text-slate-400">
              Direct dispatch from store rooftop to automated drop locker upon order confirmation.
            </p>
          </div>

          <button
            disabled={isOverweight}
            onClick={() => setActiveCustomerTab('checkout')}
            className={`w-full py-3.5 rounded-xl font-bold text-xs sm:text-sm flex items-center justify-center gap-2 shadow-lg transition-all ${
              isOverweight
                ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
            }`}
          >
            Proceed to Sky Checkout
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

      </div>

    </div>
  );
};
