import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { createId } from "@paralleldrive/cuid2";

import { onbordingSchema } from "@/schemas/onbording.schema";
import { getQuestions } from "@/service/questions";
import { QuestionGeneration, questionGenerationSchema } from "@/schemas/questionGenerationSchema.schema";

import { StartGamePayload, StartGameResponse } from "../_types";
import { errorHandler } from "../_error";


export async function POST(request: NextRequest) {
    try {
        // check schema
        const body = await request.json();
        onbordingSchema.parse(body)

        const payload: StartGamePayload = body

        // generate questions
        const question: QuestionGeneration = await getQuestions(payload)

        // map questions
        const mapQuestions: QuestionGeneration = {
            zones: question.zones.map((zone) => {
                return {
                    ...zone,
                    questions: zone.questions.map((question) => {
                        return {
                            ...question,
                            id: createId(),
                            options: question.options.map((option) => {
                                return {
                                    ...option,
                                    id: createId()
                                }
                            })
                        }
                    })
                }
            })
        } 
        

        // validate questions
        const result = await questionGenerationSchema.safeParseAsync(mapQuestions)

        if (!result.success) {
            throw new Error("Unable to generate valid questions. Please try again later")
        }

        // create session
        const session = await prisma.session.create({
            data: {
                ...payload,
                questions: mapQuestions
            }
        })

 
        const resData: StartGameResponse = {
            code: "OK",
            message: "Successfully generated questions",
            success: true,
            data: {
                sessionId: session.id,
                zones: mapQuestions.zones,
            }
        }

        return NextResponse.json(resData, { status: 200 });

    } catch (error: any) {
        const { err, status } = errorHandler(error)

        return NextResponse.json(err, { status });
    }
}