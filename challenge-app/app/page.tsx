"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";

export default function LoginPage() {
    const router = useRouter();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");

    async function handleLogin(e: React.FormEvent) {
        e.preventDefault();
        setError("");

        const res = await fetch("/api/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ username, password }),
        });

        if (res.ok) {
            router.push("/dashboard");
        } else {
            setError("Invalid credentials");
        }
    }

    return (
        <div className="min-h-screen bg-neutral-950 flex items-center justify-center px-6">
            <div className="w-full max-w-sm">
                <div className="mb-10">
                    <h1 className="text-3xl font-semibold text-white tracking-tight">
                        Executive Access
                    </h1>
                    <p className="text-neutral-400 text-sm mt-2">
                        Internal authorization required
                    </p>
                </div>

                <form
                    onSubmit={handleLogin}
                    className="space-y-5"
                >
                    <div>
                        <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wide">
                            Username
                        </label>
                        <input
                            type="text"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-white transition"
                        />
                    </div>

                    <div>
                        <label className="block text-xs text-neutral-400 mb-2 uppercase tracking-wide">
                            Password
                        </label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full bg-neutral-900 border border-neutral-800 rounded-md px-4 py-2 text-white focus:outline-none focus:border-white transition"
                        />
                    </div>

                    {error && (
                        <p className="text-sm text-red-400">{error}</p>
                    )}

                    <button
                        type="submit"
                        className="w-full bg-white text-black py-2 rounded-md font-medium hover:opacity-90 transition"
                    >
                        Sign In
                    </button>
                </form>

                <div className="bg-black border border-neutral-800 rounded-2xl p-2 font-mono text-amber-50 text-sm mt-2"><p>username: user1</p>
                    <p>password: password</p>
                </div>


                <p className="text-neutral-600 text-xs mt-10">
                    Corporate Systems · Confidential
                </p>
            </div>
        </div>
    );
}
