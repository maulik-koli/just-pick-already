"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

import { useApiUiStore, useGameStore } from "@/store";
import { onbordingSchema, OnbordingType } from "@/schemas/onbording.schema";
import { useStartGame } from "@/hooks/api/mutation";
import { useToast } from "@/hooks/use-toast";

import OnbordingModel from "@/components/home/onbording-model";
import ContinueGameModel from "@/components/home/continue-game-model";
import LoadingScreen from "@/components/game/loading-screen";


const OnbordingHandler: React.FC = () => {
    const router = useRouter();
    const openOnbordingModel = useApiUiStore((state) => state.openOnbordingModel);
    const openContinueGameModel = useApiUiStore((state) => state.openContinueGameModel);
    const toggleModal = useApiUiStore((state) => state.toggleModal);

    const setStartGameData = useGameStore((state) => state.setStartGameData);
    const toast = useToast()

    const { mutate: startGame, isPending: isSubmitting } = useStartGame();

    const form = useForm<OnbordingType>({
        resolver: zodResolver(onbordingSchema),
    });

    const onSubmit = (data: OnbordingType) => {
        startGame(data, {
            onSuccess: (data) => {
                if (data.data) {
                    const { zones, sessionId } = data.data;
                    setStartGameData(zones, sessionId);
                    toggleModal('openOnbordingModel', false);
                    router.push("/game");
                }
            },
            onError: (error) => {
                toast.error("Error starting game", error.message);
            },
        });
    };

    return (
        <>
            <FormProvider {...form}>
                <OnbordingModel
                    onClose={() => toggleModal('openOnbordingModel', false)}
                    onSubmit={form.handleSubmit(onSubmit)}
                    open={openOnbordingModel}
                />
            </FormProvider>
            <ContinueGameModel
                open={openContinueGameModel}
                onClose={() => toggleModal('openContinueGameModel', false)}
                onStartNew={() => toggleModal('openOnbordingModel', true)}
            />
            {isSubmitting && <LoadingScreen isLoading={isSubmitting} />}
        </>
    );
};

export default OnbordingHandler;
