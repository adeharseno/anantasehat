"use client";

import React, { useState, useEffect, useMemo } from "react";
import { useSearchParams } from "next/navigation";
import { Search, SlidersHorizontal, ChevronLeft, ChevronRight, X } from "lucide-react";
import { products as staticProducts, categories as staticCategories, formatPrice } from "@/lib/data";
import { getProducts, getCategories } from "@/lib/api";
import ProductCard from "@/components/ProductCard";

const ITEMS_PER_PAGE = 12;

type SortOption = "default" | "price_asc" | "price_desc" | "name_asc";

export default function ProductsPageContent() {
    const searchParams = useSearchParams();
    const [selectedCategory, setSelectedCategory] = useState<string>(searchParams.get("category") || "");
    const [searchQuery, setSearchQuery] = useState<string>(searchParams.get("search") || "");
    const [sortBy, setSortBy] = useState<SortOption>("default");
    const [priceMax, setPriceMax] = useState<number>(500000);
    const [currentPage, setCurrentPage] = useState(1);
    const [sidebarOpen, setSidebarOpen] = useState(false);

    // Data states
    const [products, setProducts] = useState(staticProducts);
    const [categories, setCategories] = useState(staticCategories);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const cat = searchParams.get("category") || "";
        const search = searchParams.get("search") || "";
        setSelectedCategory(cat);
        setSearchQuery(search);
        setCurrentPage(1);
    }, [searchParams]);

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const [prodsData, catsData] = await Promise.all([
                    getProducts(),
                    getCategories()
                ]);

                if (prodsData && prodsData.length > 0) setProducts(prodsData);
                if (catsData && catsData.length > 0) setCategories(catsData);
            } catch (error) {
                console.error("Error fetching products content:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    const filtered = useMemo(() => {
        let result = [...products];
        if (selectedCategory) result = result.filter((p) => p.categorySlug === selectedCategory);
        if (searchQuery) result = result.filter((p) => p.name.toLowerCase().includes(searchQuery.toLowerCase()) || p.category.toLowerCase().includes(searchQuery.toLowerCase()));
        result = result.filter((p) => p.price <= priceMax);
        switch (sortBy) {
            case "price_asc": result.sort((a, b) => a.price - b.price); break;
            case "price_desc": result.sort((a, b) => b.price - a.price); break;
            case "name_asc": result.sort((a, b) => a.name.localeCompare(b.name)); break;
        }
        return result;
    }, [selectedCategory, searchQuery, priceMax, sortBy, products]);

    const totalPages = Math.ceil(filtered.length / ITEMS_PER_PAGE);
    const paginated = filtered.slice((currentPage - 1) * ITEMS_PER_PAGE, currentPage * ITEMS_PER_PAGE);

    const activeCategory = categories.find((c) => c.slug === selectedCategory);

    const clearFilters = () => {
        setSelectedCategory("");
        setSearchQuery("");
        setPriceMax(500000);
        setSortBy("default");
        setCurrentPage(1);
    };

    const hasActiveFilters = selectedCategory || searchQuery || priceMax < 500000 || sortBy !== "default";

    const Sidebar = () => (
        <aside style={{
            width: 260,
            flexShrink: 0,
        }}>
            {/* Category Filter */}
            <div style={{ background: "white", borderRadius: 12, padding: "20px", marginBottom: 16, border: "1px solid #F1F5F9" }}>
                <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                    <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gray-800)" }}>
                        Klasifikasi Obat
                    </h3>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 4 }}>
                    <button
                        onClick={() => { setSelectedCategory(""); setCurrentPage(1); }}
                        style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "space-between",
                            padding: "8px 10px",
                            borderRadius: 8,
                            border: "none",
                            cursor: "pointer",
                            background: !selectedCategory ? "var(--primary-light)" : "transparent",
                            color: !selectedCategory ? "var(--primary)" : "var(--gray-600)",
                            fontWeight: !selectedCategory ? 600 : 400,
                            fontSize: 13,
                            textAlign: "left",
                            transition: "all 0.15s",
                        }}
                    >
                        <span>Semua Kategori</span>
                        <span style={{ fontSize: 11, color: "var(--gray-400)", background: "#F3F4F6", padding: "1px 6px", borderRadius: 4 }}>
                            {products.length}
                        </span>
                    </button>
                    {categories.map((cat) => (
                        <button
                            key={cat.slug}
                            onClick={() => { setSelectedCategory(cat.slug); setCurrentPage(1); }}
                            style={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                padding: "8px 10px",
                                borderRadius: 8,
                                border: "none",
                                cursor: "pointer",
                                background: selectedCategory === cat.slug ? "var(--primary-light)" : "transparent",
                                color: selectedCategory === cat.slug ? "var(--primary)" : "var(--gray-600)",
                                fontWeight: selectedCategory === cat.slug ? 600 : 400,
                                fontSize: 13,
                                textAlign: "left",
                                width: "100%",
                                transition: "all 0.15s",
                            }}
                        >
                            <span style={{ display: "flex", alignItems: "center", gap: 8 }}>
                                <span>{cat.icon}</span>
                                <span>{cat.name}</span>
                            </span>
                            <span style={{
                                fontSize: 11,
                                color: selectedCategory === cat.slug ? "var(--primary)" : "var(--gray-400)",
                                background: selectedCategory === cat.slug ? "#DBEAFE" : "#F3F4F6",
                                padding: "1px 6px",
                                borderRadius: 4,
                            }}>
                                {cat.count}
                            </span>
                        </button>
                    ))}
                </div>
            </div>

            {/* Price Filter */}
            <div style={{ background: "white", borderRadius: 12, padding: "20px", border: "1px solid #F1F5F9" }}>
                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 14, fontWeight: 700, color: "var(--gray-800)", marginBottom: 16 }}>
                    Filter Harga
                </h3>
                <div style={{ marginBottom: 16 }}>
                    <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 10 }}>
                        <span style={{ fontSize: 12, color: "var(--gray-500)" }}>Maks. Harga</span>
                        <span style={{ fontSize: 13, fontWeight: 600, color: "var(--primary)" }}>{formatPrice(priceMax)}</span>
                    </div>
                    <input
                        type="range"
                        min={10000}
                        max={500000}
                        step={5000}
                        value={priceMax}
                        onChange={(e) => { setPriceMax(Number(e.target.value)); setCurrentPage(1); }}
                        style={{ width: "100%" }}
                    />
                    <div style={{ display: "flex", justifyContent: "space-between", fontSize: 11, color: "var(--gray-400)", marginTop: 4 }}>
                        <span>Rp10.000</span>
                        <span>Rp500.000</span>
                    </div>
                </div>
                <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
                    {[
                        { label: "Di bawah Rp50.000", max: 50000 },
                        { label: "Rp50.000 - Rp150.000", max: 150000 },
                        { label: "Rp150.000 - Rp300.000", max: 300000 },
                        { label: "Di atas Rp300.000", max: 500000 },
                    ].map((range) => (
                        <button
                            key={range.label}
                            onClick={() => { setPriceMax(range.max); setCurrentPage(1); }}
                            style={{
                                padding: "6px 10px",
                                borderRadius: 6,
                                border: "1px solid",
                                borderColor: priceMax === range.max ? "var(--primary)" : "var(--gray-200)",
                                background: priceMax === range.max ? "var(--primary-light)" : "white",
                                color: priceMax === range.max ? "var(--primary)" : "var(--gray-600)",
                                fontSize: 12,
                                cursor: "pointer",
                                textAlign: "left",
                                fontWeight: priceMax === range.max ? 600 : 400,
                                transition: "all 0.15s",
                            }}
                        >
                            {range.label}
                        </button>
                    ))}
                </div>
            </div>
        </aside>
    );

    return (
        <div style={{ minHeight: "100vh", background: "#FAFBFC" }}>
            {/* Mobile Filter Drawer Overlay */}
            {sidebarOpen && (
                <div
                    style={{
                        position: "fixed", inset: 0, zIndex: 1000,
                        display: "flex", alignItems: "flex-end",
                    }}
                >
                    {/* Backdrop */}
                    <div
                        onClick={() => setSidebarOpen(false)}
                        style={{ position: "absolute", inset: 0, background: "rgba(0,0,0,0.45)" }}
                    />
                    {/* Drawer */}
                    <div style={{
                        position: "relative", zIndex: 1,
                        background: "white",
                        width: "100%",
                        maxHeight: "85vh",
                        overflowY: "auto",
                        borderTopLeftRadius: 20,
                        borderTopRightRadius: 20,
                        padding: "20px 16px 32px",
                        boxShadow: "0 -8px 40px rgba(0,0,0,0.2)",
                    }}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
                            <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 16, fontWeight: 700, color: "var(--gray-900)" }}>Filter Produk</h3>
                            <button
                                onClick={() => setSidebarOpen(false)}
                                style={{ background: "#F3F4F6", border: "none", borderRadius: 8, width: 32, height: 32, display: "flex", alignItems: "center", justifyContent: "center", cursor: "pointer" }}
                            >
                                <X size={18} color="var(--gray-600)" />
                            </button>
                        </div>
                        <Sidebar />
                        <button
                            onClick={() => setSidebarOpen(false)}
                            className="btn-primary"
                            style={{ width: "100%", marginTop: 20, padding: "13px" }}
                        >
                            Terapkan Filter
                        </button>
                    </div>
                </div>
            )}
            {/* Header */}
            <div style={{ background: "white", borderBottom: "1px solid #F1F5F9", padding: "24px 0" }}>
                <div className="container-custom">
                    <nav className="breadcrumb" style={{ marginBottom: 12 }}>
                        <a href="/">Beranda</a>
                        <span>/</span>
                        <span>Produk</span>
                        {activeCategory && (
                            <>
                                <span>/</span>
                                <span style={{ color: "var(--primary)" }}>{activeCategory.name}</span>
                            </>
                        )}
                    </nav>
                    <h1 style={{ fontFamily: "Poppins, sans-serif", fontSize: 24, fontWeight: 700, color: "var(--gray-900)" }}>
                        {activeCategory ? activeCategory.name : searchQuery ? `Hasil Pencarian: "${searchQuery}"` : "Semua Produk"}
                    </h1>
                    <p style={{ fontSize: 14, color: "var(--gray-500)", marginTop: 4 }}>
                        {filtered.length} produk ditemukan
                    </p>
                </div>
            </div>

            <div className="container-custom" style={{ padding: "24px 16px" }}>
                <div style={{ display: "flex", gap: 28 }}>
                    {/* Desktop Sidebar – hidden on mobile via CSS */}
                    <div className="desktop-sidebar">
                        <Sidebar />
                    </div>

                    {/* Main Content */}
                    <div style={{ flex: 1, minWidth: 0 }}>
                        {/* Toolbar */}
                        <div style={{
                            display: "flex",
                            alignItems: "center",
                            gap: 12,
                            marginBottom: 24,
                            flexWrap: "wrap",
                        }}>
                            {/* Search */}
                            <div style={{ position: "relative", flex: 1, minWidth: 0 }} className="toolbar-search">
                                <Search size={16} style={{ position: "absolute", left: 12, top: "50%", transform: "translateY(-50%)", color: "var(--gray-400)" }} />
                                <input
                                    type="text"
                                    placeholder="Cari produk..."
                                    value={searchQuery}
                                    onChange={(e) => { setSearchQuery(e.target.value); setCurrentPage(1); }}
                                    className="input-field"
                                    style={{ paddingLeft: 38 }}
                                />
                            </div>

                            {/* Sort */}
                            <select
                                value={sortBy}
                                onChange={(e) => { setSortBy(e.target.value as SortOption); setCurrentPage(1); }}
                                className="input-field toolbar-sort"
                                style={{ width: "auto", minWidth: 160 }}
                            >
                                <option value="default">Urutan Default</option>
                                <option value="price_asc">Harga: Murah ke Mahal</option>
                                <option value="price_desc">Harga: Mahal ke Murah</option>
                                <option value="name_asc">Nama: A-Z</option>
                            </select>

                            {/* Filter (mobile) */}
                            <button
                                onClick={() => setSidebarOpen(!sidebarOpen)}
                                style={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 6,
                                    padding: "10px 14px",
                                    borderRadius: 8,
                                    border: "1.5px solid var(--gray-200)",
                                    background: "white",
                                    cursor: "pointer",
                                    fontSize: 13,
                                    fontWeight: 500,
                                    color: "var(--gray-600)",
                                }}
                                className="mobile-filter-btn"
                            >
                                <SlidersHorizontal size={16} />
                                Filter
                            </button>

                            {/* Clear filters */}
                            {hasActiveFilters && (
                                <button
                                    onClick={clearFilters}
                                    style={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 4,
                                        padding: "10px 14px",
                                        borderRadius: 8,
                                        border: "1.5px solid #FCA5A5",
                                        background: "#FEF2F2",
                                        cursor: "pointer",
                                        fontSize: 13,
                                        fontWeight: 500,
                                        color: "#DC2626",
                                    }}
                                >
                                    <X size={14} />
                                    Reset Filter
                                </button>
                            )}
                        </div>

                        {/* Products Grid */}
                        {paginated.length > 0 ? (
                            <div className="products-grid">
                                {paginated.map((product) => (
                                    <ProductCard key={product.id} product={product} />
                                ))}
                            </div>
                        ) : (
                            <div style={{ textAlign: "center", padding: "80px 20px" }}>
                                <div style={{ fontSize: 60, marginBottom: 16 }}>🔍</div>
                                <h3 style={{ fontFamily: "Poppins, sans-serif", fontSize: 18, fontWeight: 600, color: "var(--gray-700)", marginBottom: 8 }}>Produk tidak ditemukan</h3>
                                <p style={{ color: "var(--gray-400)", fontSize: 14 }}>Coba ubah filter atau kata kunci pencarian Anda</p>
                                <button onClick={clearFilters} className="btn-primary" style={{ marginTop: 20 }}>
                                    Reset Filter
                                </button>
                            </div>
                        )}

                        {/* Pagination */}
                        {totalPages > 1 && (
                            <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, marginTop: 40 }}>
                                <button
                                    onClick={() => setCurrentPage((p) => Math.max(1, p - 1))}
                                    disabled={currentPage === 1}
                                    className="page-btn"
                                    style={{ opacity: currentPage === 1 ? 0.4 : 1 }}
                                >
                                    <ChevronLeft size={16} />
                                </button>

                                {Array.from({ length: totalPages }, (_, i) => i + 1)
                                    .filter(p => p === 1 || p === totalPages || Math.abs(p - currentPage) <= 1)
                                    .reduce<(number | string)[]>((acc, p, idx, arr) => {
                                        if (idx > 0 && (p as number) - (arr[idx - 1] as number) > 1) acc.push("...");
                                        acc.push(p);
                                        return acc;
                                    }, [])
                                    .map((item, idx) => (
                                        typeof item === "number" ? (
                                            <button
                                                key={idx}
                                                onClick={() => setCurrentPage(item)}
                                                className={`page-btn ${currentPage === item ? "active" : ""}`}
                                            >
                                                {item}
                                            </button>
                                        ) : (
                                            <span key={idx} style={{ color: "var(--gray-400)", fontSize: 14, padding: "0 4px" }}>...</span>
                                        )
                                    ))}

                                <button
                                    onClick={() => setCurrentPage((p) => Math.min(totalPages, p + 1))}
                                    disabled={currentPage === totalPages}
                                    className="page-btn"
                                    style={{ opacity: currentPage === totalPages ? 0.4 : 1 }}
                                >
                                    <ChevronRight size={16} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            </div>

            <style jsx global>{`
        /* Hide desktop sidebar on mobile */
        @media (max-width: 768px) {
          .desktop-sidebar { display: none !important; }
          .mobile-filter-btn { display: flex !important; }
        }
        @media (min-width: 769px) {
          .mobile-filter-btn { display: none !important; }
        }

        /* Products grid: 2 col on mobile, auto on desktop */
        .products-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 12px;
          align-items: stretch;
        }
        @media (min-width: 640px) {
          .products-grid {
            grid-template-columns: repeat(auto-fill, minmax(200px, 1fr));
            gap: 20px;
          }
        }

        /* Compact toolbar on mobile */
        @media (max-width: 480px) {
          .toolbar-search { min-width: 0 !important; }
          .toolbar-sort { width: 100% !important; min-width: 0 !important; }
        }
      `}</style>
        </div>
    );
}
