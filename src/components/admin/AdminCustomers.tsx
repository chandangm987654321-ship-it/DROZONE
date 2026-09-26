import React, { useState } from 'react';
import { useApp } from '../../context/AppContext';
import { Users, Search, Mail, Phone, MapPin, Package, CheckCircle2 } from 'lucide-react';

const MOCK_CUSTOMERS = [
  {
    id: 'usr_c_01',
    name: 'Alex Chen',
    email: 'customer@drozone.demo',
    phone: '+1 (555) 382-9011',
    address: '452 Pinecrest Ave, Apt 4B, Metro District',
    ordersCount: 9,
    status: 'ACTIVE',
    registeredDate: '2026-03-12',
    preferredStation: 'Station Alpha - Downtown SkyPort Hub'
  },
  {
    id: 'usr_c_02',
    name: 'Taylor Rivera',
    email: 'taylor.r@example.com',
    phone: '+1 (555) 489-1120',
    address: '88 Tech Boulevard, Pier 4',
    ordersCount: 14,
    status: 'ACTIVE',
    registeredDate: '2026-04-05',
    preferredStation: 'Station Gamma - Tech Park Locker'
  },
  {
    id: 'usr_c_03',
    name: 'Jordan Hayes',
    email: 'jordan.h@example.com',
    phone: '+1 (555) 791-4455',
    address: '12 Seaside Plaza, West Coast',
    ordersCount: 6,
    status: 'ACTIVE',
    registeredDate: '2026-05-18',
    preferredStation: 'Station Delta - Riverside Community'
  },
  {
    id: 'usr_c_04',
    name: 'Morgan Blake',
    email: 'morgan.b@example.com',
    phone: '+1 (555) 203-9988',
    address: '410 Heights Summit Terrace',
    ordersCount: 4,
    status: 'ACTIVE',
    registeredDate: '2026-06-22',
    preferredStation: 'Station Epsilon - Medical & North'
  }
];

export const AdminCustomers: React.FC = () => {
  const [customers, setCustomers] = useState(MOCK_CUSTOMERS);
  const [searchQuery, setSearchQuery] = useState('');

  const filtered = customers.filter(c =>
    c.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    c.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="space-y-6 animate-in fade-in duration-300">
      
      {/* Title */}
      <div>
        <h1 className="text-2xl font-bold text-white font-display">
          Customer Directory & SkyPort Access
        </h1>
        <p className="text-xs text-slate-400 mt-0.5">
          Manage registered customer profiles, SMS PIN dispatch credentials, and pickup locker histories.
        </p>
      </div>

      {/* Search */}
      <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800 flex items-center justify-between gap-3">
        <div className="relative w-full md:w-80">
          <input
            type="text"
            placeholder="Search customers by name, email, or address..."
            value={searchQuery}
            onChange={e => setSearchQuery(e.target.value)}
            className="w-full pl-9 pr-3 py-2 rounded-xl bg-slate-950 border border-slate-700 text-xs text-white focus:outline-none focus:border-cyan-500"
          />
          <Search className="w-3.5 h-3.5 text-slate-400 absolute left-3 top-2.5" />
        </div>
        <span className="text-xs text-slate-400">{filtered.length} verified customers</span>
      </div>

      {/* Customers List */}
      <div className="rounded-2xl border border-slate-800 bg-slate-900/90 overflow-hidden shadow-xl backdrop-blur-md">
        <div className="overflow-x-auto">
          <table className="w-full text-left text-xs">
            <thead className="bg-slate-950/80 border-b border-slate-800 text-[11px] uppercase tracking-wider text-slate-400 font-semibold">
              <tr>
                <th className="py-3.5 px-4">Customer</th>
                <th className="py-3.5 px-4">Contact</th>
                <th className="py-3.5 px-4">Address</th>
                <th className="py-3.5 px-4">Preferred SkyPort</th>
                <th className="py-3.5 px-4">Sky Orders</th>
                <th className="py-3.5 px-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-800/80 text-slate-300">
              {filtered.map(customer => (
                <tr key={customer.id} className="hover:bg-slate-800/40 transition-colors">
                  <td className="py-3 px-4">
                    <div className="font-bold text-white text-sm">{customer.name}</div>
                    <div className="text-[10px] text-slate-500">ID: {customer.id}</div>
                  </td>

                  <td className="py-3 px-4">
                    <div className="text-slate-300">{customer.email}</div>
                    <div className="text-[11px] text-slate-400">{customer.phone}</div>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-slate-300 line-clamp-1 max-w-xs">{customer.address}</span>
                  </td>

                  <td className="py-3 px-4">
                    <span className="text-cyan-400 line-clamp-1">{customer.preferredStation.split(' - ')[0]}</span>
                  </td>

                  <td className="py-3 px-4 font-mono font-bold text-white">
                    {customer.ordersCount} flights
                  </td>

                  <td className="py-3 px-4">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-950 text-emerald-300 border border-emerald-800">
                      {customer.status}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

    </div>
  );
};
