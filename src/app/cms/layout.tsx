
"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import {
    LayoutDashboard,
    Image as ImageIcon,
    ShoppingBag,
    Layers,
    Users,
    CreditCard,
    FileText,
    HelpCircle,
    Settings,
    LogOut,
    Menu,
    X,
    QrCode,
    Megaphone,
    ThumbsUp,
    Info
} from "lucide-react";
import { createClient } from "@supabase/supabase-js";

// Initialize Supabase client (using the one we created or directly here for now to avoid import issues if env vars aren't set)
// actually, let's just use the store or context. For now, we'll assume a simple auth check.
// In a real app, use the Supabase Auth provider.

const sidebarItems = [
    { icon: LayoutDashboard, label: "Dashboard", href: "/cms/dashboard" },
    { icon: ImageIcon, label: "Banners", href: "/cms/banners" },
    { icon: Megaphone, label: "Promo Banners", href: "/cms/banner-promo" },
    { icon: Layers, label: "Categories", href: "/cms/categories" },
    { icon: ShoppingBag, label: "Products", href: "/cms/products" },
    { icon: FileText, label: "Orders", href: "/cms/orders" },
    { icon: Users, label: "Users", href: "/cms/users" },
    { icon: CreditCard, label: "Payments", href: "/cms/payments" },
    { icon: QrCode, label: "QRIS", href: "/cms/qrcode" },
    { icon: HelpCircle, label: "FAQ", href: "/cms/faq" },
    { icon: Info, label: "Pages", href: "/cms/pages" }, // Dropdown or main page for sub-pages? Let's do a main page listing them
    { icon: Settings, label: "Footer", href: "/cms/footer" },
    { icon: ThumbsUp, label: "Testimonials", href: "/cms/testimonials" },
    { icon: HelpCircle, label: "Why Choose Us", href: "/cms/why-choose-us" },
];

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    // Check if we are on the login page
    const isLoginPage = pathname === "/cms/login";

    useEffect(() => {
        // Mock auth check or real supabase check
        const checkAuth = async () => {
            // For now, let's just allow access or check a dummy token in localStorage
            // In production, use supabase.auth.getSession()
            setLoading(false);
        };
        checkAuth();
    }, [pathname, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    // if (loading) return <div className="flex h-screen items-center justify-center">Loading...</div>;

    return (
        <div className="flex min-h-screen bg-[#F8FAFC] font-sans selection:bg-blue-100 selection:text-blue-700">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-72 bg-[#0F172A] text-white transition-all duration-300 ease-in-out border-r border-slate-800/50 shadow-2xl ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:static lg:translate-x-0`}
            >
                <div className="flex h-20 items-center justify-between px-8 bg-[#0F172A]">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-linear-to-br from-blue-500 to-blue-700 rounded-xl flex items-center justify-center text-white shadow-lg shadow-blue-500/20">
                            <ShoppingBag size={22} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-lg font-extrabold tracking-tight leading-none text-white">Ananta</span>
                            <span className="text-xs font-medium text-slate-400 mt-1 uppercase tracking-widest">Admin Panel</span>
                        </div>
                    </div>
                    <button
                        className="lg:hidden text-slate-400 hover:text-white p-2 rounded-lg hover:bg-slate-800 transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={20} />
                    </button>
                </div>

                <div className="h-px mx-6 bg-linear-to-r from-transparent via-slate-700/50 to-transparent mb-4" />

                <nav className="px-4 pb-10 space-y-1.5 overflow-y-auto max-h-[calc(100vh-100px)] custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-3.5 px-4 py-3 text-[14px] font-semibold rounded-xl transition-all duration-200 group ${isActive
                                    ? "bg-blue-600 text-white shadow-lg shadow-blue-600/30"
                                    : "text-slate-400 hover:bg-slate-800/60 hover:text-white"
                                    }`}
                            >
                                <item.icon
                                    size={20}
                                    className={`transition-transform duration-200 group-hover:scale-110 ${isActive ? 'text-white' : 'text-slate-500 group-hover:text-blue-400'}`}
                                />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-6 mt-6 border-t border-slate-800/60">
                        <button
                            onClick={() => router.push("/cms/login")}
                            className="flex w-full items-center gap-3.5 px-4 py-3 text-[14px] font-semibold text-rose-400 hover:bg-rose-500/10 hover:text-rose-300 rounded-xl transition-all duration-200 group"
                        >
                            <LogOut size={20} className="transition-transform group-hover:-translate-x-1" />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
                {/* Top Header */}
                <header className="bg-white/80 backdrop-blur-md border-b border-slate-200 z-10 h-20 flex items-center px-8 justify-between lg:justify-end sticky top-0">
                    <button
                        className="lg:hidden text-slate-600 hover:text-slate-900 p-2 rounded-lg hover:bg-slate-100 transition-colors"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={24} />
                    </button>

                    <div className="flex items-center gap-6">
                        <div className="h-10 w-px bg-slate-200 hidden md:block" />
                        <div className="flex items-center gap-3.5 group cursor-pointer">
                            <div className="flex-col items-end hidden sm:flex">
                                <span className="text-sm font-bold text-slate-800">Administrator</span>
                                <span className="text-[11px] font-medium text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">Super Admin</span>
                            </div>
                            <div className="w-11 h-11 rounded-2xl bg-linear-to-br from-slate-100 to-slate-200 border border-slate-200 flex items-center justify-center text-slate-700 font-black text-lg shadow-sm transition-transform group-hover:scale-105">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-x-hidden overflow-y-auto bg-[#F8FAFC] p-8 lg:p-10 animate-in fade-in duration-500">
                    {children}
                </main>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 4px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #334155;
                        border-radius: 10px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb:hover {
                        background: #475569;
                    }
                `}</style>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-40 lg:hidden animate-in fade-in duration-300"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
