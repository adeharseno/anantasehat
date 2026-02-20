"use client";

import React from "react";
import Link from "next/link";
import { CheckCircle } from "lucide-react";

const values = [
    { icon: "🛡️", title: "Keaslian Produk", desc: "Semua produk 100% asli dan bersumber langsung dari distributor resmi yang terdaftar BPOM." },
    { icon: "💡", title: "Inovasi Layanan", desc: "Terus berinovasi menghadirkan pengalaman belanja obat yang mudah, cepat, dan aman secara digital." },
    { icon: "❤️", title: "Kepedulian Pelanggan", desc: "Kesehatan Anda adalah prioritas utama. Tim kami siap membantu 7 hari seminggu." },
    { icon: "🌿", title: "Komitmen Kualitas", desc: "Standar penyimpanan dan penanganan produk sesuai pedoman CDOB dari Kementerian Kesehatan RI." },
];

const stats = [
    { num: "50.000+", label: "Pelanggan Aktif" },
    { num: "5.000+", label: "Produk Tersedia" },
    { num: "98%", label: "Kepuasan Pelanggan" },
    { num: "2018", label: "Tahun Berdiri" },
];

const team = [
    { name: "Dr. Ananta Wijaya", role: "Apoteker Utama & Pendiri", emoji: "👨‍⚕️" },
    { name: "Sari Dewi, S.Farm", role: "Kepala Farmasi", emoji: "👩‍⚕️" },
    { name: "Budi Santoso", role: "Direktur Operasional", emoji: "👨‍💼" },
    { name: "Rina Kusuma", role: "Manajer Layanan Pelanggan", emoji: "👩‍💼" },
];

