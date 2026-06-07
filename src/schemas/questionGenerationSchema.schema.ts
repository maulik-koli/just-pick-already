import { z } from "zod";
import { ZONES } from "@/schemas/enums";


export const questionOptionSchema = z.object({
    id: z.string(),
    text: z.string(),
});

export const questionSchema = z.object({
    id: z.string(),
    zone: z.enum(ZONES),
    title: z.string(),
    scenario: z.string(),
    options: z.array(questionOptionSchema).length(4),
});

export const questionZoneSchema = z.object({
    zone: z.enum(ZONES),
    questions: z.array(questionSchema).length(5),
});

export const questionGenerationSchema = z.object({
    zones: z.array(questionZoneSchema),
});

export type QuestionOption = z.infer<typeof questionOptionSchema>;
export type Question = z.infer<typeof questionSchema>;
export type QuestionZone = z.infer<typeof questionZoneSchema>;
export type QuestionGeneration = z.infer<typeof questionGenerationSchema>;