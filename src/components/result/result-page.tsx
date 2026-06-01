'use client'
import React, { useState } from 'react'
import { useSearchParams, useRouter } from 'next/navigation'
import { motion, AnimatePresence } from 'framer-motion'

import { Result } from '@/schemas/result.schema'
import { useGetResult } from '@/hooks/api/query'
import { useGameStore } from '@/store'
import { cn } from '@/lib/utils'
import { ZONE_KEY_TO_COLOR, ZONE_KEY_TO_LABEL } from '@/constants/result-data'

import ResultLoadingScreen from './result-loading'
import ResultErrorScreen from './result-errors'
import Footer from '../common/footer'
import { TraitScores, TopTraits } from './common-result-section'
import { DownloadPosterBtn } from './download-poster-btn'
import { AlertTriangle, Link2, MessageCircle, Sparkles, X as XIcon, RotateCcw } from 'lucide-react'


const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.12, delayChildren: 0.1 },
    },
}

const itemVariants = {
    hidden: { opacity: 0, y: 30 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 25 } },
}

const sectionVariants = {
    hidden: { opacity: 0, y: 24 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 260, damping: 24 } },
}


const ResultPage: React.FC = () => {
    const searchParams = useSearchParams()
    const sessionId = searchParams.get('session')

    const { isLoading, data, error } = useGetResult(sessionId)

    const resultData = data?.data ?? null

    const getContent = () => {
        if (isLoading) return <ResultLoadingScreen key="loading" />
        if (error) return <ResultErrorScreen key="error" error={error} sessionId={sessionId} />
        if (!resultData) return <ResultErrorScreen key="no-data" error={null} sessionId={sessionId} />

        return <ResultBody key="result" data={resultData} />
    }


    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
            <div className="dot-grid fixed inset-0 pointer-events-none opacity-[0.4] z-0" />
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none z-0",
                    "bg-[radial-gradient(ellipse_900px_600px_at_center_20%,var(--color-secondary))_0%,transparent_80%]"
                )}
            />

            <svg className="absolute top-0 left-0 w-full h-[600px] pointer-events-none z-0 opacity-[0.06]" viewBox="0 0 1200 600" preserveAspectRatio="none">
                <defs>
                    <pattern id="result-grid" patternUnits="userSpaceOnUse" width="60" height="60">
                        <path d="M 60 0 L 0 0 0 60" fill="none" stroke="currentColor" strokeWidth="0.5" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#result-grid)" />
                <circle cx="200" cy="300" r="180" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
                <circle cx="1000" cy="200" r="120" fill="none" stroke="currentColor" strokeWidth="0.5" strokeDasharray="4 6" />
            </svg>

            <div className="h-30 shrink-0 w-full relative z-10" />

            <main className="relative z-10 grow flex flex-col items-center pb-16 px-4 sm:px-6">
                <AnimatePresence mode="wait">
                    {getContent()}
                </AnimatePresence>
            </main>

            <div className="relative z-10 w-full mt-auto">
                <Footer />
            </div>
        </div>
    )
}

export default ResultPage