export default function TentangKamiPage() {
    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #1B6CA8 0%, #065987 60%, #004166 100%)",
                padding: "64px 24px 80px", textAlign: "center", position: "relative", overflow: "hidden",
            }}>
                <div style={{ position: "absolute", inset: 0, backgroundImage: "radial-gradient(circle at 60% 40%, rgba(255,255,255,0.05) 0%, transparent 60%)" }} />
                <div className="container-custom" style={{ position: "relative" }}>
                    <div style={{ fontSize: 56, marginBottom: 16 }}>⚕️</div>
                    <h1 style={{ fontFamily: "Karla, sans-serif", fontSize: 38, fontWeight: 800, color: "white", marginBottom: 16 }}>
                        Tentang Ananta Sehat
                    </h1>
                    <p style={{ fontSize: 17, color: "rgba(255,255,255,0.85)", maxWidth: 560, margin: "0 auto" }}>
                        Apotek online terpercaya yang hadir untuk memudahkan akses layanan kesehatan bagi seluruh masyarakat Indonesia.
                    </p>
                </div>
            </div>

            {/* Stats */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9" }}>
                <div className="container-custom" style={{ padding: "0 16px" }}>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(4, 1fr)", gap: 0 }}>
                        {stats.map((s, i) => (
                            <div key={i} style={{
                                padding: "28px 20px", textAlign: "center",
                                borderRight: i < 3 ? "1px solid #F1F5F9" : "none",
                            }}>
                                <div style={{ fontSize: 28, fontWeight: 800, color: "var(--primary)", fontFamily: "Karla, sans-serif" }}>{s.num}</div>
                                <div style={{ fontSize: 13, color: "var(--gray-500)", marginTop: 4 }}>{s.label}</div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "56px 16px" }}>
                {/* Cerita Kami */}
                <div style={{
                    display: "grid", gridTemplateColumns: "1fr 1fr", gap: 48,
                    marginBottom: 64, alignItems: "center",
                }}>
                    <div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: "var(--primary)", textTransform: "uppercase", letterSpacing: 1, marginBottom: 12 }}>Cerita Kami</div>
                        <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 30, fontWeight: 800, color: "var(--gray-900)", marginBottom: 20, lineHeight: 1.3 }}>
                            Berawal dari Kepedulian terhadap Kesehatan Masyarakat
                        </h2>
                        <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 16 }}>
                            Ananta Sehat didirikan pada tahun 2018 oleh seorang apoteker berpengalaman yang melihat kesenjangan akses obat berkualitas di Indonesia. Banyak masyarakat kesulitan mendapatkan obat asli dengan harga terjangkau dan layanan konsultasi yang memadai.
                        </p>
                        <p style={{ fontSize: 15, color: "var(--gray-600)", lineHeight: 1.8, marginBottom: 24 }}>
                            Kini kami telah melayani lebih dari 50.000 pelanggan aktif di seluruh Indonesia dengan ribuan produk kesehatan yang terverifikasi BPOM dan didukung oleh tim apoteker profesional berpengalaman.
                        </p>
                        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                            {["Terdaftar dan diawasi oleh BPOM RI", "Didukung apoteker berlisensi resmi", "Sistem penyimpanan sesuai CDOB", "Layanan konsultasi gratis 7 hari/minggu"].map((item) => (
                                <div key={item} style={{ display: "flex", alignItems: "center", gap: 10, fontSize: 14, color: "var(--gray-700)" }}>
                                    <CheckCircle size={16} color="var(--primary)" style={{ flexShrink: 0 }} />
                                    {item}
                                </div>
                            ))}
                        </div>
                    </div>
                    <div style={{
                        background: "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)",
                        borderRadius: 20, padding: 40,
                        display: "flex", flexDirection: "column", gap: 20,
                    }}>
                        {[
                            { year: "2018", event: "Ananta Sehat didirikan di Jakarta oleh Dr. Ananta Wijaya" },
                            { year: "2019", event: "Mendapatkan izin resmi BPOM dan Dinas Kesehatan DKI Jakarta" },
                            { year: "2021", event: "Meluncurkan platform digital dan mencapai 10.000 pelanggan" },
                            { year: "2023", event: "Ekspansi layanan ke seluruh Indonesia dengan 50.000+ pelanggan" },
                            { year: "2025", event: "Terus berinovasi dengan teknologi AI untuk rekomendasi produk" },
                        ].map((item) => (
                            <div key={item.year} style={{ display: "flex", gap: 16 }}>
                                <div style={{
                                    width: 60, flexShrink: 0, fontSize: 13, fontWeight: 700,
                                    color: "var(--primary)", paddingTop: 2,
                                }}>{item.year}</div>
                                <div style={{ fontSize: 14, color: "var(--gray-700)", lineHeight: 1.6, borderLeft: "2px solid var(--primary)", paddingLeft: 14 }}>
                                    {item.event}
                                </div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Nilai-nilai */}
                <div style={{ marginBottom: 64 }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 28, fontWeight: 800, color: "var(--gray-900)" }}>Nilai-Nilai Kami</h2>
                        <p style={{ fontSize: 15, color: "var(--gray-500)", marginTop: 8 }}>Fondasi yang memandu setiap langkah kami dalam melayani Anda</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 20 }}>
                        {values.map((v) => (
                            <div key={v.title} style={{
                                background: "white", borderRadius: 16, padding: 28,
                                border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                            }}>
                                <div style={{ fontSize: 36, marginBottom: 14 }}>{v.icon}</div>
                                <h3 style={{ fontFamily: "Karla, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)", marginBottom: 8 }}>{v.title}</h3>
                                <p style={{ fontSize: 14, color: "var(--gray-500)", lineHeight: 1.7 }}>{v.desc}</p>
                            </div>
                        ))}
                    </div>
                </div>

                {/* Tim */}
                <div style={{ marginBottom: 64 }}>
                    <div style={{ textAlign: "center", marginBottom: 36 }}>
                        <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 28, fontWeight: 800, color: "var(--gray-900)" }}>Tim Kami</h2>
                        <p style={{ fontSize: 15, color: "var(--gray-500)", marginTop: 8 }}>Profesional kesehatan berpengalaman yang siap melayani Anda</p>
                    </div>
                    <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 20 }}>
                        {team.map((member) => (
                            <div key={member.name} style={{
                                background: "white", borderRadius: 16, padding: "28px 20px",
                                textAlign: "center", border: "1px solid #F1F5F9",
                            }}>
                                <div style={{
                                    width: 72, height: 72, borderRadius: "50%", margin: "0 auto 16px",
                                    background: "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36,
                                }}>{member.emoji}</div>
                                <div style={{ fontWeight: 700, color: "var(--gray-900)", fontSize: 15, marginBottom: 4 }}>{member.name}</div>
                                <div style={{ fontSize: 13, color: "var(--gray-500)" }}>{member.role}</div>
                            </div>
                        ))}
                    </div>
                </div>

                {/* CTA */}
                <div style={{
                    background: "linear-gradient(135deg, #1B6CA8 0%, #065987 100%)",
                    borderRadius: 20, padding: "40px 32px", textAlign: "center",
                }}>
                    <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 26, fontWeight: 800, color: "white", marginBottom: 12 }}>
                        Siap Menjaga Kesehatan Anda?
                    </h2>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", marginBottom: 24 }}>
                        Temukan ribuan produk kesehatan terpercaya dengan harga terbaik
                    </p>
                    <Link href="/products" className="btn-primary" style={{ background: "white", color: "var(--primary)", fontSize: 15, padding: "13px 32px" }}>
                        Belanja Sekarang
                    </Link>
                </div>
            </div>

        </div>
    );
}
