import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Syarat & Ketentuan – Ananta Sehat",
    description: "Syarat dan Ketentuan penggunaan layanan Ananta Sehat. Baca dengan seksama sebelum menggunakan layanan kami.",
};

const sections = [
    {
        title: "1. Penerimaan Syarat",
        content: [
            "Dengan mengakses dan menggunakan platform Ananta Sehat (website dan/atau aplikasi), Anda menyatakan telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan ini.",
            "Jika Anda tidak menyetujui syarat ini, harap tidak menggunakan layanan kami. Kami berhak mengubah syarat ini sewaktu-waktu dengan pemberitahuan melalui platform.",
        ],
    },
    {
        title: "2. Pendaftaran Akun",
        content: [
            "• Anda harus berusia minimal 17 tahun atau memiliki persetujuan orang tua/wali untuk menggunakan layanan ini.",
            "• Informasi yang Anda berikan saat pendaftaran harus akurat, lengkap, dan terkini.",
            "• Anda bertanggung jawab menjaga kerahasiaan kata sandi akun dan semua aktivitas yang terjadi dalam akun Anda.",
            "• Satu orang hanya diperbolehkan memiliki satu akun aktif.",
            "• Kami berhak menonaktifkan akun yang terindikasi melanggar syarat ini.",
        ],
    },
    {
        title: "3. Pembelian dan Pembayaran",
        content: [
            "• Semua harga yang tercantum dalam mata uang Rupiah (IDR) dan sudah termasuk PPN sesuai peraturan berlaku.",
            "• Harga dapat berubah sewaktu-waktu tanpa pemberitahuan sebelumnya, namun tidak berlaku retroaktif untuk pesanan yang sudah dikonfirmasi.",
            "• Pembayaran harus dilakukan dalam waktu yang ditentukan. Pesanan yang tidak dibayar dalam 2×24 jam akan dibatalkan otomatis.",
            "• Kami berhak membatalkan pesanan yang terindikasi penipuan atau melanggar syarat ini.",
            "• Bukti transaksi digital yang kami keluarkan merupakan bukti pembayaran yang sah.",
        ],
    },
    {
        title: "4. Pembelian Obat Keras",
        content: [
            "• Obat keras (daftar G) hanya dapat dibeli dengan resep dokter yang valid dan berlaku.",
            "• Resep yang diunggah harus asli, dapat dibaca, dan mencantumkan tanda tangan dokter berlisensi.",
            "• Kami berhak menolak pesanan obat keras jika resep tidak memenuhi syarat atau terindikasi tidak valid.",
            "• Penyalahgunaan obat keras merupakan pelanggaran hukum yang dapat dikenai sanksi pidana.",
            "• Tim apoteker kami berhak menghubungi dokter penulis resep untuk verifikasi jika diperlukan.",
        ],
    },
    {
        title: "5. Pengiriman",
        content: [
            "• Kami berupaya memproses dan mengirimkan pesanan dalam waktu 1×24 jam hari kerja setelah pembayaran terkonfirmasi.",
            "• Estimasi waktu pengiriman 1-3 hari kerja bergantung pada lokasi tujuan dan mitra kurir.",
            "• Risiko kerusakan atau kehilangan selama pengiriman ditanggung oleh mitra kurir dengan jaminan yang berlaku.",
            "• Anda wajib memberikan alamat pengiriman yang lengkap dan benar. Kami tidak bertanggung jawab atas keterlambatan akibat alamat yang salah.",
        ],
    },
    {
        title: "6. Pengembalian dan Refund",
        content: [
            "• Produk dapat dikembalikan dalam 7 hari sejak penerimaan jika: produk rusak/cacat, produk tidak sesuai pesanan, atau produk mendekati/melewati tanggal kedaluwarsa.",
            "• Produk yang tidak dapat dikembalikan: obat yang sudah dibuka kemasannya, produk yang memerlukan kondisi penyimpanan khusus, dan produk yang rusak akibat kesalahan pengguna.",
            "• Proses refund dilakukan dalam 3-7 hari kerja setelah produk diterima dan diverifikasi.",
            "• Refund dikembalikan ke metode pembayaran asli atau saldo akun Ananta Sehat sesuai pilihan Anda.",
        ],
    },
    {
        title: "7. Layanan Konsultasi",
        content: [
            "• Layanan konsultasi apoteker yang kami sediakan bersifat informatif dan bukan pengganti konsultasi medis profesional.",
            "• Informasi yang diberikan apoteker kami tidak dapat dianggap sebagai diagnosa atau rekomendasi medis.",
            "• Untuk kondisi medis serius, kami mendorong Anda untuk selalu berkonsultasi dengan dokter.",
            "• Kami tidak bertanggung jawab atas keputusan medis yang diambil berdasarkan informasi dari layanan konsultasi kami.",
        ],
    },
    {
        title: "8. Batasan Tanggung Jawab",
        content: [
            "• Kami tidak bertanggung jawab atas kerugian tidak langsung, insidental, atau konsekuensial yang timbul dari penggunaan layanan kami.",
            "• Total tanggung jawab kami terbatas pada nilai pesanan yang dipersengketakan.",
            "• Kami tidak menjamin bahwa layanan akan selalu tersedia tanpa gangguan atau bebas dari kesalahan teknis.",
            "• Force majeure termasuk bencana alam, pandemi, atau gangguan infrastruktur dapat mempengaruhi layanan tanpa kewajiban ganti rugi.",
        ],
    },
    {
        title: "9. Hak Kekayaan Intelektual",
        content: [
            "• Seluruh konten di platform Ananta Sehat (logo, foto, teks, desain, dll.) adalah milik PT Ananta Sehat Indonesia dan dilindungi undang-undang hak cipta.",
            "• Dilarang menyalin, mendistribusikan, atau menggunakan konten kami tanpa izin tertulis.",
            "• Ulasan dan konten yang Anda unggah ke platform kami memberikan kami lisensi non-eksklusif untuk menggunakannya.",
        ],
    },
    {
        title: "10. Hukum yang Berlaku",
        content: [
            "• Syarat dan Ketentuan ini diatur oleh hukum Republik Indonesia.",
            "• Segala sengketa yang tidak dapat diselesaikan secara musyawarah akan diselesaikan melalui Badan Arbitrase Nasional Indonesia (BANI) di Jakarta.",
            "• Bahasa Indonesia adalah bahasa yang mengikat dalam interpretasi syarat ini.",
        ],
    },
];

