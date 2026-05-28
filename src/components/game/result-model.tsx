import React, { useEffect, useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { useRouter } from 'next/navigation'

import { Result } from '@/schemas/result.schema'
import { useGameStore } from '@/store'
import { RESULT_LOADER_LINES, TRAIT_LABELS, ZONE_KEY_TO_COLOR, ZONE_KEY_TO_LABEL } from '@/constants/result-data'

import { AlertTriangle, Link2, MessageCircle, Sparkles, X as XIcon } from 'lucide-react'
import Character from './character'

const section = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
});

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
                        className="relative w-full max-w-[680px] dot-texture overflow-hidden bg-card rounded-[1.25rem] shadow-[0_25px_60px_rgba(0,0,0,0.15)]"
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
            className="overflow-y-auto max-h-[92vh] [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]"
        >
            <div className="flex flex-col gap-5 p-5 sm:p-7">
                <IdentityHeader data={data} />
                <SummaryCard text={data.summary} />
                <TraitScores scores={data.scores} />
                <TopTraits traits={data.topTraits} />
                <StrengthsBlindSpots strengths={data.strengths} blindSpots={data.blindSpots} />
                <ZoneBreakdown insights={data.zoneInsights} />
                <SurprisingChoice mc={data.mostSurprisingChoice} />
                <ShareCard shareText={data.shareText} onPlayAgain={handlePlayAgain} />
            </div>
        </motion.div>
    );
}



const CardShell: React.FC<{ children: React.ReactNode; className?: string; i: number }> = ({ children, className, i }) => (
    <motion.div
        {...section(i)}
        className={`bg-card p-6 rounded-2xl border border-border shadow-[0_6px_20px_-14px_rgba(120,80,40,0.25)] ${className ?? ''}`}
    >
        {children}
    </motion.div>
);



const IdentityHeader: React.FC<{ data: Result }> = ({ data }) => (
    <motion.div
        {...section(0)}
        className="relative overflow-hidden p-7 text-white bg-primary rounded-2xl shadow-[0_10px_30px_-12px_rgba(244,98,58,0.45)]"
    >
        <div className="absolute inset-0 dot-texture opacity-70 pointer-events-none" />
        <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
        <div className="relative">
            <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{data.title}</h2>
            <div className="my-3 h-[3px] w-12 rounded-full bg-white/55" />
            <p className="text-base sm:text-lg font-medium text-white/88">
                {data.subtitle}
            </p>
        </div>
    </motion.div>
);



const SummaryCard: React.FC<{ text: string }> = ({ text }) => (
    <CardShell i={1}>
        <p className="text-[17px] leading-relaxed text-foreground">{text}</p>
    </CardShell>
);



const TraitScores: React.FC<{ scores: Result["scores"] }> = ({ scores }) => (
    <CardShell i={2}>
        <h3 className="text-lg font-bold text-foreground mb-5">Your Profile</h3>
        <div className="flex flex-col gap-3.5">
            {TRAIT_LABELS.map(({ key, label }, idx) => {
                const val = scores[key];
                return (
                    <div key={key} className="grid grid-cols-[110px_1fr_36px] items-center gap-3 sm:grid-cols-[140px_1fr_44px]">
                        <span className="text-xs sm:text-sm text-muted-foreground capitalize">{label}</span>
                        <div className="h-2.5 rounded-full overflow-hidden bg-secondary">
                            <motion.div
                                className="h-full rounded-full bg-linear-to-r from-primary to-accent"
                                initial={{ width: 0 }}
                                animate={{ width: `${val}%` }}
                                transition={{ duration: 0.9, delay: 0.25 + idx * 0.08, ease: [0.22, 1, 0.36, 1] }}
                            />
                        </div>
                        <span className="text-sm font-bold text-right text-primary">{val}</span>
                    </div>
                );
            })}
        </div>
    </CardShell>
);



const TopTraits: React.FC<{ traits: string[] }> = ({ traits }) => (
    <CardShell i={3}>
        <h3 className="text-lg font-bold text-foreground mb-4">Defining Traits</h3>
        <div className="flex flex-wrap gap-2.5">
            {traits.map((t, i) => (
                <motion.span
                    key={t}
                    initial={{ opacity: 0, scale: 0.7 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.35, delay: 0.4 + i * 0.07, type: "spring", stiffness: 280, damping: 18 }}
                    className="px-4 py-1.5 rounded-full text-sm font-semibold text-white bg-primary"
                >
                    {t}
                </motion.span>
            ))}
        </div>
    </CardShell>
);



const StrengthsBlindSpots: React.FC<{ strengths: string[]; blindSpots: string[] }> = ({ strengths, blindSpots }) => (
    <motion.div {...section(4)} className="grid gap-5 sm:grid-cols-2">
        <div className="p-6 bg-secondary border border-border rounded-2xl">
            <h3 className="text-base font-bold mb-4 text-secondary-foreground">Strengths</h3>
            <ul className="flex flex-col gap-3">
                {strengths.map((s) => (
                    <li key={s} className="flex gap-3 items-start text-foreground text-[15px] leading-snug">
                        <span className="mt-1.5 w-2 h-2 rounded-full shrink-0 bg-primary" />
                        <span>{s}</span>
                    </li>
                ))}
            </ul>
        </div>
        <div className="p-6 bg-muted border border-border rounded-2xl">
            <h3 className="text-base font-bold mb-4 text-muted-foreground">Growth Edges</h3>
            <ul className="flex flex-col gap-3">
                {blindSpots.map((b) => (
                    <li key={b} className="flex gap-3 items-start text-foreground text-[15px] leading-snug">
                        <AlertTriangle className="w-4 h-4 shrink-0 mt-0.5 text-accent" />
                        <span>{b}</span>
                    </li>
                ))}
            </ul>
        </div>
    </motion.div>
);



const ZoneBreakdown: React.FC<{ insights: Result["zoneInsights"] }> = ({ insights }) => {
    const entries = Object.entries(insights);
    return (
        <CardShell i={5}>
            <h3 className="text-lg font-bold text-foreground mb-4">Zone Breakdown</h3>
            <div className="flex flex-col">
                {entries.map(([key, text], idx) => (
                    <div
                        key={key}
                        className={`py-4 ${idx !== 0 ? 'border-t border-border' : ''}`}
                    >
                        <div className="flex items-center gap-2.5 mb-1.5">
                            <span
                                className="w-3 h-3 rounded-full shrink-0"
                                style={{
                                    background: ZONE_KEY_TO_COLOR[key],
                                    boxShadow: `inset 0 0 0 1.5px ${ZONE_KEY_TO_COLOR[key]}80`,
                                }}
                            />
                            <span className="text-xs font-bold tracking-[0.12em] uppercase text-foreground">
                                {ZONE_KEY_TO_LABEL[key] ?? key}
                            </span>
                        </div>
                        <p className="text-[15px] text-muted-foreground leading-snug pl-[22px]">{text}</p>
                    </div>
                ))}
            </div>
        </CardShell>
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



const ShareCard: React.FC<{ shareText: string; onPlayAgain: () => void }> = ({ shareText, onPlayAgain }) => {
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
            <div className="flex flex-col sm:flex-row gap-2.5 justify-center mb-4">
                <ShareBtn onClick={copy} icon={<Link2 className="w-4 h-4" />}>
                    {copied ? "Copied!" : "Copy Link"}
                </ShareBtn>
                <ShareBtn asLink href={tw} icon={<XIcon className="w-4 h-4" />}>Twitter</ShareBtn>
                <ShareBtn asLink href={wa} icon={<MessageCircle className="w-4 h-4" />}>WhatsApp</ShareBtn>
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