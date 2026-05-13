import z from "zod";
import { AgeRange, Vibe, DecisionStyle, SelfDescription } from "@/generated/prisma/enums";

const AGE_RANGE: AgeRange[] = [
    'UNDER_18', 'AGE_18_24', 'AGE_25_34', 'AGE_35_44', 'AGE_45_54', 'AGE_55_PLUS'
] as const 

const VIBE: Vibe[] = [
    'AMBITIOUS', 'CHILL', 'CURIOUS', 'OPTIMISTIC', 'OVERTHINKING', 'STRESSED'
] as const

const DECISOIN_STYLE: DecisionStyle[] = [
    'ASK_FOR_ADVICE', 'TAKE_THE_BOLD_OPTION', 'THINK_IT_THROUGH', 'TRUST_YOUR_GUT', 'WAIT_AND_SEE'
] as const

const SELF_DESCRIPTION: SelfDescription[] = [
    'CHANGE_MY_MIND_OFTEN', 'GO_WITH_WHAT_FEELS_RIGHT', 'IT_DEPENDS_ON_THE_SITUATION', 'KEEP_OPTIONS_OPEN', 'KNOW_WHAT_I_WANT'
] as const


export const onbordingSchema = z.object({
    ageRange: z.enum(AGE_RANGE, 'Invalid age range value'),
    vibe: z.enum(VIBE, 'Invalid vibe value'),
    decisionStyle: z.enum(DECISOIN_STYLE, 'Invalid decision style value'),
    selfDescription: z.enum(SELF_DESCRIPTION, 'Invalid self description value'),
})

export type OnbordingType = z.infer<typeof onbordingSchema>