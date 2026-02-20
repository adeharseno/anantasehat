
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
    { icon: Info, label: "Pages", href: "/cms/pages" },
    { icon: Settings, label: "Footer", href: "/cms/footer" },
    { icon: ThumbsUp, label: "Testimonials", href: "/cms/testimonials" },
    { icon: HelpCircle, label: "Why Choose Us", href: "/cms/why-choose-us" },
];

export default function CMSLayout({ children }: { children: React.ReactNode }) {
    const [isSidebarOpen, setIsSidebarOpen] = useState(true);
    const pathname = usePathname();
    const router = useRouter();
    const [loading, setLoading] = useState(true);

    const isLoginPage = pathname === "/cms/login";

    useEffect(() => {
        const checkAuth = async () => {
            setLoading(false);
        };
        checkAuth();
    }, [pathname, router]);

    if (isLoginPage) {
        return <>{children}</>;
    }

    return (
        <div className="flex min-h-screen bg-slate-50">
            {/* Sidebar */}
            <aside
                className={`fixed inset-y-0 left-0 z-50 w-56 bg-[#0F172A] text-white transition-transform duration-300 ease-in-out ${isSidebarOpen ? "translate-x-0" : "-translate-x-full"
                    } lg:static lg:translate-x-0`}
            >
                {/* Logo */}
                <div className="flex h-14 items-center justify-between px-4">
                    <div className="flex items-center gap-2.5">
                        <div className="w-8 h-8 bg-blue-600 rounded-lg flex items-center justify-center text-white">
                            <ShoppingBag size={16} />
                        </div>
                        <div className="flex flex-col">
                            <span className="text-sm font-bold leading-none text-white">Ananta</span>
                            <span className="text-[10px] text-slate-400 uppercase tracking-wider">Admin</span>
                        </div>
                    </div>
                    <button
                        className="lg:hidden text-slate-400 hover:text-white p-1.5 rounded-md hover:bg-slate-800 transition-colors"
                        onClick={() => setIsSidebarOpen(false)}
                    >
                        <X size={18} />
                    </button>
                </div>

                <div className="h-px mx-4 bg-slate-700/50 mb-2" />

                {/* Navigation */}
                <nav className="px-3 pb-6 space-y-0.5 overflow-y-auto max-h-[calc(100vh-64px)] custom-scrollbar">
                    {sidebarItems.map((item) => {
                        const isActive = pathname.startsWith(item.href);
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center gap-2.5 px-3 py-2 text-[13px] font-medium rounded-lg transition-colors ${isActive
                                        ? "bg-blue-600 text-white"
                                        : "text-slate-400 hover:bg-slate-800 hover:text-slate-200"
                                    }`}
                            >
                                <item.icon
                                    size={16}
                                    className={isActive ? 'text-white' : 'text-slate-500'}
                                />
                                {item.label}
                            </Link>
                        );
                    })}

                    <div className="pt-4 mt-4 border-t border-slate-800">
                        <button
                            onClick={() => router.push("/cms/login")}
                            className="flex w-full items-center gap-2.5 px-3 py-2 text-[13px] font-medium text-rose-400 hover:bg-rose-500/10 rounded-lg transition-colors"
                        >
                            <LogOut size={16} />
                            Logout
                        </button>
                    </div>
                </nav>
            </aside>

            {/* Main Content */}
            <div className="flex-1 flex flex-col min-w-0">
                {/* Top Header */}
                <header className="bg-white border-b border-slate-200 h-14 flex items-center px-6 justify-between lg:justify-end sticky top-0 z-10">
                    <button
                        className="lg:hidden text-slate-600 hover:text-slate-900 p-1.5 rounded-md hover:bg-slate-100 transition-colors"
                        onClick={() => setIsSidebarOpen(true)}
                    >
                        <Menu size={20} />
                    </button>

                    <div className="flex items-center gap-4">
                        <div className="h-8 w-px bg-slate-200 hidden md:block" />
                        <div className="flex items-center gap-2.5">
                            <div className="flex-col items-end hidden sm:flex">
                                <span className="text-sm font-semibold text-slate-700">Administrator</span>
                                <span className="text-[10px] text-emerald-600 font-medium">Super Admin</span>
                            </div>
                            <div className="w-9 h-9 rounded-lg bg-slate-100 border border-slate-200 flex items-center justify-center text-slate-600 font-semibold text-sm">
                                A
                            </div>
                        </div>
                    </div>
                </header>

                {/* Page Content */}
                <main className="flex-1 overflow-y-auto p-5 lg:p-6">
                    {children}
                </main>

                <style jsx global>{`
                    .custom-scrollbar::-webkit-scrollbar {
                        width: 3px;
                    }
                    .custom-scrollbar::-webkit-scrollbar-track {
                        background: transparent;
                    }
                    .custom-scrollbar::-webkit-scrollbar-thumb {
                        background: #334155;
                        border-radius: 10px;
                    }
                `}</style>
            </div>

            {/* Overlay for mobile sidebar */}
            {isSidebarOpen && (
                <div
                    className="fixed inset-0 bg-black/40 z-40 lg:hidden"
                    onClick={() => setIsSidebarOpen(false)}
                />
            )}
        </div>
    );
}
