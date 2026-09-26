import React, { useState, useMemo } from 'react';
import { useApp } from '../../context/AppContext';
import { Product, StoreCategory } from '../../types';
import {
  Search,
  Filter,
  SlidersHorizontal,
  Navigation,
  Clock,
  Star,
  Plus,
  Eye,
  Store as StoreIcon,
  CheckCircle2,
  X
} from 'lucide-react';

const ALL_CATEGORIES: (StoreCategory | 'All')[] = [
  'All',
  'Groceries',
  'Food',
  'Fruits & Vegetables',
  'Stationery',
  'Electronics',
  'Personal Care',
  'Household Essentials'
];

export const CustomerExplore: React.FC = () => {
  const {
    products,
    stores,
    selectedCategory,
    setSelectedCategory,
    addToCart,
    setSelectedProductModal,
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStoreId, setSelectedStoreId] = useState<string>('all');
  const [sortBy, setSortBy] = useState<'recommended' | 'price-asc' | 'price-desc' | 'rating'>('recommended');
  const [inStockOnly, setInStockOnly] = useState(false);

  // Filtered & Sorted products
  const filteredProducts = useMemo(() => {
    return products
      .filter(p => {
        // Category filter
        if (selectedCategory !== 'All' && p.category !== selectedCategory) {
          return false;
        }
        // Store filter
        if (selectedStoreId !== 'all' && p.storeId !== selectedStoreId) {
          return false;
        }
        // In stock filter
        if (inStockOnly && p.stock <= 0) {
          return false;
        }
        // Search query
        if (searchQuery.trim()) {
          const q = searchQuery.toLowerCase();
          const matchName = p.name.toLowerCase().includes(q);
          const matchDesc = p.description.toLowerCase().includes(q);
          const matchStore = p.storeName.toLowerCase().includes(q);
          const matchCat = p.category.toLowerCase().includes(q);
          if (!matchName && !matchDesc && !matchStore && !matchCat) {
            return false;
          }
        }
        return true;
      })
      .sort((a, b) => {
        if (sortBy === 'price-asc') return a.price - b.price;
        if (sortBy === 'price-desc') return b.price - a.price;
        if (sortBy === 'rating') return b.rating - a.rating;
        return (b.isPopular ? 1 : 0) - (a.isPopular ? 1 : 0);
      });
  }, [products, selectedCategory, selectedStoreId, inStockOnly, searchQuery, sortBy]);

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Header & Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Explore Sky Catalog
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Browse items stocked by local merchants eligible for automated drone delivery pods.
        </p>
      </div>

      {/* Search & Filter Toolbar */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 backdrop-blur-md space-y-4">
        
        {/* Search input & Stores filter row */}
        <div className="flex flex-col md:flex-row gap-3">
          <div className="relative flex-1">
            <input
              type="text"
              placeholder="Search products by title, category, or ingredients..."
              value={searchQuery}
              onChange={e => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-10 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-sm text-white placeholder-slate-500 focus:outline-none focus:border-cyan-500 transition-colors"
            />
            <Search className="w-4 h-4 text-slate-400 absolute left-3.5 top-3" />
            {searchQuery && (
              <button
                onClick={() => setSearchQuery('')}
                className="absolute right-3.5 top-3 text-slate-400 hover:text-white"
              >
                <X className="w-4 h-4" />
              </button>
            )}
          </div>

          {/* Store selector dropdown */}
          <div className="w-full md:w-60">
            <select
              value={selectedStoreId}
              onChange={e => setSelectedStoreId(e.target.value)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="all">All Partner Stores</option>
              {stores.map(s => (
                <option key={s.id} value={s.id}>
                  {s.storeName}
                </option>
              ))}
            </select>
          </div>

          {/* Sort selector */}
          <div className="w-full md:w-52">
            <select
              value={sortBy}
              onChange={e => setSortBy(e.target.value as any)}
              className="w-full px-3 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500 cursor-pointer"
            >
              <option value="recommended">Featured / Popular</option>
              <option value="price-asc">Price: Low to High</option>
              <option value="price-desc">Price: High to Low</option>
              <option value="rating">Highest Rated</option>
            </select>
          </div>
        </div>

        {/* Category Horizontal Filter Pills */}
        <div className="flex items-center gap-2 overflow-x-auto pb-1 scrollbar-none">
          {ALL_CATEGORIES.map(cat => (
            <button
              key={cat}
              onClick={() => setSelectedCategory(cat)}
              className={`px-3.5 py-1.5 rounded-xl text-xs font-medium whitespace-nowrap transition-all ${
                selectedCategory === cat
                  ? 'bg-cyan-500 text-slate-950 font-bold shadow-md shadow-cyan-500/20'
                  : 'bg-slate-950/70 text-slate-300 hover:text-white hover:bg-slate-800 border border-slate-800'
              }`}
            >
              {cat}
            </button>
          ))}
        </div>

        {/* In-Stock Only checkbox */}
        <div className="flex items-center justify-between text-xs text-slate-400 pt-1 border-t border-slate-800/80">
          <label className="flex items-center gap-2 cursor-pointer">
            <input
              type="checkbox"
              checked={inStockOnly}
              onChange={e => setInStockOnly(e.target.checked)}
              className="w-4 h-4 rounded text-cyan-500 bg-slate-950 border-slate-700 focus:ring-0 focus:ring-offset-0"
            />
            <span>Show In-Stock items only</span>
          </label>

          <span className="text-slate-400">
            Showing <strong className="text-white">{filteredProducts.length}</strong> items
          </span>
        </div>
      </div>

      {/* Products Grid */}
      {filteredProducts.length === 0 ? (
        <div className="text-center py-16 p-8 rounded-2xl bg-slate-900/40 border border-slate-800 space-y-3">
          <div className="w-12 h-12 rounded-full bg-slate-800 text-slate-400 flex items-center justify-center mx-auto">
            <Search className="w-6 h-6" />
          </div>
          <h3 className="text-base font-semibold text-white">No products found</h3>
          <p className="text-xs text-slate-400 max-w-sm mx-auto">
            Try adjusting your search query, selecting another category, or resetting filters.
          </p>
          <button
            onClick={() => {
              setSearchQuery('');
              setSelectedCategory('All');
              setSelectedStoreId('all');
              setInStockOnly(false);
            }}
            className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold"
          >
            Reset Filters
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
          {filteredProducts.map(product => {
            const isOutOfStock = product.stock <= 0;

            return (
              <div
                key={product.id}
                className="glass-card group rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 bg-slate-900/60 p-3 flex flex-col justify-between"
              >
                <div>
                  {/* Product Image */}
                  <div
                    onClick={() => setSelectedProductModal(product)}
                    className="relative h-44 rounded-xl overflow-hidden bg-slate-950 cursor-pointer"
                  >
                    <img
                      src={product.image}
                      alt={product.name}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                    />

                    {/* Drone Delivery Ready Badge */}
                    <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-600/60 backdrop-blur-md">
                      <Navigation className="w-3 h-3 text-cyan-400" />
                      Drone Ready
                    </div>

                    {/* Stock Status Badge */}
                    {isOutOfStock ? (
                      <div className="absolute top-2 right-2 px-2 py-0.5 rounded text-[10px] font-bold bg-rose-950/90 text-rose-300 border border-rose-800">
                        Out of Stock
                      </div>
                    ) : (
                      <div className="absolute bottom-2 right-2 px-2 py-0.5 rounded text-[10px] font-medium bg-slate-950/80 text-slate-300 backdrop-blur-md flex items-center gap-1">
                        <Clock className="w-3 h-3 text-cyan-400" />
                        12-15 min
                      </div>
                    )}
                  </div>

                  {/* Info */}
                  <div className="mt-3 space-y-1">
                    <div className="flex items-center justify-between text-[11px] text-slate-400">
                      <span className="truncate flex items-center gap-1 text-cyan-400 font-medium">
                        <StoreIcon className="w-3 h-3" />
                        {product.storeName}
                      </span>
                      <span className="flex items-center gap-0.5 text-amber-400 font-semibold">
                        <Star className="w-3 h-3 fill-amber-400" />
                        {product.rating}
                      </span>
                    </div>

                    <h3
                      onClick={() => setSelectedProductModal(product)}
                      className="text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
                    >
                      {product.name}
                    </h3>
                    
                    <p className="text-xs text-slate-400 line-clamp-2 leading-relaxed">
                      {product.description}
                    </p>
                  </div>
                </div>

                {/* Footer / Actions */}
                <div className="mt-4 pt-3 border-t border-slate-800 flex items-center justify-between">
                  <div>
                    <div className="text-[10px] text-slate-400 uppercase">Unit Price</div>
                    <div className="text-base font-bold text-white font-display">
                      ${product.price.toFixed(2)}
                    </div>
                  </div>

                  <div className="flex items-center gap-1.5">
                    <button
                      onClick={() => setSelectedProductModal(product)}
                      className="p-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white transition-colors"
                      title="View details"
                    >
                      <Eye className="w-4 h-4" />
                    </button>
                    <button
                      disabled={isOutOfStock}
                      onClick={() => addToCart(product, 1)}
                      className={`px-3 py-2 rounded-xl font-bold text-xs flex items-center gap-1.5 transition-colors shadow-md ${
                        isOutOfStock
                          ? 'bg-slate-800 text-slate-500 cursor-not-allowed'
                          : 'bg-cyan-500 hover:bg-cyan-400 text-slate-950 shadow-cyan-500/20'
                      }`}
                    >
                      <Plus className="w-4 h-4" />
                      Add
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
