import { ai, AI_MODEL } from "@/server/service/ai"
import { generateQuestionsPrompt } from "@/server/prompts/generate-questions.prompt"
import { questionGenerationSchema } from "@/schemas/questionGenerationSchema.schema"
// import { generateQuestionsResponseSchema } from "@/server/prompts/generate-questions.response-schema"

import { OnbordingType } from "@/schemas/onbording.schema"
import { AppError } from "@/lib/_error"


export const getQuestions = async (payload: OnbordingType) => {
    try {
        const prompt = generateQuestionsPrompt(payload)

        const response = await ai.models.generateContent({
            model: AI_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // responseSchema: generateQuestionsResponseSchema,
                temperature: 1,
                thinkingConfig: {
                    thinkingBudget: 0
                }
            },
        })

        const rawText = response.text;

        if (!rawText) {
            throw new AppError("Gemini ubable to generate data.");
        }

        const parsed = JSON.parse(rawText);

        const validated = questionGenerationSchema.parse(parsed);

        return validated;
    }
    catch (e) {
        throw new AppError("Gemini ubable to generate data.");
    }
}