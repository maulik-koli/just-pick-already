'use client'
import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { RESULT_LOADER_LINES } from '@/constants/result-data'
import Character from '../game/character'


const ResultLoadingScreen: React.FC = () => {
    const [lineIdx, setLineIdx] = useState(0)
    const [progress, setProgress] = useState(0)

    useEffect(() => {
        const msgTimer = setInterval(() => {
            setLineIdx((i) => (i + 1) % RESULT_LOADER_LINES.length)
        }, 2200)

        const progressTimer = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 0.6))
        }, 80)

        return () => {
            clearInterval(msgTimer)
            clearInterval(progressTimer)
        }
    }, [])

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center min-h-[60vh] w-full max-w-lg mx-auto"
        >
            <motion.div
                className="mb-10"
                animate={{ y: [0, -6, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
            >
                <div style={{ transform: "scale(1.8)", transformOrigin: "center bottom" }}>
                    <Character isMoving={true} facing="right" duration={1} />
                </div>
            </motion.div>

            <div className="w-full max-w-[320px] mb-6">
                <div className="h-3 w-full rounded-full overflow-hidden border-2 border-border bg-card shadow-inner">
                    <motion.div
                        className="h-full bg-primary rounded-full"
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.1 }}
                    />
                </div>
                <p className="text-right text-[11px] text-muted-foreground mt-1.5 font-bold tracking-wider">
                    {Math.round(progress)}%
                </p>
            </div>


            <AnimatePresence mode="wait">
                <motion.p
                    key={lineIdx}
                    initial={{ opacity: 0, y: 8 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -8 }}
                    transition={{ duration: 0.35 }}
                    className="text-muted-foreground text-sm font-medium text-center"
                >
                    {RESULT_LOADER_LINES[lineIdx]}
                </motion.p>
            </AnimatePresence>

            <div className="flex gap-2 mt-8">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-2 h-2 rounded-full bg-primary/40"
                        animate={{ scale: [1, 1.4, 1], opacity: [0.4, 1, 0.4] }}
                        transition={{ duration: 1.2, repeat: Infinity, delay: i * 0.2 }}
                    />
                ))}
            </div>
        </motion.div>
    )
}

export default ResultLoadingScreen