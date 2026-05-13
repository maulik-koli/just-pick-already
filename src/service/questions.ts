import { ai, AI_MODEL } from "@/lib/ai"
import { generateQuestionsPrompt } from "@/prompts/generate-questions.prompt"
import { generateQuestionsResponseSchema } from "@/prompts/generate-questions.response-schema"
import { OnbordingType } from "@/schemas/onbording.schema"
import { questionGenerationSchema } from "@/schemas/questionGenerationSchema.schema"


export const getQuestions = async (payload: OnbordingType) => {
    const prompt = generateQuestionsPrompt(payload)

    const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: generateQuestionsResponseSchema,
            temperature: 1,
        },
    })

    const rawText = response.text;

    if (!rawText) {
        throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(rawText);

    const validated = questionGenerationSchema.parse(parsed);

    return validated;
}