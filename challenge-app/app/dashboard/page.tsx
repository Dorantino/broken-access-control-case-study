import { cookies } from "next/headers";
import Link from "next/link";
import { redirect } from "next/navigation";
import Hints from "@/app/components/hints";

export default async function Dashboard() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
        redirect("/login");
    }

    const session = JSON.parse(sessionCookie.value);

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-12">
            <div className="max-w-3xl mx-auto">

                <div className="flex justify-between items-center mb-12">
                    <div>
                        <h1 className="text-3xl font-semibold tracking-tight">
                            {session.role === "admin"
                                ? "Admin Dashboard"
                                : "User Dashboard"}
                        </h1>
                        <p className="text-neutral-400 text-sm mt-1">
                            Internal Corporate System
                        </p>
                    </div>

                    {session.role === "admin" && (
                        <Link
                            href="/admin"
                            className="border border-neutral-700 px-4 py-2 rounded-md text-sm hover:border-white transition"
                        >
                            Admin Panel
                        </Link>
                    )}
                </div>

                <div className="bg-neutral-900 border border-neutral-800 rounded-lg p-6 space-y-4">
                    <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide">
                            Username
                        </p>
                        <p className="text-lg">{session.username}</p>
                    </div>

                    <div>
                        <p className="text-xs text-neutral-500 uppercase tracking-wide">
                            Role
                        </p>
                        <p
                            className={`text-lg ${session.role === "admin"
                                ? "text-green-400"
                                : "text-neutral-300"
                                }`}
                        >
                            {session.role}
                        </p>
                    </div>
                </div>

                {session.role !== "admin" && <Hints />}

            </div>
        </div>
    );
}
