"use client"
import React, { useState } from 'react';
import { Card, Button } from '@heroui/react';
import { cn } from '@heroui/react';

interface MoveExamplesProps {
    slug: string;
}

// In a real scenario, this would be highly dynamic based on the framework
// We'll mock a couple of example formats to prove flexibility

const MOCK_EXAMPLES = [
    {
        id: "ex1",
        title: "Choosing a Tech Stack",
        scenario: "A startup deciding whether to use React, Vue, or Svelte.",
        type: "table",
        content: (
            <div className="overflow-x-auto w-full border border-border rounded-lg mt-4 bg-background">
                <table className="w-full text-sm text-left">
                    <thead className="text-xs uppercase bg-foreground/5 border-b border-border">
                        <tr>
                            <th className="px-4 py-3">Criteria</th>
                            <th className="px-4 py-3">React (Score)</th>
                            <th className="px-4 py-3">Vue (Score)</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr className="border-b border-border text-text-secondary">
                            <td className="px-4 py-3 font-medium text-foreground">Community Size (x2)</td>
                            <td className="px-4 py-3">9 (18)</td>
                            <td className="px-4 py-3">7 (14)</td>
                        </tr>
                        <tr className="border-b border-border text-text-secondary">
                            <td className="px-4 py-3 font-medium text-foreground">Learning Curve (x1)</td>
                            <td className="px-4 py-3">6 (6)</td>
                            <td className="px-4 py-3">8 (8)</td>
                        </tr>
                        <tr className="bg-primary/5 text-primary font-semibold">
                            <td className="px-4 py-3">Total Score</td>
                            <td className="px-4 py-3">24</td>
                            <td className="px-4 py-3">22</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    {
        id: "ex2",
        title: "Quitting a Job vs Staying",
        scenario: "Evaluating whether to stay at a toxic job with high pay or leave for lower pay.",
        type: "narrative",
        content: (
            <div className="w-full mt-4 prose prose-sm prose-neutral text-text-secondary">
                <p>
                    <strong>The Setup:</strong> The person is miserable but making great money.
                </p>
                <p className="border-l-2 border-primary pl-4 italic my-4">
                    "If I fast forward 10 years, will I regret leaving this money?" — Unlikely, health is more important.
                    "Will I regret staying and burning out?" — Absolutely.
                </p>
                <p>
                    <strong>The Decision:</strong> Leave the job. The long-term physical and mental toll drastically outweighs the short-term financial dip.
                </p>
            </div>
        )
    }
];

const MoveExamples: React.FC<MoveExamplesProps> = ({ slug }) => {
    const [expandedExample, setExpandedExample] = useState<string | null>(null);

    const toggleExpand = (id: string) => {
        if (expandedExample === id) {
            setExpandedExample(null);
        } else {
            setExpandedExample(id);
        }
    };

    return (
        <section className="w-full py-12 flex flex-col gap-6 md:gap-8 bg-background relative">
            <div className="flex flex-col gap-2">
                <h2 className="text-2xl md:text-3xl font-bold text-foreground">
                    Real-World Applications
                </h2>
                <p className="text-text-secondary md:w-2/3">
                    See how others have successfully applied this framework to their complex decisions.
                </p>
            </div>

            <div className="flex flex-col gap-4">
                {MOCK_EXAMPLES.map((example) => {
                    const isExpanded = expandedExample === example.id;

                    return (
                        <Card
                            key={example.id}
                            className={cn(
                                "flex flex-col border transition-all duration-300 overflow-hidden",
                                isExpanded 
                                    ? "bg-card border-primary/30 shadow-md" 
                                    : "bg-foreground/5 border-transparent shadow-none hover:bg-foreground/10 cursor-pointer"
                            )}
                            onClick={() => !isExpanded && toggleExpand(example.id)}
                        >
                            <div className="flex flex-col md:flex-row items-baseline md:items-center justify-between p-5 gap-4">
                                <div className="flex flex-col gap-1">
                                    <h3 className={cn(
                                        "font-semibold text-lg",
                                        isExpanded ? "text-primary" : "text-foreground"
                                    )}>
                                        {example.title}
                                    </h3>
                                    <p className="text-sm text-text-secondary font-medium">
                                        {example.scenario}
                                    </p>
                                </div>

                                <Button 
                                    size="sm" 
                                    variant="light" 
                                    className="shrink-0 text-text-muted hover:text-foreground"
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        toggleExpand(example.id);
                                    }}
                                >
                                    {isExpanded ? 'Hide Details' : 'View Breakdown'}
                                    <svg 
                                        className={cn(
                                            "w-4 h-4 ml-2 transition-transform duration-200",
                                            isExpanded ? "rotate-180" : ""
                                        )} 
                                        fill="none" 
                                        viewBox="0 0 24 24" 
                                        stroke="currentColor"
                                    >
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                                    </svg>
                                </Button>
                            </div>

                            <div className={cn(
                                "grid transition-all duration-300 ease-in-out px-5 pb-5",
                                isExpanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0 pb-0 px-5"
                            )}>
                                <div className="overflow-hidden">
                                    {isExpanded && example.content}
                                </div>
                            </div>
                        </Card>
                    );
                })}
            </div>
        </section>
    );
};

export default MoveExamples;
