"use client";

import React, { useState } from "react";
import Link from "next/link";

const faqs = [
    {
        category: "Produk & Keaslian",
        emoji: "💊",
        items: [
            {
                q: "Apakah semua produk di Ananta Sehat terjamin keasliannya?",
                a: "Ya, 100%. Semua produk kami diimpor langsung dari distributor resmi yang terdaftar dan diawasi oleh BPOM RI. Setiap produk melewati proses verifikasi keaslian sebelum dijual di platform kami.",
            },
            {
                q: "Bagaimana cara memastikan produk yang saya terima asli?",
                a: "Setiap produk dilengkapi nomor registrasi BPOM yang dapat Anda cek di website resmi BPOM (cekbpom.pom.go.id). Produk juga disertai hologram dan segel resmi dari produsen.",
            },
            {
                q: "Apakah ada produk yang mendekati kedaluwarsa?",
                a: "Tidak. Kami menjamin semua produk memiliki masa kedaluwarsa minimal 6 bulan sejak tanggal pengiriman. Jika menerima produk mendekati kedaluwarsa, hubungi CS kami segera.",
            },
        ],
    },
    {
        category: "Pemesanan",
        emoji: "🛒",
        items: [
            {
                q: "Bagaimana cara memesan produk di Ananta Sehat?",
                a: "Cari produk → Tambahkan ke keranjang → Isi data pengiriman → Pilih metode pembayaran → Lakukan pembayaran → Selesai! Lihat panduan lengkapnya di halaman Cara Pemesanan.",
            },
            {
                q: "Apakah bisa memesan tanpa mendaftar akun?",
                a: "Saat ini pemesanan memerlukan akun terdaftar untuk memastikan keamanan transaksi dan memudahkan pelacakan pesanan Anda. Pendaftaran gratis dan hanya membutuhkan beberapa menit.",
            },
            {
                q: "Bisakah saya mengubah atau membatalkan pesanan?",
                a: "Pesanan dapat diubah atau dibatalkan selama status masih 'Menunggu Pembayaran'. Setelah pembayaran terkonfirmasi dan pesanan diproses, perubahan tidak dapat dilakukan. Hubungi CS sesegera mungkin jika ada kendala.",
            },
            {
                q: "Berapa minimal pembelian?",
                a: "Tidak ada minimal pembelian. Namun untuk mendapatkan gratis ongkos kirim, minimal pembelian adalah Rp 150.000.",
            },
        ],
    },
    {
        category: "Pembayaran",
        emoji: "💳",
        items: [
            {
                q: "Metode pembayaran apa saja yang diterima?",
                a: "Kami menerima Transfer Bank (BCA, BNI, BRI, Mandiri) dan QRIS (GoPay, OVO, DANA, ShopeePay, dan semua e-wallet berQRIS). Kami tidak menerima pembayaran tunai (COD) saat ini.",
            },
            {
                q: "Berapa lama batas waktu pembayaran?",
                a: "Transfer Bank: 2×24 jam. QRIS: 15 menit setelah QR dibuat. Pesanan yang melewati batas waktu akan dibatalkan otomatis dan stok dikembalikan.",
            },
            {
                q: "Apakah ada biaya tambahan selain harga produk?",
                a: "Harga produk sudah termasuk PPN. Biaya tambahan hanya ongkos kirim Rp 15.000 untuk pembelian di bawah Rp 150.000. Tidak ada biaya pemrosesan atau biaya tersembunyi lainnya.",
            },
        ],
    },
    {
        category: "Pengiriman",
        emoji: "🚚",
        items: [
            {
                q: "Berapa lama proses pengiriman?",
                a: "Pesanan diproses dalam 1×24 jam hari kerja setelah pembayaran terkonfirmasi. Estimasi pengiriman: Jakarta 1 hari, Jawa 1-2 hari, luar Jawa 2-4 hari kerja.",
            },
            {
                q: "Apakah tersedia pengiriman same day?",
                a: "Ya, untuk wilayah Jakarta, Bogor, Depok, Tangerang, dan Bekasi (Jabodetabek), tersedia pengiriman same day jika pesanan dilakukan sebelum pukul 12.00 WIB.",
            },
            {
                q: "Bagaimana cara melacak pesanan saya?",
                a: "Setelah pesanan dikirim, Anda akan mendapatkan nomor resi melalui email dan bisa dilacak di halaman profil Anda di menu 'Riwayat Pesanan'.",
            },
            {
                q: "Apakah pengiriman tersedia ke seluruh Indonesia?",
                a: "Ya, kami melayani pengiriman ke seluruh wilayah Indonesia melalui mitra kurir JNE, J&T, SiCepat, dan Gojek/Grab (khusus Jabodetabek).",
            },
        ],
    },
    {
        category: "Obat Keras & Resep",
        emoji: "💉",
        items: [
            {
                q: "Apakah saya bisa membeli obat yang memerlukan resep?",
                a: "Ya. Upload foto resep dokter yang jelas dan berlaku saat checkout. Tim apoteker kami akan memverifikasi resep dalam 1-2 jam pada jam kerja. Pembelian tanpa resep untuk obat keras tidak diperbolehkan sesuai hukum.",
            },
            {
                q: "Apa syarat resep yang valid?",
                a: "Resep harus mencantumkan: nama dokter dan SIP, nama pasien, nama obat dan dosis, tanggal penulisan (maksimal 30 hari), dan tanda tangan dokter. Resep fotokopi tidak diterima.",
            },
        ],
    },
    {
        category: "Pengembalian & Refund",
        emoji: "↩️",
        items: [
            {
                q: "Bagaimana prosedur pengembalian produk?",
                a: "Hubungi CS dalam 7 hari setelah penerimaan dengan foto produk dan nomor pesanan. Tim kami akan memverifikasi dan memberikan instruksi pengiriman balik. Biaya kirim balik ditanggung Ananta Sehat untuk produk bermasalah dari pihak kami.",
            },
            {
                q: "Berapa lama proses refund?",
                a: "Setelah produk return diterima dan diverifikasi (1-2 hari), refund diproses dalam 3-7 hari kerja ke metode pembayaran asli atau saldo akun.",
            },
            {
                q: "Produk apa saja yang tidak bisa dikembalikan?",
                a: "Produk yang tidak dapat dikembalikan: obat yang sudah dibuka segel/kemasan, produk yang memerlukan kondisi penyimpanan khusus (seperti insulin), dan produk yang rusak akibat kesalahan pengguna.",
            },
        ],
    },
];

