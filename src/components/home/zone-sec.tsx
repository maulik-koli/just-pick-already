'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Reveal, SectionHeader } from './common'
import { cn } from '@/lib/utils';

const ZONES = [
    { name: "Social Situations", line: "The party. The small talk. The escape plan.", zone_color: "bg-zone-social" },
    { name: "Relationships", line: "Honest answers, awkward truths.", zone_color: "bg-zone-relationships" },
    { name: "Career", line: "Money, meaning, and your weekends.", zone_color: "bg-zone-career" },
    { name: "Moral Grey Areas", line: "No right answer. Pick anyway.", zone_color: "bg-zone-moral" },
    { name: "Impulse vs Logic", line: "The booking page is open. The clock is ticking.", zone_color: "bg-zone-impulse" },
];


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
            <div className="grid gap-4 grid-cols-2 sm:grid-cols-3 lg:grid-cols-5">
                {ZONES.map((z, i) => (
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