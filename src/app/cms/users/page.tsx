
"use client";

import React, { useState } from "react";
import { Search, User, Mail, Phone, MapPin } from "lucide-react";

// Mock data
const mockUsers = [
    { id: 1, name: "Budi Santoso", email: "budi@example.com", phone: "08123456789", address: "Jl. Merdeka No. 1, Jakarta", joined: "20-02-2025" },
    { id: 2, name: "Siti Rahayu", email: "siti@example.com", phone: "08987654321", address: "Jl. Sudirman No. 45, Bandung", joined: "18-02-2025" },
];

export default function UsersPage() {
    const [users, setUsers] = useState(mockUsers);

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h1 className="text-2xl font-bold text-gray-800">Users</h1>
            </div>

            <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
                <div className="p-4 border-b border-gray-100">
                    <div className="relative max-w-md">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                        <input
                            type="text"
                            placeholder="Search users..."
                            className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 transition-all"
                        />
                    </div>
                </div>

                <div className="overflow-x-auto">
                    <table className="w-full text-sm text-left text-gray-500">
                        <thead className="text-xs text-gray-700 uppercase bg-gray-50">
                            <tr>
                                <th className="px-6 py-3">User</th>
                                <th className="px-6 py-3">Contact</th>
                                <th className="px-6 py-3">Address</th>
                                <th className="px-6 py-3">Joined Date</th>
                            </tr>
                        </thead>
                        <tbody>
                            {users.map((user) => (
                                <tr key={user.id} className="border-b hover:bg-gray-50 transition-colors">
                                    <td className="px-6 py-4">
                                        <div className="flex items-center gap-3">
                                            <div className="w-10 h-10 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center font-bold">
                                                {user.name.charAt(0)}
                                            </div>
                                            <div>
                                                <div className="font-medium text-gray-900">{user.name}</div>
                                                <div className="text-xs text-gray-500">{user.email}</div>
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4">
                                        <div className="flex flex-col gap-1">
                                            <div className="flex items-center gap-2 text-gray-600">
                                                <Phone size={14} /> {user.phone}
                                            </div>
                                        </div>
                                    </td>
                                    <td className="px-6 py-4 max-w-xs truncate" title={user.address}>
                                        {user.address}
                                    </td>
                                    <td className="px-6 py-4">
                                        {user.joined}
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
