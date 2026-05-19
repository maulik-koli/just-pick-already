import { AgeRange, DecisionStyle, SelfDescription, Vibe } from '@/generated/prisma/enums'

export type StepOptionsValue = AgeRange | DecisionStyle | SelfDescription | Vibe

type OnbordingStep = { 
    que: string, 
    options: { text: string, value: StepOptionsValue }[]
}


export const ONBORDING_STEPS: OnbordingStep[] = [
    {
        que: "How old are you?",
        options: [
            { text: "Under 18", value: "UNDER_18" },
            { text: "18-24", value: "AGE_18_24" },
            { text: "25-34", value: "AGE_25_34" },
            { text: "35-44", value: "AGE_35_44" },
            { text: "45-54", value: "AGE_45_54" },
            { text: "55+", value: "AGE_55_PLUS" },
        ]
    },
    {
        que: "What's your current vibe?",
        options: [
            { text: "Chill", value: "CHILL" },
            { text: "Curious", value: "CURIOUS" },
            { text: "Ambitious", value: "AMBITIOUS" },
            { text: "Overthinking", value: "OVERTHINKING" },
            { text: "Stressed", value: "STRESSED" },
            { text: "Optimistic", value: "OPTIMISTIC" },
        ]
    },
    {
        que: "How do you usually make decisions?",
        options: [
            { text: "Trust my gut", value: "TRUST_YOUR_GUT" },
            { text: "Think it through", value: "THINK_IT_THROUGH" },
            { text: "Ask for advice", value: "ASK_FOR_ADVICE" },
            { text: "Wait and see", value: "WAIT_AND_SEE" },
            { text: "Take the bold option", value: "TAKE_THE_BOLD_OPTION" },
        ]
    },
    {
        que: "How would you describe yourself?",
        options: [
            { text: "Keep options open", value: "KEEP_OPTIONS_OPEN" },
            { text: "Know what I want", value: "KNOW_WHAT_I_WANT" },
            { text: "Change my mind often", value: "CHANGE_MY_MIND_OFTEN" },
            { text: "Go with what feels right", value: "GO_WITH_WHAT_FEELS_RIGHT" },
            { text: "It depends", value: "IT_DEPENDS_ON_THE_SITUATION" },
        ]
    },
]