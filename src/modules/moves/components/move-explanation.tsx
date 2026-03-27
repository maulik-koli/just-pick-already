'use client'
import React, { useState } from 'react';
import { cn, Button } from '@heroui/react';
import { motion, AnimatePresence } from 'framer-motion';
import { MOVES_EXPLANATOIN } from '@/constants/explanation';
import Icon from '@/components/icons';
import { MovesType } from '@/type/move';

interface MoveExplanationProps {
    slug: string;
}


const MoveExplanation: React.FC<MoveExplanationProps> = ({ slug }) => {
    const [ isExpanded, setIsExpanded ] = useState(false);
    
    const explanationData = MOVES_EXPLANATOIN[slug as MovesType];
    
    if (!explanationData || !explanationData.steps || explanationData.steps.length === 0) return null;

    const { whyItWork, steps } = explanationData;
    const minFullSteps = 2; 
    const hasMoreSteps = steps.length > minFullSteps;
    
    const previewStepsCount = hasMoreSteps ? minFullSteps + 1 : steps.length;
    const visibleSteps = isExpanded ? steps : steps.slice(0, previewStepsCount);


    return (
        <section className="w-full flex flex-col gap-10 md:gap-14">
            
            {whyItWork && (
                <div className="flex flex-col gap-4 bg-primary/5 p-6 md:p-8 rounded-2xl border border-primary/10">
                    <h2 className="text-xl md:text-2xl font-bold text-foreground">
                        Why it works
                    </h2>
                    <p className="text-text-secondary leading-relaxed md:w-5/6 text-base md:text-lg">
                        {whyItWork}
                    </p>
                </div>
            )}

            <div className="flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-16">
                
                <div className="flex-1 flex flex-col gap-8 md:gap-12 w-full">
                    <div className="flex flex-col gap-2">
                        <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                            How it works
                        </h2>
                        <p className="text-text-secondary md:w-3/4">
                            Follow these sequential steps to apply the framework effectively. Let the process guide your judgment.
                        </p>
                    </div>

                    <div className="flex flex-col relative before:absolute before:inset-0 before:ml-5 before:-translate-x-px md:before:ml-5.5 md:before:translate-x-0 before:h-full before:w-0.5 before:bg-linear-to-b before:from-transparent before:via-border before:to-transparent">
                        <AnimatePresence initial={false}>
                            {visibleSteps.map((step, idx) => {
                                const isFaded = !isExpanded && hasMoreSteps && idx === minFullSteps;
                                return (
                                <motion.div 
                                    key={step.id} 
                                    initial={{ opacity: 0, height: 0 }}
                                    animate={{ opacity: 1, height: 'auto' }}
                                    exit={{ opacity: 0, height: 0 }}
                                    transition={{ duration: 0.3, ease: 'easeInOut' }}
                                    className={cn(
                                        "relative flex items-start gap-4 md:gap-6 pb-8 last:pb-0 z-10 group overflow-hidden transition-all duration-500",
                                        isFaded && "opacity-30 blur-[1px] select-none pointer-events-none"
                                    )}
                                >
                                    <div className="flex shrink-0 mt-1 items-center justify-center w-10 h-10 md:w-11 md:h-11 rounded-full bg-background border-2 border-border group-hover:border-primary group-hover:bg-primary/5 transition-colors duration-300">
                                        <span className="text-primary font-bold text-sm md:text-base">
                                            {idx + 1}
                                        </span>
                                    </div>
                                    
                                    <div className="flex flex-col gap-2 pt-1 md:pt-2 w-full">
                                        <h3 className="text-xl font-semibold text-foreground group-hover:text-primary transition-colors duration-300">
                                            {step.title}
                                        </h3>
                                        <p className="text-base text-text-secondary leading-relaxed max-w-[800px]">
                                            {step.description}
                                        </p>
                                    </div>
                                </motion.div>
                                );
                            })}
                        </AnimatePresence>
                    </div>

                    {hasMoreSteps && (
                        <div className="flex items-center justify-center w-full mt-2">
                            <Button 
                                variant="flat" 
                                color="primary"
                                className="font-medium px-8 w-full sm:w-auto"
                                onPress={() => setIsExpanded(!isExpanded)}
                                endContent={
                                    <Icon 
                                        name="MoveDown" 
                                        width={16} 
                                        height={16} 
                                        className={cn("transition-transform duration-300", isExpanded ? "rotate-180" : "rotate-0")} 
                                    />
                                }
                            >
                                {isExpanded ? "Show Less" : "Show All Steps"}
                            </Button>
                        </div>
                    )}
                </div>

                <div className="hidden md:flex shrink-0 items-center justify-center w-48 h-48 lg:w-64 lg:h-64 rounded-3xl bg-primary/5 border border-primary/10 shadow-primaryGlow sticky overflow-hidden top-32">
                    Mascot
                </div>
            </div>
        </section>
    );
};

export default MoveExplanation;
