import React from "react";
import Link from "next/link";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Cara Pemesanan – Ananta Sehat",
    description: "Panduan lengkap cara memesan obat dan produk kesehatan di Ananta Sehat. Mudah, cepat, dan aman.",
};

const steps = [
    {
        num: "01", emoji: "🔍", title: "Cari Produk",
        desc: "Gunakan fitur pencarian atau jelajahi kategori produk. Temukan obat, vitamin, suplemen, dan alat kesehatan yang Anda butuhkan.",
        tips: ["Gunakan nama generik atau merek dagang", "Filter berdasarkan kategori dan harga", "Baca deskripsi dan indikasi produk"],
    },
    {
        num: "02", emoji: "🛒", title: "Tambahkan ke Keranjang",
        desc: "Klik tombol 'Tambah ke Keranjang' pada produk pilihan Anda. Anda dapat menambahkan beberapa produk sekaligus.",
        tips: ["Periksa jumlah dan ukuran produk", "Manfaatkan promo yang tersedia", "Minimum pembelian untuk gratis ongkir Rp 150.000"],
    },
    {
        num: "03", emoji: "📝", title: "Isi Data Pengiriman",
        desc: "Lengkapi data nama, alamat, dan nomor telepon untuk pengiriman. Masuk ke akun untuk mengisi data lebih cepat.",
        tips: ["Pastikan alamat sudah benar dan lengkap", "Sertakan kode pos untuk pengiriman akurat", "Tambahkan catatan untuk kurir jika diperlukan"],
    },
    {
        num: "04", emoji: "💳", title: "Pilih Metode Pembayaran",
        desc: "Pilih metode pembayaran yang paling nyaman: Transfer Bank (BCA, BNI, BRI, Mandiri) atau QRIS.",
        tips: ["Transfer bank diproses dalam 1×24 jam", "QRIS berlaku 15 menit setelah dibuat", "Simpan bukti transfer untuk konfirmasi"],
    },
    {
        num: "05", emoji: "✅", title: "Konfirmasi Pesanan",
        desc: "Periksa kembali ringkasan pesanan dan lakukan pembayaran. Konfirmasi akan dikirim melalui email.",
        tips: ["Cek email untuk detail pesanan", "Nomor pesanan untuk lacak pengiriman", "Hubungi CS jika ada kendala"],
    },
    {
        num: "06", emoji: "📦", title: "Terima Paket",
        desc: "Produk dikemas dengan aman dan higienis, kemudian dikirim sesuai alamat. Lacak pengiriman di halaman pesanan.",
        tips: ["Estimasi pengiriman 1-3 hari kerja", "Periksa kondisi paket saat diterima", "Kemasan rusak? Hubungi CS dalam 1×24 jam"],
    },
];

const faqs = [
    { q: "Apakah produk di Ananta Sehat dijamin asli?", a: "Ya, semua produk kami 100% asli dan bersumber dari distributor resmi yang terdaftar di BPOM RI." },
    { q: "Berapa lama proses pengiriman?", a: "Pengiriman reguler membutuhkan waktu 1-3 hari kerja. Untuk wilayah Jakarta dan sekitarnya, tersedia pengiriman same day." },
    { q: "Bisakah saya membeli obat resep?", a: "Obat keras memerlukan resep dokter yang valid. Upload resep saat checkout dan tim apoteker kami akan memverifikasi." },
    { q: "Bagaimana jika produk yang saya terima rusak?", a: "Hubungi tim CS kami dalam 1×24 jam setelah penerimaan dengan foto produk. Kami akan proses penggantian produk." },
];

