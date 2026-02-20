"use client";

import React, { createContext, useContext, useState, useCallback } from "react";
import { CheckCircle, XCircle, AlertCircle, X } from "lucide-react";

interface Toast {
    id: string;
    message: string;
    type: "success" | "error" | "warning";
}

interface ToastContextType {
    showToast: (message: string, type?: "success" | "error" | "warning") => void;
}

const ToastContext = createContext<ToastContextType>({
    showToast: () => { },
});

export const useToast = () => useContext(ToastContext);

export function ToastProvider({ children }: { children: React.ReactNode }) {
    const [toasts, setToasts] = useState<Toast[]>([]);

    const showToast = useCallback((message: string, type: "success" | "error" | "warning" = "success") => {
        const id = Date.now().toString();
        setToasts((prev) => [...prev, { id, message, type }]);
        setTimeout(() => {
            setToasts((prev) => prev.filter((t) => t.id !== id));
        }, 3500);
    }, []);

    const removeToast = (id: string) => {
        setToasts((prev) => prev.filter((t) => t.id !== id));
    };

    const icons = {
        success: <CheckCircle size={18} color="#16A34A" />,
        error: <XCircle size={18} color="#DC2626" />,
        warning: <AlertCircle size={18} color="#D97706" />,
    };

    const borderColors = {
        success: "#16A34A",
        error: "#DC2626",
        warning: "#D97706",
    };

    return (
        <ToastContext.Provider value={{ showToast }}>
            {children}
            <div style={{ position: "fixed", bottom: 24, right: 24, zIndex: 9999, display: "flex", flexDirection: "column", gap: 8 }}>
                {toasts.map((toast) => (
                    <div
                        key={toast.id}
                        style={{
                            background: "white",
                            borderRadius: 10,
                            padding: "12px 16px",
                            boxShadow: "0 10px 40px rgba(0,0,0,0.12)",
                            display: "flex",
                            alignItems: "center",
                            gap: 10,
                            borderLeft: `4px solid ${borderColors[toast.type]}`,
                            animation: "slideInRight 0.3s ease",
                            minWidth: 280,
                            maxWidth: 360,
                        }}
                    >
                        {icons[toast.type]}
                        <span style={{ flex: 1, fontSize: 14, fontWeight: 500, color: "#1F2937" }}>{toast.message}</span>
                        <button
                            onClick={() => removeToast(toast.id)}
                            style={{ background: "none", border: "none", cursor: "pointer", color: "#9CA3AF", padding: 2 }}
                        >
                            <X size={14} />
                        </button>
                    </div>
                ))}
            </div>
        </ToastContext.Provider>
    );
}
