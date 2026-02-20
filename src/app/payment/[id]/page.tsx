"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { Copy, CheckCircle, Clock, QrCode, Building2, AlertCircle, ChevronRight } from "lucide-react";
import { useStore } from "@/lib/store";
import { formatPrice } from "@/lib/data";
import { useToast } from "@/components/Toast";

const PAYMENT_DURATION = 15 * 60; // 15 minutes

export default function PaymentPage() {
    const params = useParams();
    const router = useRouter();
    const { orders } = useStore();
    const { showToast } = useToast();
    const [timeLeft, setTimeLeft] = useState(PAYMENT_DURATION);
    const [copied, setCopied] = useState<string | null>(null);

    const order = orders.find((o) => o.id === params.id);

    useEffect(() => {
        if (!order) return;
        const interval = setInterval(() => {
            setTimeLeft((t) => {
                if (t <= 1) {
                    clearInterval(interval);
                    return 0;
                }
                return t - 1;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, [order]);

    if (!order) {
        return (
            <div style={{ minHeight: "60vh", display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 16 }}>
                <div style={{ fontSize: 60 }}>🔍</div>
                <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 20, fontWeight: 700, color: "var(--gray-700)" }}>Pesanan tidak ditemukan</h2>
                <Link href="/" className="btn-primary">Kembali ke Beranda</Link>
            </div>
        );
    }

    const minutes = Math.floor(timeLeft / 60);
    const seconds = timeLeft % 60;
    const progress = (timeLeft / PAYMENT_DURATION) * 100;
    const circumference = 2 * Math.PI * 50;
    const dashOffset = circumference * (1 - progress / 100);

    const handleCopy = (text: string, label: string) => {
        navigator.clipboard.writeText(text).then(() => {
            setCopied(label);
            showToast(`${label} berhasil disalin!`);
            setTimeout(() => setCopied(null), 2000);
        });
    };

    const handleSimulatePayment = () => {
        showToast("✅ Pembayaran berhasil dikonfirmasi! Pesanan sedang diproses.", "success");
        setTimeout(() => router.push("/profile?tab=pesanan"), 2000);
    };

    const bankDetails = {
        "Bank BCA": { color: "#003ea0", accountName: "PT Ananta Sehat Indonesia" },
        "Bank BNI": { color: "#e46624", accountName: "PT Ananta Sehat Indonesia" },
        "Bank BRI": { color: "#00529c", accountName: "PT Ananta Sehat Indonesia" },
        "Bank Mandiri": { color: "#003087", accountName: "PT Ananta Sehat Indonesia" },
    };

    const bankDetail = order.bankName ? bankDetails[order.bankName as keyof typeof bankDetails] : null;

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Header */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "20px 0" }}>
                <div className="container-custom">
                    <div style={{ display: "flex", alignItems: "center", gap: 16 }}>
                        {[
                            { num: 1, label: "Keranjang", done: true },
                            { num: 2, label: "Checkout", done: true },
                            { num: 3, label: "Pembayaran", active: true },
                        ].map((step, i) => (
                            <React.Fragment key={step.num}>
                                <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                    <div style={{
                                        width: 28, height: 28, borderRadius: "50%",
                                        background: step.done ? "#16A34A" : step.active ? "var(--primary)" : "#E5E7EB",
                                        color: "white",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 13, fontWeight: 700,
                                    }}>
                                        {step.done ? "✓" : step.num}
                                    </div>
                                    <span style={{ fontSize: 14, fontWeight: step.active ? 600 : 400, color: step.active ? "var(--primary)" : step.done ? "#16A34A" : "var(--gray-400)" }}>
                                        {step.label}
                                    </span>
                                </div>
                                {i < 2 && <div style={{ flex: 1, height: 1, background: "#E5E7EB", maxWidth: 40 }} />}
                            </React.Fragment>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "40px 24px" }}>
                <div style={{ maxWidth: 680, margin: "0 auto" }}>
                    {/* Success Banner */}
                    <div style={{
                        background: "linear-gradient(135deg, #065F46 0%, #047857 100%)",
                        borderRadius: 16,
                        padding: "24px 28px",
                        display: "flex",
                        alignItems: "flex-start",
                        gap: 16,
                        marginBottom: 24,
                    }}>
                        <CheckCircle size={28} color="#6EE7B7" style={{ flexShrink: 0 }} />
                        <div>
                            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 700, color: "white", marginBottom: 4 }}>
                                Pesanan Berhasil Dibuat! 🎉
                            </h2>
                            <p style={{ fontSize: 14, color: "rgba(255,255,255,0.85)", lineHeight: 1.5 }}>
                                Nomor pesanan Anda: <strong style={{ color: "#6EE7B7" }}>{order.id}</strong><br />
                                Selesaikan pembayaran sebelum waktu habis.
                            </p>
                        </div>
                    </div>

                    {/* Countdown Timer */}
                    <div style={{
                        background: "white",
                        borderRadius: 16,
                        padding: "28px",
                        border: timeLeft < 300 ? "2px solid #FCA5A5" : "1px solid #F1F5F9",
                        marginBottom: 20,
                        textAlign: "center",
                        boxShadow: "0 4px 20px rgba(0,0,0,0.06)",
                    }}>
                        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginBottom: 16 }}>
                            <Clock size={18} color={timeLeft < 300 ? "#DC2626" : "var(--primary)"} />
                            <span style={{ fontSize: 14, fontWeight: 600, color: timeLeft < 300 ? "#DC2626" : "var(--gray-700)" }}>
                                Batas Waktu Pembayaran
                            </span>
                        </div>

                        <div style={{ position: "relative", display: "inline-flex", alignItems: "center", justifyContent: "center" }}>
                            <svg width="140" height="140" style={{ transform: "rotate(-90deg)" }}>
                                <circle cx="70" cy="70" r="55" fill="none" stroke="#F3F4F6" strokeWidth="8" />
                                <circle
                                    cx="70" cy="70" r="55"
                                    fill="none"
                                    stroke={timeLeft < 300 ? "#DC2626" : "var(--primary)"}
                                    strokeWidth="8"
                                    strokeLinecap="round"
                                    strokeDasharray={circumference}
                                    strokeDashoffset={dashOffset}
                                    style={{ transition: "stroke-dashoffset 1s linear" }}
                                />
                            </svg>
                            <div style={{
                                position: "absolute",
                                display: "flex",
                                flexDirection: "column",
                                alignItems: "center",
                            }}>
                                <span style={{
                                    fontSize: 26,
                                    fontWeight: 800,
                                    fontFamily: "Poppins, sans-serif",
                                    color: timeLeft < 300 ? "#DC2626" : "var(--gray-900)",
                                }}>
                                    {String(minutes).padStart(2, "0")}:{String(seconds).padStart(2, "0")}
                                </span>
                                <span style={{ fontSize: 11, color: "var(--gray-400)", marginTop: 2 }}>menit:detik</span>
                            </div>
                        </div>

                        {timeLeft === 0 && (
                            <div style={{ marginTop: 16, display: "flex", alignItems: "center", gap: 8, justifyContent: "center", color: "#DC2626", fontWeight: 600, fontSize: 14 }}>
                                <AlertCircle size={16} />
                                Waktu pembayaran telah habis. Silakan buat pesanan baru.
                            </div>
                        )}
                    </div>

                    {/* Payment Details */}
                    {order.paymentMethod === "bank_transfer" && order.bankName && (
                        <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9", marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20 }}>
                                <Building2 size={20} color="var(--primary)" />
                                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)" }}>
                                    Detail Transfer Bank
                                </h3>
                            </div>

                            <div style={{
                                background: "#F8FAFC",
                                borderRadius: 12,
                                padding: "16px 18px",
                                borderLeft: `4px solid ${bankDetail?.color || "var(--primary)"}`,
                                marginBottom: 16,
                            }}>
                                <div style={{ fontSize: 18, fontWeight: 800, color: bankDetail?.color || "var(--primary)", fontFamily: "Poppins, sans-serif", marginBottom: 4 }}>
                                    {order.bankName}
                                </div>
                                <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{bankDetail?.accountName}</div>
                            </div>

                            {[
                                { label: "Nomor Rekening", value: order.accountNumber!, copyKey: "rekening" },
                                { label: "Jumlah Transfer", value: formatPrice(order.total), copyKey: "nominal" },
                                { label: "Berita Transfer", value: order.id, copyKey: "berita" },
                            ].map((item) => (
                                <div key={item.label} style={{
                                    display: "flex",
                                    justifyContent: "space-between",
                                    alignItems: "center",
                                    padding: "12px 0",
                                    borderBottom: "1px solid #F1F5F9",
                                }}>
                                    <div>
                                        <div style={{ fontSize: 12, color: "var(--gray-400)", marginBottom: 3 }}>{item.label}</div>
                                        <div style={{ fontSize: 16, fontWeight: 700, color: "var(--gray-900)", fontFamily: "Poppins, sans-serif" }}>{item.value}</div>
                                    </div>
                                    <button
                                        onClick={() => handleCopy(item.value, item.label)}
                                        style={{
                                            display: "flex", alignItems: "center", gap: 6,
                                            padding: "7px 12px",
                                            borderRadius: 8,
                                            border: "1.5px solid",
                                            borderColor: copied === item.label ? "#16A34A" : "var(--gray-200)",
                                            background: copied === item.label ? "#ECFDF5" : "white",
                                            color: copied === item.label ? "#16A34A" : "var(--gray-600)",
                                            fontSize: 12, fontWeight: 600, cursor: "pointer",
                                            transition: "all 0.2s",
                                        }}
                                    >
                                        {copied === item.label ? <CheckCircle size={13} /> : <Copy size={13} />}
                                        {copied === item.label ? "Disalin" : "Salin"}
                                    </button>
                                </div>
                            ))}

                            <div style={{
                                marginTop: 16,
                                padding: "12px 14px",
                                borderRadius: 10,
                                background: "#FFF7ED",
                                border: "1px solid #FED7AA",
                                display: "flex",
                                alignItems: "flex-start",
                                gap: 10,
                                fontSize: 13,
                                color: "#92400E",
                            }}>
                                <AlertCircle size={16} style={{ flexShrink: 0, marginTop: 1 }} />
                                <span>Pastikan jumlah transfer sesuai hingga 3 digit terakhir. Transfer melebihi/kurang dari nominal tidak akan diproses otomatis.</span>
                            </div>
                        </div>
                    )}

                    {/* QRIS */}
                    {order.paymentMethod === "qris" && (
                        <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9", marginBottom: 20, textAlign: "center", boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 20, justifyContent: "center" }}>
                                <QrCode size={20} color="var(--primary)" />
                                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)" }}>
                                    Pembayaran QRIS
                                </h3>
                            </div>

                            {/* QR Code Placeholder */}
                            <div style={{
                                width: 200,
                                height: 200,
                                margin: "0 auto 20px",
                                background: "#F3F4F6",
                                borderRadius: 16,
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "center",
                                border: "4px solid var(--primary)",
                                overflow: "hidden",
                                position: "relative",
                            }}>
                                <div style={{ fontSize: 80 }}>📱</div>
                                <div style={{
                                    position: "absolute",
                                    bottom: 0, left: 0, right: 0,
                                    background: "rgba(255,255,255,0.95)",
                                    padding: "6px",
                                    fontSize: 11,
                                    color: "var(--gray-600)",
                                    fontWeight: 600,
                                }}>QRIS - Scan to Pay</div>
                            </div>
                            <div style={{ fontSize: 20, fontWeight: 800, color: "var(--primary)", fontFamily: "Poppins, sans-serif", marginBottom: 6 }}>
                                {formatPrice(order.total)}
                            </div>
                            <p style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.6 }}>
                                Scan QR Code dengan aplikasi e-wallet atau mobile banking apa pun yang mendukung QRIS.<br />
                                GoPay · OVO · DANA · ShopeePay · LinkAja
                            </p>
                        </div>
                    )}

                    {/* Order Summary */}
                    <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9", marginBottom: 20, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                        <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--gray-900)", marginBottom: 16 }}>
                            Detail Pesanan
                        </h3>
                        {order.items.map((item) => (
                            <div key={item.product.id} style={{ display: "flex", justifyContent: "space-between", fontSize: 14, marginBottom: 8 }}>
                                <span style={{ color: "var(--gray-600)" }}>{item.product.name} ×{item.quantity}</span>
                                <span style={{ fontWeight: 600 }}>{formatPrice(item.product.price * item.quantity)}</span>
                            </div>
                        ))}
                        <div className="divider" style={{ margin: "12px 0" }} />
                        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 16, fontWeight: 800 }}>
                            <span style={{ color: "var(--gray-900)" }}>Total Pembayaran</span>
                            <span style={{ color: "var(--primary)", fontFamily: "Poppins, sans-serif" }}>{formatPrice(order.total)}</span>
                        </div>
                    </div>

                    {/* Steps */}
                    <div style={{ background: "white", borderRadius: 16, padding: "24px", border: "1px solid #F1F5F9", marginBottom: 24, boxShadow: "0 4px 20px rgba(0,0,0,0.06)" }}>
                        <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 15, fontWeight: 700, color: "var(--gray-900)", marginBottom: 16 }}>
                            Langkah Selanjutnya
                        </h3>
                        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                            {[
                                { num: 1, text: "Lakukan transfer sesuai nominal di atas", done: false },
                                { num: 2, text: "Upload bukti pembayaran di halaman Profil", done: false },
                                { num: 3, text: "Tim kami akan memverifikasi pembayaran Anda", done: false },
                                { num: 4, text: "Pesanan akan segera dikirimkan", done: false },
                            ].map((step) => (
                                <div key={step.num} style={{ display: "flex", alignItems: "flex-start", gap: 12 }}>
                                    <div style={{
                                        width: 24, height: 24, borderRadius: "50%",
                                        background: "var(--primary-light)",
                                        display: "flex", alignItems: "center", justifyContent: "center",
                                        fontSize: 12, fontWeight: 700, color: "var(--primary)", flexShrink: 0,
                                    }}>
                                        {step.num}
                                    </div>
                                    <span style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.5, marginTop: 3 }}>{step.text}</span>
                                </div>
                            ))}
                        </div>
                    </div>

                    <div style={{ display: "flex", gap: 12 }}>
                        <button
                            onClick={handleSimulatePayment}
                            className="btn-primary"
                            style={{ flex: 1, fontSize: 14, padding: "13px" }}
                        >
                            ✅ Konfirmasi Pembayaran (Demo)
                        </button>
                        <Link
                            href="/profile?tab=pesanan"
                            style={{
                                flex: 1,
                                display: "flex", alignItems: "center", justifyContent: "center", gap: 6,
                                padding: "13px",
                                borderRadius: 8,
                                border: "1.5px solid var(--primary)",
                                background: "white",
                                color: "var(--primary)",
                                textDecoration: "none",
                                fontSize: 14,
                                fontWeight: 600,
                            }}
                        >
                            Lihat Pesanan Saya <ChevronRight size={16} />
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    );
}
