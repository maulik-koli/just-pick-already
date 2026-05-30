'use client'
import React from 'react'
import { motion, AnimatePresence } from 'framer-motion';
import { useGameStore, usePlayStore } from '@/store';
import { WORLD_HEIGHT, WORLD_WIDTH, ZONESS_STAICS_DATA, ZONE_STYLES } from '@/constants/game-zones';
import { CHAR_H, CHAR_W, useCharacterMove } from '@/hooks/use-character-move';
import { constGameProgress } from '@/lib/utils';

import Character from './character';
import QuestionModel from './questoin-model';
import NoGameData from './no-game-data';
import CompletionButton from './completion-btn';
import { GameControlles, GameProgress } from './game-hud';


const GameScreenInner: React.FC = () => {
    const zone = useGameStore(state => state.zones)
    const answers = useGameStore(state => state.answers)
    const { x, y, facing, isMoving, activeZone, openZone } = usePlayStore();
    const { containerRef, viewport } = useCharacterMove()

    const cx = x + CHAR_W / 2;
    const cy = y + CHAR_H / 2;

    const camX = Math.max(0, Math.min(WORLD_WIDTH - viewport.w, x + CHAR_W / 2 - viewport.w / 2));
    const camY = Math.max(0, Math.min(WORLD_HEIGHT - viewport.h, y + CHAR_H / 2 - viewport.h / 2));

    const pct = constGameProgress(answers.length);

    const insideZone = ZONESS_STAICS_DATA.find(
        (z) => cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h,
    );
    
    let isInsideCompletedZone = false;
    if (insideZone && zone) {
        const zoneData = zone.find(zd => zd.zone === insideZone.id);
        if (zoneData) {
            const answeredCount = zoneData.questions.filter(q => 
                answers.some(a => a.questionId === q.id)
            ).length;
            isInsideCompletedZone = answeredCount === zoneData.questions.length && zoneData.questions.length > 0;
        }
    }

    React.useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key.toLowerCase() === 'e') {
                if (insideZone && isInsideCompletedZone && !activeZone) {
                    openZone(insideZone.id);
                }
            }
        };
        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [insideZone, isInsideCompletedZone, activeZone, openZone]);


    return (
        <div
            ref={containerRef}
            className="relative w-full h-dvh overflow-hidden! select-none bg-[#F5F0E8] scroll-disable"
        >
            <GameProgress pct={pct} />

            <GameControlles />

            <motion.div
                className="absolute top-0 left-0"
                animate={{ x: -camX, y: -camY }}
                transition={{ type: "tween", ease: "linear", duration: 0.05 }}
                style={{ width: WORLD_WIDTH, height: WORLD_HEIGHT }}
            >
                <div className="absolute inset-0 bg-[#F5F0E8]" />

                <svg 
                    className="absolute inset-0 w-full h-full pointer-events-none"
                    viewBox={`0 0 ${WORLD_WIDTH} ${WORLD_HEIGHT}`}
                    preserveAspectRatio="none"
                >
                    <defs>
                        <radialGradient id="vignette" cx="50%" cy="50%" r="65%">
                        <stop offset="60%" stopColor="rgba(0,0,0,0)" />
                        <stop offset="100%" stopColor="rgba(60,40,20,0.18)" />
                        </radialGradient>
                        <pattern id="hatch" patternUnits="userSpaceOnUse" width="8" height="8" patternTransform="rotate(45)">
                        <line x1="0" y1="0" x2="0" y2="8" stroke="rgba(40,30,20,0.35)" strokeWidth="1.5" />
                        </pattern>
                    </defs>
                    <ellipse cx="300" cy="500" rx="240" ry="170" fill="#E8DCC8" opacity="0.45" />
                    <ellipse cx="1300" cy="450" rx="280" ry="200" fill="#E8DCC8" opacity="0.4" />
                    <ellipse cx="800" cy="180" rx="220" ry="140" fill="#EFE3CE" opacity="0.5" />
                    <ellipse cx="800" cy="820" rx="260" ry="160" fill="#EFE3CE" opacity="0.5" />
                    <ellipse cx="500" cy="850" rx="180" ry="110" fill="#E2D5BE" opacity="0.35" />
                    <ellipse cx="1150" cy="180" rx="160" ry="100" fill="#E2D5BE" opacity="0.35" />
                    <g stroke="#C8B8A8" strokeWidth="1" fill="none" opacity="0.15">
                        <ellipse cx="800" cy="500" rx="500" ry="320" />
                        <ellipse cx="800" cy="500" rx="380" ry="240" />
                        <ellipse cx="800" cy="500" rx="260" ry="160" />
                    </g>
                </svg>

                <div
                    className="absolute inset-0 pointer-events-none"
                    style={{
                        backgroundImage: "radial-gradient(circle, rgba(120,90,60,0.18) 1px, transparent 1px)",
                        backgroundSize: "32px 32px",
                    }}
                />

                <svg
                    className="absolute pointer-events-none"
                    style={{ left: WORLD_WIDTH - 140, top: WORLD_HEIGHT - 140, width: 100, height: 100, opacity: 0.35 }}
                    viewBox="0 0 100 100"
                >
                    <circle cx="50" cy="50" r="44" fill="none" stroke="#8B7355" strokeWidth="1.5" />
                    <circle cx="50" cy="50" r="34" fill="none" stroke="#8B7355" strokeWidth="0.8" strokeDasharray="2 3" />
                    <polygon points="50,10 56,50 50,46 44,50" fill="#C94A4A" />
                    <polygon points="50,90 56,50 50,54 44,50" fill="#8B7355" />
                    <polygon points="10,50 50,44 46,50 50,56" fill="#8B7355" />
                    <polygon points="90,50 50,44 54,50 50,56" fill="#8B7355" />
                    <text x="50" y="8" textAnchor="middle" fontSize="8" fontWeight="700" fill="#5C4A36">N</text>
                </svg>

                {ZONESS_STAICS_DATA.map((z) => {
                    const s = ZONE_STYLES[z.id];
                    
                    const zoneData = zone?.find(zd => zd.zone === z.id);
                    let done = false;
                    if (zoneData) {
                        const answeredCount = zoneData.questions.filter(q => 
                            answers.some(a => a.questionId === q.id)
                        ).length;
                        done = answeredCount === zoneData.questions.length && zoneData.questions.length > 0;
                    }
                    
                    const zcx = z.x + z.w / 2;
                    const zcy = z.y + z.h / 2;
                    const dist = Math.hypot(cx - zcx, cy - zcy);
                    const near = dist < 280 && !done;

                    return (
                        <motion.div
                            key={z.id}
                            className="absolute"
                            style={{
                                left: z.x,
                                top: z.y,
                                width: z.w,
                                height: z.h,
                                transform: `rotate(${s.rotate}deg)`,
                                transformOrigin: "center",
                            }}
                            animate={{
                                filter: near
                                    ? `drop-shadow(0 12px 36px ${s.border}80)`
                                    : `drop-shadow(0 8px 32px ${s.border}4D)`,
                            }}
                            transition={{ duration: 0.4 }}
                        >
                            <div
                                className="absolute inset-0 overflow-hidden"
                                style={{
                                    borderRadius: s.radius,
                                    border: `2px solid ${s.border}`,
                                    background: `radial-gradient(ellipse at 50% 45%, ${s.fill}FF 0%, ${s.fill} 55%, ${s.border}33 100%)`,
                                    backgroundColor: s.fill,
                                }}
                            >
                                <div
                                    className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center select-none"
                                    style={{ 
                                        opacity: 0.12, 
                                        transform: 'rotate(-12deg) scale(1.5)' 
                                    }}
                                >
                                    {Array.from({ length: 7 }).map((_, i) => (
                                        <span 
                                            key={i} 
                                            className="font-black whitespace-nowrap"
                                            style={{
                                                fontSize: Math.min(z.w, z.h) * 0.2,
                                                lineHeight: 0.85,
                                                color: i % 2 === 0 ? s.border : 'transparent',
                                                WebkitTextStroke: i % 2 === 0 ? 'none' : `2px ${s.border}`,
                                                marginLeft: i % 2 === 0 ? '-20%' : '20%',
                                                letterSpacing: '0.05em'
                                            }}
                                        >
                                            {z.name.toUpperCase()} • {z.name.toUpperCase()} • {z.name.toUpperCase()}
                                        </span>
                                    ))}
                                </div>

                                {done && (
                                    <>
                                        <div className="absolute inset-0 bg-black/5 mix-blend-multiply" />
                                        <svg className="absolute inset-0 w-full h-full pointer-events-none mix-blend-overlay" preserveAspectRatio="none">
                                            <rect width="100%" height="100%" fill="url(#hatch)" opacity="0.6" />
                                        </svg>
                                    </>
                                )}
                            </div>

                            <div
                                className="absolute left-0 right-0 flex justify-center items-center gap-1.5 pointer-events-none"
                                style={{ top: 18 }}
                            >
                                <span
                                    className="text-sm font-extrabold uppercase drop-shadow-sm"
                                    style={{
                                        color: s.nameColor,
                                        letterSpacing: "0.18em",
                                    }}
                                >
                                    {z.name}
                                </span>
                                {done && (
                                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke={s.nameColor} strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" className="drop-shadow-sm">
                                        <polyline points="20 6 9 17 4 12"></polyline>
                                    </svg>
                                )}
                            </div>
                        </motion.div>
                    );
                })}

                <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                    <rect width="100%" height="100%" fill="url(#vignette)" />
                </svg>

                <div
                    className="absolute"
                    style={{
                        transform: `translate3d(${x}px, ${y}px, 0)`,
                        width: CHAR_W,
                        height: CHAR_H,
                        transition: "transform 60ms linear",
                        willChange: "transform",
                    }}
                >
                    <Character isMoving={isMoving} facing={facing} />
                </div>
            </motion.div>

            <AnimatePresence>
                {isInsideCompletedZone && !activeZone && (
                    <motion.div 
                        initial={{ opacity: 0, y: -20, x: "-50%" }}
                        animate={{ opacity: 1, y: 0, x: "-50%" }}
                        exit={{ opacity: 0, y: -20, x: "-50%" }}
                        className="absolute top-10 left-1/2 bg-[#F5F0E8]/90 backdrop-blur-sm px-3 py-1.5 rounded-full shadow-md border border-[rgba(139,115,85,0.2)] flex items-center gap-2 z-40 pointer-events-none"
                        style={{ boxShadow: '0 4px 12px rgba(139,115,85,0.1)' }}
                    >
                        <div className="w-5 h-5 rounded-[0.25rem] bg-[#E8DCC8] border border-[rgba(139,115,85,0.3)] flex items-center justify-center font-bold text-[10px] text-[#5C4A36] shadow-sm">
                            E
                        </div>
                        <span className="text-[10px] font-extrabold text-[#5C4A36]/80 tracking-[0.05em] uppercase pr-1">
                            Revisit Zone
                        </span>
                    </motion.div>
                )}
            </AnimatePresence>

            <QuestionModel />

            <CompletionButton />
        </div>
    );
}

const GameScreen: React.FC = () => {
    const zone = useGameStore(state => state.zones)
    
    // only render the game engine if zones are loaded
    if (!zone) return <NoGameData />
    
    return <GameScreenInner />
}

export default GameScreen