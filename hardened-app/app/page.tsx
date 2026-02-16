"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function Home() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = async () => {
        const res = await fetch("/api/login", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-900">
            <div className="bg-slate-800 p-8 rounded-2xl shadow-2xl w-96 text-white">
                <h1 className="text-2xl font-bold text-center mb-6">
                    Broken Access Control Demo
                </h1>

                <input
                    type="text"
                    placeholder="Username"
                    className="w-full mb-4 p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setUsername(e.target.value)}
                />

                <input
                    type="password"
                    placeholder="Password"
                    className="w-full mb-6 p-3 rounded-lg bg-slate-700 border border-slate-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                    onChange={(e) => setPassword(e.target.value)}
                />

                <button
                    onClick={handleLogin}
                    className="w-full bg-blue-600 p-3 rounded-lg hover:bg-blue-700 transition font-semibold"
                >
                    Login
                </button>

                <p className="text-sm text-slate-400 mt-4 text-center">
                    user1 / password123 <br />
                    admin / admin123
                </p>
            </div>
        </div>
    );
}
