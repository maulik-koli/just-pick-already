import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/server/prisma";
import { GetAnswersResponse, UpdateAnswerResponse } from "@/types/_types";
import { apiWrapper } from "@/lib/_error";
import { AnswerPaylod, answerSchema } from "@/schemas/answer.schema";

interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export const GET = apiWrapper(async (_request: NextRequest, { params }: RouteParams) => {
    const { sessionId } = await params

    const answers = await prisma.answer.findMany({
        where: {
            sessionId
        },
        select: {
            id: true,
            questionId: true,
            zone: true,
            selectedOptionId: true,
            selectedOptionText: true,
        }
    })

    const resData: GetAnswersResponse = {
        code: "OK",
        message: "Successfully retrieved session",
        success: true,
        data: { answers }
    }

    return NextResponse.json(resData, { status: 200 });
});



export const POST = apiWrapper(async (request: NextRequest, { params }: RouteParams) => {
    const { sessionId } = await params

    // check schema
    const body = await request.json();
    answerSchema.parse(body)

    const payload: AnswerPaylod = body
    const { questionId, selectedOptionId, zone, selectedOptionText } = payload

    // update or create in db
    const answer = await prisma.answer.upsert({
        where: {
            sessionId_questionId: {
                sessionId,
                questionId,
            },
        },
        update: { zone, selectedOptionId },
        create: {
            zone,
            sessionId,
            questionId,
            selectedOptionId,
            selectedOptionText,
        },
    });

    const resData: UpdateAnswerResponse = {
        code: "OK",
        message: "Successfully updated answer",
        success: true,
        data: null
    }

    return NextResponse.json(resData, { status: 200 });
});