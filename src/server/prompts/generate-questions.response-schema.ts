import { Type } from "@google/genai";

// Right now this is not getting use
export const generateQuestionsResponseSchema = {
    type: Type.OBJECT,
    properties: {
        zones: {
            type: Type.ARRAY,
            items: {
                type: Type.OBJECT,
                properties: {
                    zone: { type: Type.STRING },
                    questions: {
                        type: Type.ARRAY,
                        items: {
                            type: Type.OBJECT,
                            properties: {
                                id: { type: Type.STRING },
                                zone: { type: Type.STRING },
                                title: { type: Type.STRING },
                                scenario: { type: Type.STRING },
                                options: {
                                    type: Type.ARRAY,
                                    items: {
                                        type: Type.OBJECT,
                                        properties: {
                                            id: { type: Type.STRING },
                                            text: { type: Type.STRING },
                                        },
                                        required: ["id", "text"],
                                    },
                                },
                            },
                            required: [
                                "id",
                                "zone",
                                "title",
                                "scenario",
                                "options",
                            ],
                        },
                    },
                },
                required: ["zone", "questions"],
            },
        },
    },
    required: ["zones"],
};