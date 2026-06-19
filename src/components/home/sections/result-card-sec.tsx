'use client'
import React from 'react'
import { motion } from 'framer-motion';
import Image from 'next/image';
import { PERSONAS } from '@/constants/home-statics-data';
import { Reveal, SectionHeader } from '@/components/home/common';


const ResultCardSection: React.FC = () => {
    return (
        <section className="px-4 py-20 bg-muted">
            <div className="max-w-6xl mx-auto">
                <Reveal>
                    <SectionHeader
                        label='YOUR RESULT'
                        title='Everyone gets a read. No one gets the same one.'
                    />
                </Reveal>

                <Reveal delay={0.1}>
                    <div className="relative h-[340px] sm:h-[380px] flex items-center justify-center group max-md:scale-[0.85] max-sm:scale-[0.70]">
                        <motion.div
                            className="absolute -top-16 -right-4 sm:-top-24 sm:-right-12 z-0 opacity-90"
                            initial={{ y: 20, opacity: 0, rotate: -10 }}
                            animate={{ y: [0, -10, 0], opacity: 1, rotate: [10, 5, 10] }}
                            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Image 
                                src="/mascot_3.webp" 
                                alt="Mascot" 
                                width={180} 
                                height={180} 
                                className="object-contain drop-shadow-2xl" 
                            />
                        </motion.div>
                        {PERSONAS.map((p, i) => {
                            const offset = (i - (PERSONAS.length - 1) / 2) * 90;
                            return (
                                <motion.div
                                    key={p.title}
                                    className="absolute w-[260px] sm:w-[280px] rounded-2xl p-5 border shadow-lg cursor-default bg-card border-border border-t-[3px] border-t-primary"
                                    initial={{ rotate: p.rot, x: offset * 0.4 }}
                                    whileHover={{ y: -16, rotate: p.rot, zIndex: 20, scale: 1.04 }}
                                    animate={{ rotate: p.rot, x: offset }}
                                    transition={{ type: "spring", stiffness: 200, damping: 22 }}
                                >
                                <div className="text-[10px] font-bold tracking-[0.2em] mb-2 text-primary">
                                    PROFILE
                                </div>
                                <h3 className="font-black text-lg leading-tight mb-3 text-primary">
                                    {p.title}
                                </h3>
                                <div className="flex flex-wrap gap-1.5">
                                    {p.traits.map((t) => (
                                        <span
                                            key={t}
                                            className="text-[11px] font-semibold px-2 py-1 rounded-full bg-accent text-accent-foreground"
                                        >
                                            {t}
                                        </span>
                                    ))}
                                </div>
                                <div className="mt-4 pt-3 border-t text-[11px] border-border text-muted-foreground">
                                    Tap to discover yours →
                                </div>
                                </motion.div>
                            );
                        })}
                    </div>
                </Reveal>

                <Reveal delay={0.2}>
                    <p className="text-center mt-10 text-sm text-muted-foreground">
                        25 questions. 5 zones. One surprisingly accurate profile.
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

export default ResultCardSection