"use client";

import { useEffect, useState } from "react";

export default function Admin() {
    const [user, setUser] = useState<any>(null);

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);

    if (!user || user.role !== "admin") {
        return (
            <div className="min-h-screen flex items-center justify-center bg-slate-100">
                <p className="text-red-600 text-lg font-semibold">
                    Access Denied
                </p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-100 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-4 text-slate-800">
                    Admin Panel
                </h1>
                <p className="text-slate-600">
                    Sensitive administrative data
                </p>
            </div>
        </div>
    );
}
