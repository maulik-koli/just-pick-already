import { create } from "zustand"
import { persist } from "zustand/middleware"

import { AnswersListItem } from "@/app/api/_types"
import { QuestionGeneration } from "@/schemas/questionGenerationSchema.schema"
import { AnswerPaylod } from "@/schemas/answer.schema"

let isProcessingQueue = false;
const requestQueue: Array<() => Promise<void>> = [];

const processQueue = async () => {
    if (isProcessingQueue) return;
    isProcessingQueue = true;
    while (requestQueue.length > 0) {
        const task = requestQueue.shift();
        if (task) {
            await task();
        }
    }
    isProcessingQueue = false;
}

type ZonesQuestoins = QuestionGeneration['zones']


type GameState = {
    sessionId: string | null
    zones: ZonesQuestoins | null,
    answers: AnswersListItem[],

    setSessionId: (id: string) => void,
    setQuestions: (zones: ZonesQuestoins) => void,
    setAnswers: (answers: AnswersListItem[]) => void,
    addAnswer: (answer: AnswersListItem) => void,
    resetGame: () => void,
    hasGameData: () => boolean,
}


export const useGameStore = create<GameState>()(persist((set, get) => ({
    sessionId: null,
    zones: null,
    answers: [],

    setSessionId: (id) => set({ sessionId: id }),
    setQuestions: (zones) => set({ zones }),
    setAnswers: (answers) => set({ answers }),
    addAnswer: (answer) => {
        const state = get();
        const existingIdx = state.answers.findIndex(a => a.questionId === answer.questionId);
        const wasUpdate = existingIdx > -1;
        const oldOptionId = wasUpdate ? state.answers[existingIdx].selectedOptionId : null;

        // Optimistic update
        set((currentState) => {
            if (existingIdx > -1) {
                const updatedAnswers = [...currentState.answers];
                updatedAnswers[existingIdx] = {
                    ...updatedAnswers[existingIdx],
                    selectedOptionId: answer.selectedOptionId,
                };
                return { answers: updatedAnswers };
            } else {
                return { answers: [...currentState.answers, answer] };
            }
        });

        // Enqueue API request and handle rollback
        requestQueue.push(async () => {
            const currentSessionId = get().sessionId;
            if (!currentSessionId) {
                console.error("No active session for answer sync.");
                return;
            }

            try {
                const payload: AnswerPaylod = {
                    zone: answer.zone,
                    questionId: answer.questionId,
                    selectedOptionId: answer.selectedOptionId,
                };

                const res = await fetch(`/api/session/${currentSessionId}/answers`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify(payload)
                });
                
                if (!res.ok) {
                    throw new Error("API request failed");
                }
                const resData = await res.json();
                if (!resData.success) {
                    throw new Error(resData.message || "Failed to sync answer");
                }
            } catch (err) {
                console.error("Rollback answer update due to error:", err);
                
                // Surgical Rollback
                set((currentState) => {
                    const currentAnswers = [...currentState.answers];
                    const idx = currentAnswers.findIndex(a => a.questionId === answer.questionId);
                    
                    if (idx > -1) {
                        // Only rollback if the user hasn't overwritten this specific state yet.
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
            }
        });

        processQueue();
    },
    resetGame: () => set({ sessionId: null, zones: null, answers: [] }),
    hasGameData: () => {
        const state = get();
        return !!state.sessionId && !!state.zones;
    },
}), {
    name: "game",
    partialize: (state) => ({
        sessionId: state.sessionId,
        zones: state.zones,
        answers: state.answers
    }),
})) 