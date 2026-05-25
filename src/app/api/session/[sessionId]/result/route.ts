import { apiWrapper } from "@/app/api/_error";
import { Answer } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";
import { AnswerPayloadItem } from "@/prompts/generate-result.prompt";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { getResult } from "@/service/result";
import { ResultResponse } from "@/app/api/_types";
import { NextRequest, NextResponse } from "next/server";

interface RouteParams {
    params: Promise<{
        sessionId: string;
    }>;
}


export const POST = apiWrapper(async (request: NextRequest, { params }: RouteParams) => {
    const { sessionId } = await params

    const sessionData = await prisma.session.findUnique({
        where: { id: sessionId },
        include: {
            answers: true
        }
    })

    if (!sessionData) {
        throw new Error("Session not found")
    }

    
    const { answers, ...session } = sessionData

    if (session.completed) {
        throw new Error("Session already completed")
    }

    const questionData = session.questions as QuestionGeneration

    validateSessionAns(questionData, answers)

    const resultData = await getResult(questionData, answers, {
        ageRange: session.ageRange,
        decisionStyle: session.decisionStyle,
        selfDescription: session.selfDescription,
        vibe: session.vibe
    });

    // Save result and mark session as completed in a transaction
    await prisma.$transaction([
        prisma.result.upsert({
            where: { sessionId },
            update: { resultData: resultData as any },
            create: { sessionId, resultData: resultData as any }
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