import z from 'zod';
import "dotenv/config";

const envSchema = z.object({
    NODE_ENV: z.enum(['development', 'production']),
    DATABASE_URL: z.url("Invalid DATABASE_URL"),
    DIRECT_URL: z.url("Invalid DIRECT_URL"),
    GEMINI_MODEL_CODE: z.string().min(1, "Gemini model code required"),
    GEMINI_API_KEY: z.string().min(1, "Gemini api key required"),
    EMAIL_API_KEY: z.string().min(1, "Email api key required")
});

export const env = envSchema.parse({
    NODE_ENV: process.env.NODE_ENV,
    DATABASE_URL: process.env.DATABASE_URL,
    DIRECT_URL: process.env.DIRECT_URL,
    GEMINI_MODEL_CODE: process.env.GEMINI_MODEL_CODE,
    GEMINI_API_KEY: process.env.GEMINI_API_KEY,
    EMAIL_API_KEY: process.env.EMAIL_API_KEY,
});