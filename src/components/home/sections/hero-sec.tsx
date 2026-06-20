'use client'
import React from 'react'
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';

import { useHandleStart } from '@/hooks/use-handle-start';
import { DRIFTING_ZONES, MASCOT_CHARACTER } from '@/constants/home-statics-data';
import { cn } from '@/lib/utils';

import Character from '@/components/game/character';
import { ShinyButton } from '@/components/ui/shiny-button';
import { ChevronDown, Play } from 'lucide-react';


const HeroSection: React.FC = () => {
    const router = useRouter()
    const { handleStartGame } = useHandleStart()

    return (
        <section className="relative min-h-screen flex flex-col items-center justify-center px-4 py-16 overflow-hidden">
            <div className={cn(
                "absolute inset-0 pointer-events-none",
                "bg-[radial-gradient(ellipse_600px_400px_at_center_45%,var(--color-secondary))_0%,transparent_70%]"
            )} />

            <div className="absolute inset-0 pointer-events-none overflow-hidden">
                {DRIFTING_ZONES.map((g, i) => (
                    <motion.div
                        key={i}
                        className="absolute font-black text-foreground text-2xl sm:text-4xl whitespace-nowrap select-none opacity-15"
                        style={{
                            ...g,
                            fontFamily: "system-ui, -apple-system, sans-serif",
                        }}
                        animate={{ y: [0, -20, 0], x: [0, 10, 0] }}
                        transition={{ duration: g.dur, repeat: Infinity, ease: "easeInOut" }}
                    >
                        {g.text}
                    </motion.div>
                ))}
            </div>

            {MASCOT_CHARACTER.map((m, i) => (
                <motion.div
                    key={i}
                    className={cn("pointer-events-none opacity-40 md:opacity-80 z-0", m.className)}
                    animate={{ y: [-15, 15, -15], rotate: m.rot }}
                    transition={{ duration: m.duration, delay: m.delay, repeat: Infinity, ease: "easeInOut" }}
                >
                    <img src={m.src} alt={`Mascot ${i}`} className="w-full h-auto object-contain drop-shadow-2xl" />
                </motion.div>
            ))}

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="relative mb-4"
                style={{ transform: "scale(2)" }}
            >
                <Character isMoving={true} facing="right" duration={1.2} />
            </motion.div>

            <motion.h1
                initial={{ opacity: 0, y: 24 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.25, duration: 0.6 }}
                className="relative text-center font-black tracking-tight leading-[0.9] text-5xl sm:text-7xl md:text-8xl mt-6 text-primary"
                style={{
                    fontFamily: "system-ui, -apple-system, sans-serif",
                    WebkitTextStroke: "1.5px #1A1A1A",
                    textShadow: "4px 4px 0 rgba(26,26,26,0.08)",
                }}
            >
                JUST PICK
                <br />
                ALREADY
            </motion.h1>

            <motion.p
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.45 }}
                className="relative mt-5 text-base sm:text-lg italic font-light text-center text-muted-foreground"
            >
                Stop overthinking. Just pick already.
            </motion.p>

            <motion.div
                initial="hidden"
                animate="show"
                variants={{ hidden: {}, show: { transition: { staggerChildren: 0.1, delayChildren: 0.6 } } }}
                className="relative mt-10 flex flex-col items-stretch gap-3 w-full max-w-xs"
            >
                {[
                    { label: "START GAME", variant: "default" as const, onClick: handleStartGame },
                    {
                        label: "HOW TO PLAY",
                        variant: "outline" as const,
                        onClick: () =>
                            document.getElementById("how-to-play")?.scrollIntoView({ behavior: "smooth" }),
                    },
                    { label: "ABOUT", variant: "ghost" as const, onClick: () => router.push("/about") },
                ].map((b) => (
                    <ShinyButton
                        key={b.label}
                        variant={b.variant}
                        hideShiny={b.variant !== "default"}
                        className={cn(
                            "w-full rounded-xl tracking-wide h-auto group gap-0",
                            b.variant === "default"
                                ? "py-4 text-base font-bold shadow-md"
                                : b.variant === "ghost" ? "py-3 text-sm font-semibold" : "py-4 text-base font-bold border-2"
                        )}
                        variants={{ hidden: { opacity: 0, y: 16 }, show: { opacity: 1, y: 0 } }}
                        onClick={b.onClick}
                        whileHover="hover"
                        initial="rest"
                        animate="rest"
                    >
                        <motion.span
                            variants={{ rest: { opacity: 0, width: 0, marginRight: 0 }, hover: { opacity: 1, width: 20, marginRight: 8 } }}
                            transition={{ duration: 0.2 }}
                            className="inline-flex items-center overflow-hidden shrink-0"
                        >
                            <motion.span variants={{ rest: { x: -6 }, hover: { x: 0 } }} transition={{ duration: 0.2 }}>
                                <Play fill='currentColor' strokeWidth={2} className='w-5 h-5 shrink-0 opacity-80' />
                            </motion.span>
                        </motion.span>
                        <span>{b.label}</span>
                    </ShinyButton>
                ))}
            </motion.div>

            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center  text-primary"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[8px] font-bold tracking-[0.2em]">
                    SCROLL
                </span>
                <ChevronDown stroke='currentColor' className='size-4' />
            </motion.div>
        </section>
    )
}

export default HeroSection