"use client";

import { usePathname } from "next/navigation";
import dynamic from "next/dynamic";

const Navbar = dynamic(() => import("@/components/Navbar"), { ssr: true });
const Footer = dynamic(() => import("@/components/Footer"), { ssr: true });

export default function LayoutShell({ children }: { children: React.ReactNode }) {
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
