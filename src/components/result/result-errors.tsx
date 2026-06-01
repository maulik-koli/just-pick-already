'use client'
import React from "react";
import { useRouter } from "next/navigation";
import { motion } from "framer-motion";
import { useGameStore } from "@/store";
import { AlertTriangle, Gamepad2, Home, SearchX, ServerCrash } from "lucide-react";

interface ResultErrorScreenProps {
    error: { code?: string; message?: string } | null
    sessionId: string | null
}


const ResultErrorScreen: React.FC<ResultErrorScreenProps> = ({ error, sessionId }) => {
    const router = useRouter()
    const hasGameData = useGameStore((s) => s.hasGameData)
    const storedSessionId = useGameStore((s) => s.sessionId)

    const errorMessage = error?.message || "Something went wrong"

    // Determine error type from message content
    const isSessionNotFound = errorMessage.toLowerCase().includes("session not found")
    const isResultNotFound = errorMessage.toLowerCase().includes("unfinished") ||
        errorMessage.toLowerCase().includes("result") && errorMessage.toLowerCase().includes("not found")

    // Show redirect to /game only if result not found AND user has game data on this device
    // AND the stored session matches the requested session
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
                        className="flex-1 h-12 inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all bg-primary text-primary-foreground hover:bg-primary/90 shadow-[0_4px_12px_rgba(244,98,58,0.2)] cursor-pointer"
                    >
                        <Gamepad2 className="w-4 h-4" />
                        <span className="text-sm">Continue Game</span>
                    </motion.button>
                )}

                <motion.button
                    onClick={() => router.push('/')}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className="flex-1 h-12 inline-flex items-center justify-center gap-2 font-bold rounded-xl transition-all bg-card border-2 border-border text-foreground hover:bg-secondary hover:border-primary/50 cursor-pointer"
                >
                    <Home className="w-4 h-4" />
                    <span className="text-sm">Go Home</span>
                </motion.button>
            </div>
        </motion.div>
    )
}

export default ResultErrorScreen