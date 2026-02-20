"use client";

import React from "react";
import { usePathname } from "next/navigation";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";

export default function ClientLayout({ children }: { children: React.ReactNode }) {
    const pathname = usePathname();
    const isCMS = pathname?.startsWith("/cms");

    if (isCMS) {
        return <>{children}</>;
    }

    return (
        <>
            <Navbar />
            <main style={{ minHeight: "calc(100vh - 80px)" }}>
                {children}
            </main>
            <Footer />
        </>
    );
}
