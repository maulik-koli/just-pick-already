'use client'
import React from 'react'
import { motion } from 'framer-motion';

interface CharacterProps {
    isMoving: boolean;
    facing: "left" | "right";
    duration?: number
}

const Character: React.FC<CharacterProps> = ({ isMoving, facing, duration }) => {
    const dur = isMoving ? (duration ? duration : 0.4) : 1.8;
    const ease = "easeInOut" as const;

    const swing = isMoving
        ? { rotate: [12, -12, 12], transition: { duration: dur, repeat: Infinity, ease } }
        : { rotate: 0 };
    const swingOpp = isMoving
        ? { rotate: [-12, 12, -12], transition: { duration: dur, repeat: Infinity, ease } }
        : { rotate: 0 };
    const legA = isMoving
        ? { rotate: [-18, 18, -18], transition: { duration: dur, repeat: Infinity, ease } }
        : { rotate: 0 };
    const legB = isMoving
        ? { rotate: [18, -18, 18], transition: { duration: dur, repeat: Infinity, ease } }
        : { rotate: 0 };
    const bob = isMoving
        ? { y: [0, -3, 0], transition: { duration: dur, repeat: Infinity, ease } }
        : { y: [0, -1.5, 0], transition: { duration: dur, repeat: Infinity, ease } };

    return (
        <motion.div
        animate={bob}
        style={{ transform: `scaleX(${facing === "right" ? 1 : -1})` }}
        className="relative w-12 h-16"
        >
        <div className="absolute left-1/2 -translate-x-1/2 top-0 w-6 h-6 rounded-full bg-primary shadow-md ring-2 ring-white" />
        <div className="absolute left-1/2 -translate-x-1/2 top-6 w-1.5 h-6 bg-foreground rounded-full" />
        <motion.div
            animate={swing}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 -translate-x-1/2 top-7 w-1.5 h-5 bg-foreground rounded-full"
        />
        <motion.div
            animate={swingOpp}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 -translate-x-1/2 top-7 w-1.5 h-5 bg-foreground rounded-full"
        />
        <motion.div
            animate={legA}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 -translate-x-1/2 top-12 w-1.5 h-4 bg-foreground rounded-full"
        />
        <motion.div
            animate={legB}
            style={{ transformOrigin: "top center" }}
            className="absolute left-1/2 -translate-x-1/2 top-12 w-1.5 h-4 bg-foreground rounded-full"
        />
        <div className="absolute left-1/2 -translate-x-1/2 top-[64px] w-8 h-1.5 bg-black/15 rounded-full blur-[2px]" />
        </motion.div>
    );
}

export default Character