import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AnswersListItem } from "@/app/api/_types"
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema"

type ZonesQuestoins = QuestionGeneration['zones']


type GameState = {
    sessionId: string | null
    zones: ZonesQuestoins | null,
    answers: AnswersListItem[],

    setSessionId: (id: string) => void,
    setQuestions: (zones: ZonesQuestoins) => void,
    setAnswers: (answers: AnswersListItem[]) => void,
}


export const useGameStore = create<GameState>()(persist((set, get) => ({
    sessionId: null,
    zones: null,
    answers: [],

    setSessionId: (id) => set({ sessionId: id }),
    setQuestions: (zones) => set({ zones }),
    setAnswers: (answers) => set({ answers }),
}), {
    name: "game",
    partialize: (state) => ({
        sessionId: state.sessionId,
        zones: state.zones,
        answers: state.answers
    }),
})) 