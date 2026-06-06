import { Type } from "@google/genai";

export const generateResultResponseSchema = {
    type: Type.OBJECT,
    properties: {
        title: { type: Type.STRING },
        subtitle: { type: Type.STRING },
        summary: { type: Type.STRING },
        scores: {
            type: Type.OBJECT,
            properties: {
                intuition: { type: Type.INTEGER },
                logic: { type: Type.INTEGER },
                empathy: { type: Type.INTEGER },
                ambition: { type: Type.INTEGER },
                riskTolerance: { type: Type.INTEGER },
                independence: { type: Type.INTEGER },
                adaptability: { type: Type.INTEGER },
                morality: { type: Type.INTEGER },
                impulsiveness: { type: Type.INTEGER },
                socialEnergy: { type: Type.INTEGER },
            },
            required: [
                "intuition", "logic", "empathy", "ambition", "riskTolerance",
                "independence", "adaptability", "morality", "impulsiveness", "socialEnergy"
            ],
        },
        topTraits: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        strengths: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        blindSpots: {
            type: Type.ARRAY,
            items: { type: Type.STRING },
        },
        zoneInsights: {
            type: Type.OBJECT,
            properties: {
                SOCIAL_SITUATOINS: { type: Type.STRING },
                RELATIONSHIPS: { type: Type.STRING },
                CAREER: { type: Type.STRING },
                MORAL_GRAY_AREAS: { type: Type.STRING },
                INPULSE_VS_LOGIC: { type: Type.STRING },
            },
            required: [
                "SOCIAL_SITUATOINS", "RELATIONSHIPS", "CAREER",
                "MORAL_GRAY_AREAS", "INPULSE_VS_LOGIC"
            ],
        },
        mostSurprisingChoice: {
            type: Type.OBJECT,
            properties: {
                question: { type: Type.STRING },
                explanation: { type: Type.STRING },
            },
            required: ["question", "explanation"],
        },
        shareText: { type: Type.STRING },
    },
    required: [
        "title", "subtitle", "summary", "scores", "topTraits",
        "strengths", "blindSpots", "zoneInsights", "mostSurprisingChoice", "shareText"
    ],
};