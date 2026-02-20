"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ShoppingCart, User, Search, Menu, X, Phone, ChevronDown } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Navbar() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const [searchQuery, setSearchQuery] = useState("");
    const pathname = usePathname();
    const { getCartCount, isLoggedIn, user } = useStore();
    const cartCount = getCartCount();

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 10);
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            window.location.href = `/products?search=${encodeURIComponent(searchQuery)}`;
        }
    };

    const navLinks = [
        { href: "/", label: "Beranda" },
        { href: "/products", label: "Produk" },
        { href: "/products?category=vitamin-suplemen", label: "Vitamin" },
        { href: "/products?category=herbal-tradisional", label: "Herbal" },
    ];

    return (
        <>
            {/* Top Bar */}
            <div style={{ background: "var(--primary)", padding: "6px 0" }}>
                <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 16, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
                        <span style={{ display: "flex", alignItems: "center", gap: 4 }}>
                            <Phone size={12} />
                            CS: 0800-1-ANANTA (Mon-Sat 08.00-20.00)
                        </span>
                        <span>|</span>
                        <span>🚚 Gratis Ongkir min. pembelian Rp150.000</span>
                    </div>
                    <div style={{ display: "flex", alignItems: "center", gap: 12, fontSize: 12, color: "rgba(255,255,255,0.9)" }}>
                        {isLoggedIn ? (
                            <Link href="/profile" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>
                                Halo, {user?.name?.split(" ")[0]}!
                            </Link>
                        ) : (
                            <>
                                <Link href="/login" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>Masuk</Link>
                                <span>|</span>
                                <Link href="/register" style={{ color: "rgba(255,255,255,0.9)", textDecoration: "none" }}>Daftar</Link>
                            </>
                        )}
                    </div>
                </div>
            </div>

            {/* Main Navbar */}
            <nav
                style={{
                    background: "white",
                    boxShadow: isScrolled ? "0 2px 20px rgba(0,0,0,0.08)" : "0 1px 0 #E5E7EB",
                    position: "sticky",
                    top: 0,
                    zIndex: 1000,
                    transition: "box-shadow 0.3s ease",
                }}
            >
                <div className="container-custom" style={{ display: "flex", alignItems: "center", gap: 24, padding: "14px 24px" }}>
                    {/* Logo */}
                    <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                                width: 36,
                                height: 36,
                                background: "var(--primary)",
                                borderRadius: 10,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 18,
                            }}>
                                ⚕️
                            </div>
                            <div>
                                <div style={{ fontFamily: "Poppins, sans-serif", fontWeight: 700, fontSize: 18, color: "var(--primary)", lineHeight: 1.1 }}>
                                    Ananta Sehat
                                </div>
                                <div style={{ fontSize: 10, color: "var(--gray-400)", letterSpacing: 0.5 }}>APOTEK ONLINE</div>
                            </div>
                        </div>
                    </Link>

                    {/* Search Bar */}
                    <form onSubmit={handleSearch} style={{ flex: 1, maxWidth: 480 }}>
                        <div style={{ position: "relative" }}>
                            <input
                                type="text"
                                placeholder="Cari obat, vitamin, suplemen..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                style={{
                                    width: "100%",
                                    padding: "10px 44px 10px 16px",
                                    borderRadius: 10,
                                    border: "1.5px solid #E5E7EB",
                                    fontSize: 14,
                                    outline: "none",
                                    fontFamily: "Inter, sans-serif",
                                    transition: "border-color 0.2s",
                                }}
                                onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                            />
                            <button
                                type="submit"
                                style={{
                                    position: "absolute",
                                    right: 8,
                                    top: "50%",
                                    transform: "translateY(-50%)",
                                    background: "var(--primary)",
                                    border: "none",
                                    borderRadius: 6,
                                    padding: "6px",
                                    cursor: "pointer",
                                    display: "flex",
                                    alignItems: "center",
                                }}
                            >
                                <Search size={16} color="white" />
                            </button>
                        </div>
                    </form>

                    {/* Nav Links */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4 }} className="hidden-mobile">
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                style={{
                                    padding: "8px 12px",
                                    borderRadius: 8,
                                    fontSize: 14,
                                    fontWeight: 500,
                                    color: pathname === link.href ? "var(--primary)" : "var(--gray-600)",
                                    textDecoration: "none",
                                    transition: "all 0.2s ease",
                                    background: pathname === link.href ? "var(--primary-light)" : "transparent",
                                    whiteSpace: "nowrap",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>

                    {/* Actions */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, flexShrink: 0 }}>
                        {/* Cart */}
                        <Link
                            href="/cart"
                            style={{
                                position: "relative",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: cartCount > 0 ? "var(--primary-light)" : "#F3F4F6",
                                textDecoration: "none",
                                transition: "all 0.2s",
                            }}
                        >
                            <ShoppingCart size={20} color={cartCount > 0 ? "var(--primary)" : "var(--gray-500)"} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: "absolute",
                                    top: -4,
                                    right: -4,
                                    background: "#EF4444",
                                    color: "white",
                                    borderRadius: "50%",
                                    width: 18,
                                    height: 18,
                                    fontSize: 10,
                                    fontWeight: 700,
                                    display: "flex",
                                    alignItems: "center",
                                    justifyContent: "center",
                                    border: "2px solid white",
                                }}>
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* User */}
                        <Link
                            href={isLoggedIn ? "/profile" : "/login"}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                gap: 6,
                                padding: "8px 14px",
                                borderRadius: 10,
                                background: isLoggedIn ? "var(--primary)" : "#F3F4F6",
                                textDecoration: "none",
                                fontSize: 14,
                                fontWeight: 600,
                                color: isLoggedIn ? "white" : "var(--gray-600)",
                                transition: "all 0.2s",
                            }}
                        >
                            <User size={16} />
                            <span className="hidden-mobile">{isLoggedIn ? user?.name?.split(" ")[0] || "Profil" : "Masuk"}</span>
                        </Link>

                        {/* Mobile Menu Button */}
                        <button
                            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                            style={{
                                display: "none",
                                alignItems: "center",
                                justifyContent: "center",
                                width: 40,
                                height: 40,
                                borderRadius: 10,
                                background: "#F3F4F6",
                                border: "none",
                                cursor: "pointer",
                            }}
                            className="show-mobile"
                        >
                            {mobileMenuOpen ? <X size={20} /> : <Menu size={20} />}
                        </button>
                    </div>
                </div>

                {/* Mobile Menu */}
                {mobileMenuOpen && (
                    <div style={{ borderTop: "1px solid #E5E7EB", padding: "12px 24px", background: "white" }}>
                        {navLinks.map((link) => (
                            <Link
                                key={link.href}
                                href={link.href}
                                onClick={() => setMobileMenuOpen(false)}
                                style={{
                                    display: "block",
                                    padding: "10px 0",
                                    fontSize: 15,
                                    fontWeight: 500,
                                    color: "var(--gray-700)",
                                    textDecoration: "none",
                                    borderBottom: "1px solid #F3F4F6",
                                }}
                            >
                                {link.label}
                            </Link>
                        ))}
                    </div>
                )}
            </nav>

            <style jsx global>{`
        @media (max-width: 768px) {
          .hidden-mobile { display: none !important; }
          .show-mobile { display: flex !important; }
        }
        @media (min-width: 769px) {
          .show-mobile { display: none !important; }
        }
      `}</style>
        </>
    );
}
