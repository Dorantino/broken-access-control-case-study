import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import Link from "next/link";
import { users, claims } from "@/lib/data";
import { verifySession } from "@/lib/session";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    // 🔐 Must be logged in
    if (!session) {
        redirect("/");
    }

    // Verify signed session
    const username = verifySession(session.value);

    if (!username) {
        redirect("/");
    }

    // Find logged in user using VERIFIED username
    const user = users.find(
        (u) => u.username === username
    );

    if (!user) {
        redirect("/");
    }

    // Ownership enforcement
    const userClaims =
        user.role === "admin"
            ? claims
            : claims.filter((c) => c.userId === user.id);

    return (
        <div className="min-h-screen bg-slate-900 p-8">
            <div className="max-w-3xl mx-auto bg-slate-800 shadow-xl rounded-2xl p-8">
                <h1 className="text-3xl font-bold mb-4 text-white">
                    Dashboard
                </h1>

                <p className="mb-2 text-amber-400 text-2xl">
                    Welcome{" "}
                    <span className="font-semibold">
                        {user.username}
                    </span>
                </p>

                <p className="mb-6 text-white">
                    Role:
                    <span className="ml-2 bg-slate-700 px-3 py-1 rounded-lg text-sm text-white">
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

                <h2 className="text-xl font-semibold mb-4 text-white">
                    Your Claims
                </h2>

                <div className="space-y-3">
                    {userClaims.map((claim) => (
                        <Link
                            key={claim.id}
                            href={`/claims/${claim.id}`}
                            className="block p-4 border border-slate-600 rounded-lg hover:bg-slate-700 transition text-white"
                        >
                            {claim.title}
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}
