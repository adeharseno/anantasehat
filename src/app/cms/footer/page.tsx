
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, Move, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const SECTIONS = ["Layanan Kami", "Informasi"];

export default function FooterPage() {
    const [links, setLinks] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentLink, setCurrentLink] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    // Form data
    const [formData, setFormData] = useState({
        section_name: "Layanan Kami",
        label: "",
        url: "",
        order: 0
    });

    const fetchLinks = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('footer_settings')
            .select('*')
            .order('section_name')
            .order('order');

        if (error) console.error("Error fetching footer links:", error);
        else setLinks(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchLinks();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this link?")) {
            const { error } = await supabase.from('footer_settings').delete().eq('id', id);
            if (error) {
                alert("Failed to delete link");
            } else {
                setLinks(links.filter((l) => l.id !== id));
            }
        }
    };

    const openModal = (link: any = null) => {
        setCurrentLink(link);
        if (link) {
            setFormData({
                section_name: link.section_name,
                label: link.label,
                url: link.url,
                order: link.order || 0
            });
        } else {
            setFormData({
                section_name: "Layanan Kami",
                label: "",
                url: "",
                order: 0
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);
        try {
            if (currentLink) {
                const { data, error } = await supabase
                    .from('footer_settings')
                    .update(formData)
                    .eq('id', currentLink.id)
                    .select()
                    .single();

                if (error) throw error;
                setLinks(links.map(l => l.id === currentLink.id ? data : l));
            } else {
                const { data, error } = await supabase
                    .from('footer_settings')
                    .insert([formData])
                    .select()
                    .single();

                if (error) throw error;
                setLinks([...links, data]);
            }
            setIsModalOpen(false);
        } catch (error: any) {
            alert("Error saving link: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">Footer Configuration</h1>
                    <p className="text-slate-500 mt-1.5 font-medium">Structure and manage navigation links in the website footer.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus size={20} strokeWidth={3} />
                    Add Navigation Link
                </button>
            </header>

            {loading ? (
                <div className="p-24 flex flex-col items-center justify-center text-slate-400 gap-4">
                    <Loader2 className="animate-spin text-blue-600" size={40} />
                    <p className="text-sm font-bold uppercase tracking-widest text-[#0F172A]/40">Gathering Links...</p>
                </div>
            ) : (
                <div className="grid lg:grid-cols-2 gap-8">
                    {SECTIONS.map((section) => (
                        <div key={section} className="bg-white rounded-[2.5rem] shadow-sm border border-slate-200/60 overflow-hidden flex flex-col group/section hover:shadow-xl hover:shadow-slate-200/40 transition-all duration-500">
                            <div className="p-7 border-b border-slate-100 bg-slate-50/50 flex justify-between items-center">
                                <div className="flex flex-col">
                                    <h3 className="text-lg font-black text-slate-900 uppercase tracking-tight leading-none">{section}</h3>
                                    <span className="text-[10px] text-slate-400 font-black mt-1 uppercase tracking-widest">
                                        {links.filter(l => l.section_name === section).length} Total Links
                                    </span>
                                </div>
                                <div className="w-10 h-10 bg-white rounded-xl border border-slate-200 flex items-center justify-center text-slate-400">
                                    <Move size={18} strokeWidth={2.5} />
                                </div>
                            </div>
                            <div className="divide-y divide-slate-100/60 bg-white">
                                {links.filter(l => l.section_name === section).sort((a, b) => (a.order || 0) - (b.order || 0)).map((link) => (
                                    <div key={link.id} className="p-6 flex items-center justify-between hover:bg-slate-50/80 transition-all group">
                                        <div className="flex items-center gap-5 min-w-0">
                                            <div className="w-8 h-8 flex items-center justify-center text-slate-300 font-black text-xs bg-slate-50 rounded-lg group-hover:bg-blue-600 group-hover:text-white transition-colors">
                                                {link.order}
                                            </div>
                                            <div className="min-w-0">
                                                <div className="font-extrabold text-slate-900 leading-snug truncate">{link.label}</div>
                                                <div className="text-[11px] font-bold text-blue-500 truncate mt-0.5 tracking-tight group-hover:underline underline-offset-4">{link.url}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 items-center ml-4 opacity-0 group-hover:opacity-100 transition-opacity translate-x-4 group-hover:translate-x-0 duration-300">
                                            <button
                                                onClick={() => openModal(link)}
                                                className="p-2.5 text-slate-400 hover:text-blue-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200"
                                                title="Edit Link"
                                            >
                                                <Edit size={18} />
                                            </button>
                                            <button
                                                onClick={() => handleDelete(link.id)}
                                                className="p-2.5 text-slate-400 hover:text-rose-600 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200"
                                                title="Delete Link"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {links.filter(l => l.section_name === section).length === 0 && (
                                    <div className="p-16 flex flex-col items-center justify-center text-center">
                                        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-200 mb-4">
                                            <Plus size={24} />
                                        </div>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-widest italic">
                                            Empty Section
                                        </p>
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-4xl shadow-2xl w-full max-w-lg overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none">
                                    {currentLink ? "Modify Link" : "Add Link"}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mt-2">Footer navigation settings.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200"
                            >
                                <X size={20} strokeWidth={3} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Destination Section</label>
                                <select
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                    value={formData.section_name}
                                    onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                                >
                                    {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Display Label</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-extrabold text-slate-900 placeholder:text-slate-400"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        placeholder="e.g. Terms of Service"
                                    />
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Sort Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Link Destination (URL)</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-blue-600 placeholder:text-slate-400"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="/legal/terms"
                                />
                                <p className="text-[10px] font-bold text-slate-400 px-1 italic">Use relative paths like /shop or full URLs with https://</p>
                            </div>

                            <div className="flex gap-4 pt-4">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-6 py-4 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-2xl font-bold transition-all"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-2 px-6 py-4 bg-blue-600 text-white rounded-2xl font-black transition-all shadow-lg shadow-blue-500/20 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 disabled:opacity-50 flex items-center justify-center gap-3"
                                >
                                    {saving ? <Loader2 className="animate-spin" size={20} /> : null}
                                    {saving ? "SYNCING..." : "CONFIRM & SAVE"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
