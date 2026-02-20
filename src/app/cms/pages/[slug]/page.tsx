
"use client";

import React, { useState, useEffect } from "react";
import { useParams, useRouter } from "next/navigation";
import { Save, ArrowLeft, Loader2 } from "lucide-react";
import Link from "next/link";
import { supabase } from "@/lib/supabase";

export default function EditPage() {
    const { slug } = useParams();
    const router = useRouter();
    const [loading, setLoading] = useState(true);
    const [saving, setSaving] = useState(false);
    const [data, setData] = useState({ title: "", content: "" });
    const [notFound, setNotFound] = useState(false);

    useEffect(() => {
        const fetchPage = async () => {
            if (!slug) return;
            setLoading(true);
            const { data: pageData, error } = await supabase
                .from('pages')
                .select('*')
                .eq('slug', slug)
                .single();

            if (error || !pageData) {
                // If not found, maybe we want to allow creating? 
                // For now, let's assume if it doesn't exist we initialize empty state for creation
                setNotFound(true);
                // But generally users shouldn't land here for "new" unless we have a create flow
                // Let's just prepopulate slug if needed
                setData({ title: slug.toString().replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase()), content: "" });
            } else {
                setData({ title: pageData.title, content: pageData.content });
                setNotFound(false);
            }
            setLoading(false);
        };
        fetchPage();
    }, [slug]);

    const handleSave = async () => {
        setSaving(true);
        try {
            const pageData = {
                slug: slug,
                title: data.title,
                content: data.content,
                updated_at: new Date().toISOString()
            };

            // Upsert (update if exists, insert if not)
            const { error } = await supabase
                .from('pages')
                .upsert(pageData, { onConflict: 'slug' });

            if (error) throw error;

            alert("Page saved successfully!");
            router.refresh();
        } catch (error: any) {
            console.error("Error saving page:", error);
            alert("Failed to save page: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    if (loading) {
        return (
            <div className="flex h-screen items-center justify-center text-blue-600">
                <Loader2 className="animate-spin" size={40} />
            </div>
        );
    }

    return (
        <div className="space-y-6 max-w-4xl mx-auto pb-10">
            <div className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                    <Link href="/cms/pages" className="p-2 hover:bg-gray-100 rounded-full transition-colors text-gray-500">
                        <ArrowLeft size={20} />
                    </Link>
                    <h1 className="text-2xl font-bold text-gray-800">
                        {notFound ? `Create ${slug}` : `Edit ${data.title || slug}`}
                    </h1>
                </div>
                <button
                    onClick={handleSave}
                    disabled={saving}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2.5 rounded-lg flex items-center gap-2 font-medium transition-colors shadow-sm disabled:opacity-70"
                >
                    {saving ? <Loader2 className="animate-spin" size={20} /> : <Save size={20} />}
                    {saving ? "Saving..." : "Save Changes"}
                </button>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 space-y-6">
                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Page Title</label>
                    <input
                        type="text"
                        className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all"
                        value={data.title}
                        onChange={(e) => setData({ ...data, title: e.target.value })}
                    />
                </div>

                <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Content (Html supported)</label>
                    <textarea
                        rows={20}
                        className="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 outline-none transition-all font-mono text-sm leading-relaxed"
                        value={data.content}
                        onChange={(e) => setData({ ...data, content: e.target.value })}
                        placeholder="<p>Write your content here...</p>"
                    />
                    <p className="text-xs text-gray-500 mt-2">
                        Tip: You can use HTML tags like <code>&lt;h2&gt;, &lt;p&gt;, &lt;ul&gt;</code> for formatting.
                    </p>
                </div>
            </div>
        </div>
    );
}
