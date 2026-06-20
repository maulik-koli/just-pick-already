'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store";
import { AlertTriangle, Gamepad2, Home, SearchX, ServerCrash } from "lucide-react";
import { cn } from "@/lib/utils";
import { buttonVariants } from "@/components/ui/button";

interface ResultErrorScreenProps {
    error: { code?: string; message?: string } | null
    sessionId: string | null
}


const ResultErrorScreen: React.FC<ResultErrorScreenProps> = ({ error, sessionId }) => {
    const router = useRouter()
    const hasGameData = useGameStore((s) => s.hasGameData)
    const storedSessionId = useGameStore((s) => s.sessionId)

    const errorMessage = error?.message || "Something went wrong"

    // determine error type from message content
    const isSessionNotFound = errorMessage.toLowerCase().includes("session not found")
    const isResultNotFound = errorMessage.toLowerCase().includes("unfinished") ||
        errorMessage.toLowerCase().includes("result") && errorMessage.toLowerCase().includes("not found")


    const canContinueGame = isResultNotFound &&
        hasGameData() &&
        storedSessionId === sessionId

    const getErrorIcon = () => {
        if (isSessionNotFound) return <SearchX className="w-12 h-12" />
        if (isResultNotFound) return <ServerCrash className="w-12 h-12" />
        return <AlertTriangle className="w-12 h-12" />
    }

    const getErrorTitle = () => {
        if (isSessionNotFound) return "Session Not Found"
        if (isResultNotFound) return "Result Not Ready"
        return "Something Went Wrong"
    }


    return (
        <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95 }}
            className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-lg mx-auto text-center"
        >
            <div className="relative mb-8">
                <div className="absolute inset-0 bg-destructive/20 rounded-full blur-2xl scale-150" />
                <div className="relative p-6 rounded-full bg-destructive/10 border-2 border-destructive/20 text-destructive">
                    {getErrorIcon()}
                </div>
            </div>

            <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground mb-3">
                {getErrorTitle()}
            </h2>

            <p className="text-base text-muted-foreground mb-10 max-w-sm leading-relaxed">
                {errorMessage}
            </p>

            <div className="flex flex-col sm:flex-row gap-3 w-full max-w-xs">
                {canContinueGame && (
                    <motion.button
                        onClick={() => router.push('/game')}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(buttonVariants({ variant: "default", size: "lg" }), "flex-1 h-10")}
                    >
                        <Gamepad2 className="w-4 h-4" />
                        <span className="text-sm">Continue Game</span>
                    </motion.button>
                )}

                <motion.button
                    onClick={() => router.push('/')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(buttonVariants({ variant: "outline", size: "lg" }), "flex-1 h-10")}
                >
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Go Home</span>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default ResultErrorScreen