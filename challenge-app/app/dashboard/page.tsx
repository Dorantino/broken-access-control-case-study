"use client";

import { useEffect, useState } from "react";
import { claims } from "@/lib/data";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Dashboard() {
    const [user, setUser] = useState<any>(null);
    const router = useRouter();

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        } else {
            router.push("/");
        }
    }, []);

    if (!user) return null;

    const userClaims = claims.filter((c) => c.userId === user.id);

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-3xl mx-auto bg-slate-800 shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-4 text-slate-800">
                    Dashboard
                </h1>

                <p className="mb-2 text-amber-500 text-3xl">
                    Welcome <span className="font-semibold">{user.username}</span>
                </p>

                <p className="mb-6">
                    Role:
                    <span className="ml-2 bg-slate-200 px-3 py-1 rounded-lg text-sm text-slate-600">
                        {user.role}
                    </span>
                </p>

                {user.role === "admin" && (
                    <Link
                        href="/admin"
                        className="inline-block mb-6 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition"
                    >
                        Go to Admin Panel
                    </Link>
                )}

                <h2 className="text-xl font-semibold mb-4 ">
                    Your Claims
                </h2>

                <div className="space-y-3">
                    {userClaims.map((claim) => (
                        <Link
                            key={claim.id}
                            href={`/claims/${claim.id}`}
                            className="block p-4 border border-slate-200 rounded-lg hover:bg-amber-500 transition"
                        >
                            {claim.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
