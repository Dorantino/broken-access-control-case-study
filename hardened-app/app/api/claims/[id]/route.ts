import { claims } from "@/lib/data";
import { NextResponse } from "next/server";

export async function GET(
    request: Request,
    { params }: { params: Promise<{ id: string }> }
) {
    const resolvedParams = await params;
    const id = parseInt(resolvedParams.id, 10);

    const claim = claims.find((c) => c.id === id);

    if (!claim) {
        return NextResponse.json(
            { error: "Not Found", receivedId: resolvedParams.id },
            { status: 404 }
        );
    }

    return NextResponse.json(claim);
}
