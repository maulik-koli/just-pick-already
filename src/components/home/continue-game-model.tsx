'use client'
import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { Astroid, Gamepad2, RotateCcw } from 'lucide-react'
import { useGameStore } from '@/store'
import { constGameProgress } from '@/lib/utils'

interface ContinueGameModelProps {
    open: boolean
    onClose: () => void
    onStartNew: () => void
}


const ContinueGameModel: React.FC<ContinueGameModelProps> = ({ open, onClose, onStartNew }) => {
    const router = useRouter()
    const answers = useGameStore(state => state.answers)
    const sessionId = useGameStore(state => state.sessionId)
    const setIsCompleted = useGameStore(state => state.setIsCompleted)
    const isCompleted = useGameStore(state => state.isCompleted)

    const [isLoading, setIsLoading] = useState(true)

    useEffect(() => {
        if (!open || !sessionId) return;
        
        const checkSession = async () => {
            try {
                setIsLoading(true);
                const res = await fetch(`/api/session/${sessionId}`);
                if (res.ok) {
                    const data = await res.json();
                    if (data.success && data.data) {
                        setIsCompleted(data.data.completed);
                    }
                }
            } catch (err) {
                console.error("Failed to fetch session status", err);
            } finally {
                setIsLoading(false);
            }
        };

        checkSession();
    }, [open, sessionId, setIsCompleted]);
    
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
                        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15)", maxWidth: 420 }}
                    >
                        <div className="w-full py-2.5 flex items-center justify-center bg-secondary">
                            <span className="text-[11px] font-bold uppercase text-primary tracking-[0.22em] flex gap-2 items-center">
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                                Session Found
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                            </span>
                        </div>

                        <div className="px-7 pt-8 pb-7 flex flex-col items-center text-center">
                            
                            {isLoading ? (
                                <div className="flex flex-col items-center justify-center py-10">
                                    <div className="w-8 h-8 border-4 border-primary/30 border-t-primary rounded-full animate-spin mb-4" />
                                    <p className="text-sm text-muted-foreground font-medium animate-pulse">Checking session...</p>
                                </div>
                            ) : (
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
                                        {isCompleted ? "Almost Done!" : "Continue Game?"}
                                    </h2>
                                    <p className="text-sm text-muted-foreground mb-8">
                                        {isCompleted 
                                            ? "You have selected all your answers but haven't generated your final result yet." 
                                            : "We found an existing game session. Do you want to pick up where you left off or start a brand new game?"}
                                    </p>

                                    <div className="w-full flex flex-col gap-3">
                                        <motion.button
                                            onClick={handleContinue}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full h-14 inline-flex items-center justify-center gap-2 font-bold relative overflow-hidden rounded-[0.875rem] transition-shadow shadow-[0_4px_12px_rgba(244,98,58,0.2)] bg-primary text-primary-foreground hover:bg-primary/90"
                                        >
                                            <Gamepad2 className="w-5 h-5" />
                                            <span className="text-base relative z-10">Continue Game</span>
                                        </motion.button>
                                        
                                        <motion.button
                                            onClick={handleNewGame}
                                            whileHover={{ y: -2 }}
                                            whileTap={{ scale: 0.98 }}
                                            className="w-full h-14 inline-flex items-center justify-center gap-2 font-bold relative overflow-hidden rounded-[0.875rem] transition-all bg-card border-2 border-border text-foreground hover:bg-secondary hover:border-primary/50"
                                        >
                                            <RotateCcw className="w-5 h-5" />
                                            <span className="text-base relative z-10">Start New Game</span>
                                        </motion.button>
                                    </div>
                                </>
                            )}
                        </div>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ContinueGameModel
