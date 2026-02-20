"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, User, Phone, MapPin, CheckCircle } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function RegisterPage() {
    const router = useRouter();
    const { login } = useStore();
    const { showToast } = useToast();
    const [step, setStep] = useState(1);
    const [form, setForm] = useState({
        name: "",
        email: "",
        phone: "",
        address: "",
        password: "",
        confirmPassword: "",
    });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validateStep1 = () => {
        const errs: Record<string, string> = {};
        if (!form.name.trim()) errs.name = "Nama wajib diisi";
        if (!form.email) errs.email = "Email wajib diisi";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Format email tidak valid";
        if (!form.phone) errs.phone = "Nomor telepon wajib diisi";
        else if (!/^08\d{8,11}$/.test(form.phone)) errs.phone = "Format nomor telepon tidak valid";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const validateStep2 = () => {
        const errs: Record<string, string> = {};
        if (!form.address.trim()) errs.address = "Alamat wajib diisi";
        if (!form.password) errs.password = "Password wajib diisi";
        else if (form.password.length < 8) errs.password = "Password minimal 8 karakter";
        if (!form.confirmPassword) errs.confirmPassword = "Konfirmasi password wajib diisi";
        else if (form.password !== form.confirmPassword) errs.confirmPassword = "Password tidak cocok";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleNext = () => {
        if (validateStep1()) setStep(2);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validateStep2()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        login({
            id: Date.now().toString(),
            name: form.name,
            email: form.email,
            phone: form.phone,
            address: form.address,
        });
        showToast("Registrasi berhasil! Selamat datang di Ananta Sehat 🎉");
        setLoading(false);
        router.push("/");
    };

    const inputProps = (field: string, label: string, icon: React.ReactNode, type = "text", placeholder = "") => ({
        label,
        icon,
        value: form[field as keyof typeof form],
        onChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
            setForm((f) => ({ ...f, [field]: e.target.value }));
            setErrors((e2) => ({ ...e2, [field]: "" }));
        },
        error: errors[field],
        type,
        placeholder,
    });

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #F0F7FF 0%, #F5F3FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
        }}>
            <div style={{ width: "100%", maxWidth: 440 }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 28 }}>
                    <div style={{ width: 52, height: 52, background: "var(--primary)", borderRadius: 14, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 26, margin: "0 auto 10px", boxShadow: "0 8px 24px rgba(27, 108, 168, 0.3)" }}>⚕️</div>
                    <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--gray-900)" }}>Buat Akun Baru</h1>
                    <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>Bergabung dengan ribuan pelanggan Ananta Sehat</p>
                </div>

                {/* Step Indicator */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 12, marginBottom: 24 }}>
                    {[1, 2].map((s, i) => (
                        <React.Fragment key={s}>
                            <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                                <div style={{
                                    width: 30, height: 30, borderRadius: "50%",
                                    background: step >= s ? "var(--primary)" : "#E5E7EB",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    fontSize: 13, fontWeight: 700,
                                    color: step >= s ? "white" : "var(--gray-400)",
                                }}>
                                    {step > s ? <CheckCircle size={16} /> : s}
                                </div>
                                <span style={{ fontSize: 13, fontWeight: step === s ? 600 : 400, color: step >= s ? "var(--primary)" : "var(--gray-400)" }}>
                                    {s === 1 ? "Data Diri" : "Keamanan"}
                                </span>
                            </div>
                            {i < 1 && <div style={{ flex: 1, height: 2, background: step > 1 ? "var(--primary)" : "#E5E7EB", maxWidth: 60, borderRadius: 2 }} />}
                        </React.Fragment>
                    ))}
                </div>

                <div style={{ background: "white", borderRadius: 20, padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
                    {step === 1 ? (
                        <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-800)", marginBottom: 4 }}>
                                Informasi Dasar
                            </h2>

                            {/* Name */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Nama Lengkap <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <User size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                    <input value={form.name} onChange={(e) => { setForm((f) => ({ ...f, name: e.target.value })); setErrors((e2) => ({ ...e2, name: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, borderColor: errors.name ? "#EF4444" : undefined }} placeholder="Nama lengkap sesuai KTP" />
                                </div>
                                {errors.name && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.name}</p>}
                            </div>

                            {/* Email */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Email <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <Mail size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                    <input type="email" value={form.email} onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((e2) => ({ ...e2, email: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, borderColor: errors.email ? "#EF4444" : undefined }} placeholder="email@example.com" />
                                </div>
                                {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
                            </div>

                            {/* Phone */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>No. Telepon <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <Phone size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                    <input value={form.phone} onChange={(e) => { setForm((f) => ({ ...f, phone: e.target.value })); setErrors((e2) => ({ ...e2, phone: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, borderColor: errors.phone ? "#EF4444" : undefined }} placeholder="0812xxxxxxxx" />
                                </div>
                                {errors.phone && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.phone}</p>}
                            </div>

                            <button onClick={handleNext} className="btn-primary" style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 10, marginTop: 4 }}>
                                Lanjutkan →
                            </button>
                        </div>
                    ) : (
                        <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                            <h2 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-800)", marginBottom: 4 }}>
                                Alamat & Keamanan
                            </h2>

                            {/* Address */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Alamat Lengkap <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <MapPin size={15} style={{ position: "absolute", left: 12, top: 12, color: "var(--gray-400)" }} />
                                    <textarea value={form.address} onChange={(e) => { setForm((f) => ({ ...f, address: e.target.value })); setErrors((e2) => ({ ...e2, address: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, minHeight: 80, resize: "vertical", borderColor: errors.address ? "#EF4444" : undefined }}
                                        placeholder="Jl. Nama Jalan No. XX, RT/RW, Kelurahan, Kecamatan, Kota..." />
                                </div>
                                {errors.address && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.address}</p>}
                            </div>

                            {/* Password */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Password <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <Lock size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                    <input type={showPassword ? "text" : "password"} value={form.password} onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((e2) => ({ ...e2, password: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, paddingRight: 40, borderColor: errors.password ? "#EF4444" : undefined }} placeholder="Min. 8 karakter" />
                                    <button type="button" onClick={() => setShowPassword(!showPassword)} style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)" }}>
                                        {showPassword ? <EyeOff size={15} /> : <Eye size={15} />}
                                    </button>
                                </div>
                                {errors.password && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.password}</p>}
                            </div>

                            {/* Confirm Password */}
                            <div>
                                <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>Konfirmasi Password <span style={{ color: "#EF4444" }}>*</span></label>
                                <div style={{ position: "relative" }}>
                                    <Lock size={15} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                    <input type="password" value={form.confirmPassword} onChange={(e) => { setForm((f) => ({ ...f, confirmPassword: e.target.value })); setErrors((e2) => ({ ...e2, confirmPassword: "" })); }}
                                        className="input-field" style={{ paddingLeft: 36, borderColor: errors.confirmPassword ? "#EF4444" : undefined }} placeholder="Ulangi password" />
                                </div>
                                {errors.confirmPassword && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.confirmPassword}</p>}
                            </div>

                            {/* Terms */}
                            <label style={{ display: "flex", alignItems: "flex-start", gap: 10, cursor: "pointer" }}>
                                <input type="checkbox" required style={{ marginTop: 2, accentColor: "var(--primary)", width: 14, height: 14 }} />
                                <span style={{ fontSize: 12, color: "var(--gray-500)", lineHeight: 1.5 }}>
                                    Saya menyetujui{" "}
                                    <a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>Syarat & Ketentuan</a>
                                    {" "}dan{" "}
                                    <a href="#" style={{ color: "var(--primary)", textDecoration: "none", fontWeight: 600 }}>Kebijakan Privasi</a>
                                    {" "}Ananta Sehat.
                                </span>
                            </label>

                            <div style={{ display: "flex", gap: 10, marginTop: 4 }}>
                                <button
                                    type="button"
                                    onClick={() => setStep(1)}
                                    style={{
                                        flex: "0 0 auto",
                                        padding: "13px 20px",
                                        borderRadius: 10,
                                        border: "1.5px solid var(--gray-200)",
                                        background: "white",
                                        color: "var(--gray-600)",
                                        fontWeight: 600,
                                        fontSize: 14,
                                        cursor: "pointer",
                                    }}
                                >
                                    ← Kembali
                                </button>
                                <button type="submit" disabled={loading} className="btn-primary" style={{ flex: 1, padding: "13px", fontSize: 15, borderRadius: 10, opacity: loading ? 0.8 : 1 }}>
                                    {loading ? "⏳ Mendaftar..." : "Buat Akun"}
                                </button>
                            </div>
                        </form>
                    )}

                    <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--gray-500)" }}>
                        Sudah punya akun?{" "}
                        <Link href="/login" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>Masuk Sekarang</Link>
                    </p>
                </div>
            </div>
        </div>
    );
}
