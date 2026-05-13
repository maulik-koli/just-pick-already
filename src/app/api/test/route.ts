import { ai, AI_MODEL } from '@/lib/ai';
import { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';
import { Type  } from "@google/genai";

const greetingResponseSchema = {
    type: Type.OBJECT,
    properties: {
        greeting: {
            type: Type.STRING,
        },
    },
    required: ["greeting"],
};


export async function GET() {
    try {
        const aiTestResponse = await ai.models.generateContent({
            model: AI_MODEL,
            contents: "Say hello in JSON format.",
            config: {
                responseMimeType: "application/json",
                responseSchema: greetingResponseSchema
            },
        })

        console.log(aiTestResponse.text)

        const testRes: ApiResponse<{ ai: string }> = {
            success: true,
            code: 'OK',
            message: 'This is a test API response',
            data: {
                ai: JSON.parse(aiTestResponse.text || "no data") || "Error from AI model"
            },
        };
    
        return NextResponse.json(testRes);
    }
    catch (error) {
        console.log("Error: ", error)
        return NextResponse.json({
            success: false,
            code: 'INTERNAL_SERVER_ERROR',
            message: 'Internal server error',
        }, { status: 500 });
    }
}