export default function FAQPage() {
    const [openIdx, setOpenIdx] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("Semua");

    const categories = ["Semua", ...faqs.map((f) => f.category)];
    const filteredFaqs = activeCategory === "Semua" ? faqs : faqs.filter((f) => f.category === activeCategory);

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #065987 100%)", padding: "56px 24px 72px", textAlign: "center" }}>
                <div className="container-custom">
                    <div style={{ fontSize: 52, marginBottom: 14 }}>❓</div>
                    <h1 style={{ fontFamily: "Karla, sans-serif", fontSize: 36, fontWeight: 800, color: "white", marginBottom: 12 }}>
                        Pertanyaan yang Sering Ditanyakan
                    </h1>
                    <p style={{ fontSize: 16, color: "rgba(255,255,255,0.8)", maxWidth: 520, margin: "0 auto" }}>
                        Temukan jawaban untuk pertanyaan umum seputar produk, pemesanan, pembayaran, dan pengiriman.
                    </p>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "48px 16px" }}>
                {/* Category Filter */}
                <div style={{ display: "flex", gap: 10, flexWrap: "wrap", marginBottom: 36, justifyContent: "center" }}>
                    {categories.map((cat) => (
                        <button
                            key={cat}
                            onClick={() => setActiveCategory(cat)}
                            style={{
                                padding: "8px 18px", borderRadius: 100,
                                border: "1.5px solid",
                                borderColor: activeCategory === cat ? "var(--primary)" : "#E5E7EB",
                                background: activeCategory === cat ? "var(--primary)" : "white",
                                color: activeCategory === cat ? "white" : "var(--gray-600)",
                                fontSize: 13, fontWeight: 600, cursor: "pointer",
                                transition: "all 0.2s",
                            }}
                        >
                            {cat}
                        </button>
                    ))}
                </div>

                {/* FAQ Accordion */}
                <div style={{ maxWidth: 780, margin: "0 auto", display: "flex", flexDirection: "column", gap: 32 }}>
                    {filteredFaqs.map((group) => (
                        <div key={group.category}>
                            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 16 }}>
                                <span style={{ fontSize: 22 }}>{group.emoji}</span>
                                <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 20, fontWeight: 800, color: "var(--gray-900)" }}>
                                    {group.category}
                                </h2>
                            </div>
                            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
                                {group.items.map((item, i) => {
                                    const key = `${group.category}-${i}`;
                                    const isOpen = openIdx === key;
                                    return (
                                        <div
                                            key={key}
                                            style={{
                                                background: "white", borderRadius: 12,
                                                border: `1.5px solid ${isOpen ? "var(--primary)" : "#F1F5F9"}`,
                                                overflow: "hidden",
                                                transition: "border-color 0.2s",
                                            }}
                                        >
                                            <button
                                                onClick={() => setOpenIdx(isOpen ? null : key)}
                                                style={{
                                                    width: "100%", textAlign: "left",
                                                    padding: "18px 22px",
                                                    background: isOpen ? "var(--primary-light)" : "transparent",
                                                    border: "none", cursor: "pointer",
                                                    display: "flex", justifyContent: "space-between", alignItems: "center", gap: 12,
                                                }}
                                            >
                                                <span style={{ fontSize: 15, fontWeight: 700, color: isOpen ? "var(--primary)" : "var(--gray-800)", lineHeight: 1.4 }}>
                                                    {item.q}
                                                </span>
                                                <span style={{ fontSize: 20, color: "var(--primary)", flexShrink: 0, transition: "transform 0.2s", transform: isOpen ? "rotate(45deg)" : "none" }}>+</span>
                                            </button>
                                            {isOpen && (
                                                <div style={{ padding: "0 22px 18px", fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8 }}>
                                                    {item.a}
                                                </div>
                                            )}
                                        </div>
                                    );
                                })}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Still need help */}
                <div style={{
                    maxWidth: 780, margin: "40px auto 0",
                    background: "linear-gradient(135deg, #1B6CA8 0%, #065987 100%)",
                    borderRadius: 20, padding: "32px 28px", textAlign: "center",
                }}>
                    <div style={{ fontSize: 36, marginBottom: 12 }}>🙋</div>
                    <h3 style={{ fontFamily: "Karla, sans-serif", fontSize: 22, fontWeight: 800, color: "white", marginBottom: 10 }}>
                        Masih ada pertanyaan?
                    </h3>
                    <p style={{ fontSize: 14, color: "rgba(255,255,255,0.8)", marginBottom: 20 }}>
                        Tim CS kami siap membantu Anda 7 hari seminggu, pukul 08.00–20.00 WIB
                    </p>
                    <div style={{ display: "flex", gap: 12, justifyContent: "center", flexWrap: "wrap" }}>
                        <a href="tel:080012626822" className="btn-primary" style={{ background: "white", color: "var(--primary)", fontSize: 14, padding: "11px 24px" }}>
                            📞 Hubungi CS
                        </a>
                        <a href="mailto:support@anantasehat.id" style={{
                            display: "inline-flex", alignItems: "center", gap: 6,
                            padding: "11px 24px", borderRadius: 8,
                            border: "1.5px solid rgba(255,255,255,0.5)", color: "white",
                            textDecoration: "none", fontSize: 14, fontWeight: 600,
                        }}>
                            📧 Email Kami
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
}
