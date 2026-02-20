
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";
// import { supabase } from "@/lib/supabase"; // Uncomment when supabase is ready

export default function LoginPage() {
    const router = useRouter();
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState("");

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError("");

        // Simulate login for now
        setTimeout(() => {
            if (email === "admin@anantasehat.com" && password === "admin123") {
                router.push("/cms/dashboard");
            } else {
                setError("Invalid email or password");
                setLoading(false);
            }
        }, 1000);

        /* Real implementation:
        const { data, error } = await supabase.auth.signInWithPassword({
          email,
          password,
        });
        
        if (error) {
          setError(error.message);
          setLoading(false);
        } else {
          router.push("/cms/dashboard");
        }
        */
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-[#0F172A] relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
                <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-blue-600/10 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-emerald-600/10 rounded-full blur-[120px]" />
            </div>

            <div className="bg-white p-10 md:p-14 rounded-5xl shadow-2xl w-full max-w-xl relative z-10 border border-white/20">
                <div className="text-center mb-12">
                    <div className="w-20 h-20 bg-linear-to-br from-blue-600 to-blue-800 rounded-3xl flex items-center justify-center mx-auto mb-8 text-white shadow-2xl shadow-blue-500/30 group hover:scale-110 transition-transform duration-500">
                        <Lock size={36} strokeWidth={2.5} />
                    </div>
                    <h1 className="text-4xl font-black text-slate-900 tracking-tight leading-none">Ananta Admin</h1>
                    <p className="text-slate-500 mt-4 text-base font-medium">Control Center Access. Authorized Personnel Only.</p>
                </div>

                {error && (
                    <div className="bg-rose-50 border border-rose-100 text-rose-600 p-4 rounded-2xl text-sm font-bold mb-8 text-center animate-in shake duration-500">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-8">
                    <div className="space-y-2.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Email Identifier</label>
                        <div className="relative group">
                            <Mail className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                                placeholder="enter@anantasehat.com"
                            />
                        </div>
                    </div>

                    <div className="space-y-2.5">
                        <label className="text-xs font-black text-slate-500 uppercase tracking-widest ml-1">Access Key</label>
                        <div className="relative group">
                            <Lock className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 group-focus-within:text-blue-600 transition-colors" size={22} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-14 pr-6 py-4.5 bg-slate-50 border border-slate-200 rounded-2xl focus:ring-4 focus:ring-blue-500/10 focus:border-blue-500 outline-none transition-all font-bold text-slate-900 placeholder:text-slate-400"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="flex items-center justify-between px-1">
                        <label className="flex items-center gap-3 cursor-pointer group">
                            <input type="checkbox" className="w-5 h-5 rounded-lg border-slate-200 text-blue-600 focus:ring-blue-500/20" />
                            <span className="text-sm font-bold text-slate-500 group-hover:text-slate-900 transition-colors">Remember device</span>
                        </label>
                        <button type="button" className="text-sm font-bold text-blue-600 hover:text-blue-700 decoration-2 hover:underline">Forgot path?</button>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-linear-to-r from-blue-600 to-blue-700 hover:from-blue-700 hover:to-blue-800 text-white font-black py-5 rounded-2xl transition-all shadow-xl shadow-blue-500/25 hover:shadow-blue-500/40 hover:-translate-y-1 active:translate-y-0 flex items-center justify-center gap-3 disabled:opacity-70 disabled:hover:translate-y-0"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={24} strokeWidth={3} />
                                <span className="uppercase tracking-[0.2em]">Authenticating...</span>
                            </>
                        ) : (
                            <span className="uppercase tracking-[0.2em]">Secure Entry</span>
                        )}
                    </button>
                </form>

                <div className="mt-12 text-center">
                    <p className="text-slate-400 text-xs font-bold uppercase tracking-widest leading-relaxed">
                        &copy; {new Date().getFullYear()} Ananta Sehat <br /> Enterprise Medical Solutions
                    </p>
                </div>
            </div>
        </div>
    );
}
