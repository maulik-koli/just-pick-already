'use client'
import React, { useEffect, useState } from 'react'
import { motion } from "framer-motion";
import Character from '@/components/game/character';
import OsuCircles, { OsuScoreState } from '@/components/game/circle-game';

const MESSAGES = [
    "Analyzing your decision style...",
    "Creating personalized dilemmas...",
    "Preparing your personality journey...",
    "Almost ready...",
];


interface LoadingScreenProps {
    isLoading: boolean;
}

const LoadingScreen: React.FC<LoadingScreenProps> = ({ isLoading }) => {
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);
    const [osuScore, setOsuScore] = useState<OsuScoreState>({ score: 0, combo: 0 })

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;
        let messageInterval: NodeJS.Timeout;

        if (isLoading) {
            progressInterval = setInterval(() => {
                setProgress((prev) => (prev >= 90 ? 90 : prev + 1.5));
            }, 50);

            messageInterval = setInterval(() => {
                setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
            }, 1000);
        } else {
            setProgress(100);
        }

        return () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
        };
    }, [isLoading]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-60 bg-background"
            style={{ width: '100vw', height: '100dvh', overflow: 'hidden' }}
        >
            <OsuCircles active={isLoading} onScoreChange={setOsuScore} />

            <div className="absolute top-5 left-6 pointer-events-none" style={{ zIndex: 30 }}>
                <p className="text-xs text-muted-foreground mb-0.5">score</p>
                <p className="text-xl font-medium text-foreground tabular-nums">
                    {osuScore.score.toLocaleString()}
                </p>
            </div>
            <div className="absolute top-5 right-6 text-right pointer-events-none" style={{ zIndex: 30 }}>
                <p className="text-xs text-muted-foreground mb-0.5">combo</p>
                <p className="text-xl font-medium text-foreground tabular-nums">
                    {osuScore.combo}x
                </p>
            </div>

            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none" style={{ zIndex: 15 }}>
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

                <motion.p
                    key={isLoading ? msgIdx : "done"}
                    initial={{ opacity: 0, y: 4 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="text-sm font-medium text-muted-foreground"
                >
                    {isLoading ? MESSAGES[msgIdx] : "Ready! Let's go!"}
                </motion.p>
            </div>
        </motion.div>
    );
}

export default LoadingScreen