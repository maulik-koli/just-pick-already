import z from 'zod'
import { ZONES } from './enums'

export const answerSchema = z.object({
    zone: z.enum(ZONES, 'Invalid zone value'),
    questionId: z.string().min(1, "Invalid question id"),
    selectedOptionId: z.string().min(1, "Invalid option id"),
    selectedOptionText: z.string().min(1, "Selection text require"),
})

export type AnswerPaylod = z.infer<typeof answerSchema>