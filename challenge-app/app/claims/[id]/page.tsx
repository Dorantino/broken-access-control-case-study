"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";

export default function ClaimPage() {
    const { id } = useParams();
    const [claim, setClaim] = useState<any>(null);

    useEffect(() => {
        fetch(`/api/claims/${id}`)
            .then((res) => res.json())
            .then((data) => setClaim(data));
    }, [id]);

    if (!claim) {
        return (
            <div className="min-h-screen flex items-center justify-center">
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
