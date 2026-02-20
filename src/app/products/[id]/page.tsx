"use client";

import React, { useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Package, ChevronLeft, ChevronRight, Star, Shield, Truck, Minus, Plus, Check } from "lucide-react";
import { products, formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";
import ProductCard from "@/components/ProductCard";

const productEmojis: Record<string, string> = {
    "obat-bebas": "💊",
    "vitamin-suplemen": "🫐",
    "obat-keras": "💉",
    "herbal-tradisional": "🌿",
    "perawatan-kulit": "🧴",
    "alat-kesehatan": "🩺",
    "obat-mata-tht": "👁️",
    "p3k-antiseptik": "🩹",
};

export default function ProductDetailPage() {
    const params = useParams();
    const router = useRouter();
    const { addToCart } = useStore();
    const { showToast } = useToast();
    const [quantity, setQuantity] = useState(1);
    const [adding, setAdding] = useState(false);

    const product = products.find((p) => p.id === Number(params.id));
    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>😕</div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Produk tidak ditemukan</h2>
                <Link href="/products" className="btn-primary" style={{ display: "inline-flex", marginTop: 16 }}>Kembali ke Produk</Link>
            </div>
        );
    }

    const relatedProducts = products
        .filter((p) => p.categorySlug === product.categorySlug && p.id !== product.id)
        .slice(0, 4);

    const handleAddToCart = () => {
        setAdding(true);
        addToCart(product, quantity);
        showToast(`${quantity}x ${product.name} berhasil ditambahkan ke keranjang!`);
        setTimeout(() => setAdding(false), 800);
    };

    const handleBuyNow = () => {
        addToCart(product, quantity);
        router.push("/cart");
    };

    const badgeColors: Record<string, { bg: string; color: string }> = {
        "Terlaris": { bg: "#FFF7ED", color: "#EA580C" },
        "Promo": { bg: "#FEF2F2", color: "#DC2626" },
        "Resep Dokter": { bg: "#EFF6FF", color: "#2563EB" },
        "Unggulan": { bg: "#F5F3FF", color: "#7C3AED" },
    };

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Breadcrumb */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "14px 0" }}>
                <div className="container-custom">
                    <nav className="breadcrumb">
                        <a href="/">Beranda</a><span>/</span>
                        <a href="/products">Produk</a><span>/</span>
                        <a href={`/products?category=${product.categorySlug}`}>{product.category}</a><span>/</span>
                        <span style={{ color: "var(--gray-700)" }}>{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "32px 24px" }}>
                {/* Product Section */}
                <div style={{
                    display: "grid",
                    gridTemplateColumns: "minmax(0, 1fr) minmax(0, 1.2fr)",
                    gap: 40,
                    marginBottom: 48,
                }}>
                    {/* Left: Image */}
                    <div>
                        <div style={{
                            background: "white",
                            borderRadius: 16,
                            border: "1px solid #F1F5F9",
                            overflow: "hidden",
                            boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                        }}>
                            <div style={{
                                height: 380,
                                background: "linear-gradient(135deg, #F0F7FF 0%, #EEF2FF 100%)",
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                fontSize: 120,
                                position: "relative",
                            }}>
                                {productEmojis[product.categorySlug] || "💊"}
                                {product.badge && badgeColors[product.badge] && (
                                    <div style={{
                                        position: "absolute",
                                        top: 16,
                                        left: 16,
                                        background: badgeColors[product.badge].bg,
                                        color: badgeColors[product.badge].color,
                                        padding: "5px 12px",
                                        borderRadius: 8,
                                        fontSize: 12,
                                        fontWeight: 700,
                                    }}>
                                        {product.badge}
                                    </div>
                                )}
                            </div>
                            {/* Thumbnail row */}
                            <div style={{ display: "flex", gap: 8, padding: 16, borderTop: "1px solid #F1F5F9" }}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} style={{
                                        width: 60,
                                        height: 60,
                                        borderRadius: 8,
                                        background: i === 1 ? "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)" : "#F3F4F6",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 20,
                                        border: i === 1 ? "2px solid var(--primary)" : "2px solid transparent",
                                        cursor: "pointer",
                                    }}>
                                        {productEmojis[product.categorySlug] || "💊"}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* Right: Info */}
                    <div>
                        <div style={{ background: "white", borderRadius: 16, padding: "28px", border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                            {/* Category */}
                            <div style={{ fontSize: 12, color: "var(--primary)", fontWeight: 600, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 10 }}>
                                {product.category}
                            </div>

                            {/* Name */}
                            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 26, fontWeight: 700, color: "var(--gray-900)", marginBottom: 8, lineHeight: 1.3 }}>
                                {product.name}
                            </h1>

                            {/* Brand */}
                            <div style={{ fontSize: 14, color: "var(--gray-500)", marginBottom: 12 }}>
                                Diproduksi oleh: <span style={{ fontWeight: 600, color: "var(--gray-700)" }}>{product.manufacturer}</span>
                            </div>

                            {/* Rating */}
                            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 20 }}>
                                <div style={{ display: "flex", gap: 3 }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={16} fill={s <= 4 ? "#F59E0B" : "none"} color={s <= 4 ? "#F59E0B" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 14, color: "var(--gray-500)" }}>4.0 (120 ulasan)</span>
                                <span style={{ color: "#E5E7EB" }}>|</span>
                                <span style={{ fontSize: 14, color: "var(--success)", fontWeight: 600 }}>
                                    {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
                                </span>
                            </div>

                            {/* Divider */}
                            <div className="divider" style={{ margin: "16px 0" }} />

                            {/* Price */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: 32, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>
                                    {formatPrice(product.price)}
                                </div>
                                <div style={{ fontSize: 13, color: "var(--gray-400)", marginTop: 4 }}>Per satuan</div>
                            </div>

                            {/* Quantity */}
                            <div style={{ marginBottom: 24 }}>
                                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-700)", marginBottom: 10 }}>Jumlah</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            border: "1.5px solid #E5E7EB",
                                            borderRight: "none",
                                            borderRadius: "8px 0 0 8px",
                                            background: "white",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--gray-600)",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <Minus size={16} />
                                    </button>
                                    <div style={{
                                        width: 56,
                                        height: 40,
                                        border: "1.5px solid #E5E7EB",
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        fontSize: 16,
                                        fontWeight: 700,
                                        color: "var(--gray-800)",
                                    }}>
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                        style={{
                                            width: 40,
                                            height: 40,
                                            border: "1.5px solid #E5E7EB",
                                            borderLeft: "none",
                                            borderRadius: "0 8px 8px 0",
                                            background: "white",
                                            cursor: "pointer",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            color: "var(--gray-600)",
                                            transition: "all 0.15s",
                                        }}
                                    >
                                        <Plus size={16} />
                                    </button>
                                    <span style={{ marginLeft: 12, fontSize: 13, color: "var(--gray-400)" }}>
                                        Total: <strong style={{ color: "var(--primary)" }}>{formatPrice(product.price * quantity)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Actions */}
                            <div style={{ display: "flex", gap: 12, marginBottom: 24 }}>
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding || product.stock === 0}
                                    style={{
                                        flex: 1,
                                        display: "flex",
                                        alignItems: "center",
                                        justifyContent: "center",
                                        gap: 8,
                                        padding: "13px 20px",
                                        borderRadius: 10,
                                        border: `2px solid ${adding ? "#16A34A" : "var(--primary)"}`,
                                        background: adding ? "#ECFDF5" : "white",
                                        color: adding ? "#16A34A" : "var(--primary)",
                                        fontWeight: 700,
                                        fontSize: 15,
                                        cursor: "pointer",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {adding ? <><Check size={18} /> Ditambahkan!</> : <><ShoppingCart size={18} /> + Keranjang</>}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="btn-primary"
                                    style={{ flex: 1, fontSize: 15, padding: "13px 20px" }}
                                >
                                    Beli Sekarang
                                </button>
                            </div>

                            {/* Info chips */}
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                                {[
                                    { icon: <Shield size={14} />, text: "Produk Asli Bergaransi" },
                                    { icon: <Truck size={14} />, text: "Gratis Ongkir >Rp150rb" },
                                    { icon: <Package size={14} />, text: "Kemasan Aman & Rapi" },
                                ].map((chip, i) => (
                                    <div key={i} style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 6,
                                        padding: "6px 12px",
                                        borderRadius: 8,
                                        background: "#F0F7FF",
                                        fontSize: 12,
                                        color: "var(--primary)",
                                        fontWeight: 500,
                                    }}>
                                        {chip.icon}
                                        {chip.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* Description & Dosage */}
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24, marginBottom: 48 }}>
                    <div style={{ background: "white", borderRadius: 16, padding: "28px", border: "1px solid #F1F5F9" }}>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--gray-900)", marginBottom: 16 }}>
                            Deskripsi Produk
                        </h2>
                        <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8 }}>
                            {product.description}
                        </p>
                    </div>
                    <div style={{ background: "white", borderRadius: 16, padding: "28px", border: "1px solid #F1F5F9" }}>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--gray-900)", marginBottom: 16 }}>
                            Aturan Pakai
                        </h2>
                        <div style={{
                            background: "#F0F7FF",
                            borderRadius: 10,
                            padding: "14px 16px",
                            borderLeft: "4px solid var(--primary)",
                            fontSize: 14,
                            color: "var(--gray-700)",
                            lineHeight: 1.7,
                        }}>
                            {product.dosage}
                        </div>
                        <div style={{ marginTop: 20 }}>
                            <h3 style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-700)", marginBottom: 8 }}>⚠️ Perhatian</h3>
                            <ul style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.8, paddingLeft: 20 }}>
                                <li>Simpan di tempat sejuk dan kering</li>
                                <li>Jauhkan dari jangkauan anak-anak</li>
                                <li>Baca label obat dengan teliti sebelum digunakan</li>
                                {product.badge === "Resep Dokter" && <li style={{ color: "#DC2626", fontWeight: 600 }}>Hanya dijual dengan resep dokter</li>}
                            </ul>
                        </div>
                    </div>
                </div>

                {/* Related Products */}
                {relatedProducts.length > 0 && (
                    <div>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--gray-900)", marginBottom: 24 }}>
                            Produk Serupa
                        </h2>
                        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(210px, 1fr))", gap: 20 }}>
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
        @media (max-width: 768px) {
          .product-layout { grid-template-columns: 1fr !important; }
          .product-detail-desc { grid-template-columns: 1fr !important; }
        }
      `}</style>
        </div>
    );
}
