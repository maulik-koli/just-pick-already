'use client'
import React, { useState } from 'react'
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useApiUiStore } from '@/store'
import { onbordingSchema, OnbordingType } from '@/schemas/onbording.schema';
import { useStartGame } from '@/hooks/use-start-game';

import OnbordingModel from './onbording-model'
import LoadingScreen from './loading-screen';


const OnbordingHandler: React.FC = () => {
    const toggleOnbordingModel = useApiUiStore((state) => state.toggleOnbordingModel);
    const openOnbordingModel = useApiUiStore((state) => state.openOnbordingModel);
    const [showLoading, setShowLoading] = useState(false);

    const { startGame, isSubmitting } = useStartGame();

    const form = useForm<OnbordingType>({
        resolver: zodResolver(onbordingSchema),
    });

    const onSubmit = async (data: OnbordingType) => {
        setShowLoading(true);
        const { error } = await startGame(data);
        
        if (error) {
            console.log("Error starting game:", error);
            setShowLoading(false);
        } else {
            toggleOnbordingModel(false);
        }
    }

    return (
        <>
            <FormProvider {...form}>
                <OnbordingModel
                    onClose={() => toggleOnbordingModel(false)}
                    onSubmit={form.handleSubmit(onSubmit)}
                    open={openOnbordingModel}
                />
            </FormProvider>
            {showLoading && <LoadingScreen isLoading={isSubmitting} />}
        </>
    )
}

export default OnbordingHandler