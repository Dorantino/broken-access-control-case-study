import { NextResponse } from "next/server";
import { users } from "@/lib/users";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return NextResponse.json(
            { error: "Invalid credentials" },
            { status: 401 }
        );
    }

    // VULNERABLE SESSION (intentionally unsigned & forgeable)
    const cookieStore = await cookies();

    cookieStore.set(
        "session",
        JSON.stringify({
            username: user.username,
            role: user.role,
        })
    );

    return NextResponse.json({ success: true });
}
