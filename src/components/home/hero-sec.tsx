'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { ChevronDown, Play } from 'lucide-react';
import { DRIFTING_ZONES } from '@/constants/home-statics-data';
import { cn } from '@/lib/utils';

import Character from '../game/character';
import { Button } from '@/components/ui/button';


const HeroSection: React.FC = () => {
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
                    { label: "START GAME", variant: "default" as const, onClick: () => console.log(true) },
                    {
                        label: "HOW TO PLAY",
                        variant: "outline" as const,
                        onClick: () =>
                        document.getElementById("how-to-play")?.scrollIntoView({ behavior: "smooth" }),
                    },
                    { label: "ABOUT", variant: "ghost" as const, onClick: () => console.log({ to: "/" }) },
                ].map((b) => (
                    <Button
                        key={b.label}
                        asChild
                        variant={b.variant}
                        className={cn(
                            "w-full rounded-xl tracking-wide overflow-hidden h-auto group gap-0",
                            b.variant === "default" 
                                ? "py-4 text-base font-bold shadow-md relative"
                                : b.variant === "ghost" ? "py-3 text-sm font-semibold" : "py-4 text-base font-bold border-2"
                        )}
                    >
                        <motion.button
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
                            <span className="relative z-10">{b.label}</span>
                            {b.variant === "default" && (
                                <motion.span
                                    aria-hidden
                                    className="absolute inset-y-0 w-1/3 pointer-events-none"
                                    style={{
                                    background:
                                        "linear-gradient(110deg, transparent 30%, rgba(255,255,255,0.45) 50%, transparent 70%)",
                                    }}
                                    initial={{ x: "-150%" }}
                                    animate={{ x: "350%" }}
                                    transition={{ duration: 2.4, repeat: Infinity, ease: "easeInOut", repeatDelay: 0.6 }}
                                />
                            )}
                        </motion.button>
                    </Button>
                ))}
            </motion.div>

            <motion.div
                className="absolute bottom-6 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-primary"
                animate={{ y: [0, 8, 0] }}
                transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
            >
                <span className="text-[10px] font-bold tracking-[0.2em]">
                SCROLL
                </span>
                <ChevronDown stroke='currentColor' />
            </motion.div>
        </section>
    )
}

export default HeroSection