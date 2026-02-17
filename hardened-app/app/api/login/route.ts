import { createSession } from "@/lib/session";
import { cookies } from "next/headers";

export async function POST(req: Request) {
    const { username, password } = await req.json();

    const users = [
        { username: "user1", password: "password123", role: "user" },
        { username: "admin", password: "admin123", role: "admin" },
    ];

    const user = users.find(
        (u) => u.username === username && u.password === password
    );

    if (!user) {
        return new Response("Invalid credentials", { status: 401 });
    }

    const session = createSession(user.username);

    const cookieStore = await cookies();

    cookieStore.set("session", session, {
        httpOnly: true,
        sameSite: "strict",
        secure: false,
    });


    return new Response("Logged in");
}
