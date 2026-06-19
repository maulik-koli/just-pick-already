'use client'
import { useEffect, useState } from "react"
import { AnimatePresence, motion } from "framer-motion"
import Character from "@/components/game/character"
import Image from "next/image"

interface FullScreenLoaderProps {
    lines?: string[]
}


const FullScreenLoader: React.FC<FullScreenLoaderProps> = ({ lines }) => {
    const [lineIdx, setLineIdx] = useState(0)
    const [progress, setProgress] = useState(0)
    const [mascotId, setMascotId] = useState(1)

    useEffect(() => {
        const msgTimer = setInterval(() => {
            if (lines && lines.length > 0) {
                setLineIdx((i) => (i + 1) % lines.length)
                setMascotId(Math.floor(Math.random() * 6) + 1)
            }
        }, 2400)

        const progressTimer = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 0.5))
        }, 80)

        return () => {
            clearInterval(msgTimer)
            clearInterval(progressTimer)
        }
    }, [lines])


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-background/80 backdrop-blur-xl"
        >
        <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_500px_400px_at_center,var(--color-primary)/0.06,transparent_70%)]" />

        <div className="absolute inset-0 pointer-events-none overflow-hidden">
            {[...Array(6)].map((_, i) => (
                <motion.div
                    key={i}
                    className="absolute w-1 h-1 rounded-full bg-primary/30"
                    style={{
                        left: `${20 + i * 12}%`,
                        top: `${30 + (i % 3) * 15}%`,
                    }}
                    animate={{
                        y: [0, -30, 0],
                        opacity: [0.2, 0.6, 0.2],
                        scale: [1, 1.5, 1],
                    }}
                    transition={{
                        duration: 3 + i * 0.4,
                        repeat: Infinity,
                        delay: i * 0.3,
                        ease: "easeInOut",
                    }}
                />
            ))}
        </div>

        <div className="relative flex flex-col items-center px-6 max-w-md w-full">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ delay: 0.1, type: "spring", stiffness: 200, damping: 20 }}
                className="mb-10"
            >
                <motion.div
                    animate={{ y: [0, -8, 0] }}
                    transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
                >
                    <div style={{ transform: "scale(2)", transformOrigin: "center bottom" }}>
                        <Character isMoving={true} facing="right" duration={0.8} />
                    </div>
                </motion.div>
            </motion.div>

            <div className="w-full max-w-[300px] mb-3">
                <div className="h-2.5 w-full rounded-full overflow-hidden border border-border bg-card shadow-inner">
                    <motion.div
                        className="h-full rounded-full"
                        style={{
                            background: "linear-gradient(90deg, var(--color-primary), var(--color-accent, var(--color-primary)))"
                        }}
                        initial={{ width: 0 }}
                        animate={{ width: `${progress}%` }}
                        transition={{ duration: 0.15, ease: "linear" }}
                    />
                </div>
            </div>

            <motion.p
                className="text-xs font-bold text-muted-foreground tracking-widest mb-6 tabular-nums"
                animate={{ opacity: [0.5, 1, 0.5] }}
                transition={{ duration: 2, repeat: Infinity }}
            >
                {Math.round(progress)}%
            </motion.p>

            {lines && lines.length > 0 && (
                <div className="absolute bottom-8 left-1/2 -translate-x-1/2 w-[calc(100%-3rem)] max-w-sm flex justify-center z-50">
                    <AnimatePresence mode="wait">
                        <motion.div
                            key={lineIdx}
                            initial={{ opacity: 0, scale: 0.95, y: 10 }}
                            animate={{ opacity: 1, scale: 1, y: 0 }}
                            exit={{ opacity: 0, scale: 0.95, y: -10 }}
                            transition={{ duration: 0.35, type: "spring", stiffness: 200, damping: 20 }}
                            className="flex items-center gap-4 bg-card/80 backdrop-blur-sm border-2 border-primary/20 p-4 rounded-2xl shadow-xl max-w-sm w-full"
                        >
                            <div className="relative w-16 h-16 shrink-0 rounded-xl overflow-hidden bg-primary/10 border border-primary/20 flex items-center justify-center">
                                <Image 
                                    src={`/mascot_${mascotId}.webp`} 
                                    alt="Guide Mascot" 
                                    width={64} 
                                    height={64} 
                                    className="object-contain drop-shadow-md"
                                />
                            </div>
                            <div className="flex-1">
                                <p className="text-sm font-semibold text-foreground leading-snug">
                                    {lines[lineIdx]}
                                </p>
                            </div>
                        </motion.div>
                    </AnimatePresence>
                </div>
            )}

            <div className="flex gap-1.5 mt-8">
                {[0, 1, 2].map((i) => (
                    <motion.div
                        key={i}
                        className="w-1.5 h-1.5 rounded-full bg-primary/50"
                        animate={{
                            scale: [1, 1.6, 1],
                            opacity: [0.3, 1, 0.3],
                        }}
                        transition={{
                            duration: 1,
                            repeat: Infinity,
                            delay: i * 0.15,
                            ease: "easeInOut",
                        }}
                    />
                ))}
            </div>
        </div>
        </motion.div>
    )
}

export default FullScreenLoader
