'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useRouter } from 'next/navigation'
import { AlertCircle, Home, RotateCcw } from 'lucide-react'
import { useApiUiStore } from '@/store'
import { buttonVariants } from '@/components/ui/button'
import { cn } from '@/lib/utils'

const NoGameData: React.FC = () => {
    const router = useRouter()
    const toggleModal = useApiUiStore(state => state.toggleModal)

    const handleStartNew = () => {
        // Set the modal state to open, then route to the home page
        // Since Next.js does a soft navigation, the Zustand state will persist
        // and the modal will be open when the home page renders!
        toggleModal('openOnbordingModel', true)
        router.push('/')
    }

    const handleGoHome = () => {
        router.push('/')
    }

    return (
        <div className="min-h-screen flex items-center justify-center bg-background p-4 relative overflow-hidden">
            {/* Background elements */}
            <div className="absolute inset-0 pointer-events-none bg-[radial-gradient(ellipse_600px_400px_at_center_45%,var(--color-secondary))_0%,transparent_70%]" />

            <motion.div
                initial={{ scale: 0.92, y: 20, opacity: 0 }}
                animate={{ scale: 1, y: 0, opacity: 1 }}
                transition={{ type: "spring", damping: 24, stiffness: 280 }}
                className="w-full relative z-10 dot-texture overflow-hidden bg-card rounded-[1.25rem] border border-border shadow-[0_25px_60px_rgba(0,0,0,0.15)] max-w-md mx-auto"
            >
                <div className="w-full py-2.5 flex items-center justify-center bg-destructive/10 border-b border-border">
                    <span className="text-[11px] font-bold uppercase text-destructive tracking-[0.22em] flex gap-2 items-center">
                        <AlertCircle fill='currentColor' className='size-3 mb-0.5' />
                        Data Missing
                        <AlertCircle fill='currentColor' className='size-3 mb-0.5' />
                    </span>
                </div>

                <div className="px-7 pt-10 pb-8 flex flex-col items-center text-center">
                    <h2 className="text-3xl font-black leading-tight text-foreground mb-3" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        NO ACTIVE GAME
                    </h2>
                    <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
                        We couldn't find your game session. You might have refreshed the page or haven't started a game yet.
                    </p>

                    <div className="w-full flex flex-col gap-3">
                        <motion.button
                            onClick={handleStartNew}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(buttonVariants({ variant: "default" }), "w-full h-14 gap-2 font-bold rounded-[0.875rem]")}
                        >
                            <RotateCcw className="w-5 h-5" />
                            <span className="text-base">Start New Game</span>
                        </motion.button>

                        <motion.button
                            onClick={handleGoHome}
                            whileHover={{ y: -2 }}
                            whileTap={{ scale: 0.98 }}
                            className={cn(buttonVariants({ variant: "outline" }), "w-full h-14 gap-2 font-bold rounded-[0.875rem]")}
                        >
                            <Home className="w-5 h-5" />
                            <span className="text-base">Return to Home</span>
                        </motion.button>
                    </div>
                </div>
            </motion.div>
        </div>
    )
}

export default NoGameData
