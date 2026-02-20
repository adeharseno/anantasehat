"use client";

import React, { useState, useEffect, useRef, Suspense } from "react";
import { useSearchParams, useRouter } from "next/navigation";
import Link from "next/link";
import {
    User, Mail, Phone, MapPin, Package, Upload,
    CheckCircle, LogOut, Edit3, Save, X,
    Clock, Truck, Check, ChevronDown, ChevronUp,
} from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/Toast";

/* ─── Status badge config ─── */
const STATUS: Record<string, { label: string; color: string; bg: string; icon: React.ReactNode }> = {
    waiting_payment: { label: "Menunggu Pembayaran", color: "#D97706", bg: "#FFF7ED", icon: <Clock size={13} /> },
    processing: { label: "Sedang Diproses", color: "#2563EB", bg: "#EFF6FF", icon: <Package size={13} /> },
    shipped: { label: "Sedang Dikirim", color: "#7C3AED", bg: "#F5F3FF", icon: <Truck size={13} /> },
    delivered: { label: "Telah Diterima", color: "#16A34A", bg: "#ECFDF5", icon: <Check size={13} /> },
    pending: { label: "Pending", color: "#6B7280", bg: "#F3F4F6", icon: <Clock size={13} /> },
};

const EMOJI: Record<string, string> = {
    "obat-bebas": "💊", "vitamin-suplemen": "🫐", "obat-keras": "💉",
    "herbal-tradisional": "🌿", "perawatan-kulit": "🧴", "alat-kesehatan": "🩺",
    "obat-mata-tht": "👁️", "p3k-antiseptik": "🩹",
};

/* ─── Field display row ─── */
function FieldRow({ icon, label, value }: { icon: React.ReactNode; label: string; value: string }) {
    return (
        <div>
            <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>
                {label}
            </p>
            <div style={{ display: "flex", alignItems: "center", gap: 10, padding: "11px 14px", background: "#F8FAFC", borderRadius: 10, border: "1px solid #F1F5F9" }}>
                <span style={{ color: "var(--gray-400)", flexShrink: 0 }}>{icon}</span>
                <span style={{ fontSize: 14, color: "var(--gray-700)", fontWeight: 500 }}>{value || "—"}</span>
            </div>
        </div>
    );
}

