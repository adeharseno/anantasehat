"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { ShoppingCart, User, Search, Menu, X } from "lucide-react";
import { useStore } from "@/lib/store";

export default function Navbar() {
    const [scrolled, setScrolled] = useState(false);
    const [menuOpen, setMenuOpen] = useState(false);
    const [searchOpen, setSearchOpen] = useState(false);
    const [query, setQuery] = useState("");
    const pathname = usePathname();
    const router = useRouter();
    const { getCartCount, isLoggedIn, user } = useStore();
    const cartCount = getCartCount();

    useEffect(() => {
        const onScroll = () => setScrolled(window.scrollY > 10);
        window.addEventListener("scroll", onScroll);
        return () => window.removeEventListener("scroll", onScroll);
    }, []);

    /* Close drawers on route change */
    useEffect(() => { setMenuOpen(false); setSearchOpen(false); }, [pathname]);

    const doSearch = (e: React.FormEvent) => {
        e.preventDefault();
        if (query.trim()) {
            router.push(`/products?search=${encodeURIComponent(query.trim())}`);
            setQuery("");
            setSearchOpen(false);
        }
    };

    const NAV = [
        { href: "/", label: "Beranda" },
        { href: "/products", label: "Produk" },
        { href: "/products?category=vitamin-suplemen", label: "Vitamin" },
        { href: "/products?category=herbal-tradisional", label: "Herbal" },
    ];

    return (
        <>
            {/* ── Top info bar ── */}
            <div style={{ background: "var(--primary)", padding: "5px 0" }}>
                <div className="container-custom" style={{
                    padding: "0 16px",
                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 8,
                }}>
                    {/* Left: phone */}
                    <span style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap", overflow: "hidden", textOverflow: "ellipsis" }}>
                        📞 0800-1-ANANTA (Sen–Sab 08–20)
                    </span>
                    {/* Right: shipping + login */}
                    <div style={{ display: "flex", alignItems: "center", gap: 10, flexShrink: 0 }}>
                        <span className="topbar-shipping" style={{ fontSize: 11, color: "rgba(255,255,255,0.85)", whiteSpace: "nowrap" }}>
                            🚚 Gratis ongkir min. Rp150.000
                        </span>
                        {isLoggedIn ? (
                            <Link href="/profile" style={{ fontSize: 11, color: "white", fontWeight: 600, textDecoration: "none", whiteSpace: "nowrap" }}>
                                Halo, {user?.name?.split(" ")[0]}!
                            </Link>
                        ) : (
                            <div style={{ display: "flex", gap: 8, fontSize: 11, color: "rgba(255,255,255,0.9)" }}>
                                <Link href="/login" style={{ color: "inherit", textDecoration: "none" }}>Masuk</Link>
                                <span>|</span>
                                <Link href="/register" style={{ color: "inherit", textDecoration: "none" }}>Daftar</Link>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* ── Main Navbar ── */}
            <nav style={{
                background: "white",
                boxShadow: scrolled ? "0 2px 16px rgba(0,0,0,0.09)" : "0 1px 0 #E5E7EB",
                position: "sticky", top: 0, zIndex: 999,
                transition: "box-shadow 0.3s",
            }}>
                <div className="container-custom" style={{
                    padding: "0 16px",
                    display: "flex",
                    alignItems: "center",
                    height: 58,
                }}>
                    {/* ── Logo (stays left) ── */}
                    <Link href="/" style={{ textDecoration: "none", flexShrink: 0 }}>
                        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                            <div style={{
                                width: 34, height: 34, background: "var(--primary)",
                                borderRadius: 9, display: "flex", alignItems: "center",
                                justifyContent: "center", fontSize: 17,
                            }}>⚕️</div>
                            <div className="logo-text">
                                <div style={{ fontFamily: "Poppins,sans-serif", fontWeight: 700, fontSize: 16, color: "var(--primary)", lineHeight: 1.1 }}>
                                    Ananta Sehat
                                </div>
                                <div style={{ fontSize: 9, color: "var(--gray-400)", letterSpacing: 0.5 }}>APOTEK ONLINE</div>
                            </div>
                        </div>
                    </Link>

                    {/* ── Right side: pushed to far right via marginLeft:auto ── */}
                    <div style={{ display: "flex", alignItems: "center", gap: 8, marginLeft: "auto" }}>

                        {/* Desktop search bar */}
                        <form onSubmit={doSearch} className="desktop-search" style={{ width: 360 }}>
                            <div style={{ position: "relative" }}>
                                <input
                                    type="text"
                                    placeholder="Cari obat, vitamin, suplemen..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    style={{
                                        width: "100%", padding: "8px 40px 8px 14px",
                                        borderRadius: 10, border: "1.5px solid #E5E7EB",
                                        fontSize: 13, outline: "none",
                                        fontFamily: "Inter,sans-serif",
                                        transition: "border-color .2s",
                                        boxSizing: "border-box",
                                    }}
                                    onFocus={(e) => (e.target.style.borderColor = "var(--primary)")}
                                    onBlur={(e) => (e.target.style.borderColor = "#E5E7EB")}
                                />
                                <button type="submit" style={{
                                    position: "absolute", right: 7, top: "50%", transform: "translateY(-50%)",
                                    background: "var(--primary)", border: "none", borderRadius: 6,
                                    padding: "5px", cursor: "pointer", display: "flex", alignItems: "center",
                                }}>
                                    <Search size={14} color="white" />
                                </button>
                            </div>
                        </form>

                        {/* Desktop nav links */}
                        <div style={{ display: "flex", alignItems: "center", gap: 2 }} className="desktop-nav">
                            {NAV.map((l) => (
                                <Link key={l.href} href={l.href} style={{
                                    padding: "7px 10px", borderRadius: 8, fontSize: 13, fontWeight: 500,
                                    color: pathname === l.href ? "var(--primary)" : "var(--gray-600)",
                                    textDecoration: "none",
                                    background: pathname === l.href ? "var(--primary-light)" : "transparent",
                                    whiteSpace: "nowrap", transition: "all .18s",
                                }}>
                                    {l.label}
                                </Link>
                            ))}
                        </div>

                        {/* Mobile: search toggle icon */}
                        <button
                            onClick={() => setSearchOpen((v) => !v)}
                            className="mobile-only"
                            style={{
                                display: "none",
                                width: 38, height: 38, borderRadius: 9,
                                background: "#F3F4F6", border: "none", cursor: "pointer",
                                alignItems: "center", justifyContent: "center",
                            }}
                        >
                            <Search size={17} color="var(--gray-600)" />
                        </button>

                        {/* Cart icon */}
                        <Link href="/cart" style={{
                            position: "relative", display: "flex", alignItems: "center", justifyContent: "center",
                            width: 38, height: 38, borderRadius: 9,
                            background: cartCount > 0 ? "var(--primary-light)" : "#F3F4F6",
                            textDecoration: "none", transition: "all .2s",
                        }}>
                            <ShoppingCart size={17} color={cartCount > 0 ? "var(--primary)" : "var(--gray-500)"} />
                            {cartCount > 0 && (
                                <span style={{
                                    position: "absolute", top: -4, right: -4,
                                    background: "#EF4444", color: "white",
                                    borderRadius: "50%", width: 17, height: 17,
                                    fontSize: 9, fontWeight: 700,
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    border: "2px solid white",
                                }}>
                                    {cartCount > 99 ? "99+" : cartCount}
                                </span>
                            )}
                        </Link>

                        {/* Profile / Login */}
                        <Link href={isLoggedIn ? "/profile" : "/login"} style={{
                            display: "flex", alignItems: "center", gap: 6,
                            padding: "7px 12px", borderRadius: 9,
                            background: isLoggedIn ? "var(--primary)" : "#F3F4F6",
                            textDecoration: "none", fontSize: 13, fontWeight: 600,
                            color: isLoggedIn ? "white" : "var(--gray-600)",
                            transition: "all .2s",
                        }}>
                            <User size={15} />
                            <span className="desktop-only" style={{ whiteSpace: "nowrap" }}>
                                {isLoggedIn ? user?.name?.split(" ")[0] || "Profil" : "Masuk"}
                            </span>
                        </Link>

                        {/* Mobile hamburger */}
                        <button
                            onClick={() => setMenuOpen((v) => !v)}
                            className="mobile-only"
                            style={{
                                display: "none",
                                width: 38, height: 38, borderRadius: 9,
                                background: "#F3F4F6", border: "none", cursor: "pointer",
                                alignItems: "center", justifyContent: "center",
                            }}
                        >
                            {menuOpen ? <X size={18} /> : <Menu size={18} />}
                        </button>

                    </div>{/* end right-side */}
                </div>

                {/* Mobile: expanded search */}
                {searchOpen && (
                    <div style={{ padding: "10px 16px 12px", background: "white", borderTop: "1px solid #F1F5F9" }}>
                        <form onSubmit={doSearch}>
                            <div style={{ position: "relative" }}>
                                <input
                                    autoFocus
                                    type="text"
                                    placeholder="Cari obat, vitamin, suplemen..."
                                    value={query}
                                    onChange={(e) => setQuery(e.target.value)}
                                    style={{
                                        width: "100%", padding: "10px 44px 10px 14px",
                                        borderRadius: 10, border: "1.5px solid var(--primary)",
                                        fontSize: 14, outline: "none",
                                        fontFamily: "Inter,sans-serif",
                                        boxSizing: "border-box",
                                    }}
                                />
                                <button type="submit" style={{
                                    position: "absolute", right: 8, top: "50%", transform: "translateY(-50%)",
                                    background: "var(--primary)", border: "none", borderRadius: 6,
                                    padding: "6px", cursor: "pointer", display: "flex", alignItems: "center",
                                }}>
                                    <Search size={15} color="white" />
                                </button>
                            </div>
                        </form>
                    </div>
                )}

                {/* Mobile slide-down menu */}
                {menuOpen && (
                    <div style={{ background: "white", borderTop: "1px solid #F1F5F9", padding: "8px 16px 16px" }}>
                        {NAV.map((l) => (
                            <Link
                                key={l.href}
                                href={l.href}
                                onClick={() => setMenuOpen(false)}
                                style={{
                                    display: "flex", alignItems: "center",
                                    padding: "12px 4px",
                                    fontSize: 15, fontWeight: pathname === l.href ? 700 : 500,
                                    color: pathname === l.href ? "var(--primary)" : "var(--gray-700)",
                                    textDecoration: "none",
                                    borderBottom: "1px solid #F3F4F6",
                                }}
                            >
                                {l.label}
                            </Link>
                        ))}
                        {isLoggedIn && (
                            <Link href="/profile" onClick={() => setMenuOpen(false)} style={{ display: "block", padding: "12px 4px", fontSize: 14, color: "var(--gray-500)", textDecoration: "none" }}>
                                👤 Profil saya
                            </Link>
                        )}
                    </div>
                )}
            </nav>

            <style jsx global>{`
              /* ── Responsive helpers ── */
              @media (max-width: 768px) {
                .desktop-nav    { display: none !important; }
                .desktop-search { display: none !important; }
                .mobile-only    { display: flex !important; }
                .desktop-only   { display: none !important; }
                .topbar-shipping { display: none !important; }
              }
              @media (min-width: 769px) {
                .mobile-only    { display: none !important; }
              }
            `}</style>
        </>
    );
}
