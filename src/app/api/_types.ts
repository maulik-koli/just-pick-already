import { Zone } from "@/generated/prisma/enums";
import { OnbordingType } from "@/schemas/onbording.schema";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { ApiResponse } from "@/types/api";
import { Result } from "@/schemas/result.schema";

export type StartGamePayload = OnbordingType

export type StartGameResponse = ApiResponse<QuestionGeneration & { 
    sessionId: string 
}>

export type AnswersListItem = {
    zone: Zone;
    id: string;
    questionId: string;
    selectedOptionId: string;
    selectedOptionText: string;
} 

export type GetAnswersResponse = ApiResponse<{ answers: AnswersListItem[] }>

export type UpdateAnswerResponse = ApiResponse<null>

export type ResultResponse = ApiResponse<Result>