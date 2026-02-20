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
        <link href="https://fonts.googleapis.com/css2?family=Karla:ital,wght@0,200;0,300;0,400;0,500;0,600;0,700;0,800;1,400&display=swap" rel="stylesheet" />
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
