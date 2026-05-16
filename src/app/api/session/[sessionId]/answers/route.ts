import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { GetAnswersResponse } from "@/app/api/_types";
import { errorHandler } from "@/app/api/_error";


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