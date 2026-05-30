import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { Result } from '@/schemas/result.schema'
import { useGameStore } from '@/store'
import { RESULT_LOADER_LINES, ZONE_KEY_TO_COLOR, ZONE_KEY_TO_LABEL } from '@/constants/result-data'

import { AlertTriangle, Link2, MessageCircle, Sparkles, X as XIcon } from 'lucide-react'
import Character from './character'
import { DownloadPosterBtn } from './download-poster-btn'
import { section, CardShell, IdentityHeader, SummaryCard, TraitScores, TopTraits } from './common-result-section'


interface ResultModelProps {
    open: boolean
    onClose: () => void
    data: Result | null
    isPending: boolean
}


const ResultModel: React.FC<ResultModelProps> = ({ open, onClose, data, isPending }) => {
    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                onClose();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, onClose]);


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                >
                    <motion.div
                        initial={{ scale: 0.92, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 24, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                        className="relative w-full max-w-[800px] dot-texture overflow-hidden bg-card rounded-[1.25rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)] modal-container-capture"
                    >
                        <button
                            onClick={onClose}
                            className="absolute top-4 right-4 z-10 p-2 rounded-full hover:bg-black/5 text-muted-foreground hover:text-foreground transition-colors cursor-pointer"
                            aria-label="Close modal"
                        >
                            <XIcon className="w-5 h-5" />
                        </button>
                        <AnimatePresence mode="wait">
                            {isPending || !data ? (
                                <ResultLoader key="loader" />
                            ) : (
                                <ResultBody key="result" data={data} onClose={onClose} />
                            )}
                        </AnimatePresence>
                    </motion.div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default ResultModel




const ResultLoader: React.FC = () => {
    const [lineIdx, setLineIdx] = useState(0);
    const [progress, setProgress] = useState(0);

    useEffect(() => {
        const msgTimer = setInterval(() => {
            setLineIdx((i) => (i + 1) % RESULT_LOADER_LINES.length)
        }, 2000);

        const progressTimer = setInterval(() => {
            setProgress((prev) => (prev >= 90 ? 90 : prev + 0.8));
        }, 80);

        return () => {
            clearInterval(msgTimer);
            clearInterval(progressTimer);
        };
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="flex flex-col items-center justify-center py-24 px-6 min-h-[400px]"
        >
            <div className="mb-8">
                <Character isMoving={true} facing="right" />
            </div>

            <div className="w-[280px] mb-4">
                <div className="h-3 w-full rounded-full overflow-hidden border-2 border-border bg-card">
                    <div
                        className="h-full transition-all duration-100 bg-primary"
                        style={{ width: `${progress}%` }}
                    />
                </div>
            </div>

            <AnimatePresence mode="wait">
                <motion.p
                    key={lineIdx}
                    initial={{ opacity: 0, y: 6 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -6 }}
                    transition={{ duration: 0.35 }}
                    className="text-muted-foreground text-sm font-medium"
                >
                    {RESULT_LOADER_LINES[lineIdx]}
                </motion.p>
            </AnimatePresence>
        </motion.div>
    );
}



const ResultBody: React.FC<{ data: Result; onClose: () => void }> = ({ data, onClose }) => {
    const router = useRouter()
    const resetGame = useGameStore((s) => s.resetGame)

    const handlePlayAgain = () => {
        resetGame()
        onClose()
        router.push('/')
        
    }

    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="overflow-y-auto max-h-[92vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none] scroll-container-capture"
        >
            <div className="flex flex-col gap-5 p-5 sm:p-7 bg-card">
                <IdentityHeader data={data} />
                <SummaryCard text={data.summary} />
                <TraitScores scores={data.scores} />
                <TopTraits traits={data.topTraits} />
                <StrengthsBlindSpots strengths={data.strengths} blindSpots={data.blindSpots} />
                <ZoneBreakdown insights={data.zoneInsights} />
                <SurprisingChoice mc={data.mostSurprisingChoice} />
                <ShareCard shareText={data.shareText} data={data} onPlayAgain={handlePlayAgain} />
            </div>
        </motion.div>
    );
}







const StrengthsBlindSpots: React.FC<{ strengths: string[]; blindSpots: string[] }> = ({ strengths, blindSpots }) => (
    <motion.div {...section(4)} className="grid gap-5 sm:grid-cols-2">
        <div className="p-6 bg-secondary/60 border border-border rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
                <Sparkles className="w-24 h-24" />
            </div>
            <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 rounded-lg bg-primary/20 text-primary">
                        <Sparkles className="w-4 h-4" />
                    </span>
                    <h3 className="text-base font-bold text-foreground">Strengths</h3>
                </div>
                <ul className="flex flex-col gap-3">
                    {strengths.map((s) => (
                        <li key={s} className="flex gap-3 items-start text-muted-foreground text-[14px] sm:text-[15px] leading-snug">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-primary" />
                            <span className="font-medium text-foreground">{s}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
        <div className="p-6 bg-muted/60 border border-border rounded-2xl relative overflow-hidden group">
            <div className="absolute -top-4 -right-4 p-4 opacity-5 transition-transform duration-500 group-hover:scale-110 group-hover:opacity-10 pointer-events-none">
                <AlertTriangle className="w-24 h-24" />
            </div>
            <div className="relative">
                <div className="flex items-center gap-2 mb-4">
                    <span className="p-1.5 rounded-lg bg-accent/20 text-accent">
                        <AlertTriangle className="w-4 h-4" />
                    </span>
                    <h3 className="text-base font-bold text-foreground">Growth Edges</h3>
                </div>
                <ul className="flex flex-col gap-3">
                    {blindSpots.map((b) => (
                        <li key={b} className="flex gap-3 items-start text-muted-foreground text-[14px] sm:text-[15px] leading-snug">
                            <span className="mt-2 w-1.5 h-1.5 rounded-full shrink-0 bg-accent" />
                            <span className="font-medium text-foreground">{b}</span>
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    </motion.div>
);



const ZoneBreakdown: React.FC<{ insights: Result["zoneInsights"] }> = ({ insights }) => {
    const entries = Object.entries(insights);
    return (
        <motion.div {...section(5)} className="flex flex-col gap-4 mt-2">
            <div className="flex items-center gap-4 px-2">
                <div className="h-px bg-border flex-1" />
                <h3 className="text-xs font-bold text-muted-foreground uppercase tracking-[0.2em] shrink-0">Zone Breakdown</h3>
                <div className="h-px bg-border flex-1" />
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {entries.map(([key, text], idx) => {
                    const color = ZONE_KEY_TO_COLOR[key] || "var(--primary)";
                    const isLastOdd = idx === entries.length - 1 && entries.length % 2 !== 0;
                    return (
                        <div
                            key={key}
                            className={`relative p-5 sm:p-6 rounded-2xl bg-card border border-border overflow-hidden transition-colors hover:border-border/80 hover:bg-secondary/20 ${isLastOdd ? 'sm:col-span-2' : ''}`}
                        >
                            <div
                                className="absolute top-0 left-0 w-full h-1"
                                style={{ background: color }}
                            />

                            <div className="flex flex-col h-full mt-1">
                                <div className="flex items-center gap-2 mb-3">
                                    <span
                                        className="w-2 h-2 rounded-full shrink-0"
                                        style={{ background: color }}
                                    />
                                    <h4
                                        className="text-[11px] font-black tracking-[0.15em] uppercase text-foreground"
                                    >
                                        {ZONE_KEY_TO_LABEL[key] ?? key}
                                    </h4>
                                </div>
                                <p className="text-[14px] sm:text-[14.5px] leading-relaxed text-muted-foreground">
                                    {text}
                                </p>
                            </div>
                        </div>
                    );
                })}
            </div>
        </motion.div>
    );
}



const SurprisingChoice: React.FC<{ mc: Result["mostSurprisingChoice"] }> = ({ mc }) => (
    <motion.div
        {...section(6)}
        className="p-6 bg-secondary border border-border rounded-2xl border-l-3 border-l-accent"
    >
        <div className="flex items-center gap-2 mb-3">
            <Sparkles className="w-4 h-4 text-accent" />
            <h3 className="text-base font-bold text-secondary-foreground">Most Surprising Choice</h3>
        </div>
        <p className="text-[15px] font-bold text-foreground mb-2">{mc.question}</p>
        <p className="text-[15px] text-muted-foreground leading-relaxed">{mc.explanation}</p>
    </motion.div>
);



const ShareCard: React.FC<{ shareText: string; data: Result; onPlayAgain: () => void }> = ({ shareText, data, onPlayAgain }) => {
    const [copied, setCopied] = useState(false);

    const copy = async () => {
        try { await navigator.clipboard.writeText(shareText); } catch { /* noop */ }
        setCopied(true);
        setTimeout(() => setCopied(false), 1600);
    };

    const tw = `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}`;
    const wa = `https://wa.me/?text=${encodeURIComponent(shareText)}`;

    return (
        <CardShell i={7} className="text-center">
            <h3 className="text-lg font-bold text-foreground mb-1.5">Share Your Result</h3>
            <p className="text-sm text-muted-foreground mb-5">
                Tell the world what kind of decision-maker you are.
            </p>
            <blockquote className="text-left p-5 mb-5 italic text-foreground bg-secondary border-l-3 border-l-primary rounded-lg">
                &ldquo;{shareText}&rdquo;
            </blockquote>
            <div className="flex flex-col sm:flex-row flex-wrap gap-2.5 justify-center mb-4">
                <ShareBtn onClick={copy} icon={<Link2 className="w-4 h-4" />}>
                    {copied ? "Copied!" : "Copy Link"}
                </ShareBtn>
                <ShareBtn asLink href={tw} icon={<XIcon className="w-4 h-4" />}>Twitter</ShareBtn>
                <ShareBtn asLink href={wa} icon={<MessageCircle className="w-4 h-4" />}>WhatsApp</ShareBtn>
                <DownloadPosterBtn data={data} />
            </div>
            <button
                onClick={onPlayAgain}
                className="text-sm text-muted-foreground hover:text-primary underline-offset-4 hover:underline transition-colors cursor-pointer"
            >
                Play Again
            </button>
        </CardShell>
    );
}



const ShareBtn: React.FC<{
    children: React.ReactNode
    onClick?: () => void
    icon: React.ReactNode
    asLink?: boolean
    href?: string
}> = ({ children, onClick, icon, asLink, href }) => {
    const cls = "inline-flex items-center justify-center gap-2 px-4 h-10 rounded-full border-2 border-primary text-sm font-semibold transition-colors cursor-pointer text-primary bg-transparent hover:bg-primary hover:text-white";

    if (asLink) {
        return (
            <a href={href} target="_blank" rel="noopener noreferrer" className={cls}>
                {icon}<span>{children}</span>
            </a>
        );
    }

    return (
        <button onClick={onClick} className={cls}>
            {icon}<span>{children}</span>
        </button>
    );
}