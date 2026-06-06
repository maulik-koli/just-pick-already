"use client";
import React from "react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import Footer from "../common/footer";
import { STATIC_LINKS } from "@/constants/static-links";

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.1 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
};

const PrivacyPolicyPageComp: React.FC = () => {
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

            <main className="relative z-10 grow flex flex-col items-center justify-center pb-24 px-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="w-full max-w-[1000px] flex flex-col gap-12"
                >
                    <motion.div variants={itemVariants} className="mt-8 mb-4">
                        <h1 className="font-black tracking-tighter text-5xl sm:text-7xl text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                            Privacy <span className="text-primary">Policy.</span>
                        </h1>
                        <p className="mt-6 text-muted-foreground text-lg font-medium">Last updated: May 2026</p>
                    </motion.div>

                    <motion.div variants={itemVariants} className="text-xl text-foreground leading-relaxed font-medium border-l-2 border-primary pl-6">
                        <p><strong>Just Pick Already</strong> ("we", "our", or "us") operates the website justpickalready.in. This page explains what information we collect, how we use it, and what rights you have around it.</p>
                    </motion.div>

                    <div className="h-px bg-border/60 w-full" />

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">1. Who We Are</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>Just Pick Already is an independent hobby project based in India. For any privacy-related questions, contact us at: <code className="text-foreground bg-muted px-2 py-1 rounded-md text-base">{STATIC_LINKS.email}</code></p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">2. What We Collect</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>We collect the minimum data necessary to run the game:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>A randomly generated anonymous session ID</li>
                                <li>Your onboarding answers (age range, life stage, one vibe question)</li>
                                <li>Your in-game answers across the 5 zones</li>
                                <li>Your AI-generated personality result</li>
                            </ul>
                            <p>We do not collect your name, email address, phone number, or any information that identifies you personally.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">3. How We Use It</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>The data above is used solely to:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li>Generate personalized game scenarios using the Gemini AI model</li>
                                <li>Produce your personality result card at the end of the game</li>
                                <li>Show aggregate anonymous statistics on the home page</li>
                            </ul>
                            <p>We do not use your data for advertising profiling, marketing, or any purpose beyond running the game.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">4. Data Retention</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>All session data is automatically deleted 3 days after your session is created. Nothing is retained beyond that window. It happens automatically.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">5. Third Party Services</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>We use the following third-party services to operate this website:</p>
                            <ul className="list-disc pl-6 space-y-2">
                                <li><strong>Google Gemini API</strong> — processes your answers to generate scenarios and results. Data sent to Gemini is governed by Google's privacy policy.</li>
                                <li><strong>Supabase</strong> — used for anonymous session storage. Data is stored on Supabase's infrastructure.</li>
                                <li><strong>Vercel</strong> — used for hosting and deployment.</li>
                            </ul>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">6. Cookies</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>This site does not use cookies.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">7. Children's Privacy</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>This game is intended for users aged 13 and above. We do not knowingly collect any data from children under 13. If you believe a child has submitted data through this site, contact us and we will delete it.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">8. Your Rights</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>Since we do not collect personally identifiable information, there is no personal data profile to access, correct, or delete. If you have any concerns, reach out to us at <code className="text-foreground bg-muted px-2 py-1 rounded-md text-base">{STATIC_LINKS.email}</code>.</p>
                        </div>
                    </motion.section>

                    <motion.section variants={itemVariants}>
                        <h2 className="text-2xl sm:text-3xl font-black tracking-tight text-foreground mb-4">9. Changes to This Policy</h2>
                        <div className="text-lg text-muted-foreground leading-relaxed space-y-4">
                            <p>We may update this policy from time to time. Changes will be posted on this page with an updated date at the top.</p>
                        </div>
                    </motion.section>

                </motion.div>
            </main>

            <div className="relative z-10 w-full mt-auto">
                <Footer />
            </div>
        </div>
    );
};

export default PrivacyPolicyPageComp;
