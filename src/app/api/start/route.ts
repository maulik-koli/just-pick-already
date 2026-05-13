import { prisma } from "@/lib/prisma";
import { onbordingSchema, OnbordingType } from "@/schemas/onbording.schema";
import { getQuestions } from "@/service/questions";
import { ApiError, ApiResponse, StatusCodeType } from "@/types/api";
import { NextResponse } from "next/server";
import { ZodError } from "zod";
import { createId } from "@paralleldrive/cuid2";
import { QuestionGeneration, questionGenerationSchema } from "@/schemas/questionGenerationSchema.schema";


export async function POST(request: Request) {
    try {
        // check schema
        const body = await request.json();
        onbordingSchema.parse(body)

        const payload: OnbordingType = body

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

 
        const resData: ApiResponse<QuestionGeneration & { sessionId: string }> = {
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
        let code: StatusCodeType = "INTERNAL_SERVER_ERROR"
        let message: string = error.message || "Something went wrong, please try again leter"
        let status: number = 500

        if (error instanceof ZodError) {
            status = 400
            code = "BAD_REQUEST"
            
            if( error.issues[0].code === 'invalid_type' || 
                error.issues[0].code === 'unrecognized_keys'
            ){
                message = "Invalid payload data"
            }
            message = error.issues[0].message
        }

        const errorObj: ApiError  = {
            success: false,
            code,
            message
        }

        return NextResponse.json(errorObj, { status });
    }
}