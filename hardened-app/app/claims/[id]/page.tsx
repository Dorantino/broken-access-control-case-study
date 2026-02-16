"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ClaimPage() {
    const { id } = useParams();
    const [claim, setClaim] = useState<any>(null);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        fetch(`/api/claims/${id}`)
            .then(async (res) => {
                const data = await res.json();

                if (!res.ok) {
                    throw new Error(data.error || "Error");
                }

                return data;
            })
            .then((data) => setClaim(data))
            .catch((err) => setError(err.message));
    }, [id]);

    if (error) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>{error}</p>
            </div>
        );
    }

    if (!claim) {
        return (
            <div className="min-h-screen flex items-center justify-center text-white">
                <p>Loading...</p>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-2xl mx-auto bg-white shadow-xl rounded-2xl p-8">
                <h1 className="text-2xl font-bold mb-4 text-slate-800">
                    {claim.title}
                </h1>
                <p className="text-slate-600">{claim.content}</p>
            </div>
        </div>
    );
}
