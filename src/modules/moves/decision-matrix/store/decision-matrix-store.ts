import { create } from 'zustand'
import { persist, createJSONStorage } from 'zustand/middleware'
import { Choice, Criteria, ScoreMap } from '../types'
import { getUuid } from '@/lib/helper'

export interface DecisionMatrixState {
    choices: Choice[]
    criteria: Criteria[]
    scores: ScoreMap

    addChoice: (position?: 'start' | 'end') => void
    updateChoice: (id: string, name: string) => void
    removeChoice: (id: string) => void
    reorderChoices: (choices: Choice[]) => void

    addCriteria: () => void
    updateCriteria: (id: string, name: string, weight?: number) => void
    removeCriteria: (id: string) => void
    reorderCriteria: (criteria: Criteria[]) => void

    updateScore: (choiceId: string, criteriaId: string, score: number) => void
    
    reset: () => void
}


export const useDecisionMatrixStore = create<DecisionMatrixState>()(
    persist(
        (set) => ({
            choices: [],
            criteria: [],
            scores: {},

            addChoice: (position = 'end') => set((state) => {
                if (state.choices.length >= 5) return state
                const newId = getUuid()
                const newChoice = { id: newId, name: '' }
                return {
                    choices: position === 'start' 
                        ? [newChoice, ...state.choices]
                        : [...state.choices, newChoice]
                }
            }),

            updateChoice: (id, name) => set((state) => ({
                choices: state.choices.map(c => c.id === id ? { ...c, name } : c)
            })),

            removeChoice: (id) => set((state) => ({
                choices: state.choices.filter(c => c.id !== id)
            })),

            reorderChoices: (choices) => set({ choices }),

            addCriteria: () => set((state) => {
                const newId = getUuid()
                return {
                    criteria: [...state.criteria, { id: newId, name: '', weight: 1 }]
                }
            }),

            updateCriteria: (id, name, weight) => set((state) => ({
                criteria: state.criteria.map(c => c.id === id ? { ...c, name, weight: weight ?? c.weight } : c)
            })),

            removeCriteria: (id) => set((state) => ({
                criteria: state.criteria.filter(c => c.id !== id)
            })),

            reorderCriteria: (criteria) => set({ criteria }),

            updateScore: (choiceId, criteriaId, score) => set((state) => ({
                scores: {
                    ...state.scores,
                    [choiceId]: {
                        ...(state.scores[choiceId] || {}),
                        [criteriaId]: score
                    }
                }
            })),

            reset: () => set({ choices: [], criteria: [], scores: {} })
        }),
        {
            name: 'jpa-decision-matrix',
            storage: createJSONStorage(() => sessionStorage),
        }
    )
)
