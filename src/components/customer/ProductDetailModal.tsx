import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Product } from '../../types';
import { X, Navigation, ShoppingBag, Star, Clock, ShieldCheck, Weight, Store } from 'lucide-react';

export const ProductDetailModal: React.FC = () => {
  const { selectedProductModal, setSelectedProductModal, addToCart } = useApp();
  const [quantity, setQuantity] = useState(1);

  if (!selectedProductModal) return null;

  const product = selectedProductModal;

  const handleAddToCart = () => {
    addToCart(product, quantity);
    setSelectedProductModal(null);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-md animate-in fade-in duration-200">
      <div className="relative w-full max-w-2xl bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-2xl">
        
        {/* Close Button */}
        <button
          onClick={() => setSelectedProductModal(null)}
          className="absolute top-4 right-4 z-10 p-2 rounded-full bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-900 border border-slate-700 transition-colors"
          aria-label="Close details"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* Product Image */}
          <div className="relative h-64 md:h-full bg-slate-950">
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover"
            />
            <div className="absolute top-3 left-3 flex flex-col gap-1.5">
              <span className="px-2.5 py-1 rounded-full text-[10px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-700/60 flex items-center gap-1 backdrop-blur-md">
                <Navigation className="w-3 h-3 text-cyan-400" />
                Drone Delivery Ready
              </span>
              <span className="px-2 py-0.5 rounded text-[10px] font-medium bg-slate-900/80 text-slate-300 border border-slate-700 w-fit">
                {product.category}
              </span>
            </div>
          </div>

          {/* Details Content */}
          <div className="p-6 flex flex-col justify-between space-y-4">
            <div>
              <div className="flex items-center gap-1.5 text-xs text-cyan-400 font-medium mb-1">
                <Store className="w-3.5 h-3.5" />
                <span>{product.storeName}</span>
              </div>

              <h2 className="text-xl font-bold text-white font-display leading-snug">
                {product.name}
              </h2>

              <div className="flex items-center gap-3 mt-2 text-xs text-slate-400">
                <div className="flex items-center text-amber-400 gap-1 font-semibold">
                  <Star className="w-3.5 h-3.5 fill-amber-400" />
                  <span>{product.rating}</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-cyan-400" />
                  <span>12-15 min flight ETA</span>
                </div>
                <span>•</span>
                <div className="flex items-center gap-1 text-slate-300">
                  <Weight className="w-3.5 h-3.5 text-slate-400" />
                  <span>{product.weightKg} kg</span>
                </div>
              </div>

              <p className="mt-4 text-xs text-slate-300 leading-relaxed">
                {product.description}
              </p>

              {/* Drone Specs Box */}
              <div className="mt-4 p-3 rounded-xl bg-slate-950/70 border border-cyan-500/20 text-xs space-y-1.5">
                <div className="flex items-center gap-1.5 text-cyan-400 font-medium">
                  <Navigation className="w-3.5 h-3.5" />
                  <span>DROZONE Flight Corridor Spec</span>
                </div>
                <div className="text-[11px] text-slate-400 grid grid-cols-2 gap-2 pt-1">
                  <div>Max Speed: 60 km/h</div>
                  <div>Flight Cruise Alt: 75m AGL</div>
                  <div>Packaging: AeroPod Therm-Seal</div>
                  <div>Station Drop: Auto-Locker</div>
                </div>
              </div>
            </div>

            {/* Price & Quantity & Actions */}
            <div className="pt-4 border-t border-slate-800 space-y-3">
              <div className="flex items-center justify-between">
                <div>
                  <div className="text-[10px] text-slate-400 uppercase tracking-wider">Unit Price</div>
                  <div className="text-2xl font-bold text-white font-display">
                    ${product.price.toFixed(2)}
                  </div>
                </div>

                {/* Quantity picker */}
                <div className="flex items-center border border-slate-700 rounded-xl bg-slate-950 p-1">
                  <button
                    onClick={() => setQuantity(q => Math.max(1, q - 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    -
                  </button>
                  <span className="w-8 text-center text-sm font-semibold text-white">{quantity}</span>
                  <button
                    onClick={() => setQuantity(q => Math.min(product.stock, q + 1))}
                    className="w-8 h-8 flex items-center justify-center text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
                  >
                    +
                  </button>
                </div>
              </div>

              <button
                onClick={handleAddToCart}
                className="w-full py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-sm flex items-center justify-center gap-2 shadow-lg shadow-cyan-500/20 transition-colors"
              >
                <ShoppingBag className="w-4 h-4" />
                Add {(quantity * product.price).toLocaleString('en-US', { style: 'currency', currency: 'USD' })} to Cart
              </button>
            </div>

          </div>
        </div>

      </div>
    </div>
  );
};