const ResultBody: React.FC<{ data: Result }> = ({ data }) => {
    const router = useRouter()
    const resetGame = useGameStore((s) => s.resetGame)

    const handlePlayAgain = () => {
        resetGame()
        router.push('/')
    }

    return (
        <motion.div
            initial="hidden"
            animate="show"
            variants={containerVariants}
            className="w-full max-w-[900px] flex flex-col gap-0"
        >
            <motion.div variants={itemVariants} className="mb-12">
                <ResultHeroSection data={data} />
            </motion.div>

            <motion.section variants={sectionVariants} className="mb-10">
                <SectionDivider label="ANALYSIS" />
                <div className="mt-6">
                    <div className="relative p-8 sm:p-10 bg-card border border-border rounded-[2rem] shadow-sm overflow-hidden group">
                        <div className="absolute -top-8 -right-8 p-6 opacity-[0.04] pointer-events-none">
                            <Sparkles className="w-32 h-32" />
                        </div>
                        <p className="text-[17px] sm:text-lg leading-relaxed text-foreground relative z-10">
                            {data.summary}
                        </p>
                    </div>
                </div>
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-10">
                <SectionDivider label="YOUR PROFILE" />
                <div className="mt-6">
                    <TraitScores scores={data.scores} />
                </div>
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-10">
                <SectionDivider label="DEFINING TRAITS" />
                <div className="mt-6">
                    <TopTraits traits={data.topTraits} />
                </div>
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-10">
                <SectionDivider label="STRENGTHS & GROWTH" />
                <div className="mt-6">
                    <StrengthsBlindSpots strengths={data.strengths} blindSpots={data.blindSpots} />
                </div>
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-10">
                <ZoneBreakdown insights={data.zoneInsights} />
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-10">
                <SectionDivider label="PLOT TWIST" />
                <div className="mt-6">
                    <SurprisingChoice mc={data.mostSurprisingChoice} />
                </div>
            </motion.section>

            <motion.section variants={sectionVariants} className="mb-8">
                <ShareSection shareText={data.shareText} data={data} onPlayAgain={handlePlayAgain} />
            </motion.section>
        </motion.div>
    )
}



const ResultHeroSection: React.FC<{ data: Result }> = ({ data }) => {
    return (
        <div className="relative overflow-hidden rounded-[2.5rem] shadow-[0_20px_50px_-15px_rgba(244,98,58,0.3)]">
            <div className="absolute inset-0 bg-primary" />
            <div
                className="absolute inset-0"
                style={{
                    backgroundImage:
                        "repeating-linear-gradient(45deg, rgba(255,255,255,0.04) 0 8px, transparent 8px 16px), radial-gradient(circle at 30% 30%, rgba(255,255,255,0.12), transparent 50%)",
                }}
            />

            <div className="absolute -right-12 -top-12 w-48 h-48 rounded-full bg-white/8" />
            <div className="absolute -left-8 -bottom-8 w-32 h-32 rounded-full bg-white/5" />
            <div className="absolute right-1/4 bottom-4 w-20 h-20 rounded-full bg-white/5" />

            <svg className="absolute inset-0 w-full h-full pointer-events-none opacity-[0.06]" viewBox="0 0 800 400">
                <defs>
                    <pattern id="hero-dots" patternUnits="userSpaceOnUse" width="20" height="20">
                        <circle cx="10" cy="10" r="1" fill="white" />
                    </pattern>
                </defs>
                <rect width="100%" height="100%" fill="url(#hero-dots)" />
            </svg>

            <div className="relative z-10 px-8 sm:px-12 py-12 sm:py-16 text-white">
                <motion.div
                    initial={{ opacity: 0, x: -20 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ delay: 0.2 }}
                    className="mb-2"
                >
                    <span className="inline-block text-[10px] sm:text-[11px] font-bold tracking-[0.3em] text-white/60 bg-white/10 px-3 py-1 rounded-full">
                        YOUR PERSONALITY CARD
                    </span>
                </motion.div>

                <motion.h1
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.3, type: "spring", stiffness: 200 }}
                    className="text-4xl sm:text-5xl md:text-6xl font-black tracking-tight leading-[1.05] mb-4"
                    style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                >
                    {data.title}
                </motion.h1>

                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ delay: 0.5, duration: 0.4 }}
                    className="h-[3px] w-16 rounded-full bg-white/50 origin-left mb-5"
                />

                <motion.p
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6 }}
                    className="text-lg sm:text-xl font-medium text-white/85 max-w-xl leading-relaxed"
                >
                    {data.subtitle}
                </motion.p>
            </div>
        </div>
    )
}



const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center gap-4 px-2">
        <div className="h-px bg-border flex-1" />
        <span className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em] shrink-0">
            {label}
        </span>
        <div className="h-px bg-border flex-1" />
    </div>
)



