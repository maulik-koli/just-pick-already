import { ai, AI_MODEL } from "@/server/service/ai";
import { Answer } from "@/generated/prisma/client";
import { AnswerPayloadItem, generateResultPrompt } from "@/server/prompts/generate-result.prompt";
// import { generateResultResponseSchema } from "@/server/prompts/generate-result.response";

import { OnbordingType } from "@/schemas/onbording.schema";
import { resultSchema } from "@/schemas/result.schema";
import { Question, QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { AppError } from "@/lib/_error";


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
            throw new AppError(`Question not found for ID: ${answer.questionId}`, 404, "RESOURCE_NOT_FOUND");
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

    try {
        const prompt = generateResultPrompt(answersPayload, onboarding)

        const response = await ai.models.generateContent({
            model: AI_MODEL,
            contents: prompt,
            config: {
                responseMimeType: "application/json",
                // responseSchema: generateResultResponseSchema,
                temperature: 1,
            },
        })

        const rawText = response.text;

        if (!rawText) {
            throw new AppError("Gemini returned an empty response.");
        }

        const parsed = JSON.parse(rawText);

        const validated = resultSchema.parse(parsed);

        return validated;
    }
    catch (e) {
        throw new AppError("Gemini ubable to generate data.");
    }
}