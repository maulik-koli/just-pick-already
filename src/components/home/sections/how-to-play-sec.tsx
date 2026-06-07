'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { STEPS } from '@/constants/home-statics-data';
import { Reveal, SectionHeader } from '@/components/home/common';


const HowToPlaySection: React.FC = () => {
  return (
    <section id="how-to-play" className="px-4 py-20 max-w-6xl mx-auto">
      <Reveal>
        <SectionHeader
          label='HOW TO PLAY'
          title='How to play'
          description="Four steps. No accounts. No nonsense."
        />
      </Reveal>
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {STEPS.map((s, i) => (
          <Reveal key={s.n} delay={i * 0.08}>
            <motion.div
              whileHover={{ y: -4, boxShadow: "0 12px 24px -10px rgba(26,26,26,0.18)" }}
              transition={{ type: "spring", stiffness: 300 }}
              className="rounded-2xl p-6 border shadow-sm h-full bg-card border-border border-l-[3px] border-l-primary"
            >
              <div
                className="w-11 h-11 rounded-full flex items-center justify-center font-bold text-white mb-4 text-lg bg-primary"
                style={{ boxShadow: "0 6px 12px -4px rgba(245,166,35,0.5)" }}
              >
                {s.n}
              </div>
              <h3 className="font-bold mb-1.5 text-foreground">{s.title}</h3>
              <p className="text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
            </motion.div>
          </Reveal>
        ))}
      </div>
    </section>
  )
}

export default HowToPlaySection