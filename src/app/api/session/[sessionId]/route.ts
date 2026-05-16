import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";

import { StartGameResponse } from "../../_types";
import { errorHandler } from "../../_error";


interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export async function GET(_request: NextRequest, { params }: RouteParams) {
    try {
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

    } catch (error: any) {
        const { err, status } = errorHandler(error)

        return NextResponse.json(err, { status });
    }
}