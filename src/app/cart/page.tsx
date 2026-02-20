"use client";

import React from "react";
import Link from "next/link";
import { Trash2, Plus, Minus, ShoppingCart, ArrowRight, Package, Shield, Truck, Tag } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/Toast";

const productEmojis: Record<string, string> = {
    "obat-bebas": "💊", "vitamin-suplemen": "🫐", "obat-keras": "💉",
    "herbal-tradisional": "🌿", "perawatan-kulit": "🧴", "alat-kesehatan": "🩺",
    "obat-mata-tht": "👁️", "p3k-antiseptik": "🩹",
};

export default function CartPage() {
    const { cartItems, updateQuantity, removeFromCart, getCartTotal, clearCart } = useStore();
    const { showToast } = useToast();

    const subtotal = getCartTotal();
    const shippingCost = subtotal >= 150000 ? 0 : 15000;
    const total = subtotal + shippingCost;

    const handleRemove = (productId: string | number, productName: string) => {
        removeFromCart(productId);
        showToast(`${productName} dihapus dari keranjang`, "warning");
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ background: "#FAFBFC", minHeight: "80vh", display: "flex", alignItems: "center", justifyContent: "center" }}>
                <div style={{ textAlign: "center", padding: "40px 20px" }}>
                    <div style={{ fontSize: 80, marginBottom: 20 }}>🛒</div>
                    <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--gray-800)", marginBottom: 8 }}>
                        Keranjang Belanja Kosong
                    </h2>
                    <p style={{ fontSize: 15, color: "var(--gray-500)", marginBottom: 28, maxWidth: 360, margin: "0 auto 28px" }}>
                        Yuk, mulai belanja! Temukan ribuan produk kesehatan terbaik untuk Anda.
                    </p>
                    <Link href="/products" className="btn-primary" style={{ fontSize: 15, padding: "13px 32px" }}>
                        Mulai Belanja <ArrowRight size={16} />
                    </Link>
                </div>
            </div>
        );
    }

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Header */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "20px 0" }}>
                <div className="container-custom">
                    <nav className="breadcrumb" style={{ marginBottom: 8 }}>
                        <a href="/">Beranda</a><span>/</span><span>Keranjang Belanja</span>
                    </nav>
                    <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--gray-900)" }}>
                        Keranjang Belanja
                    </h1>
                    <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>{cartItems.length} item dalam keranjang</p>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "24px 16px" }}>
                <div className="cart-layout">
                    {/* Cart Items */}
                    <div>
                        {/* Free shipping banner */}
                        {subtotal < 150000 && (
                            <div style={{
                                background: "linear-gradient(135deg, #EFF6FF 0%, #DBEAFE 100%)",
                                borderRadius: 12,
                                padding: "12px 16px",
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                border: "1px solid #BFDBFE",
                            }}>
                                <Truck size={18} color="var(--primary)" />
                                <span style={{ fontSize: 13, color: "var(--primary)", fontWeight: 500 }}>
                                    Kurangi <strong>{formatPrice(150000 - subtotal)}</strong> lagi untuk mendapatkan gratis ongkir! 🎉
                                </span>
                            </div>
                        )}
                        {subtotal >= 150000 && (
                            <div style={{
                                background: "#ECFDF5",
                                borderRadius: 12,
                                padding: "12px 16px",
                                marginBottom: 20,
                                display: "flex",
                                alignItems: "center",
                                gap: 10,
                                border: "1px solid #A7F3D0",
                            }}>
                                <span style={{ fontSize: 18 }}>🎉</span>
                                <span style={{ fontSize: 13, color: "#059669", fontWeight: 600 }}>Selamat! Anda mendapatkan gratis ongkir!</span>
                            </div>
                        )}

                        <div style={{ background: "white", borderRadius: 16, border: "1px solid #F1F5F9", overflow: "hidden" }}>
                            {/* Header — hidden on mobile */}
                            <div className="cart-table-header" style={{
                                display: "grid",
                                gridTemplateColumns: "1fr 100px 140px 80px",
                                padding: "14px 20px",
                                background: "#F8FAFC",
                                borderBottom: "1px solid #F1F5F9",
                                fontSize: 12,
                                fontWeight: 600,
                                color: "var(--gray-500)",
                                textTransform: "uppercase",
                                letterSpacing: 0.5,
                            }}>
                                <span>Produk</span>
                                <span style={{ textAlign: "center" }}>Harga</span>
                                <span style={{ textAlign: "center" }}>Jumlah</span>
                                <span style={{ textAlign: "right" }}>Subtotal</span>
                            </div>

                            {cartItems.map((item, idx) => (
                                <div
                                    key={item.product.id}
                                    className="cart-item-row"
                                    style={{
                                        borderBottom: idx < cartItems.length - 1 ? "1px solid #F9FAFB" : "none",
                                        transition: "background 0.15s",
                                    }}
                                >
                                    {/* Product Info */}
                                    <div style={{ display: "flex", alignItems: "center", gap: 14 }}>
                                        <div style={{
                                            width: 64,
                                            height: 64,
                                            borderRadius: 10,
                                            background: "linear-gradient(135deg, #F0F7FF 0%, #EEF2FF 100%)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                            fontSize: 28,
                                            flexShrink: 0,
                                        }}>
                                            {productEmojis[item.product.categorySlug] || "💊"}
                                        </div>
                                        <div>
                                            <Link href={`/products/${item.product.id}`} style={{ textDecoration: "none" }}>
                                                <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)", marginBottom: 3, lineHeight: 1.3 }}>
                                                    {item.product.name}
                                                </div>
                                            </Link>
                                            <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{item.product.manufacturer}</div>
                                            <button
                                                onClick={() => handleRemove(item.product.id, item.product.name)}
                                                style={{
                                                    display: "flex",
                                                    alignItems: "center",
                                                    gap: 4,
                                                    marginTop: 6,
                                                    background: "none",
                                                    border: "none",
                                                    cursor: "pointer",
                                                    color: "#EF4444",
                                                    fontSize: 12,
                                                    fontWeight: 500,
                                                    padding: 0,
                                                }}
                                            >
                                                <Trash2 size={12} /> Hapus
                                            </button>
                                        </div>
                                    </div>

                                    {/* Price */}
                                    <div className="cart-col-price" style={{ textAlign: "center", fontSize: 14, fontWeight: 600, color: "var(--gray-700)" }}>
                                        {formatPrice(item.product.price)}
                                    </div>

                                    {/* Quantity */}
                                    <div className="cart-col-qty" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 0 }}>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity - 1)}
                                            style={{
                                                width: 30, height: 30,
                                                border: "1px solid #E5E7EB",
                                                borderRight: "none",
                                                borderRadius: "6px 0 0 6px",
                                                background: "white",
                                                cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "var(--gray-500)",
                                            }}
                                        >
                                            <Minus size={12} />
                                        </button>
                                        <div style={{
                                            width: 40, height: 30,
                                            border: "1px solid #E5E7EB",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            fontSize: 14, fontWeight: 600,
                                        }}>
                                            {item.quantity}
                                        </div>
                                        <button
                                            onClick={() => updateQuantity(item.product.id, item.quantity + 1)}
                                            style={{
                                                width: 30, height: 30,
                                                border: "1px solid #E5E7EB",
                                                borderLeft: "none",
                                                borderRadius: "0 6px 6px 0",
                                                background: "white",
                                                cursor: "pointer",
                                                display: "flex", alignItems: "center", justifyContent: "center",
                                                color: "var(--gray-500)",
                                            }}
                                        >
                                            <Plus size={12} />
                                        </button>
                                    </div>

                                    {/* Subtotal */}
                                    <div className="cart-col-subtotal" style={{ textAlign: "right", fontSize: 15, fontWeight: 700, color: "var(--primary)" }}>
                                        {formatPrice(item.product.price * item.quantity)}
                                    </div>
                                </div>
                            ))}

                            {/* Footer */}
                            <div style={{
                                padding: "14px 20px",
                                background: "#F8FAFC",
                                borderTop: "1px solid #F1F5F9",
                                display: "flex",
                                justifyContent: "space-between",
                                alignItems: "center",
                            }}>
                                <button
                                    onClick={() => { clearCart(); showToast("Keranjang dikosongkan", "warning"); }}
                                    style={{
                                        display: "flex", alignItems: "center", gap: 6,
                                        background: "none", border: "1px solid #FECACA", borderRadius: 6,
                                        padding: "6px 12px", color: "#EF4444", fontSize: 12, fontWeight: 500, cursor: "pointer",
                                    }}
                                >
                                    <Trash2 size={12} /> Kosongkan Keranjang
                                </button>
                                <Link href="/products" style={{ fontSize: 13, color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
                                    ← Lanjut Belanja
                                </Link>
                            </div>
                        </div>
                    </div>

                    {/* Summary Box */}
                    <div style={{ position: "sticky", top: 100 }}>
                        <div style={{ background: "white", borderRadius: 16, border: "1px solid #F1F5F9", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                            <div style={{ padding: "20px", borderBottom: "1px solid #F1F5F9" }}>
                                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 17, fontWeight: 700, color: "var(--gray-900)" }}>
                                    Ringkasan Pesanan
                                </h3>
                            </div>
                            <div style={{ padding: "20px" }}>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                        <span style={{ color: "var(--gray-500)" }}>Subtotal ({cartItems.length} item)</span>
                                        <span style={{ fontWeight: 600, color: "var(--gray-800)" }}>{formatPrice(subtotal)}</span>
                                    </div>
                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 14 }}>
                                        <span style={{ color: "var(--gray-500)" }}>Biaya Pengiriman</span>
                                        <span style={{ fontWeight: 600, color: shippingCost === 0 ? "#16A34A" : "var(--gray-800)" }}>
                                            {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                                        </span>
                                    </div>

                                    {/* Promo Code */}
                                    <div style={{ marginTop: 4 }}>
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <div style={{ position: "relative", flex: 1 }}>
                                                <Tag size={14} style={{ position: "absolute", left: 10, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                                <input
                                                    type="text"
                                                    placeholder="Kode promo"
                                                    className="input-field"
                                                    style={{ paddingLeft: 32, paddingTop: 8, paddingBottom: 8, fontSize: 13 }}
                                                />
                                            </div>
                                            <button style={{
                                                padding: "8px 14px",
                                                borderRadius: 8,
                                                border: "1.5px solid var(--primary)",
                                                background: "white",
                                                color: "var(--primary)",
                                                fontSize: 13,
                                                fontWeight: 600,
                                                cursor: "pointer",
                                            }}>
                                                Pakai
                                            </button>
                                        </div>
                                    </div>

                                    <div className="divider" style={{ margin: "8px 0" }} />

                                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                        <span style={{ fontSize: 16, fontWeight: 700, color: "var(--gray-900)" }}>Total</span>
                                        <span style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>
                                            {formatPrice(total)}
                                        </span>
                                    </div>
                                </div>

                                <Link href="/checkout" className="btn-primary" style={{ width: "100%", marginTop: 20, fontSize: 15, padding: "14px", borderRadius: 10 }}>
                                    Checkout Sekarang <ArrowRight size={16} />
                                </Link>

                                <div style={{ display: "flex", flexDirection: "column", gap: 8, marginTop: 16 }}>
                                    {[
                                        { icon: <Shield size={14} />, text: "Transaksi 100% aman & terenkripsi" },
                                        { icon: <Package size={14} />, text: "Kemasan rapi & terjamin kualitasnya" },
                                    ].map((item, i) => (
                                        <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 12, color: "var(--gray-500)" }}>
                                            <span style={{ color: "var(--primary)" }}>{item.icon}</span>
                                            {item.text}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <style jsx global>{`
          /* ── Cart layout ── */
          .cart-layout {
            display: grid;
            grid-template-columns: 1fr 360px;
            gap: 28px;
            align-items: start;
          }

          /* Desktop table row */
          .cart-item-row {
            display: grid;
            grid-template-columns: 1fr 100px 140px 80px;
            padding: 18px 20px;
            align-items: center;
          }

          /* ── Mobile ── */
          @media (max-width: 768px) {
            /* Stack summary below items */
            .cart-layout {
              grid-template-columns: 1fr !important;
              gap: 16px;
            }

            /* Hide table header */
            .cart-table-header { display: none !important; }

            /* Each cart item: product full width, then price/qty/subtotal in a row */
            .cart-item-row {
              display: flex !important;
              flex-direction: column !important;
              padding: 14px 16px !important;
              gap: 10px;
            }
            .cart-col-price,
            .cart-col-qty,
            .cart-col-subtotal {
              text-align: left !important;
            }
            /* Mini row for price / qty / subtotal */
            .cart-col-price  { order: 2; font-size: 13px; color: var(--gray-500); }
            .cart-col-qty    { order: 3; justify-content: flex-start !important; }
            .cart-col-subtotal { order: 4; font-size: 16px; }
          }
        `}</style>
        </div>
    );
}
