
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
        <div className="space-y-8 animate-in fade-in duration-500">
            <header>
                <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Content Management</h1>
                <p className="text-slate-500 mt-1.5 font-medium">Edit and maintain static pages and legal documentation.</p>
            </header>

            <div className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden">
                {loading ? (
                    <div className="p-24 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                        <p className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/40">Retaining Documents...</p>
                    </div>
                ) : (
                    <div className="divide-y divide-slate-100/60">
                        {pages.length === 0 ? (
                            <div className="p-20 text-center flex flex-col items-center gap-4">
                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200">
                                    <FileText size={32} />
                                </div>
                                <p className="text-slate-400 font-bold uppercase tracking-wide text-xs">No documents available for editing</p>
                            </div>
                        ) : (
                            pages.map((page) => (
                                <Link
                                    key={page.slug}
                                    href={`/cms/pages/${page.slug}`}
                                    className="group block hover:bg-slate-50/80 transition-all duration-300"
                                >
                                    <div className="p-8 flex items-center justify-between">
                                        <div className="flex items-center gap-6">
                                            <div className="w-16 h-16 bg-slate-50 text-slate-400 rounded-2xl flex items-center justify-center group-hover:bg-blue-600 group-hover:text-white group-hover:scale-105 transition-all duration-300 shadow-sm border border-slate-100 group-hover:border-blue-500">
                                                <FileText size={28} strokeWidth={1.5} />
                                            </div>
                                            <div>
                                                <h3 className="text-xl font-black text-slate-900 group-hover:text-blue-600 transition-colors">{page.title}</h3>
                                                <div className="flex items-center gap-3 mt-1.5">
                                                    <span className="text-xs font-bold text-slate-400 uppercase tracking-widest">Slug: {page.slug}</span>
                                                    <div className="w-1 h-1 rounded-full bg-slate-200" />
                                                    <p className="text-xs font-bold text-emerald-500 uppercase tracking-tight">
                                                        Updated {page.updated_at ? new Date(page.updated_at).toLocaleDateString('id-ID', { day: 'numeric', month: 'short', year: 'numeric' }) : 'N/A'}
                                                    </p>
                                                </div>
                                            </div>
                                        </div>
                                        <div className="flex items-center gap-4 text-slate-300 group-hover:text-blue-600 transition-all group-hover:translate-x-2">
                                            <span className="text-[11px] font-black uppercase tracking-widest opacity-0 group-hover:opacity-100 transition-opacity">Edit Document</span>
                                            <div className="w-10 h-10 rounded-xl bg-slate-50 border border-slate-100 flex items-center justify-center group-hover:bg-blue-50 group-hover:border-blue-200">
                                                <ChevronRight size={22} strokeWidth={2.5} />
                                            </div>
                                        </div>
                                    </div>
                                </Link>
                            ))
                        )}
                    </div>
                )}
            </div>

            <div className="bg-blue-50/50 rounded-3xl p-8 border border-blue-100/50 flex items-center gap-6">
                <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center text-blue-600 shadow-sm">
                    <Edit size={24} />
                </div>
                <div>
                    <h4 className="font-bold text-slate-900">Dynamic Content Editor</h4>
                    <p className="text-sm text-slate-500 font-medium">Select a page above to modify its content using the visual editor. All changes are saved instantly but only go live upon publishing.</p>
                </div>
            </div>
        </div>
    );
}
