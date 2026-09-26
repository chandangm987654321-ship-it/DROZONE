import React from 'react';
import { AppProvider, useApp } from './context/AppContext';
import { Header } from './components/common/Header';
import { Footer } from './components/common/Footer';
import { SafetyBanner } from './components/common/SafetyBanner';
import { ToastContainer } from './components/common/ToastContainer';
import { ProductDetailModal } from './components/customer/ProductDetailModal';

// Landing
import { LandingPage } from './components/landing/LandingPage';

// Customer
import { CustomerHome } from './components/customer/CustomerHome';
import { CustomerExplore } from './components/customer/CustomerExplore';
import { CustomerCart } from './components/customer/CustomerCart';
import { CustomerCheckout } from './components/customer/CustomerCheckout';
import { CustomerTracking } from './components/customer/CustomerTracking';
import { CustomerOrders } from './components/customer/CustomerOrders';
import { CustomerProfile } from './components/customer/CustomerProfile';

// Seller
import { SellerDashboard } from './components/seller/SellerDashboard';
import { SellerProducts } from './components/seller/SellerProducts';
import { SellerOrders } from './components/seller/SellerOrders';
import { SellerDronePickup } from './components/seller/SellerDronePickup';
import { SellerAnalytics } from './components/seller/SellerAnalytics';

// Admin
import { AdminOverview } from './components/admin/AdminOverview';
import { AdminOrders } from './components/admin/AdminOrders';
import { AdminSellers } from './components/admin/AdminSellers';
import { AdminCustomers } from './components/admin/AdminCustomers';
import { AdminDroneFleet } from './components/admin/AdminDroneFleet';
import { AdminStations } from './components/admin/AdminStations';
import { AdminDeliveryZones } from './components/admin/AdminDeliveryZones';
import { AdminSettings } from './components/admin/AdminSettings';

// Icons for tabs
import {
  Home,
  Compass,
  ShoppingCart,
  Navigation,
  Clock,
  User,
  LayoutDashboard,
  Package,
  Boxes,
  TrendingUp,
  Shield,
  MapPin,
  Layers,
  Settings,
  Users,
  Store
} from 'lucide-react';

