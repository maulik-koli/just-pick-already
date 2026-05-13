import { GoogleGenAI } from "@google/genai";
import { env } from "./env";

const ai = new GoogleGenAI({
    apiKey: env.GEMINI_API_KEY
});

const AI_MODEL = env.GEMINI_MODEL_CODE;

export { ai, AI_MODEL }