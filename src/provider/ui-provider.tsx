"use client";
import React from 'react'
import { HeroUIProvider } from "@heroui/react";


const UiProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
    return (
        <HeroUIProvider>
            {children}
        </HeroUIProvider>
    )
}

export default UiProvider
