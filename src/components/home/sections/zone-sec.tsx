'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { cn } from '@/lib/utils';
import { Reveal, SectionHeader } from '@/components/home/common'
import { ZONES_SECTION_DATA } from '@/constants/home-statics-data';


const ZoneSections: React.FC = () => {
    return (
        <section className="px-4 py-20 max-w-6xl mx-auto">
            <Reveal>
                <SectionHeader
                    label='ZONES'
                    title='Five zones to explore'
                    description='Each one tests a different side of you.'
                />
            </Reveal>
            <div className="grid gap-4 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-5">
                {ZONES_SECTION_DATA.map((z, i) => (
                    <Reveal key={z.name} delay={i * 0.06}>
                        <motion.div
                            whileHover={{ y: -8, boxShadow: "0 16px 28px -12px rgba(26,26,26,0.25)" }}
                            transition={{ type: "spring", stiffness: 300 }}
                            className={cn(
                                "relative min-h-43 rounded-2xl p-5 border shadow-sm cursor-default overflow-hidden h-full border-border border-t-4",
                                z.zone_color,
                            )}
                            style={{ borderTopColor: "rgba(26,26,26,0.12)" }}
                        >
                            <h3 className="font-black text-base sm:text-lg mb-2 relative z-10 text-foreground">
                                {z.name}
                            </h3>
                            <p className="text-xs leading-relaxed relative z-10 text-muted-foreground">
                                {z.line}
                            </p>
                            <div
                                className="absolute bottom-0 right-2 font-black select-none pointer-events-none text-8xl"
                                style={{ lineHeight: 1, color: "rgba(26,26,26,0.06)" }}
                            >
                                {i + 1}
                            </div>
                        </motion.div>
                    </Reveal>
                ))}
            </div>
        </section>
    )
}

export default ZoneSections