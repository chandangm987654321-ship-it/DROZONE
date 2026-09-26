import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import {
  User,
  Mail,
  Phone,
  MapPin,
  Bell,
  Sun,
  Moon,
  ShieldCheck,
  CheckCircle2,
  Plus,
  Trash2,
  Navigation
} from 'lucide-react';

export const CustomerProfile: React.FC = () => {
  const {
    currentUser,
    orders,
    theme,
    toggleTheme,
    addToast
  } = useApp();

  const [name, setName] = useState(currentUser.name);
  const [email, setEmail] = useState(currentUser.email);
  const [phone, setPhone] = useState(currentUser.phone);
  const [addresses, setAddresses] = useState<string[]>(currentUser.savedAddresses);
  const [newAddress, setNewAddress] = useState('');
  const [notifications, setNotifications] = useState({
    droneLiftoff: true,
    transitApproach: true,
    lockerCodeSMS: true,
    promotions: false
  });

  const handleAddAddress = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newAddress.trim()) return;
    setAddresses(prev => [...prev, newAddress.trim()]);
    setNewAddress('');
    addToast('Address Saved', 'New destination registered to your profile.', 'success');
  };

  const handleRemoveAddress = (index: number) => {
    setAddresses(prev => prev.filter((_, i) => i !== index));
    addToast('Address Removed', 'Saved address deleted.', 'info');
  };

  const handleSaveProfile = (e: React.FormEvent) => {
    e.preventDefault();
    addToast('Profile Updated', 'Customer account settings successfully saved.', 'success');
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6 animate-in fade-in duration-300">
      
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Account Profile & Settings
        </h1>
        <p className="text-xs text-slate-400 mt-1">
          Manage your contact credentials, saved SkyPort delivery addresses, and drone telemetry alert preferences.
        </p>
      </div>

      {/* Profile Overview Card */}
      <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 flex flex-col sm:flex-row items-center gap-5 backdrop-blur-md">
        <img
          src={currentUser.avatar}
          alt={currentUser.name}
          className="w-20 h-20 rounded-2xl object-cover ring-2 ring-cyan-500/40"
        />
        <div className="space-y-1 text-center sm:text-left flex-1">
          <div className="flex items-center justify-center sm:justify-start gap-2">
            <h2 className="text-lg font-bold text-white font-display">{name}</h2>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-cyan-950 text-cyan-300 border border-cyan-800">
              VERIFIED CITIZEN
            </span>
          </div>
          <p className="text-xs text-slate-400">{email} • {phone}</p>
          <div className="flex items-center justify-center sm:justify-start gap-4 pt-2 text-xs text-slate-300">
            <div>
              <span className="text-white font-bold">{orders.length}</span> Total Orders
            </div>
            <div>
              <span className="text-cyan-400 font-bold">100%</span> Sky Delivery Rate
            </div>
          </div>
        </div>
      </div>

      <form onSubmit={handleSaveProfile} className="space-y-6">
        
        {/* Contact Info */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <User className="w-4 h-4 text-cyan-400" />
            <span>Personal Information</span>
          </h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Full Name</label>
              <input
                type="text"
                value={name}
                onChange={e => setName(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div>
              <label className="text-[11px] text-slate-400 block mb-1">Email Address</label>
              <input
                type="email"
                value={email}
                onChange={e => setEmail(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>

            <div className="sm:col-span-2">
              <label className="text-[11px] text-slate-400 block mb-1">Phone Number (For Locker PIN Delivery)</label>
              <input
                type="tel"
                value={phone}
                onChange={e => setPhone(e.target.value)}
                className="w-full px-3.5 py-2.5 rounded-xl bg-slate-950 border border-slate-700 text-xs sm:text-sm text-white focus:outline-none focus:border-cyan-500"
              />
            </div>
          </div>
        </div>

        {/* Saved Delivery Addresses */}
        <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4">
          <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
            <MapPin className="w-4 h-4 text-cyan-400" />
            <span>Saved Ground & Rooftop Addresses</span>
          </h3>

          <div className="space-y-2">
            {addresses.map((addr, idx) => (
              <div
                key={idx}
                className="flex items-center justify-between p-3 rounded-xl bg-slate-950/70 border border-slate-800 text-xs"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 text-cyan-400 shrink-0" />
                  <span className="text-white">{addr}</span>
                </div>
                {addresses.length > 1 && (
                  <button
                    type="button"
                    onClick={() => handleRemoveAddress(idx)}
                    className="text-slate-400 hover:text-rose-400 p-1"
                  >
                    <Trash2 className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            ))}
          </div>

          <div className="flex gap-2 pt-2">
            <input
              type="text"
              placeholder="Add new street or rooftop landing address..."
              value={newAddress}
              onChange={e => setNewAddress(e.target.value)}
              className="flex-1 px-3.5 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
            />
            <button
              type="button"
              onClick={handleAddAddress}
              className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-cyan-400 text-xs font-semibold flex items-center gap-1"
            >
              <Plus className="w-3.5 h-3.5" />
              Add
            </button>
          </div>
        </div>

        {/* Telemetry Notifications & Theme Settings */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          
          {/* Notifications */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-3">
            <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
              <Bell className="w-4 h-4 text-cyan-400" />
              <span>Sky Delivery Notifications</span>
            </h3>

            <div className="space-y-2.5 text-xs">
              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Drone Liftoff Alert</span>
                <input
                  type="checkbox"
                  checked={notifications.droneLiftoff}
                  onChange={e => setNotifications(n => ({ ...n, droneLiftoff: e.target.checked }))}
                  className="rounded text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Corridor Transit & Approach ETA</span>
                <input
                  type="checkbox"
                  checked={notifications.transitApproach}
                  onChange={e => setNotifications(n => ({ ...n, transitApproach: e.target.checked }))}
                  className="rounded text-cyan-500 focus:ring-0"
                />
              </label>

              <label className="flex items-center justify-between cursor-pointer">
                <span className="text-slate-300">Station Locker Pod PIN Code (SMS)</span>
                <input
                  type="checkbox"
                  checked={notifications.lockerCodeSMS}
                  onChange={e => setNotifications(n => ({ ...n, lockerCodeSMS: e.target.checked }))}
                  className="rounded text-cyan-500 focus:ring-0"
                />
              </label>
            </div>
          </div>

          {/* Theme Settings */}
          <div className="p-6 rounded-2xl bg-slate-900/80 border border-slate-800 space-y-4 flex flex-col justify-between">
            <div>
              <h3 className="text-sm font-bold text-white font-display flex items-center gap-2">
                {theme === 'dark' ? <Moon className="w-4 h-4 text-cyan-400" /> : <Sun className="w-4 h-4 text-amber-400" />}
                <span>Interface Theme</span>
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Toggle between dark radar cockpit mode and high-contrast light mode.
              </p>
            </div>

            <div className="flex items-center justify-between p-3 rounded-xl bg-slate-950 border border-slate-800">
              <span className="text-xs text-white capitalize font-semibold">
                Current: {theme} Mode
              </span>
              <button
                type="button"
                onClick={toggleTheme}
                className="px-3 py-1.5 rounded-lg bg-slate-800 hover:bg-slate-700 text-xs font-semibold text-cyan-400 border border-slate-700 transition-colors"
              >
                Switch to {theme === 'dark' ? 'Light' : 'Dark'}
              </button>
            </div>
          </div>

        </div>

        {/* Save button */}
        <div className="flex justify-end pt-2">
          <button
            type="submit"
            className="px-6 py-2.5 rounded-xl bg-cyan-500 hover:bg-cyan-400 text-slate-950 font-bold text-xs sm:text-sm shadow-lg shadow-cyan-500/20 transition-colors"
          >
            Save Account Preferences
          </button>
        </div>

      </form>

    </div>
  );
};
