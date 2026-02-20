import type { Metadata } from "next";
import "./globals.css";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { ToastProvider } from "@/components/Toast";

export const metadata: Metadata = {
  title: "Ananta Sehat - Apotek Online Terpercaya",
  description: "Apotek online terpercaya dengan ribuan produk obat, vitamin, suplemen, dan alat kesehatan. Belanja mudah, harga terjangkau, pengiriman cepat.",
  keywords: "apotek online, beli obat online, vitamin, suplemen, alat kesehatan",
  openGraph: {
    title: "Ananta Sehat - Apotek Online Terpercaya",
    description: "Apotek online terpercaya dengan ribuan produk obat, vitamin, suplemen, dan alat kesehatan.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="id">
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link href="https://fonts.googleapis.com/css2?family=Inter:wght@300;400;500;600;700;800&family=Poppins:wght@400;500;600;700;800&display=swap" rel="stylesheet" />
      </head>
      <body>
        <ToastProvider>
          <Navbar />
          <main style={{ minHeight: "calc(100vh - 80px)" }}>
            {children}
          </main>
          <Footer />
        </ToastProvider>
      </body>
    </html>
  );
}
