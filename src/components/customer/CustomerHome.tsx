import React, { useState, useEffect } from 'react';
import { useApp } from '../../context/AppContext';
import { StoreCategory, Product } from '../../types';
import {
  Search,
  MapPin,
  Clock,
  Star,
  Plus,
  Minus,
  ArrowRight,
  Zap,
  ShoppingBag,
  CheckCircle,
  Eye,
  Store as StoreIcon,
  ChevronLeft,
  ChevronRight,
  ShieldCheck,
  TrendingUp,
  Percent,
  Sparkles,
  Navigation,
  Lock,
  Leaf
} from 'lucide-react';

interface CategoryItem {
  id: string;
  label: StoreCategory | 'All' | 'Sky Express';
  name: string;
  icon: string;
  image: string;
  color: string;
}

const FLIPKART_CATEGORIES: CategoryItem[] = [
  {
    id: 'cat_all',
    label: 'All',
    name: 'All Items',
    icon: '⚡',
    image: 'https://images.unsplash.com/photo-1526304640581-d334cdbbf45e?auto=format&fit=crop&w=200&q=80',
    color: 'from-cyan-500 to-blue-600'
  },
  {
    id: 'cat_grocery',
    label: 'Groceries',
    name: 'Grocery',
    icon: '🥛',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=200&q=80',
    color: 'from-emerald-500 to-teal-600'
  },
  {
    id: 'cat_tech',
    label: 'Electronics',
    name: 'Mobiles & Tech',
    icon: '📱',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=200&q=80',
    color: 'from-blue-500 to-indigo-600'
  },
  {
    id: 'cat_food',
    label: 'Food',
    name: 'Bakery & Food',
    icon: '🥐',
    image: 'https://images.unsplash.com/photo-1555507036-ab1f4038808a?auto=format&fit=crop&w=200&q=80',
    color: 'from-amber-500 to-orange-600'
  },
  {
    id: 'cat_fruits',
    label: 'Fruits & Vegetables',
    name: 'Fresh Produce',
    icon: '🍎',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=200&q=80',
    color: 'from-red-500 to-rose-600'
  },
  {
    id: 'cat_care',
    label: 'Personal Care',
    name: 'Personal Care',
    icon: '🧴',
    image: 'https://images.unsplash.com/photo-1556228720-195a672e8a03?auto=format&fit=crop&w=200&q=80',
    color: 'from-pink-500 to-purple-600'
  },
  {
    id: 'cat_home',
    label: 'Household Essentials',
    name: 'Home Essentials',
    icon: '🏠',
    image: 'https://images.unsplash.com/photo-1585421514738-01798e348b17?auto=format&fit=crop&w=200&q=80',
    color: 'from-teal-500 to-emerald-600'
  },
  {
    id: 'cat_stationery',
    label: 'Stationery',
    name: 'Stationery',
    icon: '✏️',
    image: 'https://images.unsplash.com/photo-1583485088034-697b5bc54ccd?auto=format&fit=crop&w=200&q=80',
    color: 'from-violet-500 to-purple-600'
  },
  {
    id: 'cat_express',
    label: 'All',
    name: 'Sky Express 12m',
    icon: '🚀',
    image: 'https://images.unsplash.com/photo-1508614589041-895b88991e3e?auto=format&fit=crop&w=200&q=80',
    color: 'from-cyan-400 to-sky-600'
  }
];

interface HeroBanner {
  id: string;
  badge: string;
  title: string;
  highlight: string;
  description: string;
  ctaText: string;
  category: StoreCategory | 'All';
  bgGradient: string;
  image: string;
  badgeColor: string;
}

