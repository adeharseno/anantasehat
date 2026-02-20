
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, Search, ArrowUp, ArrowDown, X, HelpCircle, Loader2 } from "lucide-react";
import { supabase } from "@/lib/supabase";

const CATEGORIES = [
    "Produk & Keaslian",
    "Pemesanan",
    "Pembayaran",
    "Pengiriman",
    "Obat Keras & Resep",
    "Pengembalian & Refund",
    "Umum"
];

export default function FaqPage() {
    const [faqs, setFaqs] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [currentFaq, setCurrentFaq] = useState<any>(null);
    const [saving, setSaving] = useState(false);

    // Form states
    const [formData, setFormData] = useState({
        question: "",
        answer: "",
        category: "Umum",
        order: 0,
        is_active: true
    });

    const fetchFaqs = async () => {
        setLoading(true);
        const { data, error } = await supabase
            .from('faqs')
            .select('*')
            .order('category')
            .order('order');

        if (error) console.error("Error fetching FAQs:", error);
        else setFaqs(data || []);
        setLoading(false);
    };

    useEffect(() => {
        fetchFaqs();
    }, []);

    const handleDelete = async (id: string) => {
        if (confirm("Are you sure you want to delete this FAQ?")) {
            const { error } = await supabase.from('faqs').delete().eq('id', id);
            if (error) {
                alert("Failed to delete FAQ");
            } else {
                setFaqs(faqs.filter((f) => f.id !== id));
            }
        }
    };

    const openModal = (faq: any = null) => {
        setCurrentFaq(faq);
        if (faq) {
            setFormData({
                question: faq.question,
                answer: faq.answer,
                category: faq.category || "Umum",
                order: faq.order || 0,
                is_active: faq.is_active ?? true
            });
        } else {
            setFormData({
                question: "",
                answer: "",
                category: "Umum",
                order: 0,
                is_active: true
            });
        }
        setIsModalOpen(true);
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        setSaving(true);

        try {
            if (currentFaq) {
                // Update
                const { data, error } = await supabase
                    .from('faqs')
                    .update(formData)
                    .eq('id', currentFaq.id)
                    .select()
                    .single();

                if (error) throw error;
                setFaqs(faqs.map(f => f.id === currentFaq.id ? data : f));
            } else {
                // Create
                const { data, error } = await supabase
                    .from('faqs')
                    .insert([formData])
                    .select()
                    .single();

                if (error) throw error;
                setFaqs([...faqs, data]);
            }
            setIsModalOpen(false);
        } catch (error: any) {
            alert("Error saving FAQ: " + error.message);
        } finally {
            setSaving(false);
        }
    };

    return (
        <div className="space-y-8 animate-in fade-in duration-500">
            <header className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                <div>
                    <h1 className="text-3xl font-extrabold text-slate-900 tracking-tight">FAQ Management</h1>
                    <p className="text-slate-500 mt-1.5 font-medium">Manage frequently asked questions and their categories.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-2xl flex items-center gap-2.5 font-bold transition-all shadow-lg shadow-blue-500/25 hover:-translate-y-0.5 active:translate-y-0"
                >
                    <Plus size={20} strokeWidth={3} />
                    Create New FAQ
                </button>
            </header>

            <div className="bg-white rounded-3xl shadow-sm border border-slate-200/60 overflow-hidden">
                {loading ? (
                    <div className="p-24 flex flex-col items-center justify-center text-slate-400 gap-4">
                        <Loader2 className="animate-spin text-blue-600" size={40} />
                        <p className="text-sm font-bold uppercase tracking-widest">Fetching Content...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm text-left border-collapse">
                            <thead>
                                <tr className="bg-slate-50/50">
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px] w-24">Order</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px]">Category & Question</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px] w-40">Visibility</th>
                                    <th className="px-8 py-5 font-bold text-slate-400 uppercase tracking-wider text-[11px] text-right w-32">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-100">
                                {faqs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-8 py-20 text-center">
                                            <div className="flex flex-col items-center gap-3">
                                                <div className="w-16 h-16 bg-slate-50 rounded-2xl flex items-center justify-center text-slate-300">
                                                    <HelpCircle size={32} />
                                                </div>
                                                <p className="text-slate-400 font-bold uppercase tracking-wide text-xs">No FAQs established yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    faqs.map((faq) => (
                                        <tr key={faq.id} className="hover:bg-slate-50/80 transition-colors group">
                                            <td className="px-8 py-6 font-black text-slate-900 text-lg">#{faq.order}</td>
                                            <td className="px-8 py-6">
                                                <div className="flex flex-col gap-1.5">
                                                    <span className="inline-flex w-fit px-2.5 py-0.5 bg-blue-50 text-blue-600 rounded-md text-[10px] font-black uppercase tracking-wider border border-blue-100">
                                                        {faq.category || "Uncategorized"}
                                                    </span>
                                                    <div className="font-extrabold text-slate-900 text-base">{faq.question}</div>
                                                    <div className="text-slate-500 font-medium text-xs line-clamp-1 max-w-2xl">{faq.answer}</div>
                                                </div>
                                            </td>
                                            <td className="px-8 py-6">
                                                <span
                                                    className={`inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-black uppercase tracking-tight ${faq.is_active
                                                        ? "bg-emerald-50 text-emerald-700 border border-emerald-200/50"
                                                        : "bg-slate-100 text-slate-500 border border-slate-200"
                                                        }`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full ${faq.is_active ? 'bg-emerald-500 animate-pulse' : 'bg-slate-400'}`} />
                                                    {faq.is_active ? "Public" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-8 py-6 text-right">
                                                <div className="flex items-center justify-end gap-1.5">
                                                    <button
                                                        onClick={() => openModal(faq)}
                                                        className="p-2.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-xl transition-all"
                                                        title="Edit FAQ"
                                                    >
                                                        <Edit size={20} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(faq.id)}
                                                        className="p-2.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-xl transition-all"
                                                        title="Delete FAQ"
                                                    >
                                                        <Trash2 size={20} />
                                                    </button>
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                )}
                            </tbody>
                        </table>
                    </div>
                )}
            </div>

            {isModalOpen && (
                <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm z-50 flex items-center justify-center p-6 animate-in fade-in duration-300">
                    <div className="bg-white rounded-4xl shadow-2xl w-full max-w-xl overflow-hidden animate-in zoom-in-95 duration-200">
                        <div className="flex justify-between items-center p-8 border-b border-slate-100 bg-slate-50/50">
                            <div>
                                <h3 className="text-2xl font-black text-slate-900 leading-none">
                                    {currentFaq ? "Edit FAQ" : "Create FAQ"}
                                </h3>
                                <p className="text-slate-500 text-sm font-medium mt-2">Specify details for the help center.</p>
                            </div>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="w-10 h-10 flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-white rounded-xl transition-all shadow-sm border border-transparent hover:border-slate-200"
                            >
                                <X size={20} strokeWidth={3} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-8 space-y-6">
                            <div className="grid grid-cols-2 gap-6">
                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Category</label>
                                    <select
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-700 appearance-none cursor-pointer"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Order Index</label>
                                    <input
                                        type="number"
                                        className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-bold text-slate-900"
                                        value={formData.order}
                                        onChange={(e) => setFormData({ ...formData, order: parseInt(e.target.value) || 0 })}
                                    />
                                </div>
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all font-extrabold text-slate-900 placeholder:text-slate-400 placeholder:font-bold"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="Enter question title..."
                                />
                            </div>

                            <div className="space-y-2">
                                <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Detailed Answer</label>
                                <textarea
                                    required
                                    rows={5}
                                    className="w-full px-5 py-3.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none transition-all resize-none font-medium text-slate-700 placeholder:text-slate-400"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="Provide a clear, helpful response..."
                                />
                            </div>

                            <div className="flex items-center justify-between p-5 bg-slate-50 rounded-2xl border border-slate-200/50">
                                <div className="flex flex-col">
                                    <span className="text-sm font-bold text-slate-900">Visibility Status</span>
                                    <span className="text-[11px] font-medium text-slate-500 tracking-tight">Toggle whether this FAQ is visible on the website.</span>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    />
                                    <div className="w-11 h-6 bg-slate-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:inset-s-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-emerald-500 transition-colors"></div>
                                </label>
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
                                    {saving ? (
                                        <>
                                            <Loader2 className="animate-spin" size={20} />
                                            <span>SYNCHRONIZING...</span>
                                        </>
                                    ) : (
                                        "PUBLISH CHANGES"
                                    )}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
}
