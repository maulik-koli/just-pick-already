'use client'
import React from 'react';
import { MovesType } from '@/type/move';

import { Card, cn } from '@heroui/react';
import Icon from '@/components/icons';
import DecisionMatrix from '../decision-matrix/components/main';
import { useRestMovesData } from '@/hooks/use-reset';

const MOVES_MAP: Record<MovesType, React.ComponentType> = {
    'decision-matrix': DecisionMatrix,
    "10-10-10-rule": () => <div>10-10-10-rule</div>,
    "eisenhower-matrix": () => <div>eisenhower-matrix</div>,
    "pre-mortem": () => <div>pre-mortem</div>,
    "regret-minimization": () => <div>regret-minimization</div>,
    "second-order-thinking": () => <div>second-order-thinking</div>
}

interface MoveInteractiveProps {
    slug: string
}


const MoveInteractive: React.FC<MoveInteractiveProps> = ({ slug }) => {
    const resetData = useRestMovesData(slug as MovesType)

    const getInteractiveContent = () => {
        const Component = MOVES_MAP[slug as MovesType]

        if (Component) {
            return <Component />
        }

        return (
            <div className="w-full min-h-[400px] bg-background border border-border rounded-xl flex items-center justify-center p-8 shadow-inner shadow-primary/5">
                <p className="text-text-secondary">Load Framework Builder Component</p>
            </div>
        );
    };


    return (
        <section className="w-full flex flex-col gap-6 relative z-10">
            <div className="absolute inset-x-0 -top-20 -bottom-20 bg-background/50 pointer-events-none rounded-3xl" />
            <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-[500px] max-w-[800px] bg-primary/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="flex justify-between items-end relative z-10 mb-2">
                <div className="w-full flex-col flex">
                    <h2 className="text-2xl md:text-3xl font-bold text-foreground mb-2">
                        Build your Framework
                    </h2>
                    <p className="text-text-secondary md:w-4/5 w-full">
                        Apply this framework directly to your specific decision. 
                        Add your options, adjust your variables, and find your answer.
                    </p>
                </div>
            </div>

            <Card
                className={cn(
                    "w-full bg-card shadow-lg shadow-black/5 border border-border rounded-3xl overflow-visible",
                    "transition-all duration-300 relative z-10"
                )}
                radius="lg"
            >
                <div className="px-6 py-4 flex items-center justify-between border-b border-border/50">
                    <div className="flex items-center gap-2 text-primary font-medium text-sm">
                        <Icon name='GalleryVerticalEnd' width={16} height={16} />
                        Workspace
                    </div>
                    <button 
                        className="text-sm font-medium text-text-muted hover:text-foreground transition-colors cursor-pointer"
                        onClick={resetData}
                    >
                        Clear Data
                    </button>
                </div>

                <div className="p-4 sm:p-6 relative overflow-x-auto w-full">
                    {getInteractiveContent()}
                </div>
            </Card>
        </section>
    );
};

export default MoveInteractive;
