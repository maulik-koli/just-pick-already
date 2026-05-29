'use client'
import { useApiUiStore, useGameStore } from "@/store";


export const useHandleStart = () => {
    const toggleModal = useApiUiStore((state) => state.toggleModal);
    const hasGameData = useGameStore((state) => state.hasGameData);

    const handleStartGame = () => {
        if (hasGameData()) {
            toggleModal('openContinueGameModel', true);
        } else {
            toggleModal('openOnbordingModel', true);
        }
    }

    return { handleStartGame }
}