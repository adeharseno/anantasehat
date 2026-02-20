"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { User, Mail, Phone, MapPin, CreditCard, Smartphone, ChevronRight, Shield, Truck, Info } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/Toast";

const productEmojis: Record<string, string> = {
    "obat-bebas": "💊", "vitamin-suplemen": "🫐", "obat-keras": "💉",
    "herbal-tradisional": "🌿", "perawatan-kulit": "🧴", "alat-kesehatan": "🩺",
    "obat-mata-tht": "👁️", "p3k-antiseptik": "🩹",
};

export default function CheckoutPage() {
    const router = useRouter();
    const { cartItems, getCartTotal, isLoggedIn, user, createOrder, clearCart } = useStore();
    const { showToast } = useToast();

    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        city: "",
        postalCode: "",
        notes: "",
    });
    const [paymentMethod, setPaymentMethod] = useState<"bank_transfer" | "qris">("bank_transfer");
    const [selectedBank, setSelectedBank] = useState("BCA");
    const [useProfileData, setUseProfileData] = useState(false);
    const [loading, setLoading] = useState(false);

    const subtotal = getCartTotal();
    const shippingCost = subtotal >= 150000 ? 0 : 15000;
    const total = subtotal + shippingCost;

    useEffect(() => {
        if (isLoggedIn && user) {
            setUseProfileData(true);
            setForm({
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
                city: "",
                postalCode: "",
                notes: "",
            });
        }
    }, [isLoggedIn, user]);

    const handleUseProfile = (use: boolean) => {
        setUseProfileData(use);
        if (use && user) {
            setForm((f) => ({
                ...f,
                name: user.name || "",
                email: user.email || "",
                phone: user.phone || "",
                address: user.address || "",
            }));
        } else {
            setForm({ name: "", email: "", phone: "", address: "", city: "", postalCode: "", notes: "" });
        }
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (cartItems.length === 0) return;

        setLoading(true);
        await new Promise((r) => setTimeout(r, 1000));

        const bankInfo = {
            BCA: { bankName: "Bank BCA", accountNumber: "1234-5678-90" },
            BNI: { bankName: "Bank BNI", accountNumber: "0987-6543-21" },
            BRI: { bankName: "Bank BRI", accountNumber: "5678-9012-34" },
            Mandiri: { bankName: "Bank Mandiri", accountNumber: "1357-2468-90" },
        };

        const order = createOrder({
            items: cartItems,
            total,
            paymentMethod,
            status: "waiting_payment",
            ...(paymentMethod === "bank_transfer" ? bankInfo[selectedBank as keyof typeof bankInfo] : {}),
        });

        clearCart();
        setLoading(false);
        showToast("Pesanan berhasil dibuat!");
        router.push(`/payment/${order.id}`);
    };

    if (cartItems.length === 0) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column", gap: 16 }}>
                <div style={{ fontSize: 60 }}>🛒</div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--gray-700)" }}>Keranjang masih kosong</h2>
                <Link href="/products" className="btn-primary">Mulai Belanja</Link>
            </div>
        );
    }

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Header */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "20px 0" }}>
                <div className="container-custom">
                    <nav className="breadcrumb" style={{ marginBottom: 8 }}>
                        <a href="/">Beranda</a><span>/</span>
                        <a href="/cart">Keranjang</a><span>/</span>
                        <span>Checkout</span>
                    </nav>
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {[
                            { num: 1, label: "Keranjang", active: false },
                            { num: 2, label: "Checkout", active: true },
                            { num: 3, label: "Pembayaran", active: false },
                        ].map((step, i) => (
                            <React.Fragment key={step.num}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                        width: 28,
                                        height: 28,
                                        borderRadius: "50%",
                                        background: step.active ? "var(--primary)" : i < 1 ? "#16A34A" : "#E5E7EB",
                                        color: step.active || i < 1 ? "white" : "var(--gray-400)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 13, fontWeight: 700,
                                    }}>
                                        {i < 1 ? "✓" : step.num}
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: step.active ? 600 : 400, color: step.active ? "var(--primary)" : "var(--gray-400)" }}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < 2 && <div style={{ flex: 1, height: 1, background: "#E5E7EB", maxWidth: 40 }} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <form onSubmit={handleSubmit}>
                <div className="container-custom" style={{ padding: "24px 16px" }}>
                    <div className="checkout-layout">
                        {/* Left: Form */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                            {/* Use Profile Data Option */}
                            {isLoggedIn && (
                                <div style={{ background: "white", borderRadius: 16, padding: "20px", border: "1px solid #F1F5F9" }}>
                                    <div style={{ display: "flex", alignItems: "center", gap: 12 }}>
                                        <div style={{
                                            width: 40, height: 40, borderRadius: "50%",
                                            background: "linear-gradient(135deg, var(--primary) 0%, #00B4AA 100%)",
                                            display: "flex", alignItems: "center", justifyContent: "center",
                                            color: "white", fontWeight: 700, fontSize: 16,
                                        }}>
                                            {user?.name?.[0] || "U"}
                                        </div>
                                        <div>
                                            <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)" }}>Masuk sebagai {user?.name}</div>
                                            <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{user?.email}</div>
                                        </div>
                                    </div>
                                    <div style={{ marginTop: 14, display: "flex", gap: 10 }}>
                                        <button
                                            type="button"
                                            onClick={() => handleUseProfile(true)}
                                            style={{
                                                padding: "8px 16px",
                                                borderRadius: 8,
                                                border: "1.5px solid",
                                                borderColor: useProfileData ? "var(--primary)" : "var(--gray-200)",
                                                background: useProfileData ? "var(--primary-light)" : "white",
                                                color: useProfileData ? "var(--primary)" : "var(--gray-600)",
                                                fontSize: 13, fontWeight: 600, cursor: "pointer",
                                            }}
                                        >
                                            ✓ Gunakan Data Profil
                                        </button>
                                        <button
                                            type="button"
                                            onClick={() => handleUseProfile(false)}
                                            style={{
                                                padding: "8px 16px",
                                                borderRadius: 8,
                                                border: "1.5px solid var(--gray-200)",
                                                background: "white",
                                                color: "var(--gray-600)",
                                                fontSize: 13, fontWeight: 500, cursor: "pointer",
                                            }}
                                        >
                                            Isi Data Baru
                                        </button>
                                    </div>
                                </div>
                            )}

                            {/* Personal Info */}
                            <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9" }}>
                                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                                    <User size={18} color="var(--primary)" /> Data Pemesan
                                </h2>
                                <div className="co-form-grid">
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                            Nama Lengkap <span style={{ color: "#EF4444" }}>*</span>
                                        </label>
                                        <div style={{ position: "relative" }}>
                                            <User size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                            <input required value={form.name} onChange={(e) => setForm((f) => ({ ...f, name: e.target.value }))}
                                                className="input-field" style={{ paddingLeft: 36 }} placeholder="Nama lengkap" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                            Email <span style={{ color: "#EF4444" }}>*</span>
                                        </label>
                                        <div style={{ position: "relative" }}>
                                            <Mail size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                            <input required type="email" value={form.email} onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
                                                className="input-field" style={{ paddingLeft: 36 }} placeholder="email@example.com" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                            No. Telepon <span style={{ color: "#EF4444" }}>*</span>
                                        </label>
                                        <div style={{ position: "relative" }}>
                                            <Phone size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                            <input required value={form.phone} onChange={(e) => setForm((f) => ({ ...f, phone: e.target.value }))}
                                                className="input-field" style={{ paddingLeft: 36 }} placeholder="08xxxxxxxxxx" />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                            Kota/Kabupaten <span style={{ color: "#EF4444" }}>*</span>
                                        </label>
                                        <input required value={form.city} onChange={(e) => setForm((f) => ({ ...f, city: e.target.value }))}
                                            className="input-field" placeholder="Contoh: Jakarta Selatan" />
                                    </div>
                                    <div style={{ gridColumn: "1 / -1" }}>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                            Alamat Lengkap <span style={{ color: "#EF4444" }}>*</span>
                                        </label>
                                        <div style={{ position: "relative" }}>
                                            <MapPin size={15} style={{ position: "absolute", left: 12, top: 12, color: "var(--gray-400)" }} />
                                            <textarea required value={form.address} onChange={(e) => setForm((f) => ({ ...f, address: e.target.value }))}
                                                className="input-field" style={{ paddingLeft: 36, minHeight: 80, resize: "vertical" }}
                                                placeholder="Jl. Nama Jalan No. XX, RT/RW, Kelurahan, Kecamatan..." />
                                        </div>
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Kode Pos</label>
                                        <input value={form.postalCode} onChange={(e) => setForm((f) => ({ ...f, postalCode: e.target.value }))}
                                            className="input-field" placeholder="12345" />
                                    </div>
                                    <div>
                                        <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Catatan Pesanan</label>
                                        <input value={form.notes} onChange={(e) => setForm((f) => ({ ...f, notes: e.target.value }))}
                                            className="input-field" placeholder="Catatan untuk kurir (opsional)" />
                                    </div>
                                </div>
                            </div>

                            {/* Payment Method */}
                            <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9" }}>
                                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)", marginBottom: 20, display: "flex", alignItems: "center", gap: 8 }}>
                                    <CreditCard size={18} color="var(--primary)" /> Metode Pembayaran
                                </h2>
                                <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                    {/* Bank Transfer */}
                                    <div
                                        onClick={() => setPaymentMethod("bank_transfer")}
                                        style={{
                                            border: `2px solid ${paymentMethod === "bank_transfer" ? "var(--primary)" : "#E5E7EB"}`,
                                            borderRadius: 12,
                                            padding: "16px 18px",
                                            cursor: "pointer",
                                            background: paymentMethod === "bank_transfer" ? "var(--primary-light)" : "white",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <input type="radio" readOnly checked={paymentMethod === "bank_transfer"} style={{ accentColor: "var(--primary)" }} />
                                            <CreditCard size={18} color="var(--primary)" />
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-800)" }}>Transfer Bank</div>
                                                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>BCA, BNI, BRI, Mandiri</div>
                                            </div>
                                        </div>
                                        {paymentMethod === "bank_transfer" && (
                                            <div style={{ marginTop: 12, display: "flex", gap: 8, flexWrap: "wrap" }}>
                                                {["BCA", "BNI", "BRI", "Mandiri"].map((bank) => (
                                                    <button
                                                        key={bank}
                                                        type="button"
                                                        onClick={(e) => { e.stopPropagation(); setSelectedBank(bank); }}
                                                        style={{
                                                            padding: "6px 14px",
                                                            borderRadius: 8,
                                                            border: `1.5px solid ${selectedBank === bank ? "var(--primary)" : "#E5E7EB"}`,
                                                            background: selectedBank === bank ? "var(--primary)" : "white",
                                                            color: selectedBank === bank ? "white" : "var(--gray-600)",
                                                            fontSize: 13, fontWeight: 600, cursor: "pointer",
                                                            transition: "all 0.15s",
                                                        }}
                                                    >
                                                        {bank}
                                                    </button>
                                                ))}
                                            </div>
                                        )}
                                    </div>

                                    {/* QRIS */}
                                    <div
                                        onClick={() => setPaymentMethod("qris")}
                                        style={{
                                            border: `2px solid ${paymentMethod === "qris" ? "var(--primary)" : "#E5E7EB"}`,
                                            borderRadius: 12,
                                            padding: "16px 18px",
                                            cursor: "pointer",
                                            background: paymentMethod === "qris" ? "var(--primary-light)" : "white",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                                            <input type="radio" readOnly checked={paymentMethod === "qris"} style={{ accentColor: "var(--primary)" }} />
                                            <Smartphone size={18} color="var(--primary)" />
                                            <div>
                                                <div style={{ fontSize: 14, fontWeight: 700, color: "var(--gray-800)" }}>QRIS</div>
                                                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>Bayar via QR Code - GoPay, OVO, DANA, ShopeePay</div>
                                            </div>
                                        </div>
                                        {paymentMethod === "qris" && (
                                            <div style={{
                                                marginTop: 12,
                                                padding: "10px 12px",
                                                background: "#FFF7ED",
                                                borderRadius: 8,
                                                display: "flex",
                                                alignItems: "flex-start",
                                                gap: 8,
                                                fontSize: 12,
                                                color: "#92400E",
                                            }}>
                                                <Info size={14} style={{ flexShrink: 0, marginTop: 1 }} />
                                                QR Code akan ditampilkan pada halaman pembayaran. Berlaku 15 menit setelah pembayaran dibuat.
                                            </div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>

                        {/* Order Summary */}
                        <div style={{ position: "sticky", top: 100 }}>
                            <div style={{ background: "white", borderRadius: 16, border: "1px solid #F1F5F9", overflow: "hidden", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                                <div style={{ padding: "18px 20px", borderBottom: "1px solid #F1F5F9", background: "#F8FAFC" }}>
                                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)" }}>
                                        Ringkasan Pesanan
                                    </h3>
                                </div>
                                <div style={{ padding: "16px 20px", maxHeight: 280, overflowY: "auto" }}>
                                    {cartItems.map((item) => (
                                        <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 12 }}>
                                            <div style={{ width: 44, height: 44, borderRadius: 8, background: "#F0F7FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 20, flexShrink: 0 }}>
                                                {productEmojis[item.product.categorySlug] || "💊"}
                                            </div>
                                            <div style={{ flex: 1, minWidth: 0 }}>
                                                <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</div>
                                                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>×{item.quantity}</div>
                                            </div>
                                            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-800)", flexShrink: 0 }}>
                                                {formatPrice(item.product.price * item.quantity)}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                                <div style={{ padding: "16px 20px", borderTop: "1px solid #F1F5F9" }}>
                                    <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                            <span style={{ color: "var(--gray-500)" }}>Subtotal</span>
                                            <span style={{ fontWeight: 600 }}>{formatPrice(subtotal)}</span>
                                        </div>
                                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                            <span style={{ color: "var(--gray-500)" }}>Ongkos Kirim</span>
                                            <span style={{ fontWeight: 600, color: shippingCost === 0 ? "#16A34A" : "var(--gray-800)" }}>
                                                {shippingCost === 0 ? "GRATIS" : formatPrice(shippingCost)}
                                            </span>
                                        </div>
                                        <div className="divider" style={{ margin: "4px 0" }} />
                                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                                            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--gray-900)" }}>Total</span>
                                            <span style={{ fontSize: 18, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>
                                                {formatPrice(total)}
                                            </span>
                                        </div>
                                    </div>

                                    <button
                                        type="submit"
                                        disabled={loading}
                                        className="btn-primary"
                                        style={{ width: "100%", marginTop: 16, fontSize: 15, padding: "13px", borderRadius: 10, opacity: loading ? 0.7 : 1 }}
                                    >
                                        {loading ? "⏳ Memproses..." : `Bayar Sekarang →`}
                                    </button>

                                    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, marginTop: 12, fontSize: 12, color: "var(--gray-400)" }}>
                                        <Shield size={12} />
                                        <span>Pembayaran dienkripsi & aman</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </form>

            <style jsx global>{`
              /* ── Checkout layout ── */
              .checkout-layout {
                display: grid;
                grid-template-columns: 1fr 360px;
                gap: 28px;
                align-items: start;
              }
              .co-form-grid {
                display: grid;
                grid-template-columns: 1fr 1fr;
                gap: 16px;
              }

              /* ── Mobile ── */
              @media (max-width: 768px) {
                .checkout-layout {
                  grid-template-columns: 1fr !important;
                  gap: 16px;
                }
                .co-form-grid {
                  grid-template-columns: 1fr !important;
                }
              }
            `}</style>
        </div>
    );
}
