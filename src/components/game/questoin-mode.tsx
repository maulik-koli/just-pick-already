import React, { useState, useEffect } from 'react'
import { AnimatePresence, motion } from 'framer-motion'
import { ArrowLeft, ArrowRight, Astroid } from 'lucide-react'
import { cn } from '@/lib/utils'

import { Button } from '../ui/button'
import { useGameStore } from '@/store/states/game'
import { usePlayStore } from '@/store/states/play'
import { QuestionZone, QuestionOption } from '@/schemas/questionGenerationSchema.schema'
import { AnswersListItem } from '@/app/api/_types'
import { ZONESS_STAICS_DATA, WORLD_WIDTH, WORLD_HEIGHT } from '@/constants/game-zones'
import { CHAR_W, CHAR_H } from '@/hooks/use-character-move'


const getNextQuestionIndex = (zone: QuestionZone, answers: AnswersListItem[]) => {
    const answeredQuestionIds = new Set(
        answers.map((answer) => answer.questionId)
    );

    return zone.questions.findIndex(
        (question) => !answeredQuestionIds.has(question.id)
    );
}

const QuestionModel: React.FC = () => {
    const { answers, setAnswers, zones } = useGameStore()
    const { activeZone, closeModal } = usePlayStore()
    const open = !!activeZone;
    const onClose = closeModal;
    
    const [zone, setZone] = useState<QuestionZone | null>(null);

    useEffect(() => {
        if (activeZone && zones) {
            const found = zones.find(z => z.zone === activeZone);
            if (found) setZone(found);
        }
    }, [activeZone, zones]);

    const [step, setStep] = useState(0)
    const [direction, setDirection] = useState(1)
    const [visitedIds, setVisitedIds] = useState<Set<string>>(new Set())

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
        if (open && zone) {
            const nextIdx = getNextQuestionIndex(zone, useGameStore.getState().answers);
            const startIdx = nextIdx === -1 ? 0 : nextIdx;
            setStep(startIdx);
            setVisitedIds(new Set([zone.questions[startIdx].id]));
            setDirection(1);
        }
    }, [open, zone]);

    useEffect(() => {
        if (zone?.questions[step]) {
            setVisitedIds(prev => new Set(prev).add(zone.questions[step].id));
        }
    }, [step, zone]);

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
        const existing = answers.find(a => a.questionId === currentQuestion.id);

        let newAnswers;
        if (existing) {
            newAnswers = answers.map(a => a.questionId === currentQuestion.id ? {
                ...a,
                selectedOptionId: option.id,
                selectedOptionText: option.text,
            } : a);
        } else {
            newAnswers = [...answers, {
                id: Math.random().toString(36).substring(7),
                zone: zone.zone,
                questionId: currentQuestion.id,
                selectedOptionId: option.id,
                selectedOptionText: option.text,
            }];
        }
        setAnswers(newAnswers);

        // Auto-advance after 300ms if not on the last step
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
                        className="w-full dot-texture overflow-hidden bg-card rounded-[1.25rem] flex flex-col max-h-[90vh]"
                        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15)", maxWidth: 720 }}
                    >
                        <div className="w-full py-2.5 flex items-center justify-center bg-secondary shrink-0">
                            <span className="text-[11px] font-bold uppercase text-primary tracking-[0.22em] flex gap-2 items-center">
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                                {zone.zone.replace(/_/g, ' ')}
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 px-7 pt-6 shrink-0">
                            {zone.questions.map((q, i) => {
                                const isAnswered = answeredQuestionIds.has(q.id);
                                const isVisited = visitedIds.has(q.id);

                                return (
                                    <div
                                        key={q.id}
                                        className={cn(
                                            "h-2 flex-1 rounded-full overflow-hidden relative",
                                            (!isVisited && !isAnswered) ? "bg-border" : "bg-border"
                                        )}
                                    >
                                        {(isAnswered || isVisited) && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={isAnswered ? {
                                                    background: "linear-gradient(90deg, #F4623A 0%, #FF8A5C 50%, #F4623A 100%)",
                                                    backgroundSize: "200% 100%",
                                                    animation: "shimmer-bar 2s linear infinite",
                                                } : {
                                                    background: "#D9CFC2", // Skipped color
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between px-7 pt-3.5 min-h-[32px] shrink-0">
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-muted text-muted-foreground tracking-[0.14em]">
                                Question {step + 1} of {zone.questions.length}
                            </span>
                        </div>

                        <div className="px-7 pt-5 pb-7 overflow-y-auto">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: direction * 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -60 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >

                                    <div className="flex items-start gap-3 mb-3">
                                        <div className="w-[3px] self-stretch rounded-full mt-1 bg-primary min-h-7" />
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
                                                        "group flex items-center justify-between gap-3 text-left px-4 py-3.5 transition-all rounded-[0.875rem] border cursor-pointer",
                                                        selected
                                                            ? "border-primary bg-secondary text-primary font-bold shadow-[0_4px_12px_rgba(244,98,58,0.15)]"
                                                            : "border-border bg-card text-foreground font-medium shadow-[0_1px_2px_rgba(0,0,0,0.04)] hover:bg-secondary hover:border-[rgba(244,98,58,0.5)]"
                                                    )}
                                                >
                                                    <span className="text-sm">{opt.text}</span>
                                                    <span
                                                        className={cn(
                                                            "flex w-4.5 h-4.5 items-center justify-center shrink-0 rounded-full transition-all border",
                                                            selected
                                                                ? "border-primary bg-primary"
                                                                : "border-[#D9CFC2] bg-transparent"
                                                        )}
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
                                    className='flex-1 h-12 rounded-[0.875rem] font-bold border-border text-foreground hover:bg-muted hover:border-border disabled:opacity-50'
                                >
                                    <ArrowLeft className="mr-2 h-4 w-4" /> Prev
                                </Button>
                                {step < zone.questions.length - 1 ? (
                                    <Button
                                        onClick={handleNext}
                                        variant="outline"
                                        className='flex-1 h-12 rounded-[0.875rem] font-bold border-border text-foreground hover:bg-muted hover:border-border'
                                    >
                                        Next <ArrowRight className="ml-2 h-4 w-4" />
                                    </Button>
                                ) : (
                                    <Button
                                        onClick={handleCloseModal}
                                        className={cn(
                                            "flex-1 h-12 rounded-[0.875rem] font-bold transition-all",
                                            allAnswered ? "bg-primary text-white hover:bg-[#C1440E] border-primary hover:border-[#C1440E]" : "bg-muted text-muted-foreground hover:bg-muted border-transparent"
                                        )}
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