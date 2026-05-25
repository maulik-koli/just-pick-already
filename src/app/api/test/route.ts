import { ai, AI_MODEL } from '@/lib/ai';
import { ApiResponse } from '@/types/api';
import { NextResponse } from 'next/server';
import { apiWrapper } from '@/app/api/_error';
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


export const GET = apiWrapper(async () => {
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
});