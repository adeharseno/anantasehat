"use client";

import React from "react";
import Link from "next/link";
import { Phone, Mail, MapPin, Instagram, Facebook, Twitter } from "lucide-react";

export default function Footer() {
    return (
        <footer style={{ background: "#0F1C2E", color: "#CBD5E1", marginTop: 80 }}>
            {/* Main Footer */}
            <div className="container-custom" style={{ padding: "60px 24px 40px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 40 }}>
                    {/* Brand */}
                    <div>
                        <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                            <div style={{ width: 36, height: 36, background: "var(--primary)", borderRadius: 10, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18 }}>⚕️</div>
                            <div>
                                <div style={{ fontFamily: "Karla, sans-serif", fontWeight: 700, fontSize: 18, color: "white" }}>Ananta Sehat</div>
                                <div style={{ fontSize: 10, color: "#94A3B8", letterSpacing: 0.5 }}>APOTEK ONLINE</div>
                            </div>
                        </div>
                        <p style={{ fontSize: 14, lineHeight: 1.7, color: "#94A3B8", marginBottom: 20 }}>
                            Apotek online terpercaya yang menyediakan produk kesehatan berkualitas dengan harga terjangkau. Kesehatan Anda adalah prioritas kami.
                        </p>
                        <div style={{ display: "flex", gap: 10 }}>
                            {[
                                { icon: <Instagram size={16} />, href: "#" },
                                { icon: <Facebook size={16} />, href: "#" },
                                { icon: <Twitter size={16} />, href: "#" },
                            ].map((social, i) => (
                                <a
                                    key={i}
                                    href={social.href}
                                    style={{
                                        width: 36, height: 36,
                                        borderRadius: 8,
                                        background: "rgba(255,255,255,0.05)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        color: "#94A3B8",
                                        textDecoration: "none",
                                        transition: "all 0.2s",
                                    }}
                                    onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.background = "var(--primary)"; (e.currentTarget as HTMLElement).style.color = "white"; }}
                                    onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.background = "rgba(255,255,255,0.05)"; (e.currentTarget as HTMLElement).style.color = "#94A3B8"; }}
                                >
                                    {social.icon}
                                </a>
                            ))}
                        </div>
                    </div>

                    {/* Layanan */}
                    <div>
                        <h4 style={{ color: "white", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Layanan Kami</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                { label: "Obat Bebas", href: "/products?category=obat-bebas" },
                                { label: "Vitamin & Suplemen", href: "/products?category=vitamin-suplemen" },
                                { label: "Herbal & Tradisional", href: "/products?category=herbal-tradisional" },
                                { label: "Alat Kesehatan", href: "/products?category=alat-kesehatan" },
                                { label: "Perawatan Kulit", href: "/products?category=perawatan-kulit" },
                                { label: "P3K & Antiseptik", href: "/products?category=p3k-antiseptik" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Informasi */}
                    <div>
                        <h4 style={{ color: "white", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Informasi</h4>
                        <ul style={{ listStyle: "none", display: "flex", flexDirection: "column", gap: 10 }}>
                            {[
                                { label: "Tentang Kami", href: "/tentang-kami" },
                                { label: "Cara Pemesanan", href: "/cara-pemesanan" },
                                { label: "Kebijakan Privasi", href: "/kebijakan-privasi" },
                                { label: "Syarat & Ketentuan", href: "/syarat-ketentuan" },
                                { label: "FAQ", href: "/faq" },
                            ].map((item) => (
                                <li key={item.label}>
                                    <Link href={item.href} style={{ fontSize: 14, color: "#94A3B8", textDecoration: "none", transition: "color 0.2s" }}
                                        onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.color = "white")}
                                        onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.color = "#94A3B8")}
                                    >
                                        {item.label}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Kontak */}
                    <div>
                        <h4 style={{ color: "white", fontFamily: "Karla, sans-serif", fontWeight: 600, fontSize: 15, marginBottom: 16 }}>Hubungi Kami</h4>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            <div style={{ display: "flex", alignItems: "flex-start", gap: 10, fontSize: 14, color: "#94A3B8" }}>
                                <MapPin size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span>Jl. Kesehatan No. 123, Jakarta Pusat, DKI Jakarta 10110</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94A3B8" }}>
                                <Phone size={16} />
                                <span>0800-1-ANANTA (Bebas Pulsa)</span>
                            </div>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "#94A3B8" }}>
                                <Mail size={16} />
                                <span>support@anantasehat.id</span>
                            </div>
                        </div>

                        <div style={{ marginTop: 20 }}>
                            <div style={{ fontSize: 12, color: "#94A3B8", marginBottom: 8 }}>Metode Pembayaran</div>
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {["BCA", "BNI", "BRI", "Mandiri", "QRIS"].map((bank) => (
                                    <span key={bank} style={{
                                        background: "rgba(255,255,255,0.1)",
                                        borderRadius: 6,
                                        padding: "4px 10px",
                                        fontSize: 12,
                                        color: "white",
                                        fontWeight: 500,
                                    }}>
                                        {bank}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* Bottom Bar */}
            <div style={{ borderTop: "1px solid rgba(255,255,255,0.05)", padding: "16px 24px" }}>
                <div className="container-custom" style={{ display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 8 }}>
                    <p style={{ fontSize: 13, color: "#64748B" }}>
                        © 2025 Ananta Sehat. Terdaftar dan diawasi oleh BPOM & Dinas Kesehatan.
                    </p>
                    <div style={{ display: "flex", gap: 16 }}>
                        <span style={{ fontSize: 12, color: "#64748B" }}>🔒 Transaksi Aman SSL</span>
                        <span style={{ fontSize: 12, color: "#64748B" }}>✓ Produk Terjamin Asli</span>
                    </div>
                </div>
            </div>
        </footer>
    );
}
