import z from 'zod'
import { Zone }  from "@/generated/prisma/enums";

const ZONES: Zone[] = [
    'CAREER', 'INPULSE_VS_LOGIC', 'MORAL_GRAY_AREAS', 'RELATIONSHIPS', 'SOCIAL_SITUATOINS'
]

export const answerSchema = z.object({
    zone: z.enum(ZONES, 'Invalid zone value'),
    questionId: z.string().min(1, "Invalid question id"),
    selectedOptionId: z.string().min(1, "Invalid option id"),
})

export type AnswerPaylod = z.infer<typeof answerSchema>