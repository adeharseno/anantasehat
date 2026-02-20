
"use client";

import React, { useEffect, useState } from "react";
import Link from "next/link";
import { Edit, FileText, ChevronRight, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

export default function PagesListPage() {
    const [pages, setPages] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPages = async () => {
            setLoading(true);
            const { data, error } = await supabase
                .from('pages')
                .select('slug, title, updated_at')
                .order('title');

            if (error) console.error("Error fetching pages:", error);
            else setPages(data || []);
            setLoading(false);
        };
        fetchPages();
    }, []);

    return (
        <div className="space-y-5">
            <div>
                <h1 className="text-xl font-bold text-slate-900">Content Pages</h1>
                <p className="text-slate-500 text-sm mt-0.5">Edit and manage static pages.</p>
            </div>

            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                        <Loader2 className="animate-spin text-blue-600" size={28} />
                        <p className="text-xs text-slate-400">Loading pages...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-50">
                        {pages.length === 0 ? (
                            <div className="p-12 text-center">
                                <FileText size={24} className="text-slate-300 mx-auto mb-2" />
                                <p className="text-sm text-slate-400">No pages found</p>
                            </div>
                        ) : (
                            pages.map((page) => (
                                <Link
                                    key={page.slug}
                                    href={`/cms/pages/${page.slug}`}
                                    className="flex items-center justify-between px-5 py-4 hover:bg-slate-50 transition-colors group"
                                >
                                    <div className="flex items-center gap-3">
                                        <div className="w-9 h-9 bg-slate-100 text-slate-400 rounded-lg flex items-center justify-center group-hover:bg-blue-50 group-hover:text-blue-600 transition-colors">
                                            <FileText size={16} />
                                        </div>
                                        <div>
                                            <h3 className="text-sm font-semibold text-slate-800 group-hover:text-blue-600 transition-colors">{page.title}</h3>
                                            <p className="text-xs text-slate-400">
                                                /{page.slug} · Updated {page.updated_at ? new Date(page.updated_at).toLocaleDateString('id-ID') : 'N/A'}
                                            </p>
                                        </div>
                                    </div>
                                    <ChevronRight size={16} className="text-slate-300 group-hover:text-blue-500 transition-colors" />
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>
        </div>
    );
}
