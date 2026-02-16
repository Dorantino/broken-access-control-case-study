import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { users } from "@/lib/data";
import { verifySession } from "@/lib/session";

export default async function Admin() {
    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
        redirect("/login");
    }

    const username = verifySession(session.value);

    if (!username) {
        redirect("/login");
    }

    const user = users.find(
        (u) => u.username === username
    );

    if (!user || user.role !== "admin") {
        redirect("/dashboard");
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
