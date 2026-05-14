'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { PREVIEW_CARDS } from '@/constants/home-statics-data'
import { Reveal, SectionHeader } from './common'


const PreviewSections: React.FC = () => {
    return (
        <section className="py-20 bg-foreground overflow-hidden">
            <div className="max-w-6xl mx-auto px-4">
                <Reveal className='mb-12'>
                    <SectionHeader
                        label='[ WHAT AWAITS ]'
                        title="These are not hypotheticals. These are you."
                        titleClass='text-background'
                    />
                </Reveal>
            </div>
            <div className="relative w-full mt-8">
                <div className="flex overflow-hidden">
                    <motion.div
                        className="flex gap-5 pr-5 w-max"
                        animate={{ x: ["0%", "-50%"] }}
                        transition={{
                            duration: 40,
                            ease: "linear",
                            repeat: Infinity,
                        }}
                    >
                        {[...PREVIEW_CARDS, ...PREVIEW_CARDS].map((c, i) => (
                            <div key={i} className="shrink-0 w-[300px] sm:w-[340px]">
                                <div className="rounded-2xl border shadow-lg overflow-hidden h-full bg-card border-border">
                                    <div className="h-1.5 w-full" style={{ backgroundColor: c.accent }} />
                                    <div className="p-5">
                                        <div className="text-[10px] font-bold tracking-[0.2em] mb-3 text-muted-foreground">
                                            {c.zone.toUpperCase()}
                                        </div>
                                        <p className="font-bold text-base leading-snug mb-5 text-foreground">
                                            {c.q}
                                        </p>
                                        <div className="space-y-2">
                                            {[0, 1, 2].map((n) => (
                                                <div
                                                    key={n}
                                                    className="h-8 rounded-lg flex items-center px-3 border border-border bg-muted"
                                                >
                                                    <div
                                                        className="h-2 rounded-full "
                                                        style={{
                                                            width: `${55 + n * 10}%`,
                                                            backgroundColor: "#E5DCD0",
                                                            filter: "blur(2.5px)",
                                                        }}
                                                    />
                                                </div>
                                            ))}
                                        </div>
                                        <div className="mt-4 text-[11px] font-medium text-center text-muted-foreground">
                                            Your choice shapes your profile
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>
                <div
                    className="pointer-events-none absolute top-0 left-0 bottom-0 w-24 sm:w-48 z-10"
                    style={{ background: "linear-gradient(to right, #1A1A1A, transparent)" }}
                />
                <div
                    className="pointer-events-none absolute top-0 right-0 bottom-0 w-24 sm:w-48 z-10"
                    style={{ background: "linear-gradient(to left, #1A1A1A, transparent)" }}
                />
            </div>
        </section>
    )
}

export default PreviewSections