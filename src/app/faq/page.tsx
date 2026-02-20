"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import { Loader2 } from "lucide-react";
import { getFAQ } from "@/lib/api";

const CATEGORY_EMOJIS: Record<string, string> = {
    "Produk & Keaslian": "💊",
    "Pemesanan": "🛒",
    "Pembayaran": "💳",
    "Pengiriman": "🚚",
    "Obat Keras & Resep": "💉",
    "Pengembalian & Refund": "↩️",
    "Umum": "❓"
};

type FAQItem = {
    q: string;
    a: string;
};

type FAQGroup = {
    category: string;
    emoji: string;
    items: FAQItem[];
};

export default function FAQPage() {
    const [faqs, setFaqs] = useState<FAQGroup[]>([]);
    const [loading, setLoading] = useState(true);
    const [openIdx, setOpenIdx] = useState<string | null>(null);
    const [activeCategory, setActiveCategory] = useState("Semua");

    useEffect(() => {
        const fetchFAQs = async () => {
            setLoading(true);
            try {
                const data = await getFAQ();

                // Group by category
                const groups: Record<string, FAQGroup> = {};

                if (data && data.length > 0) {
                    data.forEach((item: any) => {
                        const cat = item.category || "Umum";
                        if (!groups[cat]) {
                            groups[cat] = {
                                category: cat,
                                emoji: CATEGORY_EMOJIS[cat] || "❓",
                                items: []
                            };
                        }
                        groups[cat].items.push({
                            q: item.question,
                            a: item.answer
                        });
                    });
                    setFaqs(Object.values(groups));
                } else {
                    // Fallback to static if empty (optional, but good for demo)
                    // For now, let's just leave it empty or show a message
                }
            } catch (error) {
                console.error("Failed to fetch FAQs", error);
            } finally {
                setLoading(false);
            }
        };

        fetchFAQs();
    }, []);

    const categories = ["Semua", ...faqs.map((f) => f.category)];
    const filteredFaqs = activeCategory === "Semua" ? faqs : faqs.filter((f) => f.category === activeCategory);

    if (loading) {
        return (
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh", background: "#FAFBFC" }}>
                <Loader2 className="animate-spin text-blue-600" size={40} />
            </div>
        );
    }

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
                {categories.length > 1 && (
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
                )}

                {/* FAQ Accordion */}
                {filteredFaqs.length > 0 ? (
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
                ) : (
                    <div style={{ textAlign: "center", padding: "40px" }}>
                        <p style={{ color: "var(--gray-500)" }}>Belum ada pertanyaan yang tersedia.</p>
                    </div>
                )}

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