const HERO_BANNERS: HeroBanner[] = [
  {
    id: 'banner_1',
    badge: 'MEGA SKY DEALS • UP TO 45% OFF',
    title: 'Daily Essentials & Groceries',
    highlight: 'Delivered in 12-15 Mins.',
    description: 'Fresh organic groceries, cold brew coffee & pantry staples dispatched from local stores directly to your nearby rooftop SkyPort.',
    ctaText: 'Shop Groceries',
    category: 'Groceries',
    bgGradient: 'from-slate-900 via-sky-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1542838132-92c53300491e?auto=format&fit=crop&w=1000&q=80',
    badgeColor: 'bg-cyan-500/20 text-cyan-300 border-cyan-500/40'
  },
  {
    id: 'banner_2',
    badge: 'TECH EMERGENCY AIR DROP',
    title: 'GaN Chargers & Gadgets',
    highlight: 'Airborne in Under 10 Mins.',
    description: 'Dead phone battery or forgotten cable? Order high-speed GaN chargers, braided cables and wireless audio from Silicon Pier labs.',
    ctaText: 'Explore Tech Deals',
    category: 'Electronics',
    bgGradient: 'from-slate-900 via-blue-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1550009158-9ebf69173e03?auto=format&fit=crop&w=1000&q=80',
    badgeColor: 'bg-blue-500/20 text-blue-300 border-blue-500/40'
  },
  {
    id: 'banner_3',
    badge: 'FRESH OVEN TO SKYPORT',
    title: 'Warm Artisan Croissants',
    highlight: 'Crisp & Warm in AeroPods.',
    description: 'Flaky Normandy butter croissants and sourdough baked this morning, transported in heated thermal drone capsules.',
    ctaText: 'Order Bakery Treats',
    category: 'Food',
    bgGradient: 'from-slate-900 via-amber-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1509440159596-0249088772ff?auto=format&fit=crop&w=1000&q=80',
    badgeColor: 'bg-amber-500/20 text-amber-300 border-amber-500/40'
  },
  {
    id: 'banner_4',
    badge: '100% ORGANIC LOCAL ORCHARD',
    title: 'Farm Fresh Fruits & Veg',
    highlight: 'Zero Preservatives Guaranteed.',
    description: 'Crisp Honeycrisp apples, ripe Hass avocados and organic leafy greens harvested this dawn from GreenLeaf Orchard.',
    ctaText: 'Grab Fresh Produce',
    category: 'Fruits & Vegetables',
    bgGradient: 'from-slate-900 via-emerald-950/80 to-slate-900',
    image: 'https://images.unsplash.com/photo-1610832958506-aa56368176cf?auto=format&fit=crop&w=1000&q=80',
    badgeColor: 'bg-emerald-500/20 text-emerald-300 border-emerald-500/40'
  }
];

