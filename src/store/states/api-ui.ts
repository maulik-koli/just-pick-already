import { create } from "zustand"
import { ApiError } from "@/types/api"

type ApiBaseType = {
    error: ApiError | null,
    isLoading: boolean
}

export type ApiKey = 'startGameApi' | 'submitAnswerApi' | 'getAnswerApi' | 'getSessionAPi'

type ApiUiState = {
    startGameApi: ApiBaseType,
    submitAnswerApi: ApiBaseType,
    getAnswerApi: ApiBaseType,
    getSessionAPi: ApiBaseType


    setApiLoading: (key: ApiKey, isLoading: boolean) => void
    setApiError: (key: ApiKey, error: ApiError | null) => void

    resetAll: () => void
    resetApiState: (key: ApiKey) => void

    openOnbordingModel: boolean
    toggleOnbordingModel: (open: boolean) => void
    openContinueGameModel: boolean
    toggleContinueGameModel: (open: boolean) => void
}


export const useApiUiStore = create<ApiUiState>()((set) => ({
    startGameApi: { error: null, isLoading: false },
    submitAnswerApi: { error: null, isLoading: false },
    getAnswerApi: { error: null, isLoading: false },
    getSessionAPi: { error: null, isLoading: false },

    openOnbordingModel: false,
    toggleOnbordingModel: (open) => set({ openOnbordingModel: open }),
    openContinueGameModel: false,
    toggleContinueGameModel: (open) => set({ openContinueGameModel: open }),

    setApiLoading: (key, isLoading) => set((state) => ({
        [key]: { ...state[key], isLoading }
    })),
    setApiError: (key, error) => set((state) => ({
        [key]: { ...state[key], error }
    })),

    resetAll: () => set({
        startGameApi: { error: null, isLoading: false },
        submitAnswerApi: { error: null, isLoading: false },
        getAnswerApi: { error: null, isLoading: false },
        getSessionAPi: { error: null, isLoading: false }
    }),
    resetApiState: (key) => set({ [key]: { error: null, isLoading: false } })
}))