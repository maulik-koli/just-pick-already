import React from 'react';
import { motion } from 'framer-motion';
import { Radar, RadarChart, PolarGrid, PolarAngleAxis, PolarRadiusAxis, ResponsiveContainer } from 'recharts';
import { Result } from '@/schemas/result.schema';
import { TRAIT_LABELS } from '@/constants/result-data';

export const section = (i: number) => ({
    initial: { opacity: 0, y: 14 },
    animate: { opacity: 1, y: 0 },
    transition: { duration: 0.45, delay: 0.05 + i * 0.06, ease: [0.22, 1, 0.36, 1] as const },
});

export const CardShell: React.FC<{ children: React.ReactNode; className?: string; i: number; disableAnimation?: boolean }> = ({ children, className, i, disableAnimation }) => {
    if (disableAnimation) {
        return (
            <div className={`bg-card p-7 rounded-[1.25rem] border border-border shadow-sm ${className ?? ''}`}>
                {children}
            </div>
        );
    }
    return (
        <motion.div
            {...section(i)}
            className={`bg-card p-6 rounded-2xl border border-border shadow-[0_6px_20px_-14px_rgba(120,80,40,0.25)] ${className ?? ''}`}
        >
            {children}
        </motion.div>
    );
};

export const IdentityHeader: React.FC<{ data: Result; disableAnimation?: boolean }> = ({ data, disableAnimation }) => {
    const content = (
        <>
            <div className="absolute inset-0 dot-texture opacity-70 pointer-events-none" />
            <div className="absolute -right-6 -top-6 w-32 h-32 rounded-full bg-white/10" />
            <div className="relative">
                <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">{data.title}</h2>
                <div className="my-3 h-[3px] w-12 rounded-full bg-white/55" />
                <p className="text-base sm:text-lg font-medium text-white/88">
                    {data.subtitle}
                </p>
            </div>
        </>
    );

    const className = disableAnimation 
        ? "relative overflow-hidden p-8 text-white bg-primary rounded-[1.25rem] shadow-[0_10px_30px_-12px_rgba(244,98,58,0.45)]"
        : "relative overflow-hidden p-7 text-white bg-primary rounded-2xl shadow-[0_10px_30px_-12px_rgba(244,98,58,0.45)]";

    if (disableAnimation) {
        return <div className={className}>{content}</div>;
    }

    return (
        <motion.div {...section(0)} className={className}>
            {content}
        </motion.div>
    );
};

export const SummaryCard: React.FC<{ text: string; disableAnimation?: boolean }> = ({ text, disableAnimation }) => (
    <CardShell i={1} disableAnimation={disableAnimation}>
        <p className="text-[17px] leading-relaxed text-foreground">{text}</p>
    </CardShell>
);

export const TraitScores: React.FC<{ scores: Result["scores"]; disableAnimation?: boolean }> = ({ scores, disableAnimation }) => {
    const chartData = TRAIT_LABELS.map(({ key, label }) => ({
        subject: label,
        score: scores[key],
    }));

    return (
        <CardShell i={2} disableAnimation={disableAnimation}>
            <h3 className="text-lg font-bold text-foreground mb-5">Your Profile</h3>
            <div className={disableAnimation ? "h-[400px] w-full" : "h-[320px] w-full"}>
                <ResponsiveContainer width="100%" height="100%">
                    <RadarChart cx="50%" cy="50%" outerRadius="65%" data={chartData}>
                        <PolarGrid stroke="var(--border)" />
                        <PolarAngleAxis 
                            dataKey="subject" 
                            tick={{ fill: 'var(--muted-foreground)', fontSize: disableAnimation ? 13 : 11 }}
                            tickLine={false} 
                        />
                        <PolarRadiusAxis domain={[0, 100]} tick={false} axisLine={false} />
                        <Radar
                            name="Profile"
                            dataKey="score"
                            stroke="var(--primary)"
                            fill="var(--primary)"
                            fillOpacity={0.4}
                            isAnimationActive={!disableAnimation}
                        />
                    </RadarChart>
                </ResponsiveContainer>
            </div>
        </CardShell>
    );
};

export const TopTraits: React.FC<{ traits: string[]; disableAnimation?: boolean }> = ({ traits, disableAnimation }) => (
    <CardShell i={3} disableAnimation={disableAnimation}>
        <h3 className="text-lg font-black tracking-tight text-foreground mb-5">Defining Traits</h3>
        <div className={disableAnimation ? "flex flex-wrap gap-3" : "flex flex-wrap gap-2.5"}>
            {traits.map((t, i) => {
                const className = disableAnimation 
                    ? "text-[13px] font-black tracking-[0.05em] uppercase px-4 py-2 rounded-xl bg-accent text-accent-foreground border-b-4 border-black/15"
                    : "text-[11px] sm:text-[12px] font-black tracking-[0.06em] uppercase px-4 py-2 rounded-xl bg-accent text-accent-foreground border-b-[3px] border-black/15 shadow-sm hover:-translate-y-0.5 hover:shadow-md transition-all cursor-default select-none";

                if (disableAnimation) {
                    return <span key={t} className={className}>{t}</span>;
                }

                return (
                    <motion.span
                        key={t}
                        initial={{ opacity: 0, scale: 0.7 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.35, delay: 0.4 + i * 0.07, type: "spring", stiffness: 280, damping: 18 }}
                        className={className}
                    >
                        {t}
                    </motion.span>
                );
            })}
        </div>
    </CardShell>
);
