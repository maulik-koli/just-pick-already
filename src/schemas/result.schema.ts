import { z } from "zod";


export const resultScoresSchema = z.object({
    intuition: z.number().int().min(0).max(100),
    logic: z.number().int().min(0).max(100),
    empathy: z.number().int().min(0).max(100),
    ambition: z.number().int().min(0).max(100),
    riskTolerance: z.number().int().min(0).max(100),
    independence: z.number().int().min(0).max(100),
    adaptability: z.number().int().min(0).max(100),
    morality: z.number().int().min(0).max(100),
    impulsiveness: z.number().int().min(0).max(100),
    socialEnergy: z.number().int().min(0).max(100),
});

export const resultZoneInsightsSchema = z.object({
    SOCIAL_SITUATOINS: z.string(),
    RELATIONSHIPS: z.string(),
    CAREER: z.string(),
    MORAL_GRAY_AREAS: z.string(),
    INPULSE_VS_LOGIC: z.string(),
});

export const resultMostSurprisingChoiceSchema = z.object({
    question: z.string(),
    explanation: z.string(),
});

export const resultSchema = z.object({
    title: z.string(),
    subtitle: z.string(),
    summary: z.string(),
    scores: resultScoresSchema,
    topTraits: z.array(z.string()).length(4),
    strengths: z.array(z.string()).length(3),
    blindSpots: z.array(z.string()).length(2),
    zoneInsights: resultZoneInsightsSchema,
    mostSurprisingChoice: resultMostSurprisingChoiceSchema,
    shareText: z.string(),
});

export type ResultScores = z.infer<typeof resultScoresSchema>;
export type ResultZoneInsights = z.infer<typeof resultZoneInsightsSchema>;
export type ResultMostSurprisingChoice = z.infer<typeof resultMostSurprisingChoiceSchema>;
export type Result = z.infer<typeof resultSchema>;