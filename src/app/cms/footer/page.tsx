
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
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">Footer Links</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Manage navigation links in the website footer.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Add Link
                </button>
            </div>

            {loading ? (
                <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                    <Loader2 className="animate-spin text-blue-600" size={28} />
                    <p className="text-xs text-slate-400">Loading links...</p>
                </div>
            ) : (
                <div className="grid md:grid-cols-2 gap-4">
                    {SECTIONS.map((section) => (
                        <div key={section} className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                            <div className="px-5 py-3 border-b border-slate-100 flex justify-between items-center bg-slate-50">
                                <h3 className="text-sm font-bold text-slate-800">{section}</h3>
                                <span className="text-xs text-slate-400">
                                    {links.filter(l => l.section_name === section).length} links
                                </span>
                            </div>
                            <div className="divide-y divide-slate-50">
                                {links.filter(l => l.section_name === section).sort((a, b) => (a.order || 0) - (b.order || 0)).map((link) => (
                                    <div key={link.id} className="px-5 py-3 flex items-center justify-between hover:bg-slate-50 transition-colors group">
                                        <div className="flex items-center gap-3 min-w-0">
                                            <span className="text-xs text-slate-300 font-medium w-5 text-center shrink-0">{link.order}</span>
                                            <div className="min-w-0">
                                                <div className="text-sm font-medium text-slate-800 truncate">{link.label}</div>
                                                <div className="text-xs text-blue-500 truncate">{link.url}</div>
                                            </div>
                                        </div>
                                        <div className="flex gap-1 opacity-0 group-hover:opacity-100 transition-opacity shrink-0">
                                            <button onClick={() => openModal(link)} className="p-1.5 text-slate-400 hover:text-blue-600 hover:bg-blue-50 rounded-md transition-colors">
                                                <Edit size={14} />
                                            </button>
                                            <button onClick={() => handleDelete(link.id)} className="p-1.5 text-slate-400 hover:text-rose-600 hover:bg-rose-50 rounded-md transition-colors">
                                                <Trash2 size={14} />
                                            </button>
                                        </div>
                                    </div>
                                ))}
                                {links.filter(l => l.section_name === section).length === 0 && (
                                    <div className="px-5 py-8 text-center text-sm text-slate-400">
                                        No links in this section
                                    </div>
                                )}
                            </div>
                        </div>
                    ))}
                </div>
            )}

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-md overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-900">
                                {currentLink ? "Edit Link" : "Add Link"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Section</label>
                                <select
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none bg-white"
                                    value={formData.section_name}
                                    onChange={(e) => setFormData({ ...formData, section_name: e.target.value })}
                                >
                                    {SECTIONS.map(s => <option key={s} value={s}>{s}</option>)}
                                </select>
                            </div>

                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Label</label>
                                    <input
                                        type="text"
                                        required
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        value={formData.label}
                                        onChange={(e) => setFormData({ ...formData, label: e.target.value })}
                                        placeholder="Link Name"
                                    />
                                </div>
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Order</label>
                                    <input
                                        type="number"
                                        className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">URL</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    value={formData.url}
                                    onChange={(e) => setFormData({ ...formData, url: e.target.value })}
                                    placeholder="/page-url"
                                />
                            </div>

                            <div className="flex gap-3 pt-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="flex-1 px-4 py-2 text-slate-600 bg-white border border-slate-200 hover:bg-slate-50 rounded-lg text-sm font-medium transition-colors"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="submit"
                                    disabled={saving}
                                    className="flex-1 px-4 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg text-sm font-medium transition-colors disabled:opacity-50 flex items-center justify-center gap-2"
                                >
                                    {saving && <Loader2 className="animate-spin" size={16} />}
                                    {saving ? "Saving..." : "Save"}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