const MainAppContent: React.FC = () => {
  const {
    currentRole,
    setRole,
    activeCustomerTab,
    setActiveCustomerTab,
    activeSellerTab,
    setActiveSellerTab,
    activeAdminTab,
    setActiveAdminTab,
    cart,
    orders
  } = useApp();

  const cartItemCount = cart.reduce((t, i) => t + i.quantity, 0);
  const activeOrdersCount = orders.filter(o => o.status !== 'CUSTOMER_PICKUP').length;

  return (
    <div className="min-h-screen flex flex-col bg-slate-950 text-slate-100 selection:bg-cyan-500/30 selection:text-cyan-200">
      
      {/* Top Airspace Safety Banner */}
      <SafetyBanner />

      {/* Main Global Header with Role Switcher */}
      <Header />

      {/* Role-Specific Sub-Navigation Bar */}
      {currentRole === 'customer' && (
        <div className="border-b border-slate-800/80 bg-slate-900/60 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
              
              <button
                onClick={() => setActiveCustomerTab('home')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'home'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Home className="w-3.5 h-3.5" />
                Home
              </button>

              <button
                onClick={() => setActiveCustomerTab('explore')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'explore'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Compass className="w-3.5 h-3.5" />
                Explore & Search
              </button>

              <button
                onClick={() => setActiveCustomerTab('cart')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'cart' || activeCustomerTab === 'checkout'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <ShoppingCart className="w-3.5 h-3.5" />
                <span>Delivery Bag</span>
                {cartItemCount > 0 && (
                  <span className={`px-1.5 py-0.2 rounded-full text-[10px] font-bold ${
                    activeCustomerTab === 'cart' || activeCustomerTab === 'checkout'
                      ? 'bg-slate-950 text-cyan-400'
                      : 'bg-cyan-500 text-slate-950'
                  }`}>
                    {cartItemCount}
                  </span>
                )}
              </button>

              <button
                onClick={() => setActiveCustomerTab('tracking')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'tracking'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>Live Flight Radar</span>
                {activeOrdersCount > 0 && (
                  <span className="w-2 h-2 rounded-full bg-cyan-400 animate-ping" />
                )}
              </button>

              <button
                onClick={() => setActiveCustomerTab('orders')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'orders'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Clock className="w-3.5 h-3.5" />
                Order History
              </button>

              <button
                onClick={() => setActiveCustomerTab('profile')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeCustomerTab === 'profile'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <User className="w-3.5 h-3.5" />
                Profile
              </button>

            </div>
          </div>
        </div>
      )}

      {currentRole === 'seller' && (
        <div className="border-b border-slate-800/80 bg-slate-900/60 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
              
              <button
                onClick={() => setActiveSellerTab('dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeSellerTab === 'dashboard'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <LayoutDashboard className="w-3.5 h-3.5" />
                Dashboard
              </button>

              <button
                onClick={() => setActiveSellerTab('products')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeSellerTab === 'products'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Boxes className="w-3.5 h-3.5" />
                Products & Stock
              </button>

              <button
                onClick={() => setActiveSellerTab('orders')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeSellerTab === 'orders'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                Order Fulfillment
              </button>

              <button
                onClick={() => setActiveSellerTab('pickup')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeSellerTab === 'pickup'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                Drone Pickup Terminal
              </button>

              <button
                onClick={() => setActiveSellerTab('analytics')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeSellerTab === 'analytics'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <TrendingUp className="w-3.5 h-3.5" />
                Analytics
              </button>

            </div>
          </div>
        </div>
      )}

      {currentRole === 'admin' && (
        <div className="border-b border-slate-800/80 bg-slate-900/60 sticky top-16 z-30 backdrop-blur-md">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center gap-1 sm:gap-2 overflow-x-auto py-2.5 scrollbar-none">
              
              <button
                onClick={() => setActiveAdminTab('overview')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'overview'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Shield className="w-3.5 h-3.5" />
                Overview
              </button>

              <button
                onClick={() => setActiveAdminTab('orders')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'orders'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Package className="w-3.5 h-3.5" />
                All Orders
              </button>

              <button
                onClick={() => setActiveAdminTab('sellers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'sellers'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Store className="w-3.5 h-3.5" />
                Merchants
              </button>

              <button
                onClick={() => setActiveAdminTab('customers')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'customers'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Users className="w-3.5 h-3.5" />
                Customers
              </button>

              <button
                onClick={() => setActiveAdminTab('drones')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'drones'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Navigation className="w-3.5 h-3.5" />
                Drone Fleet
              </button>

              <button
                onClick={() => setActiveAdminTab('stations')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'stations'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <MapPin className="w-3.5 h-3.5" />
                SkyPorts
              </button>

              <button
                onClick={() => setActiveAdminTab('zones')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'zones'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Layers className="w-3.5 h-3.5" />
                Air Corridors
              </button>

              <button
                onClick={() => setActiveAdminTab('settings')}
                className={`px-3 py-1.5 rounded-xl text-xs font-semibold flex items-center gap-1.5 whitespace-nowrap transition-all ${
                  activeAdminTab === 'settings'
                    ? 'bg-cyan-500 text-slate-950 shadow-md shadow-cyan-500/20'
                    : 'text-slate-400 hover:text-white hover:bg-slate-800'
                }`}
              >
                <Settings className="w-3.5 h-3.5" />
                Safety Rules
              </button>

            </div>
          </div>
        </div>
      )}

      {/* Main Viewport Content */}
      <main className="flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-6">
        
        {/* PUBLIC LANDING */}
        {currentRole === 'public' && <LandingPage />}

        {/* CUSTOMER PORTAL */}
        {currentRole === 'customer' && (
          <>
            {activeCustomerTab === 'home' && <CustomerHome />}
            {activeCustomerTab === 'explore' && <CustomerExplore />}
            {activeCustomerTab === 'cart' && <CustomerCart />}
            {activeCustomerTab === 'checkout' && <CustomerCheckout />}
            {activeCustomerTab === 'tracking' && <CustomerTracking />}
            {activeCustomerTab === 'orders' && <CustomerOrders />}
            {activeCustomerTab === 'profile' && <CustomerProfile />}
          </>
        )}

        {/* SELLER PORTAL */}
        {currentRole === 'seller' && (
          <>
            {activeSellerTab === 'dashboard' && <SellerDashboard />}
            {activeSellerTab === 'products' && <SellerProducts />}
            {activeSellerTab === 'orders' && <SellerOrders />}
            {activeSellerTab === 'pickup' && <SellerDronePickup />}
            {activeSellerTab === 'analytics' && <SellerAnalytics />}
          </>
        )}

        {/* ADMIN CONTROL CENTER */}
        {currentRole === 'admin' && (
          <>
            {activeAdminTab === 'overview' && <AdminOverview />}
            {activeAdminTab === 'orders' && <AdminOrders />}
            {activeAdminTab === 'sellers' && <AdminSellers />}
            {activeAdminTab === 'customers' && <AdminCustomers />}
            {activeAdminTab === 'drones' && <AdminDroneFleet />}
            {activeAdminTab === 'stations' && <AdminStations />}
            {activeAdminTab === 'zones' && <AdminDeliveryZones />}
            {activeAdminTab === 'settings' && <AdminSettings />}
          </>
        )}

      </main>

      {/* Global Product Details Modal */}
      <ProductDetailModal />

      {/* Floating Notifications */}
      <ToastContainer />

      {/* Footer */}
      <Footer />

    </div>
  );
};

export default function App() {
  return (
    <AppProvider>
      <MainAppContent />
    </AppProvider>
  );
}
