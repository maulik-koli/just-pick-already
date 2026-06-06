import React from 'react'
import { Result } from '@/schemas/result.schema'
import { Sparkles } from 'lucide-react'


export const ShareBtn: React.FC<{
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

export const SurprisingChoice: React.FC<{ mc: Result["mostSurprisingChoice"] }> = ({ mc }) => (
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

export const SectionDivider: React.FC<{ label: string }> = ({ label }) => (
    <div className="flex items-center gap-4 px-2">
        <div className="h-px bg-border flex-1" />
        <span className="text-[10px] sm:text-xs font-black text-muted-foreground uppercase tracking-[0.25em] shrink-0">
            {label}
        </span>
        <div className="h-px bg-border flex-1" />
    </div>
)