/* ─── Main page component ─── */
function ProfilePageContent() {
    const searchParams = useSearchParams();
    const router = useRouter();
    const { user, isLoggedIn, logout, updateProfile, orders, uploadPaymentProof } = useStore();
    const { showToast } = useToast();

    const [tab, setTab] = useState(searchParams.get("tab") || "profil");
    const [editing, setEditing] = useState(false);
    const [form, setForm] = useState({ name: "", email: "", phone: "", address: "" });
    const [openOrder, setOpenOrder] = useState<string | null>(null);
    const fileRef = useRef<HTMLInputElement>(null);

    /* sync URL tab param */
    useEffect(() => {
        const t = searchParams.get("tab");
        if (t) setTab(t);
    }, [searchParams]);

    /* redirect if not logged in, fill form */
    useEffect(() => {
        if (!isLoggedIn) { router.push("/login"); return; }
        if (user) setForm({ name: user.name, email: user.email, phone: user.phone, address: user.address });
    }, [isLoggedIn, user, router]);

    const cancelEdit = () => {
        setEditing(false);
        if (user) setForm({ name: user.name, email: user.email, phone: user.phone, address: user.address });
    };

    const saveEdit = () => {
        updateProfile(form);
        showToast("Profil berhasil diperbarui! ✅");
        setEditing(false);
    };

    const handleLogout = () => {
        logout();
        showToast("Berhasil keluar dari akun", "warning");
        router.push("/");
    };

    const uploadProof = (orderId: string, e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (!file) return;
        const reader = new FileReader();
        reader.onload = () => { uploadPaymentProof(orderId, reader.result as string); showToast("Bukti pembayaran berhasil diupload! ✅"); };
        reader.readAsDataURL(file);
    };

    if (!isLoggedIn || !user) return null;

    const NAV = [
        { id: "profil", label: "Profil Saya", icon: <User size={16} /> },
        { id: "pesanan", label: "Riwayat Pesanan", icon: <Package size={16} /> },
    ];

    return (
        <div style={{ background: "#F1F5F9", minHeight: "100vh" }}>

            {/* ── Blue header banner ── */}
            <div style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #0F4C78 100%)", padding: "32px 0 32px" }}>
                <div className="container-custom" style={{ padding: "0 24px" }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 18 }}>
                        {/* Avatar */}
                        <div style={{
                            width: 64, height: 64, borderRadius: "50%",
                            background: "rgba(255,255,255,0.18)",
                            border: "3px solid rgba(255,255,255,0.35)",
                            display: "flex", alignItems: "center", justifyContent: "center",
                            fontSize: 26, fontWeight: 800, color: "white", flexShrink: 0,
                        }}>
                            {user.name?.[0]?.toUpperCase() || "U"}
                        </div>
                        <div>
                            <h1 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 2 }}>
                                {user.name}
                            </h1>
                            <p style={{ fontSize: 13, color: "rgba(255,255,255,0.75)", marginBottom: 8 }}>{user.email}</p>
                            <div style={{ display: "flex", gap: 6, flexWrap: "wrap" }}>
                                <span style={{ fontSize: 11, background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>
                                    👤 Member
                                </span>
                                <span style={{ fontSize: 11, background: "rgba(255,255,255,0.15)", color: "rgba(255,255,255,0.9)", padding: "3px 10px", borderRadius: 100, fontWeight: 600 }}>
                                    📦 {orders.length} Pesanan
                                </span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* ── Body ── */}
            <div className="container-custom" style={{ padding: "28px 24px 60px" }}>
                <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 20, alignItems: "start" }} className="profile-layout">

                    {/* ── Sidebar (desktop) ── */}
                    <nav style={{ background: "white", borderRadius: 14, padding: "12px", border: "1px solid #E8EEF4", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                        {NAV.map((n) => (
                            <button
                                key={n.id}
                                onClick={() => setTab(n.id)}
                                style={{
                                    display: "flex", alignItems: "center", gap: 10,
                                    width: "100%", padding: "11px 14px",
                                    borderRadius: 10, border: "none", cursor: "pointer",
                                    background: tab === n.id ? "var(--primary)" : "transparent",
                                    color: tab === n.id ? "white" : "var(--gray-600)",
                                    fontWeight: tab === n.id ? 700 : 500,
                                    fontSize: 14, textAlign: "left",
                                    transition: "all 0.18s",
                                    marginBottom: 4,
                                }}
                            >
                                {n.icon} {n.label}
                            </button>
                        ))}
                        <hr style={{ border: "none", borderTop: "1px solid #F1F5F9", margin: "8px 0" }} />
                        <button
                            onClick={handleLogout}
                            style={{
                                display: "flex", alignItems: "center", gap: 10,
                                width: "100%", padding: "10px 14px",
                                borderRadius: 10, border: "none", cursor: "pointer",
                                background: "transparent", color: "#EF4444",
                                fontSize: 14, fontWeight: 500, textAlign: "left",
                            }}
                        >
                            <LogOut size={15} /> Keluar
                        </button>
                    </nav>

                    {/* ── Main content ── */}
                    <div>
                        {/* Mobile tab bar */}
                        <div className="profile-mobile-tabs" style={{ display: "none", gap: 8, marginBottom: 16 }}>
                            {NAV.map((n) => (
                                <button
                                    key={n.id}
                                    onClick={() => setTab(n.id)}
                                    style={{
                                        flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                        padding: "10px", borderRadius: 10, border: "1.5px solid",
                                        borderColor: tab === n.id ? "var(--primary)" : "#E5E7EB",
                                        background: tab === n.id ? "var(--primary)" : "white",
                                        color: tab === n.id ? "white" : "var(--gray-600)",
                                        fontWeight: 600, fontSize: 13, cursor: "pointer",
                                    }}
                                >
                                    {n.icon} {n.label}
                                </button>
                            ))}
                        </div>

                        {/* ── Profile tab ── */}
                        {tab === "profil" && (
                            <div style={{ background: "white", borderRadius: 14, padding: "24px", border: "1px solid #E8EEF4", boxShadow: "0 2px 12px rgba(0,0,0,0.06)" }}>
                                {/* Header row */}
                                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 22 }}>
                                    <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 17, fontWeight: 700, color: "var(--gray-900)" }}>
                                        Data Diri
                                    </h2>
                                    {!editing ? (
                                        <button
                                            onClick={() => setEditing(true)}
                                            style={{
                                                display: "flex", alignItems: "center", gap: 6,
                                                padding: "8px 16px", borderRadius: 8,
                                                border: "1.5px solid var(--primary)",
                                                background: "white", color: "var(--primary)",
                                                fontSize: 13, fontWeight: 600, cursor: "pointer",
                                            }}
                                        >
                                            <Edit3 size={14} /> Edit Profil
                                        </button>
                                    ) : (
                                        <div style={{ display: "flex", gap: 8 }}>
                                            <button onClick={cancelEdit}
                                                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 14px", borderRadius: 8, border: "1.5px solid #E5E7EB", background: "white", color: "var(--gray-600)", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                                <X size={13} /> Batal
                                            </button>
                                            <button onClick={saveEdit}
                                                style={{ display: "flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, border: "none", background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                                <Save size={13} /> Simpan
                                            </button>
                                        </div>
                                    )}
                                </div>

                                {/* Fields */}
                                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 14 }} className="profile-fields">
                                    {editing ? (
                                        <>
                                            {[
                                                { key: "name", label: "Nama Lengkap", icon: <User size={14} />, type: "text", placeholder: "Nama lengkap" },
                                                { key: "email", label: "Email", icon: <Mail size={14} />, type: "email", placeholder: "email@example.com" },
                                                { key: "phone", label: "No. Telepon", icon: <Phone size={14} />, type: "text", placeholder: "0812xxxxxxxx" },
                                            ].map((f) => (
                                                <div key={f.key}>
                                                    <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>{f.label}</p>
                                                    <div style={{ position: "relative" }}>
                                                        <span style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }}>{f.icon}</span>
                                                        <input type={f.type} value={form[f.key as keyof typeof form]} placeholder={f.placeholder}
                                                            onChange={(e) => setForm((prev) => ({ ...prev, [f.key]: e.target.value }))}
                                                            className="input-field" style={{ paddingLeft: 36 }} />
                                                    </div>
                                                </div>
                                            ))}
                                            <div style={{ gridColumn: "1 / -1" }}>
                                                <p style={{ fontSize: 11, fontWeight: 700, color: "var(--gray-400)", textTransform: "uppercase", letterSpacing: 0.8, marginBottom: 6 }}>Alamat Lengkap</p>
                                                <div style={{ position: "relative" }}>
                                                    <span style={{ position: "absolute", left: 12, top: 12, color: "var(--gray-400)" }}><MapPin size={14} /></span>
                                                    <textarea value={form.address} placeholder="Alamat lengkap..."
                                                        onChange={(e) => setForm((prev) => ({ ...prev, address: e.target.value }))}
                                                        className="input-field" style={{ paddingLeft: 36, minHeight: 80, resize: "vertical" }} />
                                                </div>
                                            </div>
                                        </>
                                    ) : (
                                        <>
                                            <FieldRow icon={<User size={14} />} label="Nama Lengkap" value={user.name} />
                                            <FieldRow icon={<Mail size={14} />} label="Email" value={user.email} />
                                            <FieldRow icon={<Phone size={14} />} label="No. Telepon" value={user.phone} />
                                            <div style={{ gridColumn: "1 / -1" }}>
                                                <FieldRow icon={<MapPin size={14} />} label="Alamat Lengkap" value={user.address} />
                                            </div>
                                        </>
                                    )}
                                </div>
                            </div>
                        )}

                        {/* ── Orders tab ── */}
                        {tab === "pesanan" && (
                            <div>
                                <h2 style={{ fontFamily: "Poppins,sans-serif", fontSize: 17, fontWeight: 700, color: "var(--gray-900)", marginBottom: 16 }}>
                                    Riwayat Pesanan
                                </h2>

                                {orders.length === 0 ? (
                                    <div style={{ background: "white", borderRadius: 14, padding: "56px 20px", textAlign: "center", border: "1px solid #E8EEF4" }}>
                                        <div style={{ fontSize: 54, marginBottom: 12 }}>📭</div>
                                        <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 17, fontWeight: 600, color: "var(--gray-700)", marginBottom: 8 }}>Belum Ada Pesanan</h3>
                                        <p style={{ fontSize: 14, color: "var(--gray-400)", marginBottom: 20 }}>Mulai belanja dan pesanan Anda akan muncul di sini</p>
                                        <Link href="/products" className="btn-primary">Belanja Sekarang</Link>
                                    </div>
                                ) : (
                                    <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                                        {orders.map((order) => {
                                            const st = STATUS[order.status] ?? STATUS.pending;
                                            const open = openOrder === order.id;
                                            return (
                                                <div key={order.id} style={{ background: "white", borderRadius: 14, border: "1px solid #E8EEF4", overflow: "hidden", boxShadow: "0 2px 8px rgba(0,0,0,0.04)" }}>
                                                    {/* Order summary row */}
                                                    <button
                                                        onClick={() => setOpenOrder(open ? null : order.id)}
                                                        style={{
                                                            width: "100%", display: "flex", justifyContent: "space-between", alignItems: "center",
                                                            padding: "16px 18px", border: "none", background: "none", cursor: "pointer", textAlign: "left",
                                                        }}
                                                    >
                                                        <div>
                                                            <div style={{ fontSize: 13, fontWeight: 700, color: "var(--primary)", marginBottom: 3 }}>{order.id}</div>
                                                            <div style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 4 }}>
                                                                {new Date(order.createdAt).toLocaleDateString("id-ID", { day: "numeric", month: "long", year: "numeric" })}
                                                            </div>
                                                            <div style={{ fontSize: 13, color: "var(--gray-600)" }}>
                                                                {order.items.length} produk ·{" "}
                                                                <strong style={{ color: "var(--primary)" }}>{formatPrice(order.total)}</strong>
                                                            </div>
                                                        </div>
                                                        <div style={{ display: "flex", flexDirection: "column", alignItems: "flex-end", gap: 8, flexShrink: 0, marginLeft: 12 }}>
                                                            <span style={{
                                                                display: "inline-flex", alignItems: "center", gap: 5,
                                                                padding: "4px 10px", borderRadius: 100,
                                                                background: st.bg, color: st.color,
                                                                fontSize: 11, fontWeight: 700,
                                                            }}>
                                                                {st.icon} {st.label}
                                                            </span>
                                                            {open ? <ChevronUp size={16} color="var(--gray-400)" /> : <ChevronDown size={16} color="var(--gray-400)" />}
                                                        </div>
                                                    </button>

                                                    {/* Expanded detail */}
                                                    {open && (
                                                        <div style={{ borderTop: "1px solid #F1F5F9", padding: "16px 18px" }}>
                                                            {/* Items list */}
                                                            <div style={{ marginBottom: 14 }}>
                                                                {order.items.map((item) => (
                                                                    <div key={item.product.id} style={{ display: "flex", alignItems: "center", gap: 12, paddingBottom: 10, borderBottom: "1px solid #F9FAFB", marginBottom: 10 }}>
                                                                        <div style={{ width: 38, height: 38, borderRadius: 8, background: "#EFF6FF", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 18, flexShrink: 0 }}>
                                                                            {EMOJI[item.product.categorySlug] || "💊"}
                                                                        </div>
                                                                        <div style={{ flex: 1, minWidth: 0 }}>
                                                                            <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-800)", overflow: "hidden", textOverflow: "ellipsis", whiteSpace: "nowrap" }}>{item.product.name}</div>
                                                                            <div style={{ fontSize: 12, color: "var(--gray-400)" }}>×{item.quantity} · {formatPrice(item.product.price)}</div>
                                                                        </div>
                                                                        <div style={{ fontSize: 13, fontWeight: 700, color: "var(--gray-700)", flexShrink: 0 }}>{formatPrice(item.product.price * item.quantity)}</div>
                                                                    </div>
                                                                ))}
                                                            </div>

                                                            {/* Payment info */}
                                                            <div style={{ background: "#F8FAFC", borderRadius: 10, padding: "12px 14px", marginBottom: 12 }}>
                                                                <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13, marginBottom: order.trackingNumber ? 6 : 0 }}>
                                                                    <span style={{ color: "var(--gray-500)" }}>Metode Pembayaran</span>
                                                                    <span style={{ fontWeight: 600, color: "var(--gray-700)" }}>
                                                                        {order.paymentMethod === "bank_transfer" ? `Transfer ${order.bankName}` : "QRIS"}
                                                                    </span>
                                                                </div>
                                                                {order.trackingNumber && (
                                                                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 13 }}>
                                                                        <span style={{ color: "var(--gray-500)" }}>No. Resi</span>
                                                                        <span style={{ fontWeight: 600, color: "var(--primary)" }}>{order.trackingNumber}</span>
                                                                    </div>
                                                                )}
                                                            </div>

                                                            {/* Upload proof */}
                                                            {order.status === "waiting_payment" && (
                                                                <div style={{ border: "2px dashed #E5E7EB", borderRadius: 10, padding: "14px", textAlign: "center" }}>
                                                                    {order.paymentProof ? (
                                                                        <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center" }}>
                                                                            <CheckCircle size={16} color="#16A34A" />
                                                                            <span style={{ fontSize: 13, fontWeight: 600, color: "#16A34A" }}>Bukti pembayaran telah diupload</span>
                                                                        </div>
                                                                    ) : (
                                                                        <>
                                                                            <Upload size={22} color="var(--gray-400)" style={{ marginBottom: 6 }} />
                                                                            <p style={{ fontSize: 12, color: "var(--gray-500)", marginBottom: 10 }}>Upload bukti transfer untuk konfirmasi pembayaran</p>
                                                                            <input type="file" accept="image/*" ref={fileRef} onChange={(e) => uploadProof(order.id, e)} style={{ display: "none" }} id={`proof-${order.id}`} />
                                                                            <label htmlFor={`proof-${order.id}`} style={{ display: "inline-flex", alignItems: "center", gap: 6, padding: "8px 16px", borderRadius: 8, background: "var(--primary)", color: "white", fontSize: 13, fontWeight: 600, cursor: "pointer" }}>
                                                                                <Upload size={13} /> Upload Bukti Pembayaran
                                                                            </label>
                                                                        </>
                                                                    )}
                                                                </div>
                                                            )}

                                                            {/* Shipped notice */}
                                                            {order.status === "shipped" && (
                                                                <div style={{ background: "#F5F3FF", borderRadius: 10, padding: "12px 14px", display: "flex", alignItems: "center", gap: 10, marginTop: 8 }}>
                                                                    <Truck size={16} color="#7C3AED" />
                                                                    <div>
                                                                        <div style={{ fontSize: 13, fontWeight: 600, color: "#7C3AED" }}>Paket Sedang Dalam Perjalanan</div>
                                                                        <div style={{ fontSize: 12, color: "#9CA3AF" }}>Estimasi tiba 1-2 hari kerja</div>
                                                                    </div>
                                                                </div>
                                                            )}
                                                        </div>
                                                    )}
                                                </div>
                                            );
                                        })}
                                    </div>
                                )}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Responsive styles */}
            <style jsx global>{`
        /* Stack layout on mobile */
        @media (max-width: 640px) {
          .profile-layout {
            grid-template-columns: 1fr !important;
          }
          .profile-layout > nav {
            display: none !important;
          }
          .profile-mobile-tabs {
            display: flex !important;
          }
          .profile-fields {
            grid-template-columns: 1fr !important;
          }
          .profile-fields > div[style*="1 / -1"] {
            grid-column: 1 / -1;
          }
        }
      `}</style>
        </div>
    );
}

export default function ProfilePage() {
    return (
        <Suspense fallback={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <p style={{ color: "var(--gray-400)" }}>Memuat...</p>
            </div>
        }>
            <ProfilePageContent />
        </Suspense>
    );
}
