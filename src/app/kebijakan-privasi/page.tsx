import React from "react";
import type { Metadata } from "next";

export const metadata: Metadata = {
    title: "Kebijakan Privasi – Ananta Sehat",
    description: "Kebijakan privasi Ananta Sehat menjelaskan cara kami mengumpulkan, menggunakan, dan melindungi data pribadi Anda.",
};

const sections = [
    {
        title: "1. Informasi yang Kami Kumpulkan",
        content: [
            "Kami mengumpulkan beberapa jenis informasi dari pengguna layanan kami, meliputi:",
            "• **Data Identitas Pribadi**: Nama lengkap, tanggal lahir, nomor identitas (KTP/SIM) bila diperlukan untuk pembelian obat keras.",
            "• **Data Kontak**: Alamat email, nomor telepon, dan alamat pengiriman.",
            "• **Data Transaksi**: Riwayat pembelian, metode pembayaran (tidak termasuk data kartu kredit lengkap), dan nilai transaksi.",
            "• **Data Penggunaan**: Halaman yang dikunjungi, produk yang dilihat, dan interaksi dengan platform kami.",
            "• **Data Perangkat**: Jenis perangkat, sistem operasi, alamat IP, dan browser yang digunakan.",
        ],
    },
    {
        title: "2. Cara Kami Menggunakan Informasi",
        content: [
            "Informasi yang Anda berikan digunakan untuk:",
            "• Memproses dan memenuhi pesanan Anda termasuk konfirmasi, pembayaran, dan pengiriman.",
            "• Memberikan layanan pelanggan dan merespons pertanyaan atau keluhan Anda.",
            "• Mengirimkan informasi produk, promosi, dan penawaran yang relevan (hanya jika Anda setuju).",
            "• Meningkatkan kualitas layanan dan pengalaman pengguna platform kami.",
            "• Memenuhi kewajiban hukum dan regulasi yang berlaku, termasuk pelaporan kepada otoritas kesehatan.",
            "• Mencegah fraud, penyalahgunaan, dan aktivitas ilegal lainnya.",
        ],
    },
    {
        title: "3. Perlindungan Data Pribadi",
        content: [
            "Keamanan data Anda adalah prioritas kami. Langkah-langkah perlindungan yang kami terapkan:",
            "• **Enkripsi SSL/TLS** untuk semua komunikasi data antara perangkat Anda dan server kami.",
            "• **Penyimpanan terenkripsi** untuk data sensitif seperti kata sandi (menggunakan hashing bcrypt).",
            "• **Pembatasan akses** data internal hanya kepada karyawan yang memerlukan akses untuk melaksanakan tugasnya.",
            "• **Audit keamanan** berkala oleh tim internal dan pihak ketiga independen.",
            "• **Pembaruan sistem** keamanan secara rutin untuk menghadapi ancaman terkini.",
        ],
    },
    {
        title: "4. Berbagi Data dengan Pihak Ketiga",
        content: [
            "Kami tidak menjual data pribadi Anda. Kami dapat berbagi informasi dengan:",
            "• **Mitra pengiriman** (Gojek, Grab, JNE, dll.) hanya untuk memproses pengiriman pesanan Anda.",
            "• **Penyedia pembayaran** seperti Midtrans untuk memproses transaksi secara aman.",
            "• **Otoritas hukum** jika diwajibkan oleh peraturan perundang-undangan yang berlaku.",
            "• **Pihak ketiga lain** hanya dengan persetujuan eksplisit Anda.",
        ],
    },
    {
        title: "5. Hak-Hak Anda",
        content: [
            "Sebagai pengguna, Anda memiliki hak berikut atas data pribadi Anda:",
            "• **Hak Akses**: Meminta salinan data pribadi yang kami miliki tentang Anda.",
            "• **Hak Koreksi**: Memperbarui atau memperbaiki data yang tidak akurat.",
            "• **Hak Penghapusan**: Meminta penghapusan data pribadi Anda (dengan batasan tertentu).",
            "• **Hak Penarikan Persetujuan**: Menarik persetujuan untuk penggunaan data non-esensial.",
            "• **Hak Portabilitas Data**: Menerima data Anda dalam format yang dapat dibaca mesin.",
            "Untuk menggunakan hak-hak tersebut, hubungi kami di privacy@anantasehat.id.",
        ],
    },
    {
        title: "6. Cookie dan Teknologi Pelacakan",
        content: [
            "Kami menggunakan cookie dan teknologi serupa untuk:",
            "• Menjaga sesi login Anda agar tetap aktif.",
            "• Mengingat preferensi dan produk di keranjang belanja Anda.",
            "• Menganalisis pola penggunaan untuk meningkatkan layanan.",
            "• Menampilkan iklan yang relevan di platform mitra kami.",
            "Anda dapat mengatur preferensi cookie melalui pengaturan browser. Menonaktifkan cookie tertentu dapat mempengaruhi fungsi website.",
        ],
    },
    {
        title: "7. Retensi Data",
        content: [
            "Kami menyimpan data pribadi Anda selama:",
            "• Akun Anda masih aktif atau selama diperlukan untuk menyediakan layanan.",
            "• Diperlukan untuk memenuhi kewajiban hukum (minimal 5 tahun untuk data transaksi).",
            "• Diperlukan untuk penyelesaian sengketa atau penegakan perjanjian.",
            "Setelah periode retensi berakhir, data akan dihapus secara aman atau dianonimkan.",
        ],
    },
    {
        title: "8. Perubahan Kebijakan",
        content: [
            "Kami dapat memperbarui Kebijakan Privasi ini sewaktu-waktu. Perubahan material akan diberitahukan melalui:",
            "• Email ke alamat terdaftar Anda.",
            "• Pemberitahuan di halaman utama website.",
            "• Notifikasi pada aplikasi mobile (jika tersedia).",
            "Penggunaan layanan setelah tanggal efektif perubahan dianggap sebagai persetujuan atas kebijakan yang diperbarui.",
        ],
    },
];

