import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GetAnswersResponse, UpdateAnswerResponse } from "@/app/api/_types";
import { errorHandler } from "@/app/api/_error";
import { AnswerPaylod, answerSchema } from "@/schemas/answer.schema";

interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export async function GET(_request: NextRequest, { params }: RouteParams) {
    try {
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

    } catch (error: any) {
        const { err, status } = errorHandler(error)

        return NextResponse.json(err, { status });
    }
}



export async function POST(request: NextRequest, { params }: RouteParams) {
    try {
        const { sessionId } = await params

        // check schema
        const body = await request.json();
        answerSchema.parse(body)

        const payload: AnswerPaylod = body
        const { questionId, selectedOptionId, zone } = payload

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
            },
        });

        const resData: UpdateAnswerResponse = {
            code: "OK",
            message: "Successfully updated answer",
            success: true,
            data: null
        }
        
        return NextResponse.json(resData, { status: 200 });
    }
    catch (error: any) {
        const { err, status } = errorHandler(error)

        return NextResponse.json(err, { status });
    }
}