'use client'
import React, { useState } from 'react'
import { Button, cn, Progress } from '@heroui/react'
import { motion } from 'framer-motion'

import Icon from '@/components/icons'
import { useDecisionMatrixResults } from '../hooks/use-decision-matrix-results'
import { staggerContainer, fadeInUp } from '@/lib/animations'

const getRankIcon = (rank: number) => {
    switch (rank) {
        case 1: return <span className="text-xl leading-none">🥇</span>
        case 2: return <span className="text-xl leading-none">🥈</span>
        case 3: return <span className="text-xl leading-none">🥉</span>
        default: return <span className="text-sm font-bold text-default-400 w-5 text-center">{rank}</span>
    }
}


const ResultsPanel: React.FC = () => {
    const { results, maxPossibleScore } = useDecisionMatrixResults()
    const [showResults, setShowResults] = useState(false)
    const [copied, setCopied] = useState(false)

    if (results.length === 0) return null

    const handleCopy = () => {
        let text = "My Decision Matrix Results:\n\n"
        results.forEach(res => {
            const name = res.name || 'Unnamed Choice'
            text += `${res.rank}. ${name} - SCORE: ${res.score}/${res.maxScore} (${Math.round(res.percentage)}%)\n`
        })
        navigator.clipboard.writeText(text)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }


    return (
        <div className="flex flex-col gap-4 mt-6">
            {!showResults ? (
                <motion.div 
                    initial={{ opacity: 0, y: 10 }} 
                    animate={{ opacity: 1, y: 0 }} 
                    className="flex justify-center"
                >
                    <Button 
                        color="primary" 
                        size="md"
                        radius="full" 
                        onPress={() => setShowResults(true)}
                        startContent={<Icon name='Trophy' width={16} height={16} />}
                        className="font-medium"
                    >
                        Show Results
                    </Button>
                </motion.div>
            ) : (
                <motion.div
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3 }}
                    className="flex flex-col relative"
                >
                    <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                        <div className="flex flex-col gap-1">
                            <h3 className="text-lg font-semibold text-foreground flex items-center gap-2">
                                <Icon name='Trophy' width={18} height={18} className="text-primary" />
                                Live Results
                            </h3>
                            <p className="text-sm text-default-500">
                                Real-time final scores based on your choice ratings and factor weights.
                            </p>
                        </div>
                        <Button 
                            variant="bordered" 
                            size="sm" 
                            onPress={handleCopy}
                            color={copied ? "success" : "default"}
                            startContent={<Icon name={copied ? 'Check' : 'Copy'} width={14} height={14} />}
                            className={cn(
                                "font-medium shrink-0 border",
                                copied
                                    ? "border-success text-success bg-success/10"
                                    : "border-default-200 bg-transparent hover:bg-default-50 text-default-700"
                            )}
                        >
                            {copied ? "Copied!" : "Copy results"}
                        </Button>
                    </div>

                    <motion.div 
                        variants={staggerContainer as any}
                        initial="hidden"
                        animate="visible"
                        className="flex flex-col gap-3"
                    >
                        {results.map((res) => {
                            const isWinner = res.rank === 1
                            
                            return (
                                <motion.div 
                                    key={res.id} 
                                    variants={fadeInUp as any} 
                                    className={cn(
                                        'flex flex-col gap-3 p-4 rounded-xl border transition-colors',
                                        isWinner
                                            ? 'border-primary bg-primary/5'
                                            : 'border-default-200 bg-content1'
                                    )}
                                >
                                    <div className="flex justify-between items-center">
                                        <div className="flex items-center gap-3">
                                            {getRankIcon(res.rank)}
                                            <span className={`font-semibold text-base ${isWinner ? 'text-primary' : 'text-foreground'}`}>
                                                {res.name || 'Unnamed Choice'}
                                            </span>
                                        </div>
                                        <div className="text-sm text-foreground flex items-center gap-1.5 font-medium">
                                            <span className="text-default-500 uppercase tracking-wide text-xs">Score:</span> 
                                            {res.score}/{res.maxScore} 
                                            <span className="text-default-400 hidden sm:inline-block ml-1">
                                                ({Math.round(res.percentage)}%)
                                            </span>
                                        </div>
                                    </div>
                                    <Progress 
                                        value={res.percentage === 0 ? 0.5 : res.percentage} 
                                        color={isWinner ? "primary" : "default"} 
                                        size="sm"
                                        radius="full"
                                        classNames={{
                                            track: "bg-default-100",
                                            indicator: isWinner ? "bg-primary" : "bg-default-400"
                                        }}
                                    />
                                </motion.div>
                            )
                        })}
                    </motion.div>
                </motion.div>
            )}
        </div>
    )
}

export default ResultsPanel
