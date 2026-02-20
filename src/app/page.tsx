"use client";

import React, { useState, useEffect, useRef, useCallback } from "react";
import Link from "next/link";
import { ArrowRight, Shield, Truck, Clock, Award, ChevronLeft, ChevronRight, Star } from "lucide-react";
import { categories, featuredProducts, formatPrice } from "@/lib/data";
import ProductCard from "@/components/ProductCard";

const bannerSlides = [
  {
    id: 1,
    title: "Kesehatan Optimal\nDimulai dari Sini",
    subtitle: "Ribuan produk kesehatan asli dan terpercaya, tersedia untuk Anda",
    cta: "Belanja Sekarang",
    ctaLink: "/products",
    bg: "linear-gradient(135deg, #1B6CA8 0%, #065987 50%, #004166 100%)",
    accent: "#00B4AA",
    emoji: "💊",
    badge: "🏥 Apotek Berlisensi BPOM",
  },
  {
    id: 2,
    title: "Vitamin & Suplemen\nTerbaik untuk Anda",
    subtitle: "Tingkatkan imunitas tubuh dengan vitamin pilihan dari brand terpercaya",
    cta: "Lihat Vitamin",
    ctaLink: "/products?category=vitamin-suplemen",
    bg: "linear-gradient(135deg, #7C3AED 0%, #5B21B6 50%, #3B0764 100%)",
    accent: "#A78BFA",
    emoji: "🫐",
    badge: "✨ Promo Hari Ini",
  },
  {
    id: 3,
    title: "Herbal Tradisional\nAlami & Berkhasiat",
    subtitle: "Produk herbal pilihan dari bahan-bahan alam terbaik Indonesia",
    cta: "Temukan Herbal",
    ctaLink: "/products?category=herbal-tradisional",
    bg: "linear-gradient(135deg, #065F46 0%, #047857 50%, #10B981 100%)",
    accent: "#6EE7B7",
    emoji: "🌿",
    badge: "🌱 100% Alami",
  },
];

