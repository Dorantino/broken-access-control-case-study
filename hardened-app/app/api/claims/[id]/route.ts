import { claims, users } from "@/lib/data";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";
import { verifySession } from "@/lib/session";

export async function GET(
    request: Request,
    context: { params: Promise<{ id: string }> }
) {
    const { id } = await context.params;
    const claimId = parseInt(id, 10);

    const cookieStore = await cookies();
    const session = cookieStore.get("session");

    if (!session) {
        return NextResponse.json(
            { error: "Unauthorized" },
            { status: 401 }
        );
    }

    // 🔐 VERIFY SIGNED SESSION
    const username = verifySession(session.value);

    if (!username) {
        return NextResponse.json(
            { error: "Invalid session" },
            { status: 401 }
        );
    }

    const loggedInUser = users.find(
        (u) => u.username === username
    );

    if (!loggedInUser) {
        return NextResponse.json(
            { error: "Invalid session" },
            { status: 401 }
        );
    }

    const claim = claims.find((c) => c.id === claimId);

    if (!claim) {
        return NextResponse.json(
            { error: "Not Found" },
            { status: 404 }
        );
    }

    if (
        claim.userId !== loggedInUser.id &&
        loggedInUser.role !== "admin"
    ) {
        return NextResponse.json(
            { error: "Forbidden" },
            { status: 403 }
        );
    }

    return NextResponse.json(claim);
}
