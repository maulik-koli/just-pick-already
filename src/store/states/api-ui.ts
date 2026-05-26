import { create } from "zustand"
export type ModalKey = 'openOnbordingModel' | 'openContinueGameModel'

type UiState = {
    openOnbordingModel: boolean
    openContinueGameModel: boolean
    toggleModal: (key: ModalKey, open: boolean) => void
}

export const useApiUiStore = create<UiState>()((set) => ({
    openOnbordingModel: false,
    openContinueGameModel: false,
    
    toggleModal: (key, open) => set(() => ({
        [key]: open 
    })),
}))