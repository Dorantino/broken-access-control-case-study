"use client";

import { useState } from "react";

const hints = [
    "Hint 1: Not everything you see in the interface represents actual access control.",
    "Hint 2: Inspect how the application determines your role.",
    "Hint 3: Where is your session stored?",
    "Hint 4: Can a user modify their own session data?",
    "Final Hint: Try becoming someone you're not."
];

export default function Hints() {
    const [visibleCount, setVisibleCount] = useState(0);

    function revealHint() {
        if (visibleCount < hints.length) {
            setVisibleCount(visibleCount + 1);
        }
    }

    return (
        <div className="mt-12 bg-neutral-900 border border-neutral-800 rounded-lg p-6">
            <div className="flex justify-between items-center mb-4">
                <p className="text-xs text-neutral-500 uppercase tracking-wide">
                    Challenge Hints
                </p>
                <button
                    onClick={revealHint}
                    className="border border-neutral-700 px-3 py-1 rounded-md text-xs hover:border-white transition"
                >
                    Reveal Hint
                </button>
            </div>

            <div className="space-y-3 text-sm text-neutral-300">
                {hints.slice(0, visibleCount).map((hint, index) => (
                    <p key={index} className="text-neutral-400">
                        {hint}
                    </p>
                ))}
            </div>
        </div>
    );
}
