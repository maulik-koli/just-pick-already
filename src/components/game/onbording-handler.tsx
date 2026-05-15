'use client'
import React from 'react'
import OnbordingModel from './onbording-model'
import { FormProvider, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useSessionStore } from '@/store/states/session'
import { onbordingSchema, OnbordingType } from '@/schemas/onbording.schema';


const OnbordingHandler: React.FC = () => {
    const toggleOnbordingModel = useSessionStore((state) => state.toggleOnbordingModel);
    const openOnbordingModel = useSessionStore((state) => state.openOnbordingModel);

    const form = useForm<OnbordingType>({
        resolver: zodResolver(onbordingSchema),
    });

    const onSubmit = (data: OnbordingType) => {
        console.log(data);
        toggleOnbordingModel(false);
    }

    return (
        <FormProvider {...form}>
            <OnbordingModel
                onClose={() => toggleOnbordingModel(false)}
                onSubmit={form.handleSubmit(onSubmit)}
                open={openOnbordingModel}
            />
        </FormProvider>
    )
}

export default OnbordingHandler