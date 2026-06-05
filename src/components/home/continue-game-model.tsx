'use client'
import React from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { Astroid, Gamepad2, RotateCcw } from 'lucide-react'
import { useGameStore } from '@/store'
import { constGameProgress, cn } from '@/lib/utils'
import { buttonVariants } from '@/components/ui/button'

import { useGetSession } from '@/hooks/api/query'

interface ContinueGameModelProps {
    open: boolean
    onClose: () => void
    onStartNew: () => void
}

const ContinueGameModel: React.FC<ContinueGameModelProps> = ({ open, onClose, onStartNew }) => {
    const router = useRouter()
    const answers = useGameStore(state => state.answers)
    const sessionId = useGameStore(state => state.sessionId)

    const { isLoading, data, error, refetch } = useGetSession(open ? sessionId : null);

    const pct = constGameProgress(answers.length);

    const ringSize = 100;
    const ringStroke = 8;
    const ringRadius = (ringSize - ringStroke) / 2;
    const ringCirc = 2 * Math.PI * ringRadius;
    const ringOffset = ringCirc * (1 - pct / 100);

    const handleContinue = () => {
        onClose();
        router.push('/game');
    }

    const handleNewGame = () => {
        onClose();
        onStartNew();
    }

    const isCompleted = data?.data?.isComplete

    const getMessageData = () => {
        const messageData: {
            title: string,
            message: string,
            buttonText: string
        } = {
            title: 'Continue Game?',
            message: 'We found an existing game session. Do you want to pick up where you left off or start a brand new game?',
            buttonText: 'Continue Game',
        }
        if (pct === 100) {
            if (!isCompleted) {
                messageData.title = 'Almost Done!';
                messageData.message = 'You have finished selecting all answers but have yet to submit and generate your final result.';
                messageData.buttonText = 'Submit Answers';
            } else {
                messageData.title = 'Game Completed!';
                messageData.message = 'You have already submitted your answers and your result has been generated.';
                messageData.buttonText = 'View Result';
            }
        }

        return messageData;
    }

    const getContent = () => {
        if (isLoading) {
            return (
                <div className="flex flex-col items-center justify-center py-10">
                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                    <p className="text-sm text-muted-foreground font-medium animate-pulse">Checking session...</p>
                </div>
            )
        }

        if (error) {
            return <ErrorBlock
                handleNewGame={handleNewGame}
                handleRetry={() => refetch()}
                message='Oops! Failed to load your session'
            />
        }

        if (!data?.data) {
            return <ErrorBlock
                handleNewGame={handleNewGame}
                message='No session data was found.'
            />
        }

        return (
            <>
                <div className="relative mb-6" style={{ width: ringSize, height: ringSize }}>
                    <svg width={ringSize} height={ringSize} className="-rotate-90 drop-shadow-md">
                        <circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={ringRadius}
                            fill="none"
                            stroke="rgba(255,255,255,0.15)"
                            strokeWidth={ringStroke}
                        />
                        <motion.circle
                            cx={ringSize / 2}
                            cy={ringSize / 2}
                            r={ringRadius}
                            fill="none"
                            stroke="#F4623A"
                            strokeWidth={ringStroke}
                            strokeLinecap="round"
                            strokeDasharray={ringCirc}
                            initial={false}
                            animate={{ strokeDashoffset: ringOffset }}
                            transition={{ type: "spring", damping: 24, stiffness: 160 }}
                        />
                    </svg>
                    <div className="absolute inset-0 flex items-center justify-center text-foreground font-bold text-2xl">
                        {pct}%
                    </div>
                </div>

                <h2 className="text-2xl font-black leading-tight text-foreground mb-3">
                    {getMessageData().title}
                </h2>
                <p className="text-sm text-muted-foreground mb-8">
                    {getMessageData().message}
                </p>

                <div className="w-full flex flex-col gap-3">
                    <motion.button
                        onClick={handleContinue}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(buttonVariants({ variant: "default" }), "w-full h-14 gap-2 font-bold rounded-[0.875rem]")}
                    >
                        <Gamepad2 className="w-5 h-5" />
                        <span className="text-base">{getMessageData().buttonText}</span>
                    </motion.button>

                    <motion.button
                        onClick={handleNewGame}
                        whileHover={{ y: -2 }}
                        whileTap={{ scale: 0.98 }}
                        className={cn(buttonVariants({ variant: "outline" }), "w-full h-14 gap-2 font-bold rounded-[0.875rem]")}
                    >
                        <RotateCcw className="w-5 h-5" />
                        <span className="text-base">Start New Game</span>
                    </motion.button>
                </div>
            </>
        )
    }

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.92, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 24, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full dot-texture overflow-hidden bg-card rounded-[1.25rem] border border-border"
                        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15)", maxWidth: 560 }}
                    >
                        <div className="w-full py-2.5 flex items-center justify-center bg-secondary">
                            <span className="text-[11px] font-bold uppercase text-primary tracking-[0.22em] flex gap-2 items-center">
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                                Session Found
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                            </span>
                        </div>

                        <div className="px-7 pt-8 pb-7 flex flex-col items-center text-center">
                            {getContent()}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ContinueGameModel

function ErrorBlock({ message, handleNewGame, handleRetry }: { message: string, handleNewGame: () => void, handleRetry?: () => void }) {
    return (
        <div className="flex flex-col items-center justify-center py-10 w-full gap-3">
            <p className="text-sm text-destructive font-medium mb-3">{message}</p>

            {handleRetry && (
                <motion.button
                    onClick={handleRetry}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.98 }}
                    className={cn(buttonVariants({ variant: "default" }), "w-full h-12 gap-2 font-bold rounded-[0.875rem]")}
                >
                    <RotateCcw className="w-5 h-5" />
                    <span className="text-sm">Try Again</span>
                </motion.button>
            )}

            <motion.button
                onClick={handleNewGame}
                whileHover={{ y: -2 }}
                whileTap={{ scale: 0.98 }}
                className={cn(buttonVariants({ variant: "outline" }), "w-full h-12 gap-2 font-bold rounded-[0.875rem]")}
            >
                <RotateCcw className="w-5 h-5" />
                <span className="text-sm">Start New Game</span>
            </motion.button>
        </div>
    )
}