const StrengthsBlindSpots: React.FC<{ strengths: string[]; blindSpots: string[] }> = ({ strengths, blindSpots }) => (
    <div className="grid gap-6 sm:grid-cols-2">
        <div className="relative p-7 sm:p-8 bg-card border border-border rounded-[2rem] overflow-hidden group hover:border-primary/30 transition-colors duration-500">
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.04] transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                <Sparkles className="w-28 h-28" />
            </div>
            <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                    <span className="p-2 rounded-xl bg-primary/15 text-primary">
                        <Sparkles className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-black text-foreground tracking-tight">Strengths</h3>
                </div>
                <ul className="flex flex-col gap-4">
                    {strengths.map((s) => (
                        <li key={s} className="flex gap-3 items-start">
                            <span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-primary" />
                            <span className="text-[15px] font-medium text-foreground leading-snug">{s}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="relative p-7 sm:p-8 bg-card border border-border rounded-[2rem] overflow-hidden group hover:border-accent/30 transition-colors duration-500">
            <div className="absolute -top-6 -right-6 p-4 opacity-[0.04] transition-transform duration-500 group-hover:scale-110 pointer-events-none">
                <AlertTriangle className="w-28 h-28" />
            </div>
            <div className="relative">
                <div className="flex items-center gap-3 mb-5">
                    <span className="p-2 rounded-xl bg-accent/15 text-accent">
                        <AlertTriangle className="w-5 h-5" />
                    </span>
                    <h3 className="text-lg font-black text-foreground tracking-tight">Growth Edges</h3>
                </div>
                <ul className="flex flex-col gap-4">
                    {blindSpots.map((b) => (
                        <li key={b} className="flex gap-3 items-start">
                            <span className="mt-2 w-2 h-2 rounded-full shrink-0 bg-accent" />
                            <span className="text-[15px] font-medium text-foreground leading-snug">{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </div>
)



const ZoneBreakdown: React.FC<{ insights: Result["zoneInsights"] }> = ({ insights }) => {
    const entries = Object.entries(insights)
    return (
        <div className="flex flex-col gap-6">
            <SectionDivider label="ZONE BREAKDOWN" />
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 mt-2">
                {entries.map(([key, text], idx) => {
                    const color = ZONE_KEY_TO_COLOR[key] || "var(--primary)"
                    const isLastOdd = idx === entries.length - 1 && entries.length % 2 !== 0
                    return (
                        <motion.div
                            key={key}
                            whileHover={{ y: -3, transition: { duration: 0.2 } }}
                            className={cn(
                                "relative p-6 sm:p-7 rounded-[1.5rem] bg-card border border-border overflow-hidden transition-colors hover:border-border/80 hover:shadow-lg group",
                                isLastOdd ? 'sm:col-span-2' : ''
                            )}
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-1.5 rounded-t-[1.5rem]"
                                style={{ background: color }}
                            />

                            <div
                                className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none"
                                style={{ background: `radial-gradient(ellipse at 50% 0%, ${color}08, transparent 70%)` }}
                            />

                            <div className="flex flex-col h-full mt-1 relative z-10">
                                <div className="flex items-center gap-2.5 mb-3">
                                    <span
                                        className="w-2.5 h-2.5 rounded-full shrink-0"
                                        style={{ background: color }}
                                    />
                                    <h4
                                        className="text-[11px] font-black tracking-[0.15em] uppercase text-foreground"
                                    >
                                        {ZONE_KEY_TO_LABEL[key] ?? key}
                                    </h4>
                                </div>
                                <p className="text-[15px] leading-relaxed text-muted-foreground">
                                    {text}
                                </p>
                            </div>
                        </motion.div>
                    )
                })}
            </div>
        </div>
    )
}



const SurprisingChoice: React.FC<{ mc: Result["mostSurprisingChoice"] }> = ({ mc }) => (
    <div className="relative p-7 sm:p-8 bg-card border border-border rounded-[2rem] border-l-4 border-l-accent overflow-hidden group hover:shadow-lg transition-shadow duration-500">
        <div className="absolute -top-4 -right-4 opacity-[0.04] pointer-events-none">
            <Sparkles className="w-24 h-24" />
        </div>
        <div className="relative z-10">
            <div className="flex items-center gap-2.5 mb-4">
                <span className="p-2 rounded-xl bg-accent/15 text-accent">
                    <Sparkles className="w-4 h-4" />
                </span>
                <h3 className="text-lg font-black text-foreground tracking-tight">Most Surprising Choice</h3>
            </div>
            <p className="text-[16px] font-bold text-foreground mb-3">{mc.question}</p>
            <p className="text-[15px] text-muted-foreground leading-relaxed">{mc.explanation}</p>
        </div>
    </div>
)



const ShareSection: React.FC<{ shareText: string; data: Result; onPlayAgain: () => void }> = ({ shareText, data, onPlayAgain }) => {
    const [copied, setCopied] = useState(false)

    const copy = async () => {
        try { await navigator.clipboard.writeText(shareText) } catch { /* noop */ }
        setCopied(true)
        setTimeout(() => setCopied(false), 1600)
    }

    const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`
    const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`

    return (
        <div className="relative overflow-hidden rounded-[2.5rem] border-4 border-foreground shadow-[6px_6px_0_var(--color-foreground)]">
            {/* Background */}
            <div className="absolute inset-0 bg-primary" />
            <div
                className="absolute inset-0 opacity-[0.08]"
                style={{
                    backgroundImage: "repeating-linear-gradient(135deg, rgba(255,255,255,0.1) 0 4px, transparent 4px 12px)",
                }}
            />

            <div className="relative z-10 px-8 sm:px-12 py-12 sm:py-14 text-center">
                <motion.div
                    initial={{ scale: 0 }}
                    whileInView={{ scale: 1 }}
                    viewport={{ once: true }}
                    transition={{ type: "spring", stiffness: 300, damping: 20 }}
                    className="inline-flex items-center justify-center p-3 rounded-2xl bg-white/15 mb-6"
                >
                    <Sparkles className="w-7 h-7 text-white" />
                </motion.div>

                <h3 className="text-2xl sm:text-3xl font-black text-white tracking-tight mb-3">
                    Share Your Result
                </h3>
                <p className="text-sm sm:text-base text-white/70 mb-8 max-w-md mx-auto">
                    Tell the world what kind of decision-maker you are.
                </p>

                <blockquote className="text-left p-5 sm:p-6 mb-8 italic text-white bg-white/10 border-l-3 border-l-white/50 rounded-xl max-w-lg mx-auto backdrop-blur-sm">
                    &ldquo;{shareText}&rdquo;
                </blockquote>

                <div className="flex flex-col sm:flex-row flex-wrap gap-3 justify-center mb-6">
                    <ShareBtn onClick={copy} icon={<Link2 className="w-4 h-4" />}>
                        {copied ? "Copied!" : "Copy Link"}
                    </ShareBtn>
                    <ShareBtn asLink href={tw} icon={<XIcon className="w-4 h-4" />}>Twitter</ShareBtn>
                    <ShareBtn asLink href={wa} icon={<MessageCircle className="w-4 h-4" />}>WhatsApp</ShareBtn>
                    <DownloadPosterBtn data={data} />
                </div>

                <button
                    onClick={onPlayAgain}
                    className="inline-flex items-center gap-2 text-sm text-white/60 hover:text-white underline-offset-4 hover:underline transition-colors cursor-pointer"
                >
                    <RotateCcw className="w-3.5 h-3.5" />
                    Play Again
                </button>
            </div>
        </div>
    )
}



const ShareBtn: React.FC<{
    children: React.ReactNode
    onClick?: () => void
    icon: React.ReactNode
    asLink?: boolean
    href?: string
}> = ({ children, onClick, icon, asLink, href }) => {
    const cls = "inline-flex items-center justify-center gap-2 px-5 h-11 rounded-full border-2 border-white/40 text-sm font-semibold transition-all cursor-pointer text-white bg-white/10 hover:bg-white hover:text-primary hover:border-white backdrop-blur-sm"

    if (asLink) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {icon}<span>{children}</span>
            </a>
        )
    }

    return (
        <button onClick={onClick} className={cls}>
            {icon}<span>{children}</span>
        </button>
    )
}