export default function CaraPemesananPage() {
    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{
                background: "linear-gradient(135deg, #065F46 0%, #047857 60%, #10B981 100%)",
                padding: "64px 24px", textAlign: "center",
            }}>
                <div className="container-custom">
                    <div style={{ fontSize: 52, marginBottom: 16 }}>🛍️</div>
                    <h1 style={{ fontFamily: "Karla, sans-serif", fontSize: 36, fontWeight: 800, color: "white", marginBottom: 14 }}>
                        Cara Pemesanan
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", maxWidth: 520, margin: "0 auto" }}>
                        Pesan produk kesehatan di Ananta Sehat sangat mudah. Ikuti langkah-langkah berikut dan nikmati kemudahan belanja obat online.
                    </p>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "56px 16px" }}>
                {/* Steps */}
                <div style={{ marginBottom: 64 }}>
                    <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 26, fontWeight: 800, color: "var(--gray-900)", textAlign: "center", marginBottom: 40 }}>
                        6 Langkah Mudah Memesan
                    </h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
                        {steps.map((step, i) => (
                            <div key={step.num} style={{
                                background: "white", borderRadius: 16, padding: "28px 32px",
                                border: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                                display: "grid", gridTemplateColumns: "auto 1fr auto", gap: 24, alignItems: "start",
                            }}>
                                <div style={{
                                    width: 56, height: 56, borderRadius: 14,
                                    background: "linear-gradient(135deg, var(--primary) 0%, #065987 100%)",
                                    display: "flex", alignItems: "center", justifyContent: "center",
                                    color: "white", fontWeight: 800, fontSize: 18, flexShrink: 0,
                                }}>{step.num}</div>
                                <div>
                                    <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 8 }}>
                                        <span style={{ fontSize: 24 }}>{step.emoji}</span>
                                        <h3 style={{ fontFamily: "Karla, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--gray-900)" }}>{step.title}</h3>
                                    </div>
                                    <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 14 }}>{step.desc}</p>
                                    <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                        {step.tips.map((tip) => (
                                            <span key={tip} style={{
                                                background: "#F0F7FF", color: "var(--primary)",
                                                fontSize: 12, padding: "4px 10px", borderRadius: 6, fontWeight: 500,
                                            }}>💡 {tip}</span>
                                        ))}
                                    </div>
                                </div>
                                {i < steps.length - 1 && (
                                    <div style={{ fontSize: 20, color: "var(--gray-300)", alignSelf: "center" }}>→</div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>

                {/* Payment Methods */}
                <div style={{ background: "white", borderRadius: 20, padding: "36px", border: "1px solid #F1F5F9", marginBottom: 64 }}>
                    <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 22, fontWeight: 800, color: "var(--gray-900)", marginBottom: 24 }}>💳 Metode Pembayaran</h2>
                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
                        <div style={{ background: "#F0F7FF", borderRadius: 12, padding: 20 }}>
                            <div style={{ fontWeight: 700, color: "var(--gray-900)", marginBottom: 12 }}>🏦 Transfer Bank</div>
                            <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
                                {["BCA", "BNI", "BRI", "Mandiri"].map((b) => (
                                    <span key={b} style={{ background: "white", borderRadius: 6, padding: "6px 14px", fontSize: 13, fontWeight: 600, color: "var(--gray-700)", border: "1px solid #E5E7EB" }}>{b}</span>
                                ))}
                            </div>
                        </div>
                        <div style={{ background: "#F0F7FF", borderRadius: 12, padding: 20 }}>
                            <div style={{ fontWeight: 700, color: "var(--gray-900)", marginBottom: 12 }}>📱 QRIS</div>
                            <div style={{ fontSize: 13, color: "var(--gray-600)", lineHeight: 1.7 }}>
                                GoPay, OVO, DANA, ShopeePay, dan semua e-wallet yang mendukung QRIS.
                            </div>
                        </div>
                    </div>
                </div>

                {/* FAQ */}
                <div style={{ marginBottom: 56 }}>
                    <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 24, fontWeight: 800, color: "var(--gray-900)", marginBottom: 24 }}>❓ Pertanyaan Umum</h2>
                    <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
                        {faqs.map((faq, i) => (
                            <div key={i} style={{ background: "white", borderRadius: 12, padding: "20px 24px", border: "1px solid #F1F5F9" }}>
                                <div style={{ fontWeight: 700, color: "var(--gray-900)", marginBottom: 8, fontSize: 15 }}>Q: {faq.q}</div>
                                <div style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7 }}>A: {faq.a}</div>
                            </div>
                        ))}
                    </div>
                    <div style={{ marginTop: 20, textAlign: "center" }}>
                        <Link href="/faq" style={{ color: "var(--primary)", fontWeight: 600, textDecoration: "none", fontSize: 14 }}>
                            Lihat semua FAQ →
                        </Link>
                    </div>
                </div>

                {/* CTA */}
                <div style={{ textAlign: "center", background: "linear-gradient(135deg, #065F46 0%, #047857 100%)", borderRadius: 20, padding: "36px 24px" }}>
                    <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 24, fontWeight: 800, color: "white", marginBottom: 12 }}>Siap Mulai Belanja?</h2>
                    <p style={{ color: "rgba(255,255,255,0.8)", marginBottom: 20, fontSize: 15 }}>Dapatkan gratis ongkir untuk pembelian di atas Rp 150.000</p>
                    <Link href="/products" className="btn-primary" style={{ background: "white", color: "#047857", fontSize: 15, padding: "13px 32px" }}>
                        Mulai Belanja
                    </Link>
                </div>
            </div>
        </div>
    );
}
