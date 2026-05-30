"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

import Footer from "../common/footer";
import AboutRepoCta from "./about-repo-cta";
import { ShieldCheck, Map as MapIcon, Brain, Sparkles, FileText } from "lucide-react";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.15, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
};

const HOW_IT_WORKS_CARDS = [
    {
        title: "1. Onboarding",
        icon: <FileText className="w-6 h-6" />,
        desc: "It starts before you even realize it. Once you land, we ask 3 to 4 quick onboarding questions to calibrate the AI. Then, you're in.",
        borderClass: "border-t-blue-400",
        iconContainerClass: "bg-blue-400/10 text-blue-500"
    },
    {
        title: "2. The Map",
        icon: <MapIcon className="w-6 h-6" />,
        desc: "Wander freely across a 2D map. Stepping into the 5 distinct zones triggers unique, Gemini-generated scenarios tailored specifically to your early answers.",
        borderClass: "border-t-amber-400",
        iconContainerClass: "bg-amber-400/10 text-amber-500"
    },
    {
        title: "3. The Analysis",
        icon: <Brain className="w-6 h-6" />,
        desc: "After surviving all zones, the engine analyzes your decisions to generate a unique personality card, detailing your dominant traits and most surprising choices.",
        borderClass: "border-t-primary",
        iconContainerClass: "bg-primary/10 text-primary"
    }
];


const AboutPageComp: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
            <div className="dot-grid fixed inset-0 pointer-events-none opacity-[0.4] z-0" />
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none z-0",
                    "bg-[radial-gradient(ellipse_800px_600px_at_top_center,var(--color-secondary))_0%,transparent_80%]"
                )}
            />

            <div className="h-30 shrink-0 w-full relative z-10" />

            <main className="relative z-10 grow flex flex-col items-center justify-center pb-16 px-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="w-full max-w-[1000px] flex flex-col gap-24"
                >
                    
                    <motion.div variants={itemVariants} className="text-center mt-8">
                        <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-primary mb-4 bg-primary/10 px-3 py-1 rounded-full">
                            [ CLASSIFIED DOSSIER ]
                        </span>
                        <h1 className="font-black tracking-tighter text-5xl sm:text-7xl text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                            Behind the <span className="text-primary">game.</span>
                        </h1>
                    </motion.div>


                    <motion.section 
                        variants={itemVariants} 
                        className="flex flex-col md:flex-row gap-8 items-center bg-card border border-border p-8 rounded-[2rem] shadow-sm relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <div className="flex-1 relative z-10">
                            <h2 className="text-3xl font-black tracking-tight text-foreground mb-4">
                                The Pitch
                            </h2>
                            <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                                <p>
                                    Just Pick Already puts you in real-life situations with no clearly right answer. You walk through 5 zones, each one designed around a different part of how people think and decide. Answer honestly, and the AI builds a personality profile based on your choices.
                                </p>
                                <p>
                                    It's not a serious psychological assessment. It's a game. But the scenarios are generated specifically for you using your onboarding answers, so it won't feel generic either.
                                </p>
                            </div>
                        </div>
                        <div className="w-full md:w-1/3 bg-primary/5 border border-primary/20 p-6 rounded-2xl flex items-center justify-center relative z-10">
                            <p className="font-black text-xl text-center text-foreground uppercase tracking-wider"
                               style={{ WebkitTextStroke: "0.5px var(--color-primary)", textShadow: "2px 2px 0 var(--color-primary)" }}
                            >
                                Stop overthinking.<br />Just pick already.
                            </p>
                        </div>
                    </motion.section>


                    <motion.section variants={itemVariants} className="flex flex-col gap-8">
                        <div className="text-center">
                            <h2 className="text-3xl font-black tracking-tight text-foreground">
                                How It Works
                            </h2>
                            <p className="mt-3 text-muted-foreground">The journey from your first click to the final analysis.</p>
                        </div>

                        <div className="grid gap-6 sm:grid-cols-3">
                            {HOW_IT_WORKS_CARDS.map((card, i) => (
                                <motion.div 
                                    key={i} 
                                    whileHover={{ y: -4, boxShadow: "0 12px 24px -10px rgba(26,26,26,0.12)" }} 
                                    className={cn("rounded-3xl p-6 border shadow-sm bg-card border-border border-t-4 relative overflow-hidden group", card.borderClass)}
                                >
                                    <div className={cn("w-12 h-12 rounded-2xl flex items-center justify-center mb-5 group-hover:scale-110 transition-transform", card.iconContainerClass)}>
                                        {card.icon}
                                    </div>
                                    <h3 className="font-bold text-lg mb-2 text-foreground">{card.title}</h3>
                                    <p className="text-sm leading-relaxed text-muted-foreground">
                                        {card.desc}
                                    </p>
                                </motion.div>
                            ))}
                        </div>
                    </motion.section>

                    <motion.section 
                        variants={itemVariants} 
                        className="flex flex-col gap-4 p-10 bg-primary text-primary-foreground border-4 border-foreground rounded-[2.5rem] shadow-[6px_6px_0_var(--color-foreground)] relative overflow-hidden"
                    >
                        <div className="absolute -top-10 -right-10 opacity-10">
                            <ShieldCheck className="w-64 h-64" />
                        </div>
                        <div className="relative z-10 flex items-center gap-4 mb-2">
                            <div className="bg-background/20 p-3 rounded-2xl">
                                <ShieldCheck className="w-8 h-8 text-primary-foreground" />
                            </div>
                            <h2 className="text-3xl font-black tracking-tight">
                                Why Anonymous Matters
                            </h2>
                        </div>
                        <div className="text-lg leading-relaxed space-y-4 relative z-10 font-medium opacity-90">
                            <p>
                                We don't want your email. We don't want your name. We don't want to sell your data.
                            </p>
                            <p>
                                To make honest choices, you need to feel invisible. The AI uses only your session answers to weave the narrative. Nothing is tied to an identity, and everything is wiped clean automatically after 24 hours. You are completely off the grid. Play honestly without the paranoia.
                            </p>
                        </div>
                    </motion.section>

                    <AboutRepoCta itemVariants={itemVariants} />
                </motion.div>
            </main>

            <div className="relative z-10 w-full mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default AboutPageComp;
