'use client'
import React from 'react'
import { motion } from 'framer-motion';
import { Zone } from '@/generated/prisma/enums';
import { useGameStore, usePlayStore } from '@/store';
import { WORLD_HEIGHT, WORLD_WIDTH, ZONESS_STAICS_DATA } from '@/constants/game-zones';
import { CHAR_H, CHAR_W, useCharacterMove } from '@/hooks/use-character-move';

import Character from './character';
import QuestionModel from './questoin-mode';
import { GameControlles, GameProgress } from './game-hud';

type ZoneStyleType = Record<
    Zone,
    { fill: string; border: string; nameColor: string; letter: string; radius: string; rotate: number }
>

const ZONE_STYLES: ZoneStyleType = {
    SOCIAL_SITUATOINS: {
        fill: "#FFD4B8",
        border: "#E8956A",
        nameColor: "#9A4A1E",
        letter: "S",
        radius: "38% 62% 55% 45% / 48% 40% 60% 52%",
        rotate: -1.5,
    },
    RELATIONSHIPS: {
        fill: "#FFB8B8",
        border: "#D96A6A",
        nameColor: "#8A2E2E",
        letter: "R",
        radius: "58% 42% 48% 52% / 40% 56% 44% 60%",
        rotate: 2,
    },
    CAREER: {
        fill: "#FFF0B8",
        border: "#D4A835",
        nameColor: "#7A5A12",
        letter: "C",
        radius: "46% 54% 60% 40% / 52% 44% 56% 48%",
        rotate: -1,
    },
    MORAL_GRAY_AREAS: {
        fill: "#B8E8C8",
        border: "#5EA87A",
        nameColor: "#2E6A44",
        letter: "M",
        radius: "52% 48% 42% 58% / 44% 60% 40% 56%",
        rotate: 1.5,
    },
    INPULSE_VS_LOGIC: {
        fill: "#D4B8F0",
        border: "#8A5EC8",
        nameColor: "#4A2E7A",
        letter: "I",
        radius: "44% 56% 50% 50% / 58% 42% 56% 44%",
        rotate: -2,
    },
};


const GameScreen: React.FC = () => {
    const zone = useGameStore(state => state.zones)
    const { x, y, facing, isMoving } = usePlayStore();
    const { containerRef, viewport } = useCharacterMove()

    const cx = x + CHAR_W / 2;
    const cy = y + CHAR_H / 2;

    const camX = Math.max(0, Math.min(WORLD_WIDTH - viewport.w, x + CHAR_W / 2 - viewport.w / 2));
    const camY = Math.max(0, Math.min(WORLD_HEIGHT - viewport.h, y + CHAR_H / 2 - viewport.h / 2));

    if (!zone) {
        <p>no data</p>
    }

    return (
        <div
            ref={containerRef}
            className="relative w-screen h-screen overflow-hidden! select-none bg-[#F5F0E8] scroll-disable"
        >
            <GameProgress pct={47} />

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
                    const done = false;
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
                                    className="absolute font-black select-none pointer-events-none"
                                    style={{
                                        right: 8,
                                        bottom: -28,
                                        fontSize: Math.min(z.w, z.h) * 0.85,
                                        lineHeight: 1,
                                        color: s.border,
                                        opacity: 0.06,
                                        fontFamily: "ui-serif, Georgia, serif",
                                    }}
                                >
                                    {s.letter}
                                </div>

                                {done && (
                                    <svg className="absolute inset-0 w-full h-full pointer-events-none" preserveAspectRatio="none">
                                        <rect width="100%" height="100%" fill="url(#hatch)" opacity="0.35" />
                                    </svg>
                                )}
                            </div>

                            <div
                                className="absolute left-0 right-0 flex justify-center pointer-events-none"
                                style={{ top: 18 }}
                            >
                                <span
                                    className="text-sm font-extrabold uppercase"
                                    style={{
                                        color: s.nameColor,
                                        letterSpacing: "0.18em",
                                        textDecoration: done ? "line-through" : "none",
                                        textDecorationThickness: 1.5,
                                    }}
                                >
                                    {z.name}
                                </span>
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

            <QuestionModel />
        </div>
    );
}

export default GameScreen