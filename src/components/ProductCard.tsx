"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ShoppingCart, Star, Zap } from "lucide-react";
import { Product, formatPrice } from "@/lib/data";
import { useStore } from "@/lib/store";
import { useToast } from "./Toast";

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

const badgeConfig: Record<string, { bg: string; color: string }> = {
    "Terlaris": { bg: "#FFF7ED", color: "#EA580C" },
    "Promo": { bg: "#FEF2F2", color: "#DC2626" },
    "Resep Dokter": { bg: "#EFF6FF", color: "#2563EB" },
    "Unggulan": { bg: "#F5F3FF", color: "#7C3AED" },
};

interface ProductCardProps {
    product: Product;
}

export default function ProductCard({ product }: ProductCardProps) {
    const { addToCart } = useStore();
    const { showToast } = useToast();
    const [adding, setAdding] = useState(false);

    const handleAddToCart = (e: React.MouseEvent) => {
        e.preventDefault();
        e.stopPropagation();
        setAdding(true);
        addToCart(product, 1);
        showToast(`${product.name} berhasil ditambahkan ke keranjang!`);
        setTimeout(() => setAdding(false), 800);
    };

    const badgeStyle = product.badge ? badgeConfig[product.badge] : null;

    return (
        <Link href={`/products/${product.id}`} style={{ textDecoration: "none", height: "100%", display: "flex" }}>
            <div
                className="card"
                style={{
                    overflow: "hidden",
                    border: "1px solid #F1F5F9",
                    cursor: "pointer",
                    position: "relative",
                    display: "flex",
                    flexDirection: "column",
                    width: "100%",
                }}
            >
                {/* Badge */}
                {product.badge && badgeStyle && (
                    <div style={{
                        position: "absolute",
                        top: 10,
                        left: 10,
                        zIndex: 1,
                        background: badgeStyle.bg,
                        color: badgeStyle.color,
                        borderRadius: 6,
                        padding: "3px 8px",
                        fontSize: 11,
                        fontWeight: 700,
                        letterSpacing: 0.3,
                    }}>
                        {product.badge}
                    </div>
                )}

                {/* Image */}
                <div style={{
                    height: 180,
                    background: "linear-gradient(135deg, #F0F7FF 0%, #EEF2FF 100%)",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 64,
                    position: "relative",
                    overflow: "hidden",
                }}>
                    <span>{productEmojis[product.categorySlug] || "💊"}</span>
                    <div style={{
                        position: "absolute",
                        bottom: 0,
                        left: 0,
                        right: 0,
                        height: 40,
                        background: "linear-gradient(to top, rgba(240,247,255,1) 0%, transparent 100%)",
                    }} />
                </div>

                {/* Content */}
                <div style={{ padding: "14px 16px 16px", display: "flex", flexDirection: "column", flex: 1 }}>
                    {/* Category */}
                    <div style={{ fontSize: 11, color: "var(--primary)", fontWeight: 600, marginBottom: 6, textTransform: "uppercase", letterSpacing: 0.5 }}>
                        {product.category}
                    </div>

                    {/* Name */}
                    <h3 style={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "var(--gray-800)",
                        marginBottom: 4,
                        lineHeight: 1.4,
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                        overflow: "hidden",
                        fontFamily: "Inter, sans-serif",
                    }}>
                        {product.name}
                    </h3>

                    {/* Manufacturer */}
                    <div style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 10 }}>
                        {product.manufacturer}
                    </div>

                    {/* Rating */}
                    <div style={{ display: "flex", alignItems: "center", gap: 4, marginBottom: 12, flex: 1, alignContent: "flex-start", flexWrap: "wrap" }}>
                        <div style={{ display: "flex", gap: 2 }}>
                            {[1, 2, 3, 4, 5].map((star) => (
                                <Star key={star} size={11} fill={star <= 4 ? "#F59E0B" : "none"} color={star <= 4 ? "#F59E0B" : "#D1D5DB"} />
                            ))}
                        </div>
                        <span style={{ fontSize: 11, color: "var(--gray-400)" }}>(4.0)</span>
                    </div>

                    {/* Price row */}
                    <div style={{ display: "flex", alignItems: "baseline", justifyContent: "space-between", marginBottom: 10 }}>
                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>
                            {formatPrice(product.price)}
                        </div>
                        <div style={{ fontSize: 11, color: product.stock > 10 ? "#16A34A" : "#EA580C" }}>
                            {product.stock > 10 ? `Stok: ${product.stock}` : product.stock > 0 ? `Sisa ${product.stock}!` : "Habis"}
                        </div>
                    </div>

                    {/* Add to Cart button full-width */}
                    <button
                        onClick={handleAddToCart}
                        disabled={adding || product.stock === 0}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 6,
                            width: "100%",
                            padding: "9px 0",
                            background: adding ? "#16A34A" : product.stock === 0 ? "#D1D5DB" : "var(--primary)",
                            color: "white",
                            border: "none",
                            borderRadius: 8,
                            fontSize: 13,
                            fontWeight: 600,
                            cursor: product.stock === 0 ? "not-allowed" : "pointer",
                            transition: "all 0.3s ease",
                            transform: adding ? "scale(0.97)" : "scale(1)",
                            whiteSpace: "nowrap",
                        }}
                    >
                        {adding ? (
                            <>✓ Ditambahkan</>
                        ) : (
                            <>
                                <ShoppingCart size={14} />
                                + Keranjang
                            </>
                        )}
                    </button>
                </div>
            </div>
        </Link>
    );
}
