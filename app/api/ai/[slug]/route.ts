import { NextResponse } from "next/server";
import { AI_QUESTIONS } from "@/lib/server-data/ai-question";
import { MovesType } from "@/type/move";


export async function GET(
    _request: Request,
    { params }: { params: Promise<{ slug: string }> }
) {
    try {
        const { slug } = await params;
        const questions = AI_QUESTIONS[slug as MovesType];

        if (!questions) {
            return NextResponse.json({ error: "Invalid move type" }, { status: 404 });
        }

        return NextResponse.json({ questions });
    } catch (error) {
        console.error("Error fetching AI questions:", error);
        return NextResponse.json({ error: "Failed to fetch AI questions" }, { status: 500 });
    }
}