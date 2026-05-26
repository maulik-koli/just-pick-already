import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AnswersListItem } from "@/app/api/_types"
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema"

type ZonesQuestoins = QuestionGeneration['zones']

type GameState = {
    sessionId: string | null
    zones: ZonesQuestoins | null,
    answers: AnswersListItem[],
    isCompleted: boolean,

    setSessionId: (id: string) => void,
    setQuestions: (zones: ZonesQuestoins) => void,
    setAnswers: (answers: AnswersListItem[]) => void,
    addAnswer: (answer: AnswersListItem) => void,
    rollbackAnswer: (answer: AnswersListItem, wasUpdate: boolean, oldOptionId: string | null) => void,
    setIsCompleted: (completed: boolean) => void,
    resetGame: () => void,
    hasGameData: () => boolean,

    setStartGameData: (data: ZonesQuestoins, sessionId: string) => void
}

export const useGameStore = create<GameState>()(persist((set, get) => ({
    sessionId: null,
    zones: null,
    answers: [],
    isCompleted: false,

    setSessionId: (id) => set({ sessionId: id }),
    setQuestions: (zones) => set({ zones }),
    setAnswers: (answers) => set({ answers }),
    setIsCompleted: (completed) => set({ isCompleted: completed }),
    addAnswer: (answer) => {
        set((currentState) => {
            const existingIdx = currentState.answers.findIndex(a => a.questionId === answer.questionId);
            if (existingIdx > -1) {
                const updatedAnswers = [...currentState.answers];
                updatedAnswers[existingIdx] = {
                    ...updatedAnswers[existingIdx],
                    selectedOptionId: answer.selectedOptionId,
                    selectedOptionText: answer.selectedOptionText,
                };
                return { answers: updatedAnswers };
            } else {
                return { answers: [...currentState.answers, answer] };
            }
        });
    },
    rollbackAnswer: (answer, wasUpdate, oldOptionId) => {
        set((currentState) => {
            const currentAnswers = [...currentState.answers];
            const idx = currentAnswers.findIndex(a => a.questionId === answer.questionId);
            
            if (idx > -1) {
                // only rollback if the user hasn't overwritten this specific state yet.
                if (currentAnswers[idx].selectedOptionId === answer.selectedOptionId) {
                    if (wasUpdate && oldOptionId) {
                        currentAnswers[idx] = {
                            ...currentAnswers[idx],
                            selectedOptionId: oldOptionId,
                        };
                    } else {
                        // was an insert, remove it
                        currentAnswers.splice(idx, 1);
                    }
                }
            }
            return { answers: currentAnswers };
        });
    },
    resetGame: () => set({ sessionId: null, zones: null, answers: [], isCompleted: false }),
    hasGameData: () => {
        const state = get();
        return !!state.sessionId && !!state.zones;
    },

    setStartGameData: (data, sessionId) => set({
        zones: data,
        isCompleted: false,
        sessionId,
    })
}), {
    name: "game",
    partialize: (state) => ({
        sessionId: state.sessionId,
        zones: state.zones,
        answers: state.answers,
        isCompleted: state.isCompleted
    }),
})) 