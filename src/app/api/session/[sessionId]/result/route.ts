import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { Answer } from "@/generated/prisma/client";

import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { getResult } from "@/service/result";
import { Result } from "@/schemas/result.schema";

import { ResultResponse } from "@/app/api/_types";
import { apiWrapper } from "@/app/api/_error";

interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export const POST = apiWrapper(async (_request: NextRequest, { params }: RouteParams) => {
    const { sessionId } = await params

    const sessionData = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            answers: true,
            results: true
        }
    })

    if (!sessionData) {
        throw new Error("Session not found")
    }

    const { answers, results, ...session } = sessionData

    // if result already exists, return it instead of generating a new one
    if (results && results.length > 0) {
        const resData: ResultResponse = {
            code: "OK",
            message: "Successfully fetched existing result",
            success: true,
            data: results[0].resultData as unknown as Result
        };

        return NextResponse.json(resData, { status: 200 });
    }

    const questionData = session.questions as QuestionGeneration

    validateSessionAns(questionData, answers)

    const resultData = await getResult(questionData, answers, {
        ageRange: session.ageRange,
        decisionStyle: session.decisionStyle,
        selfDescription: session.selfDescription,
        vibe: session.vibe
    });

    // save result and mark session as completed in a transaction
    await prisma.$transaction([
        prisma.result.create({
            data: { sessionId, resultData }
        }),
        prisma.session.update({
            where: { id: sessionId },
            data: { completed: true, completedAt: new Date() }
        })
    ]);

    const resData: ResultResponse = {
        code: "OK",
        message: "Successfully generated result",
        success: true,
        data: resultData
    };

    return NextResponse.json(resData, { status: 200 });
});



function validateSessionAns(questionData: QuestionGeneration , answers: Answer[]) {
    const allQuestionIds = questionData.zones.flatMap((zone) =>
        zone.questions.map((question) => question.id)
    ); 

    const questionIdSet = new Set(allQuestionIds);

    const hasInvalidAnswers = answers.some(
        (answer) => !questionIdSet.has(answer.questionId)
    );

    if (hasInvalidAnswers) {
        throw new Error("Invalid answers detected")
    }

    const isComplete  = allQuestionIds.length === answers.length;

    if (!isComplete) {
        throw new Error("There are still some unsnwers yet to select")
    }
}