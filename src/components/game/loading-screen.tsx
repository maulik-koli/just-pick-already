'use client'
import React, { useEffect, useState } from 'react'
import { useRouter } from 'next/navigation';
import { motion } from "framer-motion";
import Character from './character';

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
    const router = useRouter();
    const [progress, setProgress] = useState(0);
    const [msgIdx, setMsgIdx] = useState(0);

    useEffect(() => {
        let progressInterval: NodeJS.Timeout;
        let messageInterval: NodeJS.Timeout;
        let doneTimeout: NodeJS.Timeout;

        if (isLoading) {
            progressInterval = setInterval(() => {
                setProgress((prev) => (prev >= 90 ? 90 : prev + 1.5));
            }, 50);

            messageInterval = setInterval(() => {
                setMsgIdx((prev) => (prev + 1) % MESSAGES.length);
            }, 1000);
        } else {
            setProgress(100);
            doneTimeout = setTimeout(() => {
                router.push("/game");
            }, 800);
        }

        return () => {
            clearInterval(progressInterval);
            clearInterval(messageInterval);
            clearTimeout(doneTimeout);
        };
    }, [isLoading, router]);


    return (
        <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            className="fixed inset-0 z-60 flex flex-col items-center justify-center bg-background "
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

            <motion.p
                key={isLoading ? msgIdx : "done"}
                initial={{ opacity: 0, y: 4 }}
                animate={{ opacity: 1, y: 0 }}
                className="text-sm font-medium text-muted-foreground"
            >
                {isLoading ? MESSAGES[msgIdx] : "Ready! Let's go!"}
            </motion.p>
        </motion.div>
    );
}

export default LoadingScreen