export const CustomerHome: React.FC = () => {
  const {
    stores,
    products,
    deliveryStations,
    currentUser,
    orders,
    cart,
    addToCart,
    updateCartQuantity,
    setSelectedProductModal,
    setActiveCustomerTab,
    setSelectedCategory,
    setActiveTrackingOrderId
  } = useApp();

  const [searchQuery, setSearchQuery] = useState('');
  const [selectedStationId, setSelectedStationId] = useState(deliveryStations[0]?.id || 'station_01');
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  // Countdown timer for Deals of the Day (Flipkart style)
  const [timeLeft, setTimeLeft] = useState({ hours: 4, minutes: 28, seconds: 45 });

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft(prev => {
        if (prev.seconds > 0) {
          return { ...prev, seconds: prev.seconds - 1 };
        } else if (prev.minutes > 0) {
          return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
        } else if (prev.hours > 0) {
          return { hours: prev.hours - 1, minutes: 59, seconds: 59 };
        }
        return { hours: 6, minutes: 0, seconds: 0 };
      });
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Carousel auto-rotate
  useEffect(() => {
    if (isPaused) return;
    const interval = setInterval(() => {
      setCurrentSlide(prev => (prev + 1) % HERO_BANNERS.length);
    }, 4500);
    return () => clearInterval(interval);
  }, [isPaused]);

  const activeOrders = orders.filter(o => o.status !== 'CUSTOMER_PICKUP');

  // Filtered product groups for Flipkart-style deal rows
  const dealsOfTheDay = products.slice(0, 6);
  const electronicsProducts = products.filter(p => p.category === 'Electronics').slice(0, 4);
  const groceryAndFoodProducts = products.filter(p => p.category === 'Groceries' || p.category === 'Food').slice(0, 4);
  const organicFreshProducts = products.filter(p => p.category === 'Fruits & Vegetables' || p.category === 'Personal Care').slice(0, 4);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      setSelectedCategory('All');
      setActiveCustomerTab('explore');
    }
  };

  const handleCategoryClick = (cat: StoreCategory | 'All' | 'Sky Express') => {
    if (cat === 'Sky Express') {
      setSelectedCategory('All');
    } else {
      setSelectedCategory(cat);
    }
    setActiveCustomerTab('explore');
  };

  const getCartQuantity = (productId: string) => {
    const item = cart.find(i => i.product.id === productId);
    return item ? item.quantity : 0;
  };

  // Helper to render Flipkart-style Product Card
  const renderProductCard = (product: Product, discountPercent: number = 25) => {
    const qty = getCartQuantity(product.id);
    const originalPrice = (product.price * (1 + discountPercent / 100)).toFixed(2);

    return (
      <div
        key={product.id}
        className="group relative rounded-2xl bg-slate-900/80 border border-slate-800 hover:border-cyan-500/50 hover:shadow-xl hover:shadow-cyan-500/10 transition-all duration-200 flex flex-col justify-between overflow-hidden p-3"
      >
        <div>
          {/* Image & Discount Badge */}
          <div className="relative aspect-square w-full rounded-xl overflow-hidden bg-slate-950 cursor-pointer" onClick={() => setSelectedProductModal(product)}>
            <img
              src={product.image}
              alt={product.name}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
            />

            {/* Discount Badge */}
            <div className="absolute top-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-full text-[10px] font-bold bg-emerald-500 text-slate-950 shadow-md">
              <Percent className="w-2.5 h-2.5" />
              <span>{discountPercent}% OFF</span>
            </div>

            {/* Drone Delivery Badge */}
            <div className="absolute bottom-2 left-2 flex items-center gap-1 px-2 py-0.5 rounded-md text-[10px] font-semibold bg-slate-950/90 text-cyan-400 border border-cyan-500/40 backdrop-blur-md">
              <Zap className="w-2.5 h-2.5 text-cyan-400" />
              <span>12m Sky Express</span>
            </div>

            {/* Quick View Button */}
            <button
              onClick={(e) => {
                e.stopPropagation();
                setSelectedProductModal(product);
              }}
              className="absolute top-2 right-2 p-1.5 rounded-lg bg-slate-950/80 hover:bg-slate-900 text-slate-300 hover:text-white border border-slate-800 transition-colors opacity-0 group-hover:opacity-100"
              title="Quick View"
            >
              <Eye className="w-3.5 h-3.5" />
            </button>
          </div>

          {/* Product Info */}
          <div className="mt-3 space-y-1">
            <div className="text-[11px] font-medium text-cyan-400 truncate flex items-center gap-1">
              <StoreIcon className="w-3 h-3 text-cyan-400" />
              <span>{product.storeName}</span>
            </div>

            <h3
              onClick={() => setSelectedProductModal(product)}
              className="text-xs sm:text-sm font-semibold text-white group-hover:text-cyan-300 transition-colors line-clamp-1 cursor-pointer"
              title={product.name}
            >
              {product.name}
            </h3>

            {/* Rating */}
            <div className="flex items-center gap-1.5 pt-0.5">
              <div className="flex items-center gap-0.5 px-1.5 py-0.2 rounded bg-emerald-950 text-emerald-300 border border-emerald-800/80 text-[10px] font-bold">
                <span>{product.rating || '4.8'}</span>
                <Star className="w-2.5 h-2.5 fill-emerald-300 text-emerald-300" />
              </div>
              <span className="text-[10px] text-slate-400">({product.stock} in stock)</span>
            </div>
          </div>
        </div>

        {/* Pricing & Add to Cart */}
        <div className="mt-3 pt-2.5 border-t border-slate-800/80 flex items-center justify-between">
          <div>
            <div className="flex items-baseline gap-1.5">
              <span className="text-sm sm:text-base font-bold text-white font-display">
                ${product.price.toFixed(2)}
              </span>
              <span className="text-[11px] text-slate-500 line-through">
                ${originalPrice}
              </span>
            </div>
            <div className="text-[9px] text-cyan-400 font-medium">
              Free Sky Delivery
            </div>
          </div>

          {qty === 0 ? (
            <button
              onClick={() => addToCart(product, 1)}
              className="px-3 py-1.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1 shadow-md shadow-cyan-500/20 transition-all hover:scale-105 active:scale-95"
            >
              <Plus className="w-3.5 h-3.5" />
              <span>Add</span>
            </button>
          ) : (
            <div className="flex items-center bg-slate-950 border border-cyan-500/40 rounded-xl overflow-hidden">
              <button
                onClick={() => updateCartQuantity(product.id, qty - 1)}
                className="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Decrease"
              >
                <Minus className="w-3 h-3" />
              </button>
              <span className="px-2 text-xs font-bold text-cyan-400">
                {qty}
              </span>
              <button
                onClick={() => updateCartQuantity(product.id, qty + 1)}
                className="px-2 py-1 text-slate-300 hover:text-white hover:bg-slate-800 transition-colors"
                title="Increase"
              >
                <Plus className="w-3 h-3" />
              </button>
            </div>
          )}
        </div>
      </div>
    );
  };

  return (
    <div className="space-y-6 pb-12 animate-in fade-in duration-300">
      
      {/* 1. TOP FLIPKART-STYLE SEARCH & LOCATION STRIP */}
      <div className="p-3.5 sm:p-4 rounded-2xl bg-slate-900/90 border border-slate-800 shadow-xl backdrop-blur-md flex flex-col md:flex-row items-center justify-between gap-3">
        
        {/* Delivery Station Location Picker */}
        <div className="flex items-center gap-3 w-full md:w-auto">
          <div className="w-10 h-10 rounded-xl bg-cyan-950 border border-cyan-700/60 flex items-center justify-center text-cyan-400 shrink-0">
            <MapPin className="w-5 h-5 text-cyan-400 animate-bounce" />
          </div>
          <div className="min-w-0">
            <div className="text-[10px] text-slate-400 uppercase tracking-wider font-semibold">
              Delivering to SkyStation Pod
            </div>
            <select
              value={selectedStationId}
              onChange={e => setSelectedStationId(e.target.value)}
              className="bg-transparent text-xs sm:text-sm font-bold text-white focus:outline-none cursor-pointer border-none p-0 pr-6 truncate"
            >
              {deliveryStations.map(station => (
                <option key={station.id} value={station.id} className="bg-slate-900 text-white">
                  {station.name} • {station.availablePods} lockers free
                </option>
              ))}
            </select>
          </div>
        </div>

        {/* Global Search Bar (Flipkart Style) */}
        <form onSubmit={handleSearchSubmit} className="w-full md:max-w-xl relative flex-1">
          <input
            type="text"
            placeholder="Search for groceries, cold brew, GaN chargers, bakery & 200+ local products..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-24 py-2.5 rounded-xl bg-slate-950 border border-slate-700/80 text-sm text-white placeholder-slate-400 focus:outline-none focus:border-cyan-500 shadow-inner transition-colors"
          />
          <Search className="w-4 h-4 text-cyan-400 absolute left-3.5 top-3" />
          <button
            type="submit"
            className="absolute right-1.5 top-1.5 px-3 py-1.5 rounded-lg bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs transition-colors"
          >
            Search
          </button>
        </form>

        {/* Speed Guarantee Badge */}
        <div className="hidden lg:flex items-center gap-2 px-3 py-2 rounded-xl bg-cyan-950/60 border border-cyan-800/40 text-cyan-300 text-xs shrink-0">
          <Zap className="w-4 h-4 text-cyan-400 fill-cyan-400" />
          <span className="font-semibold">Under 15-Min Sky Transit</span>
        </div>
      </div>

      {/* 2. FLIPKART CIRCULAR CATEGORY ICON BAR */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 shadow-lg backdrop-blur-md">
        <div className="flex items-center justify-between gap-3 overflow-x-auto pb-1 scrollbar-none">
          {FLIPKART_CATEGORIES.map(cat => (
            <button
              key={cat.id}
              onClick={() => handleCategoryClick(cat.label)}
              className="group flex flex-col items-center gap-2 min-w-[76px] sm:min-w-[88px] text-center shrink-0 transition-transform hover:-translate-y-1 focus:outline-none"
            >
              {/* Circular Icon Container */}
              <div className="relative w-14 h-14 sm:w-16 sm:h-16 rounded-full p-0.5 bg-gradient-to-tr from-cyan-500 via-sky-400 to-blue-600 shadow-md group-hover:shadow-cyan-500/25 transition-all">
                <div className="w-full h-full rounded-full overflow-hidden bg-slate-950 flex items-center justify-center relative">
                  <img
                    src={cat.image}
                    alt={cat.name}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300 opacity-80 group-hover:opacity-100"
                  />
                  <div className="absolute inset-0 bg-slate-950/30 group-hover:bg-transparent transition-colors" />
                  <span className="absolute bottom-1 right-1 text-sm drop-shadow-md">
                    {cat.icon}
                  </span>
                </div>
              </div>

              {/* Title */}
              <span className="text-[11px] sm:text-xs font-semibold text-slate-300 group-hover:text-cyan-300 line-clamp-1 transition-colors">
                {cat.name}
              </span>
            </button>
          ))}
        </div>
      </div>

      {/* 3. HERO PROMOTIONAL BANNER CAROUSEL (Flipkart Slider) */}
      <div
        className="relative rounded-3xl overflow-hidden border border-slate-800 shadow-2xl bg-slate-950 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
      >
        <div className="relative h-[280px] sm:h-[340px] md:h-[380px] w-full overflow-hidden">
          {HERO_BANNERS.map((banner, index) => {
            const isActive = index === currentSlide;
            return (
              <div
                key={banner.id}
                className={`absolute inset-0 transition-all duration-700 ease-in-out ${
                  isActive ? 'opacity-100 scale-100 z-10' : 'opacity-0 scale-95 pointer-events-none z-0'
                }`}
              >
                {/* Background Image with Dark Vignette */}
                <img
                  src={banner.image}
                  alt={banner.title}
                  className="w-full h-full object-cover object-center filter brightness-[0.45] contrast-125"
                />
                
                {/* Gradient Overlays */}
                <div className="absolute inset-0 bg-gradient-to-r from-slate-950 via-slate-950/80 to-transparent" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-950 via-transparent to-transparent" />

                {/* Banner Content */}
                <div className="absolute inset-0 z-20 flex flex-col justify-center px-6 sm:px-12 md:px-16 max-w-2xl space-y-3 sm:space-y-4">
                  <div className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold border backdrop-blur-md w-fit ${banner.badgeColor}`}>
                    <Zap className="w-3.5 h-3.5" />
                    <span>{banner.badge}</span>
                  </div>

                  <h2 className="text-2xl sm:text-4xl md:text-5xl font-extrabold text-white font-display tracking-tight leading-tight">
                    {banner.title} <br />
                    <span className="text-cyan-400">{banner.highlight}</span>
                  </h2>

                  <p className="text-xs sm:text-sm text-slate-300 max-w-lg leading-relaxed line-clamp-2 sm:line-clamp-3">
                    {banner.description}
                  </p>

                  <div className="pt-2 flex items-center gap-3">
                    <button
                      onClick={() => {
                        setSelectedCategory(banner.category);
                        setActiveCustomerTab('explore');
                      }}
                      className="px-6 py-2.5 sm:py-3 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-extrabold text-xs sm:text-sm flex items-center gap-2 shadow-xl shadow-cyan-500/25 transition-all hover:scale-105 active:scale-95"
                    >
                      <ShoppingBag className="w-4 h-4" />
                      {banner.ctaText}
                      <ArrowRight className="w-4 h-4" />
                    </button>

                    <button
                      onClick={() => setActiveCustomerTab('explore')}
                      className="px-4 py-2.5 sm:py-3 rounded-xl bg-slate-900/80 hover:bg-slate-800 text-slate-200 border border-slate-700 text-xs sm:text-sm font-semibold transition-colors"
                    >
                      View All Stores
                    </button>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Carousel Navigation Arrow Buttons */}
        <button
          onClick={() => setCurrentSlide(prev => (prev - 1 + HERO_BANNERS.length) % HERO_BANNERS.length)}
          className="absolute left-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 hover:text-slate-950 border border-slate-700/80 shadow-lg transition-all opacity-80 group-hover:opacity-100"
          aria-label="Previous Slide"
        >
          <ChevronLeft className="w-5 h-5" />
        </button>

        <button
          onClick={() => setCurrentSlide(prev => (prev + 1) % HERO_BANNERS.length)}
          className="absolute right-3 top-1/2 -translate-y-1/2 z-30 p-2.5 rounded-full bg-slate-950/80 text-white hover:bg-cyan-500 hover:text-slate-950 border border-slate-700/80 shadow-lg transition-all opacity-80 group-hover:opacity-100"
          aria-label="Next Slide"
        >
          <ChevronRight className="w-5 h-5" />
        </button>

        {/* Slide Indicators */}
        <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-30 flex items-center gap-2">
          {HERO_BANNERS.map((_, idx) => (
            <button
              key={idx}
              onClick={() => setCurrentSlide(idx)}
              className={`h-2 rounded-full transition-all ${
                idx === currentSlide ? 'w-8 bg-cyan-400' : 'w-2 bg-slate-600 hover:bg-slate-400'
              }`}
              aria-label={`Slide ${idx + 1}`}
            />
          ))}
        </div>
      </div>

      {/* 4. ACTIVE IN-FLIGHT ORDER BANNER (If customer has order in flight) */}
      {activeOrders.length > 0 && (
        <div className="p-4 rounded-2xl bg-cyan-950/50 border border-cyan-500/40 flex flex-col sm:flex-row items-center justify-between gap-4 backdrop-blur-md shadow-lg">
          <div className="flex items-center gap-3">
            <div className="p-3 rounded-xl bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 shrink-0">
              <Navigation className="w-5 h-5 animate-pulse" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <span className="text-xs font-bold text-white uppercase tracking-wider">
                  Active Sky Delivery: #{activeOrders[0].id}
                </span>
                <span className="px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-500 text-slate-950">
                  {activeOrders[0].status.replace(/_/g, ' ')}
                </span>
              </div>
              <p className="text-xs text-slate-300 mt-0.5">
                {activeOrders[0].currentCheckpoint || 'Drone dispatched via aerial corridor to your station locker'}
              </p>
            </div>
          </div>

          <button
            onClick={() => {
              setActiveTrackingOrderId(activeOrders[0].id);
              setActiveCustomerTab('tracking');
            }}
            className="px-4 py-2 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs flex items-center gap-1.5 transition-all shadow-md shadow-cyan-500/20 shrink-0"
          >
            Track Flight Live
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>
      )}

      {/* 5. FLIPKART "DEALS OF THE DAY" WITH COUNTDOWN TIMER */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        
        {/* Deal Header with Timer & View All */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-3 border-b border-slate-800 gap-3">
          <div className="flex items-center gap-3 flex-wrap">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-lg bg-cyan-500/20 text-cyan-400 flex items-center justify-center">
                <Zap className="w-4 h-4 fill-cyan-400 text-cyan-400" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
                  Deals of the Day
                </h2>
                <p className="text-[11px] text-slate-400">
                  Fastest 12-min dispatch • Handpicked neighborhood favorites
                </p>
              </div>
            </div>

            {/* Live Countdown Timer */}
            <div className="flex items-center gap-1.5 px-3 py-1 rounded-xl bg-slate-950 border border-slate-800 text-xs">
              <Clock className="w-3.5 h-3.5 text-amber-400" />
              <span className="text-[11px] text-slate-400">Ends in:</span>
              <span className="font-mono font-bold text-amber-400">
                {String(timeLeft.hours).padStart(2, '0')}h : {String(timeLeft.minutes).padStart(2, '0')}m : {String(timeLeft.seconds).padStart(2, '0')}s
              </span>
            </div>
          </div>

          <button
            onClick={() => setActiveCustomerTab('explore')}
            className="px-4 py-2 rounded-xl bg-cyan-500/10 hover:bg-cyan-500/20 text-cyan-400 border border-cyan-500/30 font-bold text-xs flex items-center gap-1.5 transition-colors self-start sm:self-auto"
          >
            <span>VIEW ALL</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        {/* Product Cards Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-3 sm:gap-4">
          {dealsOfTheDay.map((product, idx) => {
            const discounts = [35, 25, 40, 20, 30, 22];
            return renderProductCard(product, discounts[idx % discounts.length]);
          })}
        </div>
      </section>

      {/* 6. BEST OF ELECTRONICS & GADGETS (FLIPKART STYLE) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
              Tech Emergency?
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
              Best of Electronics & Gadgets
            </h2>
            <p className="text-[11px] text-slate-400">
              GaN Fast Chargers, Braided Cables & Earbuds Dispatched in Minutes
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('Electronics');
              setActiveCustomerTab('explore');
            }}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {electronicsProducts.map((product, idx) => {
            const discounts = [30, 20, 35, 25];
            return renderProductCard(product, discounts[idx % discounts.length]);
          })}
        </div>
      </section>

      {/* 7. FRESH GROCERIES & LOCAL BAKERY DELIGHTS */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-bold text-emerald-400 uppercase tracking-widest">
              Morning Freshness
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
              Groceries & Artisan Bakery
            </h2>
            <p className="text-[11px] text-slate-400">
              Fresh croissants, cold brew arabica coffee & morning essentials
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('Food');
              setActiveCustomerTab('explore');
            }}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>View All</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-3 sm:gap-4">
          {groceryAndFoodProducts.map((product, idx) => {
            const discounts = [25, 30, 20, 35];
            return renderProductCard(product, discounts[idx % discounts.length]);
          })}
        </div>
      </section>

      {/* 8. NEARBY PARTNER STORES (LOCAL MERCHANTS) */}
      <section className="bg-slate-900/90 border border-slate-800 rounded-2xl p-4 sm:p-6 shadow-xl space-y-4">
        <div className="flex items-center justify-between pb-3 border-b border-slate-800">
          <div>
            <div className="text-[11px] font-bold text-cyan-400 uppercase tracking-widest">
              Local Commerce Network
            </div>
            <h2 className="text-lg sm:text-xl font-extrabold text-white font-display">
              Nearby Partner Stores with Rooftop Dispatch
            </h2>
            <p className="text-[11px] text-slate-400">
              Order directly from neighborhood stores within 8 km flight radius
            </p>
          </div>

          <button
            onClick={() => {
              setSelectedCategory('All');
              setActiveCustomerTab('explore');
            }}
            className="text-xs font-bold text-cyan-400 hover:text-cyan-300 flex items-center gap-1"
          >
            <span>All Stores</span>
            <ArrowRight className="w-3.5 h-3.5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          {stores.slice(0, 4).map(store => (
            <div
              key={store.id}
              onClick={() => {
                setSelectedCategory('All');
                setActiveCustomerTab('explore');
              }}
              className="glass-card rounded-2xl overflow-hidden border border-slate-800 hover:border-cyan-500/40 bg-slate-950/60 p-4 cursor-pointer group transition-all flex flex-col justify-between"
            >
              <div>
                <div className="relative h-32 rounded-xl overflow-hidden bg-slate-900 mb-3">
                  <img
                    src={store.image}
                    alt={store.storeName}
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  <div className="absolute top-2 left-2 px-2 py-0.5 rounded text-[10px] font-semibold bg-cyan-950/90 text-cyan-300 border border-cyan-800">
                    {store.category}
                  </div>
                  <div className="absolute bottom-2 right-2 flex items-center gap-1 px-1.5 py-0.5 rounded bg-slate-950/90 text-amber-400 text-[10px] font-bold">
                    <Star className="w-3 h-3 fill-amber-400" />
                    <span>{store.rating}</span>
                  </div>
                </div>

                <h3 className="text-sm font-bold text-white group-hover:text-cyan-400 transition-colors truncate">
                  {store.storeName}
                </h3>
                <p className="text-xs text-slate-400 truncate mt-0.5">
                  {store.address}
                </p>
              </div>

              <div className="mt-3 pt-3 border-t border-slate-800/80 flex items-center justify-between text-xs text-slate-300">
                <div className="flex items-center gap-1 text-cyan-400 text-[11px] font-medium">
                  <Zap className="w-3 h-3" />
                  <span>Rooftop Pad Active</span>
                </div>
                <div className="flex items-center gap-1 text-slate-400 text-[11px]">
                  <Clock className="w-3 h-3 text-cyan-400" />
                  <span>{store.deliveryTimeEst}</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* 9. FLIPKART-STYLE TRUST & VALUE PROPOSITION BANNER */}
      <section className="rounded-3xl border border-slate-800 bg-gradient-to-r from-slate-950 via-slate-900 to-slate-950 p-6 sm:p-8">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-cyan-500/10 border border-cyan-500/30 flex items-center justify-center text-cyan-400 shrink-0">
              <Zap className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">12-15 Min Sky Transit</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Direct aerial routing bypasses road traffic jams and red lights.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 flex items-center justify-center text-emerald-400 shrink-0">
              <Lock className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Contactless SkyPort Pods</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Automated rooftop locker pods with instant 4-digit PIN verification.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-blue-500/10 border border-blue-500/30 flex items-center justify-center text-blue-400 shrink-0">
              <StoreIcon className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">100% Local Merchants</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Directly supporting verified neighborhood stores with zero courier markups.
              </p>
            </div>
          </div>

          <div className="flex items-start gap-3.5">
            <div className="w-12 h-12 rounded-2xl bg-purple-500/10 border border-purple-500/30 flex items-center justify-center text-purple-400 shrink-0">
              <Leaf className="w-6 h-6" />
            </div>
            <div>
              <h4 className="text-sm font-bold text-white font-display">Zero Road Emissions</h4>
              <p className="text-xs text-slate-400 mt-1 leading-relaxed">
                Electric multi-rotor fleet with whisper acoustic technology.
              </p>
            </div>
          </div>

        </div>
      </section>

    </div>
  );
};
