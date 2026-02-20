
"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Lock, Mail, Loader2 } from "lucide-react";

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

        setTimeout(() => {
            if (email === "admin@anantasehat.com" && password === "admin123") {
                router.push("/cms/dashboard");
            } else {
                setError("Invalid email or password");
                setLoading(false);
            }
        }, 1000);
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-white p-8 rounded-xl shadow-lg w-full max-w-sm">
                <div className="text-center mb-6">
                    <div className="w-12 h-12 bg-blue-600 rounded-xl flex items-center justify-center mx-auto mb-4 text-white">
                        <Lock size={22} />
                    </div>
                    <h1 className="text-lg font-bold text-slate-900">Admin Login</h1>
                    <p className="text-slate-500 text-sm mt-1">Sign in to Ananta Sehat CMS</p>
                </div>

                {error && (
                    <div className="bg-rose-50 text-rose-600 p-3 rounded-lg text-sm mb-4 text-center font-medium">
                        {error}
                    </div>
                )}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Email</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="email"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                placeholder="admin@anantasehat.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-xs font-medium text-slate-500 mb-1">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-slate-400" size={16} />
                            <input
                                type="password"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="w-full pl-9 pr-3 py-2 border border-slate-200 rounded-lg text-sm focus:ring-2 focus:ring-blue-500/20 focus:border-blue-500 outline-none"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={loading}
                        className="w-full bg-blue-600 hover:bg-blue-700 text-white font-medium py-2.5 rounded-lg transition-colors flex items-center justify-center gap-2 text-sm disabled:opacity-50"
                    >
                        {loading ? (
                            <>
                                <Loader2 className="animate-spin" size={16} />
                                Signing in...
                            </>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <p className="text-center text-xs text-slate-400 mt-6">&copy; {new Date().getFullYear()} Ananta Sehat</p>
            </div>
        </div>
    );
}
