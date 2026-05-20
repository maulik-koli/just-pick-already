import { Zone } from "@/generated/prisma/enums";
import { OnbordingType } from "@/schemas/onbording.schema";
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema";
import { ApiResponse } from "@/types/api";

export type StartGamePayload = OnbordingType

export type StartGameResponse = ApiResponse<QuestionGeneration & { 
    sessionId: string 
}>

export type AnswersListItem = {
    zone: Zone;
    id: string;
    questionId: string;
    selectedOptionId: string;
} 

export type GetAnswersResponse = ApiResponse<{ answers: AnswersListItem[] }>

export type UpdateAnswerResponse = ApiResponse<null>