export default function HomePage() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const touchStartX = useRef<number | null>(null);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const startAutoPlay = useCallback(() => {
    if (intervalRef.current) clearInterval(intervalRef.current);
    intervalRef.current = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bannerSlides.length);
    }, 5000);
  }, []);

  useEffect(() => {
    startAutoPlay();
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [startAutoPlay]);

  const goTo = useCallback((idx: number) => {
    setCurrentSlide((idx + bannerSlides.length) % bannerSlides.length);
    startAutoPlay(); // reset timer on manual nav
  }, [startAutoPlay]);

  const handleTouchStart = (e: React.TouchEvent) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    if (touchStartX.current === null) return;
    const delta = e.changedTouches[0].clientX - touchStartX.current;
    if (Math.abs(delta) > 50) {
      goTo(currentSlide + (delta < 0 ? 1 : -1));
    }
    touchStartX.current = null;
  };

  return (
    <div>
      {/* Hero Banner */}
      <section
        style={{ position: "relative", overflow: "hidden" }}
        onTouchStart={handleTouchStart}
        onTouchEnd={handleTouchEnd}
      >
        {/* All slides stacked — active one fades in */}
        <div style={{ position: "relative" }}>
          {bannerSlides.map((s, idx) => (
            <div
              key={s.id}
              style={{
                background: s.bg,
                padding: "60px 0 70px",
                position: idx === 0 ? "relative" : "absolute",
                inset: 0,
                opacity: idx === currentSlide ? 1 : 0,
                transition: "opacity 0.7s ease",
                pointerEvents: idx === currentSlide ? "auto" : "none",
                zIndex: idx === currentSlide ? 1 : 0,
              }}
            >
              {/* Background Pattern */}
              <div style={{
                position: "absolute", inset: 0,
                backgroundImage: "radial-gradient(circle at 70% 50%, rgba(255,255,255,0.05) 0%, transparent 60%)",
              }} />

              <div className="container-custom" style={{ position: "relative", display: "flex", alignItems: "center", gap: 40 }}>
                <div style={{ flex: 1 }}>
                  <div style={{
                    display: "inline-flex", alignItems: "center", gap: 6,
                    background: "rgba(255,255,255,0.15)", borderRadius: 100,
                    padding: "6px 14px", fontSize: 12,
                    color: "rgba(255,255,255,0.95)", fontWeight: 600,
                    marginBottom: 20, backdropFilter: "blur(10px)",
                  }}>
                    {s.badge}
                  </div>
                  <h1 className="banner-title" style={{
                    fontFamily: "Karla, sans-serif", fontSize: 42, fontWeight: 800,
                    color: "white", lineHeight: 1.2, marginBottom: 16, whiteSpace: "pre-line",
                  }}>
                    {s.title}
                  </h1>
                  <p style={{ fontSize: 16, color: "rgba(255,255,255,0.85)", marginBottom: 32, maxWidth: 460, lineHeight: 1.6 }}>
                    {s.subtitle}
                  </p>
                  <div style={{ display: "flex", gap: 12, flexWrap: "wrap" }}>
                    <Link href={s.ctaLink} className="btn-primary" style={{ background: "white", color: "var(--primary)", fontSize: 15, padding: "12px 28px" }}>
                      {s.cta} <ArrowRight size={16} />
                    </Link>
                    <Link href="/products" style={{
                      display: "inline-flex", alignItems: "center", gap: 6,
                      padding: "12px 28px",
                      background: "rgba(255,255,255,0.15)", color: "white",
                      borderRadius: 8, textDecoration: "none",
                      fontWeight: 600, fontSize: 15,
                      backdropFilter: "blur(10px)",
                      border: "1px solid rgba(255,255,255,0.3)",
                    }}>
                      Lihat Semua Produk
                    </Link>
                  </div>
                </div>

                {/* Big emoji bg */}
                <div style={{
                  fontSize: 140, opacity: 0.2,
                  position: "absolute", right: 60, top: "50%",
                  transform: "translateY(-50%)", lineHeight: 1, userSelect: "none",
                }}>
                  {s.emoji}
                </div>
              </div>
            </div>
          ))}

          {/* Dot indicators — always on top */}
          <div style={{
            position: "absolute", bottom: 16, left: "50%", transform: "translateX(-50%)",
            display: "flex", gap: 8, alignItems: "center", zIndex: 10,
          }}>
            {bannerSlides.map((_, idx) => (
              <button
                key={idx}
                onClick={() => goTo(idx)}
                style={{
                  width: idx === currentSlide ? 24 : 8, height: 8, borderRadius: 4,
                  background: idx === currentSlide ? "white" : "rgba(255,255,255,0.4)",
                  border: "none", cursor: "pointer",
                  transition: "all 0.3s ease", padding: 0,
                }}
              />
            ))}
          </div>

          {/* Prev/Next arrows — hidden on mobile via CSS */}
          <button
            className="slider-arrow"
            onClick={() => goTo(currentSlide - 1)}
            style={{
              position: "absolute", left: 16, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
              width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", backdropFilter: "blur(10px)", color: "white", zIndex: 10,
            }}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            className="slider-arrow"
            onClick={() => goTo(currentSlide + 1)}
            style={{
              position: "absolute", right: 16, top: "50%", transform: "translateY(-50%)",
              background: "rgba(255,255,255,0.2)", border: "none", borderRadius: "50%",
              width: 40, height: 40, display: "flex", alignItems: "center", justifyContent: "center",
              cursor: "pointer", backdropFilter: "blur(10px)", color: "white", zIndex: 10,
            }}
          >
            <ChevronRight size={20} />
          </button>
        </div>

        {/* Stats Bar */}
        <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", boxShadow: "0 4px 20px rgba(0,0,0,0.04)" }}>
          <div className="container-custom" style={{ padding: "0 16px" }}>
            <div className="stats-bar">
              {[
                { icon: <Shield size={18} color="var(--primary)" />, label: "Produk Asli Bergaransi" },
                { icon: <Truck size={18} color="var(--primary)" />, label: "Pengiriman Cepat" },
                { icon: <Clock size={18} color="var(--primary)" />, label: "Layanan 24/7" },
                { icon: <Award size={18} color="var(--primary)" />, label: "Terdaftar BPOM" },
              ].map((item, i) => (
                <div key={i} className="stats-item">
                  {item.icon}
                  <span style={{ fontSize: 12, fontWeight: 600, color: "var(--gray-700)", whiteSpace: "nowrap" }}>{item.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Category Section */}
      <section style={{ padding: "60px 0 40px" }}>
        <div className="container-custom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <h2 className="section-title">Kategori Produk</h2>
              <p className="section-subtitle">Temukan produk yang Anda butuhkan berdasarkan kategori</p>
            </div>
            <Link href="/products" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>

          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(145px, 1fr))", gap: 16 }}>
            {categories.map((cat) => (
              <Link
                key={cat.id}
                href={`/products?category=${cat.slug}`}
                style={{ textDecoration: "none" }}
              >
                <div style={{
                  background: "white",
                  borderRadius: 14,
                  padding: "20px 16px",
                  textAlign: "center",
                  border: "1.5px solid #F1F5F9",
                  cursor: "pointer",
                  transition: "all 0.25s ease",
                  boxShadow: "0 1px 3px rgba(0,0,0,0.05)",
                }}
                  onMouseEnter={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = cat.color;
                    el.style.transform = "translateY(-4px)";
                    el.style.boxShadow = `0 12px 30px ${cat.color}22`;
                  }}
                  onMouseLeave={(e) => {
                    const el = e.currentTarget as HTMLElement;
                    el.style.borderColor = "#F1F5F9";
                    el.style.transform = "translateY(0)";
                    el.style.boxShadow = "0 1px 3px rgba(0,0,0,0.05)";
                  }}
                >
                  <div style={{
                    width: 52,
                    height: 52,
                    borderRadius: 14,
                    background: `${cat.color}15`,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    fontSize: 24,
                    margin: "0 auto 12px",
                  }}>
                    {cat.icon}
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "var(--gray-700)", marginBottom: 4, lineHeight: 1.3 }}>
                    {cat.name}
                  </div>
                  <div style={{ fontSize: 11, color: "var(--gray-400)" }}>
                    {cat.count} produk
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Promo Banner */}
      <section style={{ padding: "20px 0 40px" }}>
        <div className="container-custom" style={{ padding: "0 16px" }}>
          <div className="promo-banner" style={{
            background: "linear-gradient(135deg, #00B4AA 0%, #0891B2 100%)",
            borderRadius: 16,
            padding: "28px 32px",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: 20,
            position: "relative",
            overflow: "hidden",
          }}>
            <div style={{ position: "absolute", right: 180, opacity: 0.08, fontSize: 100, pointerEvents: "none" }}>🎁</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div style={{ fontSize: 11, fontWeight: 700, color: "rgba(255,255,255,0.8)", letterSpacing: 1, marginBottom: 6, textTransform: "uppercase" }}>
                🔥 Promo Spesial Hari Ini
              </div>
              <h3 style={{ fontFamily: "Poppins,sans-serif", fontSize: 20, fontWeight: 700, color: "white", marginBottom: 4 }}>
                Gratis Ongkir untuk Semua Produk
              </h3>
              <p style={{ fontSize: 13, color: "rgba(255,255,255,0.85)" }}>
                Minimum pembelian Rp150.000 • Berlaku hari ini saja!
              </p>
            </div>
            <Link href="/products" style={{
              background: "white", color: "#0891B2",
              padding: "11px 24px", borderRadius: 10,
              textDecoration: "none", fontWeight: 700, fontSize: 14,
              flexShrink: 0, whiteSpace: "nowrap",
              boxShadow: "0 4px 14px rgba(0,0,0,0.15)",
            }}>
              Belanja Sekarang
            </Link>
          </div>
        </div>
      </section>

      {/* Featured Products */}
      <section style={{ padding: "20px 0 60px" }}>
        <div className="container-custom">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-end", marginBottom: 32 }}>
            <div>
              <h2 className="section-title">Produk Unggulan</h2>
              <p className="section-subtitle">Produk terlaris dan paling direkomendasikan</p>
            </div>
            <Link href="/products" style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--primary)", textDecoration: "none", fontSize: 14, fontWeight: 600 }}>
              Lihat Semua <ArrowRight size={14} />
            </Link>
          </div>

          <div className="featured-grid">
            {featuredProducts.slice(0, 8).map((product) => (
              <ProductCard key={product.id} product={product} />
            ))}
          </div>
        </div>
      </section>

      {/* Trust Section */}
      <section style={{ background: "#F8FAFF", padding: "60px 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: 48 }}>
            <h2 className="section-title">Mengapa Pilih Ananta Sehat?</h2>
            <p className="section-subtitle">Apotek online terpercaya dengan pelayanan terbaik</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(220px, 1fr))", gap: 24 }}>
            {[
              { icon: "🏅", title: "100% Produk Asli", desc: "Semua produk kami berlisensi resmi BPOM dan terjamin keasliannya" },
              { icon: "🚀", title: "Pengiriman Cepat", desc: "Estimasi pengiriman 1-3 hari kerja ke seluruh Indonesia" },
              { icon: "💬", title: "Konsultasi Gratis", desc: "Konsultasi dengan apoteker kami secara gratis via chat" },
              { icon: "🔒", title: "Transaksi Aman", desc: "Sistem keamanan berlapis SSL untuk melindungi data Anda" },
            ].map((item, i) => (
              <div key={i} style={{
                background: "white",
                borderRadius: 16,
                padding: "28px 24px",
                textAlign: "center",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                transition: "transform 0.2s ease",
              }}
                onMouseEnter={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(-4px)")}
                onMouseLeave={(e) => ((e.currentTarget as HTMLElement).style.transform = "translateY(0)")}
              >
                <div style={{ fontSize: 40, marginBottom: 14 }}>{item.icon}</div>
                <h4 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-800)", marginBottom: 8 }}>{item.title}</h4>
                <p style={{ fontSize: 13, color: "var(--gray-500)", lineHeight: 1.6 }}>{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section style={{ padding: "60px 0" }}>
        <div className="container-custom">
          <div style={{ textAlign: "center", marginBottom: 40 }}>
            <h2 className="section-title">Apa Kata Mereka?</h2>
            <p className="section-subtitle">Kepuasan pelanggan adalah prioritas utama kami</p>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 20 }}>
            {[
              { name: "Siti Rahayu", role: "Pelanggan Tetap", text: "Produknya asli semua, pengiriman cepat dan aman. Sudah 3 tahun belanja di sini, tidak pernah kecewa!", rating: 5 },
              { name: "Budi Santoso", role: "Pelanggan Baru", text: "Harga terjangkau, banyak pilihan produk. Customer service juga sangat responsif dan membantu.", rating: 5 },
              { name: "Dewi Kusuma", role: "Pelanggan Setia", text: "Mudah banget belanja di sini, bisa konsultasi langsung dengan apoteker. Sangat recommended!", rating: 5 },
            ].map((review, i) => (
              <div key={i} style={{
                background: "white",
                borderRadius: 16,
                padding: "24px",
                boxShadow: "0 2px 12px rgba(0,0,0,0.06)",
                border: "1px solid #F1F5F9",
              }}>
                <div style={{ display: "flex", gap: 4, marginBottom: 12 }}>
                  {Array.from({ length: review.rating }).map((_, si) => (
                    <Star key={si} size={14} fill="#F59E0B" color="#F59E0B" />
                  ))}
                </div>
                <p style={{ fontSize: 14, color: "var(--gray-600)", lineHeight: 1.7, marginBottom: 16, fontStyle: "italic" }}>
                  &quot;{review.text}&quot;
                </p>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  <div style={{
                    width: 38, height: 38, borderRadius: "50%",
                    background: "linear-gradient(135deg, var(--primary) 0%, #00B4AA 100%)",
                    display: "flex", alignItems: "center", justifyContent: "center",
                    color: "white", fontWeight: 700, fontSize: 14,
                  }}>
                    {review.name[0]}
                  </div>
                  <div>
                    <div style={{ fontSize: 14, fontWeight: 600, color: "var(--gray-800)" }}>{review.name}</div>
                    <div style={{ fontSize: 12, color: "var(--gray-400)" }}>{review.role}</div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <style jsx global>{`
        /* Slider arrows: hide on mobile */
        @media (max-width: 640px) {
          .slider-arrow { display: none !important; }
        }

        /* Stats bar: horizontal scroll on mobile */
        .stats-bar {
          display: flex;
          align-items: center;
          padding: 14px 0;
          gap: 0;
        }
        .stats-item {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          flex: 1;
          padding: 8px 10px;
          border-right: 1px solid #F1F5F9;
        }
        .stats-item:last-child { border-right: none; }

        @media (max-width: 640px) {
          .stats-bar {
            overflow-x: auto;
            scrollbar-width: none;
            justify-content: flex-start;
            padding: 12px 0;
            gap: 0;
          }
          .stats-bar::-webkit-scrollbar { display: none; }
          .stats-item {
            flex: 0 0 auto;
            padding: 8px 16px;
            border-right: 1px solid #F1F5F9;
          }
        }

        /* Promo banner: stack on mobile */
        @media (max-width: 600px) {
          .promo-banner {
            flex-direction: column !important;
            align-items: flex-start !important;
            padding: 22px 20px !important;
            border-radius: 14px !important;
          }
          .promo-banner a {
            width: 100% !important;
            text-align: center;
          }
        }

        /* Featured products: 2 col on mobile */
        .featured-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          align-items: stretch;
        }
        @media (min-width: 640px) {
          .featured-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }
      `}</style>
    </div>
  );
}
