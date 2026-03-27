import { NextResponse } from "next/server";
import { AI_QUESTIONS } from "@/lib/server-data/ai-question";
import { MovesType } from "@/type/move";


export async function GET(
    _request: Request,
    { params }: { params: Promise<{ id: string, slug: string }> }
) {
    try {
        const { id, slug } = await params;
        const questions = AI_QUESTIONS[slug as MovesType];

        if (!questions) {
            return NextResponse.json({ error: "Invalid move type" }, { status: 404 });
        }

        const question = questions.find((q) => q.id === id);

        if (!question) {
            return NextResponse.json({ error: "Question not found" }, { status: 404 });
        }

        return NextResponse.json({
            question,
            answer: "Lorem ipsum dolor sit amet consectetur adipisicing elit. Est eos ducimus natus dolore reprehenderit repudiandae suscipit, doloremque ipsa ratione, rerum porro repellendus fugit doloribus nesciunt. Quis harum nulla sed delectus!"
        }, { status: 200 });
    } catch (error) {
        console.error("Error fetching AI questions:", error);
        return NextResponse.json({ error: "Failed to fetch AI questions" }, { status: 500 });
    }
}