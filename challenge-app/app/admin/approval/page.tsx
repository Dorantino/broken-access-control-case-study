import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default async function ApprovalPage() {
    const cookieStore = await cookies();
    const sessionCookie = cookieStore.get("session");

    if (!sessionCookie) {
        redirect("/login");
    }

    const session = JSON.parse(sessionCookie.value);

    if (session.role !== "admin") {
        redirect("/dashboard");
    }

    return (
        <div className="min-h-screen bg-neutral-950 text-white px-6 py-12">
            <div className="max-w-3xl mx-auto">

                <div className="mb-12">
                    <h1 className="text-3xl font-semibold tracking-tight">
                        Executive Approval Console
                    </h1>
                    <p className="text-neutral-400 text-sm mt-2">
                        Level 7 Clearance Required
                    </p>
                </div>

                <div className="bg-neutral-900 border border-red-900 rounded-lg p-6">
                    <p className="text-xs text-red-500 uppercase tracking-wide mb-4">
                        Classified Authorization Code
                    </p>

                    <div className="bg-black border border-neutral-800 rounded-md p-4 font-mono text-green-400 text-sm">
                        APPROVAL_CODE: BAC-LEVEL-7-COMPROMISED
                    </div>
                </div>

            </div>
        </div>
    );
}
