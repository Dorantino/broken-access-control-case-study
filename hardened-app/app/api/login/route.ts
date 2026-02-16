import { NextResponse } from "next/server";
import { users } from "@/lib/data";
import { cookies } from "next/headers";

export async function POST(request: Request) {
    const { username, password } = await request.json();

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    const cookieStore = await cookies();   // ✅ MUST await in your version

    cookieStore.set("session", user.username, {
        httpOnly: true,
        path: "/",
        sameSite: "lax",
    });

    return NextResponse.json({ success: true });
}
