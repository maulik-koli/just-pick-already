'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Reveal, SectionHeader } from '../common'


const EndCardSection: React.FC = () => {
    return (
        <section className="px-4 py-24" style={{ backgroundColor: "#F7F2EC" }}>
            <div className="max-w-3xl mx-auto">
                <Reveal>
                    <SectionHeader
                        label='[ BEFORE YOU GO ]'
                    />
                </Reveal>
                <Reveal delay={0.05}>
                    <h2 className="text-center font-black tracking-tight text-3xl sm:text-5xl md:text-6xl mt-4 text-foreground leading-[1.15]">
                        You have been making choices your whole life.
                        <br />
                        <span className="text-primary">Time to find out what they say about you.</span>
                    </h2>
                </Reveal>

                <Reveal delay={0.15}>
                    <div className="relative h-[300px] flex items-center justify-center mt-14">
                        <motion.div
                            initial={{ rotate: -6, y: 10, opacity: 0 }}
                            whileInView={{ rotate: -5, y: 0, opacity: 1 }}
                            viewport={{ once: true, margin: "-80px" }}
                            transition={{ type: "spring", stiffness: 180, damping: 20 }}
                            whileHover={{ rotate: 0, y: -8, scale: 1.03 }}
                            className="relative w-[240px] h-[300px] rounded-2xl border shadow-2xl overflow-hidden bg-primary border-secondary-foreground"
                            style={{
                                backgroundImage:
                                "repeating-linear-gradient(45deg, rgba(255,255,255,0.06) 0 8px, transparent 8px 16px), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.15), transparent 50%)",
                            }}
                        >

                            <div
                                className="absolute inset-3 rounded-xl border-2 flex flex-col items-center justify-center"
                                style={{ borderColor: "rgba(255,255,255,0.35)" }}
                            >
                                <div
                                    className="text-[9px] font-black tracking-[0.3em] mb-3"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    JUST PICK
                                </div>
                                <div
                                    className="text-5xl font-black"
                                    style={{ color: "rgba(255,255,255,0.95)", WebkitTextStroke: "1px rgba(0,0,0,0.15)" }}
                                >
                                    ?
                                </div>
                                <div
                                    className="text-[9px] font-black tracking-[0.3em] mt-3"
                                    style={{ color: "rgba(255,255,255,0.7)" }}
                                >
                                    ALREADY
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </Reveal>

                <Reveal delay={0.25}>
                    <p className="text-center mt-6 text-sm text-muted-foreground">
                        Yours is generated at the end
                    </p>
                </Reveal>
            </div>
        </section>
    )
}

export default EndCardSection