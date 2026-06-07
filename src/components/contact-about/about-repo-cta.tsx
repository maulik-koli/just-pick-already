'use client'
import React from 'react'
import { motion, Variants } from 'framer-motion'
import { Button } from '@/components/ui/button'
import { GithubIcon } from '@/components/icons/custom-icons'
import { useHandleStart } from '@/hooks/use-handle-start'
import { Play } from 'lucide-react'

interface AboutRepoCtaProps {
    itemVariants: Variants
}


const AboutRepoCta: React.FC<AboutRepoCtaProps> = ({ itemVariants }) => {
    const { handleStartGame } = useHandleStart();

    return (
        <>
            <motion.section variants={itemVariants} className="flex flex-col md:flex-row gap-6 items-center p-8 bg-card border border-border shadow-sm rounded-[2rem] group hover:border-primary/50 transition-colors">
                <div className="flex-1">
                    <h2 className="text-3xl font-black tracking-tight text-foreground mb-3">
                        Fully Open Source
                    </h2>
                    <p className="text-lg text-muted-foreground leading-relaxed">
                        Don't trust us? Trust the code. The entire game, from the frontend logic to the AI prompt generation, is completely open source. You can verify exactly how your answers are used and discarded.
                    </p>
                </div>
                <a 
                    href="https://github.com/maulik-koli/just-pick-already" 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="shrink-0"
                >
                    <Button variant="outline" className="h-14 px-8 rounded-2xl border-2 font-bold gap-3 hover:bg-muted">
                        <GithubIcon className="w-5 h-5 fill-current" />
                        VIEW REPO
                    </Button>
                </a>
            </motion.section>

            <motion.div variants={itemVariants} className="flex justify-center mt-4">
                <Button
                    onClick={handleStartGame}
                    className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-[4px_4px_0_var(--color-foreground)] hover:translate-y-[2px] hover:translate-x-[2px] hover:shadow-none border-2 border-foreground transition-all rounded-2xl px-12 h-16 text-xl font-black tracking-widest gap-3 flex items-center group"
                >
                    <Play fill="currentColor" strokeWidth={2} className="w-6 h-6 group-hover:scale-110 transition-transform" />
                    PLAY THE GAME
                </Button>
            </motion.div>
        </>
    )
}

export default AboutRepoCta