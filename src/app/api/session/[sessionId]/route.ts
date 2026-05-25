import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";

import { StartGameResponse } from "../../_types";
import { apiWrapper } from "../../_error";


interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export const GET = apiWrapper(async (_request: NextRequest, { params }: RouteParams) => {
    const { sessionId } = await params

    const session = await prisma.session.findUnique({
        where: {
            id: sessionId
        }
    })

    if (!session) {
        throw new Error("Session not found, please restart the game")
    }

    const resData: StartGameResponse = {
        code: "OK",
        message: "Successfully retrieved session",
        success: true,
        data: {
            sessionId: session.id,
            ...session.questions as QuestionGeneration,
        }
    }

    return NextResponse.json(resData, { status: 200 });
});