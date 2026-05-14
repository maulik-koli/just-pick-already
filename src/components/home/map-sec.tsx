'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { MAP_ZONES } from '@/constants/home-statics-data'
import { cn } from '@/lib/utils'

import Character from '../game/character'
import { Reveal, SectionHeader } from './common'
import { MapLine } from '../icons/custom'


const MapSection: React.FC = () => {
    return (
        <section className="px-4 py-20 bg-muted">
            <div className="max-w-6xl mx-auto">
                <Reveal className='mb-12'>
                    <SectionHeader
                        label='THE MAP'
                        title='Walk through the choices that define you'
                    />
                </Reveal>
                <Reveal delay={0.1}>
                    <div
                        className="relative w-full h-115 rounded-3xl border-2 overflow-hidden map-dot-bg"
                        style={{
                            borderColor: "#D9CFC0",
                            boxShadow: "inset 0 4px 24px rgba(101,80,50,0.10), inset 0 -4px 16px rgba(101,80,50,0.06)",
                        }}
                    >
                        <MapLine />

                        {MAP_ZONES.map((z) => (
                            <motion.div
                                key={z.name}
                                className={cn(
                                    "group absolute rounded-2xl border shadow-md flex items-center justify-center text-center px-3 cursor-default",
                                    z.zone_color
                                )}
                                style={{
                                    top: z.top,
                                    left: z.left,
                                    width: z.w,
                                    height: z.h,
                                    borderColor: "rgba(26,26,26,0.10)",
                                    transform: `rotate(${z.rot}deg)`,
                                }}
                                whileHover={{ y: -6, scale: 1.04, zIndex: 30, rotate: 0 }}
                                transition={{ type: "spring", stiffness: 280, damping: 20 }}
                            >
                                <span className="font-black text-xs sm:text-sm leading-tight text-foreground">
                                    {z.name}
                                </span>
                                <div
                                    className="absolute bg-foreground text-background -bottom-2 left-1/2 -translate-x-1/2 translate-y-full opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none whitespace-nowrap rounded-md px-2.5 py-1.5 text-[11px] font-medium shadow-lg z-40"
                                >
                                    {z.line}
                                </div>
                            </motion.div>
                        ))}

                        <div className="absolute top-[72%] left-[5%]">
                        <motion.div
                            animate={{ y: [0, -4, 0] }}
                            transition={{ duration: 1.8, repeat: Infinity, ease: "easeInOut" }}
                        >
                            <Character isMoving={false} facing="right" />
                        </motion.div>
                        <div
                            className="mt-1 inline-block rounded-md px-2 py-0.5 text-[9px] font-bold tracking-[0.15em] shadow-sm text-card bg-primary"
                        >
                            YOU ARE HERE
                        </div>
                        </div>

                        <div
                            className="absolute top-4 right-4 w-12 h-12 rounded-full border-2 flex items-center justify-center text-[10px] font-black text-muted-foreground"
                            style={{ borderColor: "#A89A82", backgroundColor: "rgba(255,255,255,0.4)" }}
                        >
                            N
                        </div>
                    </div>
                </Reveal>
            </div>
        </section>
    )
}

export default MapSection