export default function KebijakanPrivasiPage() {
    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh" }}>
            {/* Hero */}
            <div style={{ background: "linear-gradient(135deg, #1B6CA8 0%, #065987 100%)", padding: "56px 24px", textAlign: "center" }}>
                <div className="container-custom">
                    <div style={{ fontSize: 48, marginBottom: 14 }}>🔒</div>
                    <h1 style={{ fontFamily: "Karla, sans-serif", fontSize: 34, fontWeight: 800, color: "white", marginBottom: 12 }}>
                        Kebijakan Privasi
                    </h1>
                    <p style={{ fontSize: 15, color: "rgba(255,255,255,0.8)", maxWidth: 480, margin: "0 auto" }}>
                        Kami berkomitmen melindungi privasi dan keamanan data pribadi Anda.
                    </p>
                    <div style={{ marginTop: 16, fontSize: 13, color: "rgba(255,255,255,0.6)" }}>
                        Terakhir diperbarui: 1 Januari 2025
                    </div>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "48px 16px", maxWidth: 860 }}>
                {/* Intro box */}
                <div style={{ background: "#FFF7ED", border: "1px solid #FED7AA", borderRadius: 12, padding: "18px 22px", marginBottom: 36, display: "flex", gap: 14 }}>
                    <div style={{ fontSize: 22, flexShrink: 0 }}>ℹ️</div>
                    <div style={{ fontSize: 14, color: "#92400E", lineHeight: 1.7 }}>
                        Kebijakan Privasi ini menjelaskan bagaimana PT Ananta Sehat Indonesia ("kami", "Ananta Sehat") mengumpulkan, menggunakan, dan melindungi informasi pribadi Anda saat menggunakan layanan kami. Dengan menggunakan layanan kami, Anda menyetujui praktik yang dijelaskan dalam kebijakan ini.
                    </div>
                </div>

                {/* Sections */}
                <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
                    {sections.map((section) => (
                        <div key={section.title} style={{ background: "white", borderRadius: 16, padding: "28px 32px", border: "1px solid #F1F5F9" }}>
                            <h2 style={{ fontFamily: "Karla, sans-serif", fontSize: 18, fontWeight: 800, color: "var(--gray-900)", marginBottom: 16, paddingBottom: 12, borderBottom: "1px solid #F1F5F9" }}>
                                {section.title}
                            </h2>
                            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                                {section.content.map((line, i) => (
                                    <p key={i} style={{ fontSize: 14, color: line.startsWith("•") ? "var(--gray-600)" : "var(--gray-700)", lineHeight: 1.8, paddingLeft: line.startsWith("•") ? 8 : 0, fontWeight: line.includes("**") ? 400 : 400 }}>
                                        {line.replace(/\*\*(.*?)\*\*/g, "$1")}
                                    </p>
                                ))}
                            </div>
                        </div>
                    ))}
                </div>

                {/* Contact */}
                <div style={{ marginTop: 36, background: "linear-gradient(135deg, #EBF4FF 0%, #DBEAFE 100%)", borderRadius: 16, padding: "28px 32px" }}>
                    <h3 style={{ fontFamily: "Karla, sans-serif", fontSize: 18, fontWeight: 700, color: "var(--gray-900)", marginBottom: 12 }}>📬 Hubungi Tim Privasi Kami</h3>
                    <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 16 }}>
                        Jika Anda memiliki pertanyaan tentang Kebijakan Privasi ini atau ingin menggunakan hak-hak Anda, silakan hubungi:
                    </p>
                    <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                        <div style={{ fontSize: 14, color: "var(--gray-700)" }}>📧 Email: <strong>privacy@anantasehat.id</strong></div>
                        <div style={{ fontSize: 14, color: "var(--gray-700)" }}>📞 Telepon: <strong>0800-1-ANANTA</strong> (Senin–Sabtu, 08.00–20.00)</div>
                        <div style={{ fontSize: 14, color: "var(--gray-700)" }}>📍 Alamat: Jl. Kesehatan No. 123, Jakarta Pusat 10110</div>
                    </div>
                </div>
            </div>
        </div>
    );
}
