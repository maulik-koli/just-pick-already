import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";

import { StartGameResponse } from "@/types/_types";
import { apiWrapper, AppError } from "../../../../lib/_error";


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
        throw new AppError("Session not found, please restart the game", 404, "RESOURCE_NOT_FOUND")
    }

    const resData: StartGameResponse = {
        code: "OK",
        message: "Successfully retrieved session",
        success: true,
        data: {
            sessionId: session.id,
            isComplete: session.completed,
            ...session.questions as QuestionGeneration,
        }
    }

    return NextResponse.json(resData, { status: 200 });
});