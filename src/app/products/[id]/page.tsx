"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { ShoppingCart, Package, Star, Shield, Truck, Minus, Plus, Check, Loader2 } from "lucide-react";
import { formatPrice } from "@/lib/data";
import { getProduct, getProducts } from "@/lib/api";
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

    const [product, setProduct] = useState<any>(null);
    const [relatedProducts, setRelatedProducts] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchProduct = async () => {
            setLoading(true);
            try {
                const idOrSlug = params.id as string;
                const data = await getProduct(idOrSlug);
                setProduct(data);

                if (data) {
                    // Fetch related products (same category)
                    const allProducts = await getProducts(); // Optimally we should have getRelatedProducts API
                    const related = allProducts
                        .filter((p: any) => p.categorySlug === data.categorySlug && p.id !== data.id)
                        .slice(0, 4);
                    setRelatedProducts(related);
                }
            } catch (error) {
                console.error("Failed to fetch product", error);
            } finally {
                setLoading(false);
            }
        };

        if (params.id) fetchProduct();
    }, [params.id]);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

    if (!product) {
        return (
            <div style={{ textAlign: "center", padding: "80px 20px" }}>
                <div style={{ fontSize: 60, marginBottom: 16 }}>😕</div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700, marginBottom: 8 }}>Produk tidak ditemukan</h2>
                <Link href="/products" className="btn-primary" style={{ display: "inline-flex", marginTop: 16 }}>Kembali ke Produk</Link>
            </div>
        );
    }

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
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "12px 0", overflowX: "auto" }}>
                <div className="container-custom" style={{ padding: "0 16px" }}>
                    <nav style={{ display: "flex", alignItems: "center", gap: 6, fontSize: 13, whiteSpace: "nowrap" }}>
                        <a href="/" style={{ color: "var(--primary)", textDecoration: "none" }}>Beranda</a>
                        <span style={{ color: "#CBD5E1" }}>/</span>
                        <a href="/products" style={{ color: "var(--primary)", textDecoration: "none" }}>Produk</a>
                        <span style={{ color: "#CBD5E1" }}>/</span>
                        <a href={`/products?category=${product.categorySlug}`} style={{ color: "var(--primary)", textDecoration: "none" }}>{product.category}</a>
                        <span style={{ color: "#CBD5E1" }}>/</span>
                        <span style={{ color: "var(--gray-600)", overflow: "hidden", textOverflow: "ellipsis", maxWidth: 140 }}>{product.name}</span>
                    </nav>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "20px 16px 48px" }}>

                {/* ── Product Section ── */}
                <div className="pd-layout">

                    {/* Left: Image */}
                    <div>
                        <div style={{
                            background: "white", borderRadius: 16,
                            border: "1px solid #F1F5F9",
                            overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                        }}>
                            <div style={{
                                height: 300, background: "linear-gradient(135deg, #F0F7FF 0%, #EEF2FF 100%)",
                                display: "flex", alignItems: "center", justifyContent: "center",
                                fontSize: 110, position: "relative",
                            }}>
                                {productEmojis[product.categorySlug] || "💊"}
                                {product.badge && badgeColors[product.badge] && (
                                    <div style={{
                                        position: "absolute", top: 14, left: 14,
                                        background: badgeColors[product.badge].bg,
                                        color: badgeColors[product.badge].color,
                                        padding: "4px 10px", borderRadius: 7,
                                        fontSize: 12, fontWeight: 700,
                                    }}>
                                        {product.badge}
                                    </div>
                                )}
                            </div>
                            {/* Thumbnails */}
                            <div style={{ display: "flex", gap: 8, padding: "12px 16px", borderTop: "1px solid #F1F5F9" }}>
                                {[1, 2, 3].map((i) => (
                                    <div key={i} style={{
                                        width: 52, height: 52, borderRadius: 8,
                                        background: i === 1 ? "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)" : "#F3F4F6",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 18,
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
                        <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>

                            {/* Category badge */}
                            <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 700, textTransform: "uppercase", letterSpacing: 0.6, marginBottom: 8 }}>
                                {product.category}
                            </div>

                            {/* Name */}
                            <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 700, color: "var(--gray-900)", marginBottom: 6, lineHeight: 1.3 }}>
                                {product.name}
                            </h1>

                            {/* Brand */}
                            <div style={{ fontSize: 13, color: "var(--gray-500)", marginBottom: 12 }}>
                                Diproduksi oleh: <span style={{ fontWeight: 600, color: "var(--gray-700)" }}>{product.manufacturer}</span>
                            </div>

                            {/* Rating + stock in one neat row */}
                            <div style={{ display: "flex", alignItems: "center", gap: 10, flexWrap: "wrap", marginBottom: 16 }}>
                                <div style={{ display: "flex", gap: 2 }}>
                                    {[1, 2, 3, 4, 5].map((s) => (
                                        <Star key={s} size={14} fill={s <= 4 ? "#F59E0B" : "none"} color={s <= 4 ? "#F59E0B" : "#D1D5DB"} />
                                    ))}
                                </div>
                                <span style={{ fontSize: 13, color: "var(--gray-500)" }}>4.0 (120 ulasan)</span>
                                <span style={{
                                    background: "#ECFDF5", color: "#16A34A",
                                    fontSize: 12, fontWeight: 700, padding: "3px 10px", borderRadius: 20,
                                }}>
                                    {product.stock > 0 ? `Stok: ${product.stock}` : "Stok Habis"}
                                </span>
                            </div>

                            <div style={{ height: 1, background: "#F1F5F9", margin: "16px 0" }} />

                            {/* Price */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>
                                    {formatPrice(product.price)}
                                </div>
                                <div style={{ fontSize: 12, color: "var(--gray-400)", marginTop: 2 }}>Per satuan</div>
                            </div>

                            {/* Quantity */}
                            <div style={{ marginBottom: 20 }}>
                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 8 }}>Jumlah</div>
                                <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
                                    <button
                                        onClick={() => setQuantity((q) => Math.max(1, q - 1))}
                                        style={{
                                            width: 40, height: 40,
                                            border: "1.5px solid #E5E7EB", borderRight: "none",
                                            borderRadius: "8px 0 0 8px",
                                            background: "white", cursor: "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "var(--gray-600)",
                                        }}
                                    >
                                        <Minus size={15} />
                                    </button>
                                    <div style={{
                                        width: 52, height: 40,
                                        border: "1.5px solid #E5E7EB",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 16, fontWeight: 700, color: "var(--gray-800)",
                                    }}>
                                        {quantity}
                                    </div>
                                    <button
                                        onClick={() => setQuantity((q) => Math.min(product.stock, q + 1))}
                                        style={{
                                            width: 40, height: 40,
                                            border: "1.5px solid #E5E7EB", borderLeft: "none",
                                            borderRadius: "0 8px 8px 0",
                                            background: "white", cursor: "pointer",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "var(--gray-600)",
                                        }}
                                    >
                                        <Plus size={15} />
                                    </button>
                                    <span style={{ marginLeft: 14, fontSize: 13, color: "var(--gray-500)" }}>
                                        Total:&nbsp;<strong style={{ color: "var(--primary)" }}>{formatPrice(product.price * quantity)}</strong>
                                    </span>
                                </div>
                            </div>

                            {/* Action buttons — stack on very small screens */}
                            <div className="pd-actions">
                                <button
                                    onClick={handleAddToCart}
                                    disabled={adding || product.stock === 0}
                                    style={{
                                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                                        padding: "13px 16px", borderRadius: 10,
                                        border: `2px solid ${adding ? "#16A34A" : "var(--primary)"}`,
                                        background: adding ? "#ECFDF5" : "white",
                                        color: adding ? "#16A34A" : "var(--primary)",
                                        fontWeight: 700, fontSize: 14, cursor: "pointer",
                                        transition: "all 0.3s ease",
                                    }}
                                >
                                    {adding ? <><Check size={16} /> Ditambahkan!</> : <><ShoppingCart size={16} /> + Keranjang</>}
                                </button>
                                <button
                                    onClick={handleBuyNow}
                                    disabled={product.stock === 0}
                                    className="btn-primary"
                                    style={{ flex: 1, fontSize: 14, padding: "13px 16px" }}
                                >
                                    Beli Sekarang
                                </button>
                            </div>

                            {/* Trust chips */}
                            <div style={{ display: "flex", gap: 8, flexWrap: "wrap", marginTop: 20 }}>
                                {[
                                    { icon: <Shield size={13} />, text: "Produk Asli Bergaransi" },
                                    { icon: <Truck size={13} />, text: "Gratis Ongkir >Rp150rb" },
                                    { icon: <Package size={13} />, text: "Kemasan Aman & Rapi" },
                                ].map((chip, i) => (
                                    <div key={i} style={{
                                        display: "flex", alignItems: "center", gap: 5,
                                        padding: "6px 11px", borderRadius: 8,
                                        background: "#F0F7FF", fontSize: 12,
                                        color: "var(--primary)", fontWeight: 500,
                                    }}>
                                        {chip.icon} {chip.text}
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </div>

                {/* ── Description & Dosage ── */}
                <div className="pd-desc-grid">
                    <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9" }}>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--gray-900)", marginBottom: 14 }}>
                            Deskripsi Produk
                        </h2>
                        <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8 }}>
                            {product.description}
                        </p>
                    </div>
                    <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9" }}>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--gray-900)", marginBottom: 14 }}>
                            Aturan Pakai
                        </h2>
                        <div style={{
                            background: "#F0F7FF", borderRadius: 10, padding: "13px 16px",
                            borderLeft: "4px solid var(--primary)",
                            fontSize: 14, color: "var(--gray-700)", lineHeight: 1.7,
                        }}>
                            {product.dosage}
                        </div>
                        <div style={{ marginTop: 16 }}>
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

                {/* ── Related Products ── */}
                {relatedProducts.length > 0 && (
                    <div style={{ marginTop: 40 }}>
                        <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--gray-900)", marginBottom: 20 }}>
                            Produk Serupa
                        </h2>
                        <div className="pd-related-grid">
                            {relatedProducts.map((p) => (
                                <ProductCard key={p.id} product={p} />
                            ))}
                        </div>
                    </div>
                )}
            </div>

            <style jsx global>{`
                /* ── Product detail layout ── */
                .pd-layout {
                    display: grid;
                    grid-template-columns: 1fr 1.2fr;
                    gap: 28px;
                    margin-bottom: 28px;
                    align-items: start;
                }
                .pd-desc-grid {
                    display: grid;
                    grid-template-columns: 1fr 1fr;
                    gap: 20px;
                    margin-bottom: 0;
                }
                .pd-actions {
                    display: flex;
                    gap: 12px;
                }
                .pd-related-grid {
                    display: grid;
                    grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
                    gap: 20px;
                    align-items: stretch;
                }

                /* ── Mobile ── */
                @media (max-width: 640px) {
                    /* Stack image above info */
                    .pd-layout {
                        grid-template-columns: 1fr !important;
                        gap: 16px;
                    }
                    /* Stack desc + dosage */
                    .pd-desc-grid {
                        grid-template-columns: 1fr !important;
                        gap: 14px;
                    }
                    /* Buttons side by side (they already have flex: 1) */
                    .pd-actions {
                        gap: 10px;
                    }
                    /* Related: 2 col on mobile */
                    .pd-related-grid {
                        grid-template-columns: repeat(2, 1fr) !important;
                        gap: 12px;
                    }
                }
            `}</style>
        </div>
    );
}
