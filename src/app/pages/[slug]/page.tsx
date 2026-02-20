
import React from "react";
import { notFound } from "next/navigation";
import { getPageContent } from "@/lib/api";

export const revalidate = 60; // Revalidate every minute


export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPageContent(slug);

    if (!page) {
        return {
            title: "Page Not Found",
        };
    }

    return {
        title: `${page.title} - Ananta Sehat`,
    };
}

export default async function DynamicPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const page = await getPageContent(slug);

    if (!page) {
        notFound();
    }

    return (
        <div style={{ background: "#FAFBFC", minHeight: "100vh", padding: "40px 0 80px" }}>
            <div className="container-custom">
                <div style={{
                    background: "white",
                    borderRadius: 16,
                    padding: "40px",
                    boxShadow: "0 4px 20px rgba(0,0,0,0.04)",
                    maxWidth: 900,
                    margin: "0 auto"
                }}>
                    <h1 style={{
                        fontFamily: "Poppins, sans-serif",
                        fontSize: 32,
                        fontWeight: 700,
                        color: "var(--gray-900)",
                        marginBottom: 24,
                        borderBottom: "1px solid #F1F5F9",
                        paddingBottom: 24
                    }}>
                        {page.title}
                    </h1>

                    <div
                        className="prose max-w-none"
                        style={{ lineHeight: 1.8, color: "var(--gray-700)" }}
                        dangerouslySetInnerHTML={{ __html: page.content || "<p>No content available.</p>" }}
                    />
                </div>
            </div>
        </div>
    );
}
