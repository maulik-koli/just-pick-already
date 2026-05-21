import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Astroid } from 'lucide-react'
import { cn } from '@/lib/utils'

import { useGameStore } from '@/store/states/game'
import { usePlayStore } from '@/store/states/play'
import { QuestionZone, QuestionOption } from '@/schemas/questionGenerationSchema.schema'
import { AnswersListItem } from '@/app/api/_types'
import { ZONESS_STAICS_DATA, WORLD_WIDTH, WORLD_HEIGHT, ZONE_STYLES } from '@/constants/game-zones'
import { CHAR_W, CHAR_H } from '@/hooks/use-character-move'
import { Button } from '../ui/button'


const getNextQuestionIndex = (zone: QuestionZone, answers: AnswersListItem[]) => {
    const answeredQuestionIds = new Set(
        answers.map((answer) => answer.questionId)
    );

    return zone.questions.findIndex(
        (question) => !answeredQuestionIds.has(question.id)
    );
}

const QuestionModel: React.FC = () => {
    const { answers, addAnswer, zones } = useGameStore()
    const { activeZone, closeModal } = usePlayStore()
    const open = !!activeZone;
    
    const [zone, setZone] = useState<QuestionZone | null>(null);

    useEffect(() => {
        if (activeZone && zones) {
            const found = zones.find(z => z.zone === activeZone);
            if (found) setZone(found);
        }
    }, [activeZone, zones]);

    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)

    const handleCloseModal = () => {
        if (!activeZone) {
            closeModal();
            return;
        }

        const state = usePlayStore.getState();
        const activeZoneStatic = ZONESS_STAICS_DATA.find(z => z.id === activeZone);
        
        if (activeZoneStatic) {
            const cx = state.x + CHAR_W / 2;
            const cy = state.y + CHAR_H / 2;

            const distTop = cy - activeZoneStatic.y;
            const distBottom = (activeZoneStatic.y + activeZoneStatic.h) - cy;
            const distLeft = cx - activeZoneStatic.x;
            const distRight = (activeZoneStatic.x + activeZoneStatic.w) - cx;

            const minDist = Math.min(distTop, distBottom, distLeft, distRight);

            let nx = state.x;
            let ny = state.y;

            if (minDist === distTop) {
                ny = activeZoneStatic.y - CHAR_H - 10;
            } else if (minDist === distBottom) {
                ny = activeZoneStatic.y + activeZoneStatic.h + 10;
            } else if (minDist === distLeft) {
                nx = activeZoneStatic.x - CHAR_W - 10;
            } else {
                nx = activeZoneStatic.x + activeZoneStatic.w + 10;
            }

            nx = Math.max(0, Math.min(WORLD_WIDTH - CHAR_W, nx));
            ny = Math.max(0, Math.min(WORLD_HEIGHT - CHAR_H, ny));

            state.setPosition(nx, ny, state.facing, false);
        }
        
        closeModal();
    };

    useEffect(() => {
        const handleKeyDown = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && open) {
                handleCloseModal();
            }
        };

        window.addEventListener('keydown', handleKeyDown);
        return () => window.removeEventListener('keydown', handleKeyDown);
    }, [open, activeZone]);

    useEffect(() => {
        if (open && zone) {
            const nextIdx = getNextQuestionIndex(zone, useGameStore.getState().answers);
            const startIdx = nextIdx === -1 ? 0 : nextIdx;
            setStep(startIdx);
            setDirection(1);
        }
    }, [open, zone]);


    const handleNext = () => {
        if (!zone) return;
        if (step < zone.questions.length - 1) {
            setDirection(1)
            setStep(s => s + 1)
        }
    }

    const handlePrev = () => {
        if (step > 0) {
            setDirection(-1)
            setStep(s => s - 1)
        }
    }

    const handleSelectOption = (option: QuestionOption) => {
        if (!zone) return;
        const currentQuestion = zone.questions[step];

        addAnswer({
            zone: zone.zone,
            id: currentQuestion.id,
            questionId: currentQuestion.id,
            selectedOptionId: option.id,
            selectedOptionText: option.text
        });

        if (step < zone.questions.length - 1) {
            setTimeout(() => {
                handleNext();
            }, 300);
        }
    };

    if (!zone) return null;

    const current = zone.questions[step];
    if (!current) return null;

    const answeredQuestionIds = new Set(answers.map(a => a.questionId));
    const allAnswered = zone.questions.every(q => answeredQuestionIds.has(q.id));

    const zoneStatic = ZONESS_STAICS_DATA.find(z => z.id === zone.zone);
    const zoneStyle = ZONE_STYLES[zone.zone];

    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={handleCloseModal}
                >
                    <motion.div
                        initial={{ scale: 0.92, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 24, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                        className={cn(
                            "w-full dot-texture overflow-hidden flex flex-col max-h-[90vh] rounded-[1.25rem] border-2",
                            zoneStatic?.colorVar || "bg-card"
                        )}
                        style={{ 
                            boxShadow: `0 25px 60px ${zoneStyle?.border}40`, 
                            maxWidth: 720,
                            borderColor: zoneStyle?.border
                        }}
                    >
                        <div 
                            className="w-full py-3 flex items-center justify-center shrink-0 border-b"
                            style={{ 
                                borderColor: `${zoneStyle?.border}40`,
                                backgroundColor: 'rgba(255,255,255,0.4)'
                            }}
                        >
                            <span 
                                className="text-[12px] font-black uppercase tracking-[0.2em] flex gap-2 items-center"
                                style={{ color: zoneStyle?.nameColor }}
                            >
                                <Astroid fill='currentColor' className='size-3.5 mb-0.5 opacity-80' />
                                {zoneStatic?.name || zone.zone.replace(/_/g, ' ')}
                                <Astroid fill='currentColor' className='size-3.5 mb-0.5 opacity-80' />
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 px-7 pt-6 shrink-0">
                            {zone.questions.map((q, i) => {
                                const isAnswered = answeredQuestionIds.has(q.id);

                                return (
                                    <div
                                        key={q.id}
                                        className="h-2 flex-1 rounded-full overflow-hidden relative"
                                        style={{ backgroundColor: `${zoneStyle?.border}33` }}
                                    >
                                        {isAnswered && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={isAnswered ? {
                                                    background: `linear-gradient(90deg, ${zoneStyle?.nameColor} 0%, ${zoneStyle?.border} 50%, ${zoneStyle?.nameColor} 100%)`,
                                                    backgroundSize: "200% 100%",
                                                    animation: "shimmer-bar 2s linear infinite",
                                                } : {
                                                    background: zoneStyle?.border,
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between px-7 pt-4 min-h-[32px] shrink-0">
                            <span 
                                className="px-3 py-1 rounded-full text-[10px] font-bold uppercase tracking-[0.14em]"
                                style={{ 
                                    backgroundColor: `${zoneStyle?.border}26`,
                                    color: zoneStyle?.nameColor 
                                }}
                            >
                                Question {step + 1} of {zone.questions.length}
                            </span>
                        </div>

                        <div className="px-7 pt-5 pb-7 overflow-y-auto [&::-webkit-scrollbar]:hidden [-ms-overflow-style:none] [scrollbar-width:none]">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: direction * 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -60 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >

                                    <div className="flex items-start gap-3 mb-3">
                                        <div 
                                            className="w-[3px] self-stretch rounded-full mt-1 min-h-7" 
                                            style={{ backgroundColor: zoneStyle?.border }} 
                                        />
                                        <h2 className="text-[20px] font-bold leading-tight text-foreground">
                                            {current.title}
                                        </h2>
                                    </div>
                                    <div className="mb-6 text-sm text-muted-foreground leading-relaxed pl-[15px]">
                                        {current.scenario}
                                    </div>

                                    <div className="grid gap-2.5 grid-cols-1">
                                        {current.options.map((opt, i) => {
                                            const selectedAnswer = answers.find(a => a.questionId === current.id);
                                            const selected = selectedAnswer?.selectedOptionId === opt.id;

                                            return (
                                                <motion.button
                                                    key={opt.id}
                                                    initial={{ opacity: 0, y: 12 }}
                                                    animate={{ opacity: 1, y: 0 }}
                                                    transition={{ duration: 0.28, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                                                    whileHover={!selected ? { y: -2 } : {}}
                                                    onClick={() => handleSelectOption(opt)}
                                                    className={cn(
                                                        "group flex items-center justify-between gap-3 text-left px-4 py-3.5 transition-all rounded-[0.875rem] border-2 cursor-pointer",
                                                        selected
                                                            ? "bg-card font-bold"
                                                            : "bg-card/50 text-foreground font-medium hover:bg-card"
                                                    )}
                                                    style={selected ? {
                                                        borderColor: zoneStyle?.border,
                                                        boxShadow: `0 4px 12px ${zoneStyle?.border}33`,
                                                        color: zoneStyle?.nameColor
                                                    } : {
                                                        borderColor: `${zoneStyle?.border}40`,
                                                    }}
                                                >
                                                    <span className="text-sm">{opt.text}</span>
                                                    <span
                                                        className="flex w-4.5 h-4.5 items-center justify-center shrink-0 rounded-full transition-all border-2"
                                                        style={selected ? {
                                                            borderColor: zoneStyle?.border,
                                                            backgroundColor: zoneStyle?.border
                                                        } : {
                                                            borderColor: `${zoneStyle?.border}66`,
                                                            backgroundColor: "transparent"
                                                        }}
                                                    >
                                                        {selected && (
                                                            <motion.span
                                                                initial={{ scale: 0 }}
                                                                animate={{ scale: 1 }}
                                                                transition={{ type: "spring", stiffness: 400, damping: 18 }}
                                                                className="block rounded-full w-1.5 h-1.5 bg-card"
                                                            />
                                                        )}
                                                    </span>
                                                </motion.button>
                                            );
                                        })}
                                    </div>
                                </motion.div>
                            </AnimatePresence>

                            <div className="flex items-center gap-3 mt-6">
                                <Button
                                    onClick={handlePrev}
                                    variant="outline"
                                    disabled={step === 0}
                                    className='flex-1 h-12 rounded-[0.875rem] font-bold hover:bg-card disabled:opacity-50'
                                    style={{ 
                                        borderColor: `${zoneStyle?.border}66`, 
                                        color: zoneStyle?.nameColor,
                                        backgroundColor: "transparent" 
                                    }}
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Prev
                                </Button>
                                {step < zone.questions.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        variant="outline"
                                        className='flex-1 h-12 rounded-[0.875rem] font-bold hover:bg-card'
                                        style={{ 
                                            borderColor: `${zoneStyle?.border}66`, 
                                            color: zoneStyle?.nameColor,
                                            backgroundColor: "transparent" 
                                        }}
                                    >
                                        Next <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleCloseModal}
                                        className="flex-1 h-12 rounded-[0.875rem] font-bold transition-all border-2 text-white"
                                        style={allAnswered ? {
                                            backgroundColor: zoneStyle?.nameColor,
                                            borderColor: zoneStyle?.nameColor,
                                            boxShadow: `0 4px 12px ${zoneStyle?.border}40`,
                                        } : {
                                            backgroundColor: `${zoneStyle?.border}80`,
                                            borderColor: "transparent",
                                            color: "rgba(255,255,255,0.7)"
                                        }}
                                    >
                                        {allAnswered ? "Finish Zone" : "Close"}
                                    </Button>
                                )}
                            </div>
                        </div>
                    </motion.div>

                    <style>{`
                    @keyframes shimmer-bar {
                        0% { background-position: 200% 0; }
                        100% { background-position: -200% 0; }
                    }
                    `}</style>
                </motion.div>
            )}
        </AnimatePresence>
    )
}

export default QuestionModel