export default function SyaratKetentuanPage() {
    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #3B0764 0%, #5B21B6 60%, #7C3AED 100%)", padding: "56px 24px", textAlign: "center" }}>
                <div className="container-custom">
                    <div style={{ fontSize: 48, marginBottom: 14 }}>📋</div>
                    <h1 style={{ fontFamily: "Karla, sans-serif", fontSize: 34, fontWeight: 800, color: "white", marginBottom: 12 }}>
                        Syarat & Ketentuan
                    </h1>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", maxWidth: 480, margin: "0 auto" }}>
                        Harap baca syarat dan ketentuan ini dengan seksama sebelum menggunakan layanan Ananta Sehat.
                    </p>
                    <div style={{ marginTop: 12, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                        Berlaku sejak: 1 Januari 2025
                    </div>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "48px 16px", maxWidth: 860 }}>
                {/* Warning box */}
                <div style={{ background: "#FEF2F2", border: "1px solid #FECACA", borderRadius: 12, padding: "18px 22px", marginBottom: 36, display: "flex", gap: 14 }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>⚠️</div>
                    <div style={{ fontSize: 14, color: "#991B1B", lineHeight: 1.7 }}>
                        Dengan mendaftar atau menggunakan layanan Ananta Sehat, Anda dianggap telah membaca, memahami, dan menyetujui seluruh syarat dan ketentuan yang tercantum di bawah ini.
                    </div>
                </div>

                <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
                    {sections.map((section) => (
                        <div key={section.title} style={{ background: "white", borderRadius: 16, padding: "24px 28px", border: "1px solid #F1F5F9" }}>
                            <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 17, fontWeight: 800, color: "var(--gray-900)", marginBottom: 14, paddingBottom: 10, borderBottom: "1px solid #F1F5F9" }}>
                                {section.title}
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {section.content.map((line, i) => (
                                    <p key={i} style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.8, paddingLeft: line.startsWith("•") ? 8 : 0 }}>
                                        {line}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                <div style={{ marginTop: 32, background: "#F5F3FF", borderRadius: 16, padding: "24px 28px", border: "1px solid #DDD6FE" }}>
                    <h3 style={{ fontFamily: "Karla, sans-serif", fontSize: 16, fontWeight: 700, color: "#5B21B6", marginBottom: 10 }}>📞 Pertanyaan tentang Syarat & Ketentuan?</h3>
                    <p style={{ fontSize: 14, color: "#6D28D9", lineHeight: 1.7 }}>
                        Hubungi tim legal kami di <strong>legal@anantasehat.id</strong> atau hubungi CS di <strong>0800-1-ANANTA</strong> (Senin–Sabtu, 08.00–20.00 WIB).
                    </p>
                </div>
            </div>
        </div>
    );
}
