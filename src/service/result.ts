import { Answer } from "@/generated/prisma/client";
import { ai, AI_MODEL } from "@/lib/ai";
import { AnswerPayloadItem, generateResultPrompt } from "@/prompts/generate-result.prompt";
import { generateResultResponseSchema } from "@/prompts/generate-result.response";
import { OnbordingType } from "@/schemas/onbording.schema";
import { Question, QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { resultSchema } from "@/schemas/result.schema";


export const getResult = async (
    questionData: QuestionGeneration,
    answers: Answer[],
    onboarding: OnbordingType
) => {
    const questionMap = new Map<string, Question>();
    for (const zone of questionData.zones) {
        for (const question of zone.questions) {
            questionMap.set(question.id, question);
        }
    }

    const answersPayload: AnswerPayloadItem[] = answers.map((answer) => {
        const question = questionMap.get(answer.questionId);
        
        if (!question) {
            throw new Error(`Question not found for ID: ${answer.questionId}`);
        }

        return {
            questionId: answer.questionId,
            zone: answer.zone,
            questionTitle: question.title,
            scenario: question.scenario,
            selectedOptionText: answer.selectedOptionText,
            allOptions: question.options.map((opt) => opt.text)
        };
    });

    const prompt = generateResultPrompt(answersPayload, onboarding)

    const response = await ai.models.generateContent({
        model: AI_MODEL,
        contents: prompt,
        config: {
            responseMimeType: "application/json",
            responseSchema: generateResultResponseSchema,
            temperature: 1,
        },
    })

    const rawText = response.text;

    if (!rawText) {
        throw new Error("Gemini returned an empty response.");
    }

    const parsed = JSON.parse(rawText);

    const validated = resultSchema.parse(parsed);
    
    return validated;
}