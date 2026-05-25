import z from "zod";
import { AGE_RANGE, DECISOIN_STYLE, SELF_DESCRIPTION, VIBE } from "./enums";



export const onbordingSchema = z.object({
    ageRange: z.enum(AGE_RANGE, 'Invalid age range value'),
    vibe: z.enum(VIBE, 'Invalid vibe value'),
    decisionStyle: z.enum(DECISOIN_STYLE, 'Invalid decision style value'),
    selfDescription: z.enum(SELF_DESCRIPTION, 'Invalid self description value'),
})

export type OnbordingType = z.infer<typeof onbordingSchema>