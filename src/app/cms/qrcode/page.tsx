
"use client";

import React, { useState } from "react";
import { Upload, X, Check, Image as ImageIcon } from "lucide-react";

export default function QrCodePage() {
    const [qrCode, setQrCode] = useState<string | null>("/qris.jpg"); // Mock existing QR
    const [isUploading, setIsUploading] = useState(false);

    const handleUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
        if (e.target.files && e.target.files[0]) {
            // Simulate upload
            setIsUploading(true);
            setTimeout(() => {
                setQrCode(URL.createObjectURL(e.target.files![0]));
                setIsUploading(false);
            }, 1000);
        }
    };

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Manage QRIS Code</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8 max-w-2xl mx-auto">
                <div className="text-center mb-8">
                    <h2 className="text-lg font-bold text-gray-700">QRIS Payment QR Code</h2>
                    <p className="text-gray-500 text-sm mt-1">
                        Upload the QRIS code image that will be displayed to customers during checkout.
                    </p>
                </div>

                <div className="flex flex-col items-center gap-6">
                    <div className="w-64 h-64 bg-gray-50 rounded-xl border-2 border-dashed border-gray-200 flex items-center justify-center relative overflow-hidden group">
                        {qrCode ? (
                            <img src={qrCode} alt="QRIS Code" className="w-full h-full object-contain p-2" />
                        ) : (
                            <div className="text-gray-400 flex flex-col items-center">
                                <ImageIcon size={48} className="mb-2" />
                                <span className="text-sm">No QR Code</span>
                            </div>
                        )}

                        {/* Overlay on hover */}
                        <div className="absolute inset-0 bg-black/40 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity">
                            <label htmlFor="qr-upload" className="bg-white text-gray-800 px-4 py-2 rounded-lg cursor-pointer font-medium hover:bg-gray-100 transition-colors shadow-sm">
                                Change Image
                            </label>
                        </div>
                    </div>

                    <div className="w-full">
                        <input
                            type="file"
                            id="qr-upload"
                            className="hidden"
                            accept="image/*"
                            onChange={handleUpload}
                        />
                        {!qrCode && (
                            <label
                                htmlFor="qr-upload"
                                className="flex items-center justify-center gap-2 w-full py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 cursor-pointer transition-colors shadow-sm font-medium"
                            >
                                <Upload size={20} />
                                Upload QR Code
                            </label>
                        )}
                    </div>

                    <div className="bg-blue-50 border border-blue-100 rounded-lg p-4 text-sm text-blue-700 w-full flex gap-3">
                        <div className="shrink-0 mt-0.5"><Check size={16} /></div>
                        <p>
                            Ensure the uploaded image is clear and scannable. Supported formats: PNG, JPG, JPEG. Max size: 5MB.
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
}
