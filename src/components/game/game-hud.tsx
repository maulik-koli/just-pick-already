'use client'
import React from 'react'
import { motion } from 'framer-motion';

interface GameProgressProps {
    pct: number
}


export const GameProgress: React.FC<GameProgressProps> = ({ pct }) => {
    const ringSize = 64;
    const ringStroke = 6;
    const ringRadius = (ringSize - ringStroke) / 2;
    const ringCirc = 2 * Math.PI * ringRadius;
    const ringOffset = ringCirc * (1 - pct / 100);

    return (
        <div
            className="absolute w-24 top-4 left-4 z-30 flex flex-col items-center gap-2 px-3 py-3 rounded-2xl"
            style={{
                background: "rgba(26,26,26,0.75)",
                backdropFilter: "blur(8px)",
                WebkitBackdropFilter: "blur(8px)",
            }}
        >
            <div className="text-[8px] font-bold tracking-[0.15em] uppercase text-center leading-tight text-primary">
                Just Pick<br />Already
            </div>
                <div className="relative" style={{ width: ringSize, height: ringSize }}>
                <svg width={ringSize} height={ringSize} className="-rotate-90">
                    <circle
                        cx={ringSize / 2}
                        cy={ringSize / 2}
                        r={ringRadius}
                        fill="none"
                        stroke="rgba(255,255,255,0.15)"
                        strokeWidth={ringStroke}
                    />
                    <motion.circle
                        cx={ringSize / 2}
                        cy={ringSize / 2}
                        r={ringRadius}
                        fill="none"
                        stroke="#F4623A"
                        strokeWidth={ringStroke}
                        strokeLinecap="round"
                        strokeDasharray={ringCirc}
                        initial={false}
                        animate={{ strokeDashoffset: ringOffset }}
                        transition={{ type: "spring", damping: 24, stiffness: 160 }}
                    />
                </svg>
                <div className="absolute inset-0 flex items-center justify-center text-white font-bold text-base">
                    {pct}%
                </div>
                </div>
        </div>
    )
}



export const GameControlles: React.FC = () => {
    return (
        <>
            <div
                className="absolute top-4 right-4 z-30 hidden md:block rounded-xl px-2.5 py-2 backdrop-blur"
                style={{ backgroundColor: "rgba(26,26,26,0.75)", border: "1px solid rgba(255,255,255,0.08)" }}
            >
                <div className="flex items-center gap-2">
                    <div className="grid grid-cols-3 grid-rows-2 gap-[3px]">
                        <div /><Key>↑</Key><div />
                        <Key>←</Key><Key>↓</Key><Key>→</Key>
                    </div>
                    <span className="text-[7px] uppercase tracking-widest text-white/40">or</span>
                    <div className="grid grid-cols-3 grid-rows-2 gap-[3px]">
                        <div /><Key>W</Key><div />
                        <Key>A</Key><Key>S</Key><Key>D</Key>
                    </div>
                </div>
                <div className="mt-1.5 text-center text-[8px] text-white/50">walk into a zone to begin</div>
            </div>
            <div 
                className="absolute top-4 right-4 z-30 md:hidden rounded-full px-3 py-1.5 text-[10px] text-white"
                style={{ backgroundColor: "rgba(26,26,26,0.75)" }}
            >
                tap a zone to begin
            </div>
        </>

    )
}

function Key({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex items-center justify-center w-5 h-5 rounded-[4px] bg-[#2A2A2A] border border-white/15 text-white text-[8px] font-semibold font-mono shadow-inner">
            {children}
        </div>
    );
}