import { Suspense } from "react";
import type { Metadata } from "next";
import ProductsPageContent from "./ProductsPageContent";

export const metadata: Metadata = {
    title: "Produk - Ananta Sehat Apotek Online",
    description: "Temukan ribuan produk obat, vitamin, suplemen, dan alat kesehatan berkualitas di Ananta Sehat.",
};

export default function ProductsPage() {
    return (
        <Suspense fallback={
            <div style={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
                <div style={{ textAlign: "center" }}>
                    <div style={{ fontSize: 40, marginBottom: 12 }}>⏳</div>
                    <p style={{ color: "var(--gray-400)" }}>Memuat produk...</p>
                </div>
            </div>
        }>
            <ProductsPageContent />
        </Suspense>
    );
}
