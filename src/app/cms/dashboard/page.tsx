
import React from 'react';
import { Users, ShoppingBag, DollarSign, Activity } from 'lucide-react';

const stats = [
    { label: 'Total Revenue', value: 'Rp 12,500,000', icon: DollarSign, change: '+12.5%', positive: true, iconBg: 'bg-emerald-50', iconColor: 'text-emerald-600' },
    { label: 'Total Orders', value: '150', icon: ShoppingBag, change: '+8.2%', positive: true, iconBg: 'bg-blue-50', iconColor: 'text-blue-600' },
    { label: 'New Customers', value: '1,200', icon: Users, change: '+5.4%', positive: true, iconBg: 'bg-violet-50', iconColor: 'text-violet-600' },
    { label: 'Conversion Rate', value: '3.2%', icon: Activity, change: '-2.1%', positive: false, iconBg: 'bg-orange-50', iconColor: 'text-orange-600' },
];

export default function DashboardPage() {
    return (
        <div className="space-y-6">
            {/* Page Header */}
            <div>
                <h1 className="text-xl font-bold text-slate-900">Dashboard Overview</h1>
                <p className="text-slate-500 text-sm mt-0.5">Welcome back, Admin. Here&apos;s what&apos;s happening today.</p>
            </div>

            {/* Stats Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-4">
                {stats.map((stat) => (
                    <div key={stat.label} className="bg-white p-4 rounded-xl border border-slate-200 hover:shadow-md transition-shadow">
                        <div className="flex items-center justify-between">
                            <span className="text-xs font-medium text-slate-500 uppercase tracking-wide">{stat.label}</span>
                            <div className={`w-9 h-9 rounded-lg ${stat.iconBg} ${stat.iconColor} flex items-center justify-center`}>
                                <stat.icon size={18} />
                            </div>
                        </div>
                        <h3 className="text-2xl font-bold text-slate-900 mt-2">{stat.value}</h3>
                        <div className="mt-2 flex items-center gap-1.5">
                            <span className={`text-xs font-semibold ${stat.positive ? 'text-emerald-600' : 'text-rose-600'}`}>
                                {stat.change}
                            </span>
                            <span className="text-xs text-slate-400">vs last month</span>
                        </div>
                    </div>
                ))}
            </div>

            {/* Content Grid */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-5">
                {/* Recent Transactions */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Recent Transactions</h3>
                        <button className="text-xs font-medium text-blue-600 hover:text-blue-700 hover:underline">View All</button>
                    </div>
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">Invoice</th>
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">Customer</th>
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">Status</th>
                                    <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wide">Amount</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {[1, 2, 3, 4, 5].map((i) => (
                                    <tr key={i} className="hover:bg-slate-50 transition-colors">
                                        <td className="px-5 py-3 font-medium text-slate-800">#INV-AS{1000 + i}</td>
                                        <td className="px-5 py-3 text-slate-600">Customer {i}</td>
                                        <td className="px-5 py-3">
                                            <span className="bg-amber-50 text-amber-700 text-[11px] font-medium px-2 py-0.5 rounded-md">Processing</span>
                                        </td>
                                        <td className="px-5 py-3 font-semibold text-slate-800 text-right">Rp {(150 * i).toLocaleString()}.000</td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                    <div className="px-5 py-3 border-t border-slate-100 text-center">
                        <p className="text-xs text-slate-400">Showing last 5 transactions</p>
                    </div>
                </div>

                {/* Inventory Status */}
                <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                    <div className="px-5 py-4 border-b border-slate-100 flex items-center justify-between">
                        <h3 className="text-sm font-bold text-slate-900">Inventory Status</h3>
                        <span className="bg-rose-50 text-rose-600 text-[11px] font-medium px-2 py-0.5 rounded-md">3 Alerts</span>
                    </div>
                    <div className="p-4 space-y-3">
                        {[1, 2, 3].map((i) => (
                            <div key={i} className="flex items-center gap-3 p-3 rounded-lg bg-slate-50 border border-slate-100 hover:border-slate-200 transition-colors">
                                <div className="w-10 h-10 bg-white rounded-lg flex items-center justify-center text-lg border border-slate-100">💊</div>
                                <div className="flex-1 min-w-0">
                                    <h4 className="text-sm font-semibold text-slate-800 truncate">Paracetamol 500mg Forte</h4>
                                    <div className="flex items-center gap-2 mt-1">
                                        <div className="flex-1 h-1.5 bg-slate-200 rounded-full overflow-hidden">
                                            <div className="h-full bg-rose-500 rounded-full" style={{ width: '15%' }} />
                                        </div>
                                        <span className="text-[11px] font-medium text-rose-600 shrink-0">5 left</span>
                                    </div>
                                </div>
                                <button className="px-3 py-1.5 bg-blue-600 hover:bg-blue-700 text-white text-xs font-medium rounded-lg transition-colors shrink-0">
                                    Restock
                                </button>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
