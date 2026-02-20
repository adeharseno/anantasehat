
import React from 'react';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: 'Rp 12,500,000', icon: DollarSign, change: '+12.5%', color: 'from-emerald-500/20 via-emerald-500/10 to-transparent', iconColor: 'text-emerald-600', badgeColor: 'bg-emerald-50 text-emerald-700' },
    { label: 'Total Orders', value: '150', icon: ShoppingBag, change: '+8.2%', color: 'from-blue-500/20 via-blue-500/10 to-transparent', iconColor: 'text-blue-600', badgeColor: 'bg-blue-50 text-blue-700' },
    { label: 'New Customers', value: '1,200', icon: Users, change: '+5.4%', color: 'from-violet-500/20 via-violet-500/10 to-transparent', iconColor: 'text-violet-600', badgeColor: 'bg-violet-50 text-violet-700' },
    { label: 'Conversion Rate', value: '3.2%', icon: Activity, change: '-2.1%', color: 'from-orange-500/20 via-orange-500/10 to-transparent', iconColor: 'text-orange-600', badgeColor: 'bg-rose-50 text-rose-700' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-10">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Dashboard Overview</h1>
                <p className="text-slate-500 mt-1.5 font-medium">Welcome back, Admin. Here's what's happening today.</p>
            </header>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-7 rounded-3xl shadow-sm border border-slate-200/60 flex flex-col justify-between group hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-300 relative overflow-hidden">
                        <div className={`absolute top-0 right-0 w-32 h-32 bg-linear-to-bl ${stat.color} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                        <div className="flex items-center justify-between relative z-10">
                            <div className="flex flex-col">
                                <span className="text-[13px] font-bold text-slate-500 uppercase tracking-wider">{stat.label}</span>
                                <h3 className="text-2xl font-black text-slate-900 mt-2">{stat.value}</h3>
                            </div>
                            <div className={`p-3.5 rounded-2xl bg-slate-50 group-hover:scale-110 transition-transform duration-300 ${stat.iconColor}`}>
                                <stat.icon size={26} strokeWidth={2.5} />
                            </div>
                        </div>
                        <div className="mt-6 relative z-10">
                            <span className={`text-[11px] font-bold px-2.5 py-1 rounded-full ${stat.badgeColor}`}>
                                {stat.change}
                            </span>
                            <span className="text-[11px] font-bold text-slate-400 ml-2 uppercase">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            <div className="grid grid-cols-1 xl:grid-cols-2 gap-10">
                <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden flex flex-col">
                    <div className="p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="text-lg font-extrabold text-slate-900">Recent Transactions</h3>
                        <button className="text-xs font-bold text-blue-600 hover:text-blue-700 decoration-2 hover:underline transition-all">View All Orders</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/20">
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px]">Invoice</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px]">Customer</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px]">Status</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px] text-right">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-slate-50/80 transition-colors group">
                                        <td className="px-8 py-5 font-bold text-slate-900 transition-colors group-hover:text-blue-600">#INV-AS{1000 + i}</td>
                                        <td className="px-8 py-5 font-semibold text-slate-600">Customer {i}</td>
                                        <td className="px-8 py-5">
                                            <span className="bg-amber-50 text-amber-700 text-[11px] font-bold px-3 py-1 rounded-lg border border-amber-200/50">PROCESSING</span>
                                        </td>
                                        <td className="px-8 py-5 font-black text-slate-900 text-right">Rp {150 * i}.000</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="p-5 border-t border-slate-100 bg-slate-50/20 text-center">
                        <p className="text-xs text-slate-400 font-medium italic">Displaying last 5 transactions</p>
                    </div>
                </div>

                <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                    <div className="p-7 border-b border-slate-100 flex items-center justify-between bg-slate-50/50">
                        <h3 className="text-lg font-extrabold text-slate-900">Inventory Status</h3>
                        <span className="bg-rose-50 text-rose-700 text-[11px] font-bold px-3 py-1 rounded-lg border border-rose-200/50">3 CRITICAL ALERTS</span>
                    </div>
                    <div className="p-7 space-y-6">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-5 p-5 rounded-2xl bg-[#F8FAFC] border border-slate-100 hover:border-slate-300 hover:shadow-md transition-all group">
                                <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center text-2xl shadow-sm border border-slate-100 group-hover:scale-105 transition-transform">💊</div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="font-extrabold text-slate-900 truncate">Paracetamol 500mg Forte</h4>
                                    <div className="flex items-center gap-3 mt-1.5">
                                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 rounded-full" style={{ width: '15%' }} />
                                        </div>
                                        <span className="text-[11px] font-black text-rose-600 uppercase">Only 5 left</span>
                                    </div>
                                </div>
                                <button className="px-5 py-2.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-black rounded-xl shadow-lg shadow-blue-500/20 transition-all hover:-translate-y-0.5 active:translate-y-0">
                                    RESTOCK
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
