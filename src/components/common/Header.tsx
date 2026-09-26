import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  Navigation,
  ShoppingCart,
  Sun,
  Moon,
  Shield,
  Store,
  User,
  Menu,
  X,
  Compass,
  Package,
  Layers,
  Sparkles,
  ChevronDown
} from 'lucide-react';

export const Header: React.FC = () => {
  const {
    currentRole,
    setRole,
    currentUser,
    cart,
    orders,
    activeCustomerTab,
    setActiveCustomerTab,
    activeSellerTab,
    setActiveSellerTab,
    activeAdminTab,
    setActiveAdminTab,
    theme,
    toggleTheme,
  } = useApp();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [roleDropdownOpen, setRoleDropdownOpen] = useState(false);

  const cartItemCount = cart.reduce((total, item) => total + item.quantity, 0);
  const inFlightCount = orders.filter(
    o => o.status === 'DRONE_DISPATCHED' || o.status === 'DRONE_IN_TRANSIT'
  ).length;

  return (
    <header className="sticky top-0 z-40 w-full backdrop-blur-xl bg-slate-950/80 border-b border-slate-800/80 transition-colors">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          
          {/* Logo & Tagline */}
          <div className="flex items-center gap-3 cursor-pointer" onClick={() => setRole('public')}>
            <div className="relative flex items-center justify-center w-10 h-10 rounded-xl bg-gradient-to-br from-cyan-500 to-blue-600 text-white shadow-lg shadow-cyan-500/20">
              <Navigation className="w-5 h-5 -rotate-45" />
              <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-emerald-400 border-2 border-slate-950 rounded-full"></span>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xl font-bold tracking-tight text-white font-display">
                  DRO<span className="text-cyan-400">ZONE</span>
                </span>
                <span className="px-1.5 py-0.5 text-[9px] uppercase tracking-wider font-semibold rounded bg-cyan-950 border border-cyan-800/60 text-cyan-400">
                  SkyNet
                </span>
              </div>
              <p className="text-[10px] text-slate-400 tracking-tight hidden sm:block">
                Your Order. From Store to Sky.
              </p>
            </div>
          </div>

          {/* Role Navigation Bar (Desktop) */}
          <div className="hidden lg:flex items-center gap-1 bg-slate-900/90 p-1 rounded-xl border border-slate-800">
            <button
              onClick={() => setRole('public')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRole === 'public'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Sparkles className="w-3.5 h-3.5" />
              Public Landing
            </button>

            <button
              onClick={() => setRole('customer')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRole === 'customer'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <User className="w-3.5 h-3.5" />
              Customer App
            </button>

            <button
              onClick={() => setRole('seller')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRole === 'seller'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Store className="w-3.5 h-3.5" />
              Seller Portal
            </button>

            <button
              onClick={() => setRole('admin')}
              className={`px-3 py-1.5 rounded-lg text-xs font-medium transition-all flex items-center gap-1.5 ${
                currentRole === 'admin'
                  ? 'bg-cyan-500 text-slate-950 font-semibold shadow-sm'
                  : 'text-slate-400 hover:text-white hover:bg-slate-800/60'
              }`}
            >
              <Shield className="w-3.5 h-3.5" />
              Admin Center
            </button>
          </div>

          {/* Quick Context & Actions */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Live in-flight badge */}
            {inFlightCount > 0 && (
              <div 
                onClick={() => {
                  setRole('customer');
                  setActiveCustomerTab('tracking');
                }}
                className="hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-cyan-950/80 border border-cyan-500/30 text-cyan-300 text-xs cursor-pointer hover:border-cyan-400 transition-colors animate-pulse"
                title="View active drone flights"
              >
                <Navigation className="w-3.5 h-3.5" />
                <span>{inFlightCount} In Flight</span>
              </div>
            )}

            {/* Cart Button (For Customer) */}
            <button
              onClick={() => {
                setRole('customer');
                setActiveCustomerTab('cart');
              }}
              className="relative p-2 rounded-xl text-slate-300 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="View Shopping Cart"
            >
              <ShoppingCart className="w-4 h-4 text-cyan-400" />
              {cartItemCount > 0 && (
                <span className="absolute -top-1 -right-1 flex h-4 w-4 items-center justify-center rounded-full bg-cyan-500 text-[10px] font-bold text-slate-950 shadow-md">
                  {cartItemCount}
                </span>
              )}
            </button>

            {/* Theme Toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900/80 hover:bg-slate-800 border border-slate-800 transition-colors"
              aria-label="Toggle Dark / Light Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-cyan-400" />
              )}
            </button>

            {/* User Account Pill Dropdown */}
            <div className="relative">
              <button
                onClick={() => setRoleDropdownOpen(!roleDropdownOpen)}
                className="flex items-center gap-2 p-1.5 pr-2.5 rounded-xl bg-slate-900/90 border border-slate-800 hover:border-cyan-500/40 transition-colors"
              >
                <img
                  src={currentUser.avatar}
                  alt={currentUser.name}
                  className="w-7 h-7 rounded-lg object-cover ring-1 ring-cyan-500/30"
                />
                <div className="hidden sm:block text-left text-xs">
                  <div className="font-medium text-white truncate max-w-[100px]">
                    {currentUser.name}
                  </div>
                  <div className="text-[10px] text-cyan-400 capitalize">
                    {currentRole}
                  </div>
                </div>
                <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
              </button>

              {roleDropdownOpen && (
                <div className="absolute right-0 mt-2 w-64 rounded-xl bg-slate-900 border border-slate-800 shadow-2xl p-2 z-50 animate-in fade-in slide-in-from-top-2">
                  <div className="p-2 border-b border-slate-800/80 mb-1">
                    <p className="text-xs font-semibold text-white">{currentUser.name}</p>
                    <p className="text-[11px] text-slate-400">{currentUser.email}</p>
                    <div className="mt-1 inline-flex items-center px-2 py-0.5 rounded text-[10px] font-medium bg-cyan-950 text-cyan-300 border border-cyan-800">
                      Active Role: {currentRole.toUpperCase()}
                    </div>
                  </div>

                  <p className="px-2 py-1 text-[10px] font-medium text-slate-500 uppercase tracking-wider">
                    Switch Test Persona
                  </p>

                  <button
                    onClick={() => {
                      setRole('customer');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                      currentRole === 'customer'
                        ? 'bg-cyan-950/80 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">Customer (Alex Chen)</div>
                      <div className="text-[10px] text-slate-400">customer@drozone.demo</div>
                    </div>
                    {currentRole === 'customer' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>

                  <button
                    onClick={() => {
                      setRole('seller');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                      currentRole === 'seller'
                        ? 'bg-cyan-950/80 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">Seller (Marcus Vance)</div>
                      <div className="text-[10px] text-slate-400">seller@drozone.demo</div>
                    </div>
                    {currentRole === 'seller' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>

                  <button
                    onClick={() => {
                      setRole('admin');
                      setRoleDropdownOpen(false);
                    }}
                    className={`w-full flex items-center justify-between p-2 rounded-lg text-xs text-left transition-colors ${
                      currentRole === 'admin'
                        ? 'bg-cyan-950/80 text-cyan-300'
                        : 'text-slate-300 hover:bg-slate-800'
                    }`}
                  >
                    <div>
                      <div className="font-medium">Admin (Elena Rostova)</div>
                      <div className="text-[10px] text-slate-400">admin@drozone.demo</div>
                    </div>
                    {currentRole === 'admin' && <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />}
                  </button>

                  <div className="border-t border-slate-800/80 mt-1 pt-1">
                    <button
                      onClick={() => {
                        setRole('public');
                        setRoleDropdownOpen(false);
                      }}
                      className="w-full flex items-center gap-2 p-2 rounded-lg text-xs text-slate-400 hover:text-white hover:bg-slate-800 text-left"
                    >
                      <Sparkles className="w-3.5 h-3.5 text-cyan-400" />
                      View Public Landing Page
                    </button>
                  </div>
                </div>
              )}
            </div>

            {/* Mobile menu trigger */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl text-slate-400 hover:text-white bg-slate-900 border border-slate-800"
              aria-label="Toggle navigation"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden py-3 border-t border-slate-800/80 space-y-2 animate-in fade-in duration-200">
            <div className="grid grid-cols-2 gap-2 pb-2">
              <button
                onClick={() => {
                  setRole('public');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-medium text-center ${
                  currentRole === 'public' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Public Landing
              </button>
              <button
                onClick={() => {
                  setRole('customer');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-medium text-center ${
                  currentRole === 'customer' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Customer App
              </button>
              <button
                onClick={() => {
                  setRole('seller');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-medium text-center ${
                  currentRole === 'seller' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Seller Portal
              </button>
              <button
                onClick={() => {
                  setRole('admin');
                  setMobileMenuOpen(false);
                }}
                className={`p-2.5 rounded-lg text-xs font-medium text-center ${
                  currentRole === 'admin' ? 'bg-cyan-500 text-slate-950 font-bold' : 'bg-slate-900 text-slate-300'
                }`}
              >
                Admin Control
              </button>
            </div>
          </div>
        )}
      </div>
    </header>
  );
};
