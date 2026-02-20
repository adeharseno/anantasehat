"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Mail, Lock, Eye, EyeOff, ShieldCheck } from "lucide-react";
import { useStore } from "@/lib/store";
import { useToast } from "@/components/Toast";

export default function LoginPage() {
    const router = useRouter();
    const { login } = useStore();
    const { showToast } = useToast();
    const [form, setForm] = useState({ email: "", password: "" });
    const [showPassword, setShowPassword] = useState(false);
    const [loading, setLoading] = useState(false);
    const [errors, setErrors] = useState<Record<string, string>>({});

    const validate = () => {
        const errs: Record<string, string> = {};
        if (!form.email) errs.email = "Email wajib diisi";
        else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) errs.email = "Format email tidak valid";
        if (!form.password) errs.password = "Password wajib diisi";
        else if (form.password.length < 6) errs.password = "Password minimal 6 karakter";
        setErrors(errs);
        return Object.keys(errs).length === 0;
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!validate()) return;
        setLoading(true);
        await new Promise((r) => setTimeout(r, 1200));
        login({
            id: "1",
            name: "User Demo",
            email: form.email,
            phone: "081234567890",
            address: "Jl. Contoh No. 1, Jakarta",
        });
        showToast("Login berhasil! Selamat datang kembali 👋");
        setLoading(false);
        router.push("/");
    };

    const handleDemoLogin = () => {
        setForm({ email: "demo@anantasehat.id", password: "demo123" });
    };

    return (
        <div style={{
            minHeight: "100vh",
            background: "linear-gradient(135deg, #F0F7FF 0%, #F5F3FF 100%)",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "40px 20px",
        }}>
            <div style={{ width: "100%", maxWidth: 420 }}>
                {/* Logo */}
                <div style={{ textAlign: "center", marginBottom: 32 }}>
                    <div style={{
                        width: 56,
                        height: 56,
                        background: "var(--primary)",
                        borderRadius: 16,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        fontSize: 28,
                        margin: "0 auto 12px",
                        boxShadow: "0 8px 24px rgba(27, 108, 168, 0.3)",
                    }}>
                        ⚕️
                    </div>
                    <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--gray-900)" }}>
                        Selamat Datang!
                    </h1>
                    <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
                        Masuk ke akun Ananta Sehat Anda
                    </p>
                </div>

                <div style={{ background: "white", borderRadius: 20, padding: "32px", boxShadow: "0 20px 60px rgba(0,0,0,0.08)" }}>
                    <form onSubmit={handleSubmit} style={{ display: "flex", flexDirection: "column", gap: 16 }}>
                        {/* Email */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                Email
                            </label>
                            <div style={{ position: "relative" }}>
                                <Mail size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                <input
                                    type="email"
                                    value={form.email}
                                    onChange={(e) => { setForm((f) => ({ ...f, email: e.target.value })); setErrors((e2) => ({ ...e2, email: "" })); }}
                                    className="input-field"
                                    style={{ paddingLeft: 40, borderColor: errors.email ? "#EF4444" : undefined }}
                                    placeholder="email@example.com"
                                />
                            </div>
                            {errors.email && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.email}</p>}
                        </div>

                        {/* Password */}
                        <div>
                            <label style={{ display: "block", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 6 }}>
                                Password
                            </label>
                            <div style={{ position: "relative" }}>
                                <Lock size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                <input
                                    type={showPassword ? "text" : "password"}
                                    value={form.password}
                                    onChange={(e) => { setForm((f) => ({ ...f, password: e.target.value })); setErrors((e2) => ({ ...e2, password: "" })); }}
                                    className="input-field"
                                    style={{ paddingLeft: 40, paddingRight: 40, borderColor: errors.password ? "#EF4444" : undefined }}
                                    placeholder="••••••••"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    style={{ position: "absolute", right: 12, top: "50%", transform: "translateY(-50%)", background: "none", border: "none", cursor: "pointer", color: "var(--gray-400)" }}
                                >
                                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                                </button>
                            </div>
                            {errors.password && <p style={{ fontSize: 12, color: "#EF4444", marginTop: 4 }}>{errors.password}</p>}
                            <div style={{ textAlign: "right", marginTop: 6 }}>
                                <a href="#" style={{ fontSize: 12, color: "var(--primary)", textDecoration: "none", fontWeight: 500 }}>
                                    Lupa password?
                                </a>
                            </div>
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="btn-primary"
                            style={{ width: "100%", padding: "13px", fontSize: 15, borderRadius: 10, marginTop: 4, opacity: loading ? 0.8 : 1 }}
                        >
                            {loading ? "⏳ Memproses..." : "Masuk"}
                        </button>
                    </form>

                    {/* Divider */}
                    <div style={{ display: "flex", alignItems: "center", gap: 12, margin: "20px 0" }}>
                        <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                        <span style={{ fontSize: 12, color: "var(--gray-400)", fontWeight: 500 }}>atau</span>
                        <div style={{ flex: 1, height: 1, background: "#E5E7EB" }} />
                    </div>

                    {/* Demo Login */}
                    <button
                        onClick={handleDemoLogin}
                        style={{
                            width: "100%",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            gap: 8,
                            padding: "12px",
                            borderRadius: 10,
                            border: "1.5px solid #E5E7EB",
                            background: "#F9FAFB",
                            color: "var(--gray-700)",
                            fontSize: 14,
                            fontWeight: 600,
                            cursor: "pointer",
                            transition: "all 0.2s",
                        }}
                    >
                        <ShieldCheck size={16} color="var(--primary)" />
                        Gunakan Akun Demo
                    </button>

                    <p style={{ textAlign: "center", marginTop: 20, fontSize: 13, color: "var(--gray-500)" }}>
                        Belum punya akun?{" "}
                        <Link href="/register" style={{ color: "var(--primary)", fontWeight: 700, textDecoration: "none" }}>
                            Daftar Sekarang
                        </Link>
                    </p>
                </div>

                {/* Security Note */}
                <div style={{ display: "flex", alignItems: "center", gap: 8, justifyContent: "center", marginTop: 20, fontSize: 12, color: "var(--gray-400)" }}>
                    <Lock size={12} />
                    <span>Koneksi aman dengan enkripsi SSL 256-bit</span>
                </div>
            </div>
        </div>
    );
}
