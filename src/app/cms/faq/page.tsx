
"use client";

import React, { useState, useEffect } from "react";
import { Plus, Edit, Trash2, X, HelpCircle, Loader2 } from "lucide-react";
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
                const { data, error } = await supabase
                    .from('faqs')
                    .update(formData)
                    .eq('id', currentFaq.id)
                    .select()
                    .single();

                if (error) throw error;
                setFaqs(faqs.map(f => f.id === currentFaq.id ? data : f));
            } else {
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
        <div className="space-y-5">
            {/* Header */}
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
                <div>
                    <h1 className="text-xl font-bold text-slate-900">FAQ Management</h1>
                    <p className="text-slate-500 text-sm mt-0.5">Manage frequently asked questions.</p>
                </div>
                <button
                    onClick={() => openModal()}
                    className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg flex items-center gap-2 text-sm font-medium transition-colors"
                >
                    <Plus size={16} />
                    Add FAQ
                </button>
            </div>

            {/* Table */}
            <div className="bg-white rounded-xl border border-slate-200 overflow-hidden">
                {loading ? (
                    <div className="p-12 flex flex-col items-center justify-center text-slate-400 gap-3">
                        <Loader2 className="animate-spin text-blue-600" size={28} />
                        <p className="text-xs text-slate-400">Loading FAQs...</p>
                    </div>
                ) : (
                    <div className="overflow-x-auto">
                        <table className="w-full text-sm">
                            <thead>
                                <tr className="border-b border-slate-100">
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide w-16">#</th>
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide">Question</th>
                                    <th className="px-5 py-3 text-left text-xs font-medium text-slate-400 uppercase tracking-wide w-32">Status</th>
                                    <th className="px-5 py-3 text-right text-xs font-medium text-slate-400 uppercase tracking-wide w-24">Actions</th>
                                </tr>
                            </thead>
                            <tbody className="divide-y divide-slate-50">
                                {faqs.length === 0 ? (
                                    <tr>
                                        <td colSpan={4} className="px-5 py-12 text-center">
                                            <div className="flex flex-col items-center gap-2">
                                                <HelpCircle size={24} className="text-slate-300" />
                                                <p className="text-sm text-slate-400">No FAQs yet</p>
                                            </div>
                                        </td>
                                    </tr>
                                ) : (
                                    faqs.map((faq) => (
                                        <tr key={faq.id} className="hover:bg-slate-50 transition-colors">
                                            <td className="px-5 py-3 text-slate-500 font-medium">{faq.order}</td>
                                            <td className="px-5 py-3">
                                                <div>
                                                    <span className="inline-block px-1.5 py-0.5 bg-blue-50 text-blue-600 rounded text-[10px] font-medium mb-1">
                                                        {faq.category || "Uncategorized"}
                                                    </span>
                                                    <div className="font-semibold text-slate-800">{faq.question}</div>
                                                    <div className="text-slate-400 text-xs line-clamp-1 mt-0.5 max-w-lg">{faq.answer}</div>
                                                </div>
                                            </td>
                                            <td className="px-5 py-3">
                                                <span
                                                    className={`inline-flex items-center gap-1 px-2 py-0.5 rounded-full text-[11px] font-medium ${faq.is_active
                                                            ? "bg-emerald-50 text-emerald-700"
                                                            : "bg-slate-100 text-slate-500"
                                                        }`}
                                                >
                                                    <div className={`w-1.5 h-1.5 rounded-full ${faq.is_active ? 'bg-emerald-500' : 'bg-slate-400'}`} />
                                                    {faq.is_active ? "Active" : "Draft"}
                                                </span>
                                            </td>
                                            <td className="px-5 py-3 text-right">
                                                <div className="flex items-center justify-end gap-1">
                                                    <button
                                                        onClick={() => openModal(faq)}
                                                        className="p-1.5 hover:bg-blue-50 text-slate-400 hover:text-blue-600 rounded-md transition-colors"
                                                    >
                                                        <Edit size={16} />
                                                    </button>
                                                    <button
                                                        onClick={() => handleDelete(faq.id)}
                                                        className="p-1.5 hover:bg-rose-50 text-slate-400 hover:text-rose-600 rounded-md transition-colors"
                                                    >
                                                        <Trash2 size={16} />
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

            {/* Modal */}
            {isModalOpen && (
                <div className="fixed inset-0 bg-black/40 z-50 flex items-center justify-center p-4">
                    <div className="bg-white rounded-xl shadow-xl w-full max-w-lg overflow-hidden">
                        <div className="flex justify-between items-center px-5 py-4 border-b border-slate-100">
                            <h3 className="text-base font-bold text-slate-900">
                                {currentFaq ? "Edit FAQ" : "New FAQ"}
                            </h3>
                            <button
                                onClick={() => setIsModalOpen(false)}
                                className="text-slate-400 hover:text-slate-600 transition-colors"
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <form onSubmit={handleSave} className="p-5 space-y-4">
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="block text-xs font-medium text-slate-500 mb-1">Category</label>
                                    <select
                                        className="w-full px-3 py-2 bg-white border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                        value={formData.category}
                                        onChange={(e) => setFormData({ ...formData, category: e.target.value })}
                                    >
                                        {CATEGORIES.map(cat => (
                                            <option key={cat} value={cat}>{cat}</option>
                                        ))}
                                    </select>
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
                                <label className="block text-xs font-medium text-slate-500 mb-1">Question</label>
                                <input
                                    type="text"
                                    required
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                    value={formData.question}
                                    onChange={(e) => setFormData({ ...formData, question: e.target.value })}
                                    placeholder="Enter question..."
                                />
                            </div>

                            <div>
                                <label className="block text-xs font-medium text-slate-500 mb-1">Answer</label>
                                <textarea
                                    required
                                    rows={4}
                                    className="w-full px-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none resize-none"
                                    value={formData.answer}
                                    onChange={(e) => setFormData({ ...formData, answer: e.target.value })}
                                    placeholder="Provide a clear answer..."
                                />
                            </div>

                            <div className="flex items-center justify-between py-2 px-3 bg-slate-50 rounded-lg">
                                <div>
                                    <span className="text-sm font-medium text-slate-700">Active</span>
                                    <p className="text-xs text-slate-400">Show on website</p>
                                </div>
                                <label className="relative inline-flex items-center cursor-pointer">
                                    <input
                                        type="checkbox"
                                        className="sr-only peer"
                                        checked={formData.is_active}
                                        onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                                    />
                                    <div className="w-9 h-5 bg-slate-200 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-emerald-500"></div>
                                </label>
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
