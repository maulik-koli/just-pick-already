"use client"
import React, { useState } from 'react';
import { Card, Button, cn } from '@heroui/react';
import { MovesType } from '@/type/move';
import Icon from '@/components/icons';

interface MoveAiInsightsProps {
    slug: string;
}

const MOCK_QUERIES: Record<string, string[]> = {
    'decision-matrix': [
        "Are there hidden biases in my scoring?",
        "What factors might I be overlooking?",
        "How would a highly risk-averse person score this?",
    ],
    'regret-minimization': [
        "What is the most common regret in this scenario?",
        "How can I better visualize the worst-case scenario?",
        "Am I letting short-term fear cloud my judgment?",
    ]
};

const DEFAULT_QUERIES = [
    "What are the blind spots in this decision?",
    "How can I minimize risk before committing?",
    "What's the best next step if I choose option A?"
];

const MoveAiInsights: React.FC<MoveAiInsightsProps> = ({ slug }) => {
    const [selectedQuery, setSelectedQuery] = useState<string | null>(null);
    const [isGenerating, setIsGenerating] = useState(false);
    
    const queries = MOCK_QUERIES[slug as MovesType] || DEFAULT_QUERIES;

    const handleQuerySelect = (query: string) => {
        setSelectedQuery(query);
        setIsGenerating(true);
        setTimeout(() => setIsGenerating(false), 20000);
    };


    return (
        <section className="w-full py-12 flex flex-col gap-8 font-body">
            <div className="flex flex-col gap-2">
                <div className="flex items-center gap-2 mb-1">
                    <span className="bg-primary/10 text-primary font-bold px-2 py-0.5 rounded text-xs tracking-wider uppercase">
                        AI Assistant
                    </span>
                </div>
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Deepen Your Thinking
                </h2>
                <p className="text-text-secondary md:w-3/4">
                    Leverage AI to expose blindspots, test hypotheses, and interrogate your framework objectively.
                </p>
            </div>

            <div className="flex flex-col md:flex-row gap-6 lg:gap-10 mt-2 h-[500px]">

                <div className="flex flex-col w-full md:w-1/4 shrink-0 gap-3 overflow-y-auto pr-2 pb-4 touch-pan-y">
                    <span className="text-xs font-semibold text-text-muted uppercase tracking-widest mb-2 pl-1">
                        Contextual Queries
                    </span>
                    {queries.map((query, idx) => (
                        <button
                            key={idx}
                            onClick={() => handleQuerySelect(query)}
                            className={cn(
                                "text-left text-sm px-4 py-3 rounded-lg border transition-all duration-200",
                                selectedQuery === query 
                                    ? "bg-foreground/5 border-border shadow-sm font-medium text-foreground" 
                                    : "bg-card border-transparent hover:border-border/50 hover:bg-black/5 text-text-secondary"
                            )}
                        >
                            {query}
                        </button>
                    ))}
                </div>

                <Card className="flex-1 border border-border bg-card rounded-2xl flex flex-col relative overflow-hidden h-full shadow-sm">
                    {!selectedQuery ? (
                        <div className="h-full flex flex-col items-center justify-center text-text-muted gap-4 my-auto p-8 text-center">
                            <Icon name='FlaskConical' width={48} height={48} className='opacity-70' />
                            <p className="text-base ">Select a query to generate an AI insight based on the specific inputs in your framework.</p>
                        </div>
                    ) : isGenerating ? (
                        <div className="h-full flex flex-col items-start gap-4 p-6 sm:p-8 overflow-y-auto">
                            <h3 className="text-lg font-semibold text-foreground border-b border-border pb-4 w-full">
                                {selectedQuery}
                            </h3>
                            <div className="w-full flex flex-col gap-4 mt-6 animate-pulse">
                                <div className="h-4 bg-border/50 rounded w-full"></div>
                                <div className="h-4 bg-border/50 rounded w-full"></div>
                                <div className="h-4 bg-border/50 rounded w-5/6"></div>
                                <div className="h-4 bg-border/50 rounded w-4/6 mt-4"></div>
                                <div className="h-4 bg-border/50 rounded w-full"></div>
                            </div>
                        </div>
                    ) : (
                        <div className="flex flex-col h-full overflow-y-auto animate-fadeIn relative">
                            <div className="sticky top-0 bg-card/90 backdrop-blur-sm z-10 px-6 sm:px-8 py-5 border-b border-border">
                                <h3 className="text-lg font-semibold text-foreground">
                                    {selectedQuery}
                                </h3>
                            </div>
                            

                            <div className="p-6 sm:px-8 sm:py-6 prose prose-neutral max-w-none text-text-secondary w-full">
                                <p className="text-base leading-relaxed mb-4">
                                    Based on the data you've inputted into the framework, there appears to be a heavy weighting 
                                    towards short-term financial gains versus long-term strategic alignment.
                                </p>
                                <p className="text-base leading-relaxed mb-4">
                                    This introduces a significant blindspot specifically regarding your "Time to Market" variable. You scored Option A very high here, but checking historical precedent on similar projects indicates these consistently slip by 30-40%.
                                </p>
                                <div className="my-6 p-5 bg-warning/5 border-l-4 border-warning rounded-r-lg">
                                    <strong className="text-warning-800 dark:text-warning-600 block mb-2">Consider Re-evaluating:</strong>
                                    <ul className="list-disc pl-5 m-0 space-y-1 text-sm text-warning-900 dark:text-warning-300">
                                        <li>Are your timeline variables reflecting best-case scenarios or median outcomes?</li>
                                        <li>What is the concrete cost of inaction if Option C is delayed?</li>
                                    </ul>
                                </div>
                                <p className="text-base leading-relaxed">
                                    If you run the regrets simulation again assuming a 6-month delay on Option A, does your mathematical best-choice change?
                                </p>
                            </div>
                            

                            <div className="mt-auto p-4 sm:p-6 bg-foreground/5 border-t border-border flex flex-wrap justify-end gap-3 shrink-0">
                                <Button variant="bordered" className="border-border text-foreground bg-card shadow-sm h-10 font-medium">
                                    Copy Insight
                                </Button>
                                <Button className="bg-primary text-primary-foreground shadow-md h-10 font-medium">
                                    Adjust Framework
                                </Button>
                            </div>
                        </div>
                    )}
                </Card>
            </div>
        </section>
    );
};

export default MoveAiInsights;
