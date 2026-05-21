import { OnbordingType } from "@/schemas/onbording.schema";
import { StartGameResponse } from "@/app/api/_types";
import { ApiError } from "@/types/api";
import { useApiUiStore, useGameStore } from "@/store";

type StartGameReturn = { data: StartGameResponse | null, error: ApiError | null }


export const useStartGame = () => {
    const setApiLoading = useApiUiStore((state) => state.setApiLoading);
    const setApiError = useApiUiStore((state) => state.setApiError);
    const resetApiState = useApiUiStore((state) => state.resetApiState);

    const setStartGameData = useGameStore((state) => state.setQuestions);
    const setSessionId = useGameStore((state) => state.setSessionId);
    const setIsCompleted = useGameStore((state) => state.setIsCompleted);

    const isSubmitting = useApiUiStore((state) => state.startGameApi.isLoading)
    const error = useApiUiStore((state) => state.startGameApi.error)


    const startGame = async (payload: OnbordingType): Promise<StartGameReturn> => {
        resetApiState('startGameApi');
        setApiLoading('startGameApi', true);

        try {
            const response = await fetch("/api/start", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                },
                body: JSON.stringify(payload),
            });

            const result = await response.json();
            const resData = result as StartGameResponse;

            if (!response.ok || !resData.success || !resData.data) {
                const apiError = result as ApiError;
                setApiError('startGameApi', apiError);
                setApiLoading('startGameApi', false);
                return { data: null, error: apiError };
            }

            setStartGameData(resData.data.zones);
            setSessionId(resData.data.sessionId);
            setIsCompleted(false);
            setApiLoading('startGameApi', false);

            return { data: resData, error: null };
        } catch (err: any) {
            console.error("Start Game API Error:", err);
            
            const fallbackError: ApiError = {
                success: false,
                code: "INTERNAL_SERVER_ERROR",
                message: err.message || "An unexpected error occurred",
            };
            setApiError('startGameApi', fallbackError);
            setApiLoading('startGameApi', false);
            
            return { data: null, error: fallbackError };
        }
    };

    return { error, isSubmitting, startGame }
};
