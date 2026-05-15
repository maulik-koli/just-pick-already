'use client'
import React, { useState } from 'react'
import { AgeRange, DecisionStyle, SelfDescription, Vibe } from '@/generated/prisma/enums'
import { AnimatePresence, motion } from 'framer-motion'
import { Button } from '../ui/button'
import { ArrowLeft, Astroid } from 'lucide-react'
import { cn } from '@/lib/utils'
import { useFormContext } from 'react-hook-form'
import { OnbordingType } from '@/schemas/onbording.schema'

type StepOptionsValue = AgeRange | DecisionStyle | SelfDescription | Vibe
type OnbordingStep = { 
    que: string, 
    options: { text: string, value: StepOptionsValue }[]
}

const ONBORDING_STEPS: OnbordingStep[] = [
    {
        que: "How old are you?",
        options: [
            { text: "Under 18", value: "UNDER_18" },
            { text: "18-24", value: "AGE_18_24" },
            { text: "25-34", value: "AGE_25_34" },
            { text: "35-44", value: "AGE_35_44" },
            { text: "45-54", value: "AGE_45_54" },
            { text: "55+", value: "AGE_55_PLUS" },
        ]
    },
    {
        que: "What's your current vibe?",
        options: [
            { text: "Chill", value: "CHILL" },
            { text: "Curious", value: "CURIOUS" },
            { text: "Ambitious", value: "AMBITIOUS" },
            { text: "Overthinking", value: "OVERTHINKING" },
            { text: "Stressed", value: "STRESSED" },
            { text: "Optimistic", value: "OPTIMISTIC" },
        ]
    },
    {
        que: "How do you usually make decisions?",
        options: [
            { text: "Trust my gut", value: "TRUST_YOUR_GUT" },
            { text: "Think it through", value: "THINK_IT_THROUGH" },
            { text: "Ask for advice", value: "ASK_FOR_ADVICE" },
            { text: "Wait and see", value: "WAIT_AND_SEE" },
            { text: "Take the bold option", value: "TAKE_THE_BOLD_OPTION" },
        ]
    },
    {
        que: "How would you describe yourself?",
        options: [
            { text: "Keep options open", value: "KEEP_OPTIONS_OPEN" },
            { text: "Know what I want", value: "KNOW_WHAT_I_WANT" },
            { text: "Change my mind often", value: "CHANGE_MY_MIND_OFTEN" },
            { text: "Go with what feels right", value: "GO_WITH_WHAT_FEELS_RIGHT" },
            { text: "It depends", value: "IT_DEPENDS_ON_THE_SITUATION" },
        ]
    },
]

const STEP_KEYS: (keyof OnbordingType)[] = ['ageRange', 'vibe', 'decisionStyle', 'selfDescription'];

interface OnbordingModelProps {
    open: boolean
    onClose: () => void
    onSubmit: () => void
}


const OnbordingModel: React.FC<OnbordingModelProps> = ({ open, onClose, onSubmit }) => {
    const [step, setStep] = useState(0);
    const [direction, setDirection] = useState(1);
    const { watch, setValue } = useFormContext<OnbordingType>();

    const answers = watch(STEP_KEYS);

    const pick = (opt: StepOptionsValue) => {
        const key = STEP_KEYS[step];
        setValue(key, opt, { shouldValidate: true });

        if (step < ONBORDING_STEPS.length - 1) {
            setTimeout(() => {
                setDirection(1);
                setStep(step + 1);
            }, 300);
        }
    };

    const goBack = () => {
        setDirection(-1);
        setStep(step - 1);
    };

    const allAnswered = answers.every((a) => a !== undefined && a !== null);
    const isLast = step === ONBORDING_STEPS.length - 1;
    const current = ONBORDING_STEPS[step];
    const useTwoCols = current.options.every((o) => o.text.length <= 18);


    return (
        <AnimatePresence>
            {open && (
                <motion.div
                    className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4"
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    onClick={onClose}
                >
                    <motion.div
                        initial={{ scale: 0.92, y: 20, opacity: 0 }}
                        animate={{ scale: 1, y: 0, opacity: 1 }}
                        exit={{ scale: 0.95, opacity: 0 }}
                        transition={{ type: "spring", damping: 24, stiffness: 280 }}
                        onClick={(e) => e.stopPropagation()}
                        className="w-full dot-texture overflow-hidden bg-card rounded-[1.25rem]"
                        style={{ boxShadow: "0 25px 60px rgba(0,0,0,0.15)", maxWidth: 520 }}
                    >
                        <div className="w-full py-2.5 flex items-center justify-center bg-secondary">
                            <span className="text-[11px] font-bold uppercase text-primary tracking-[0.22em] flex gap-2 items-center">
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                                Player Setup
                                <Astroid fill='currentColor' className='size-3 mb-0.5' />
                            </span>
                        </div>

                        <div className="flex items-center gap-1.5 px-7 pt-6">
                            {Array.from({ length: 4 })  .map((_, i) => {
                                const active = i <= step;

                                return (
                                    <div
                                        key={i}
                                        className="h-2 flex-1 rounded-full overflow-hidden relative bg-border"
                                    >
                                        {active && (
                                            <motion.div
                                                initial={{ width: 0 }}
                                                animate={{ width: "100%" }}
                                                transition={{ duration: 0.5, ease: "easeOut" }}
                                                className="absolute inset-y-0 left-0 rounded-full"
                                                style={{
                                                    background: "linear-gradient(90deg, #F4623A 0%, #FF8A5C 50%, #F4623A 100%)",
                                                    backgroundSize: "200% 100%",
                                                    animation: "shimmer-bar 2s linear infinite",
                                                }}
                                            />
                                        )}
                                    </div>
                                );
                            })}
                        </div>

                        <div className="flex items-center justify-between px-7 pt-3.5 min-h-[32px]">
                            {step > 0 ? (
                                <Button
                                    onClick={goBack}
                                    variant="ghost"
                                    className='hover:bg-muted! hover:border! border-transparent'
                                >
                                    <ArrowLeft /> Back
                                </Button>
                            ) : (
                                <span />
                            )}
                            <span className="px-3 py-1 rounded-full text-[10px] font-bold uppercase bg-muted text-muted-foreground tracking-[0.14em]">
                                Step {step + 1} of {ONBORDING_STEPS.length}
                            </span>
                        </div>

                        <div className="px-7 pt-5 pb-7">
                            <AnimatePresence mode="wait">
                                <motion.div
                                    key={step}
                                    initial={{ opacity: 0, x: direction * 60 }}
                                    animate={{ opacity: 1, x: 0 }}
                                    exit={{ opacity: 0, x: direction * -60 }}
                                    transition={{ duration: 0.25, ease: "easeOut" }}
                                >
                                    
                                <div className="flex items-start gap-3 mb-5">
                                    <div className="w-[3px] self-stretch rounded-full mt-1 bg-primary min-h-7"/>

                                    <h2 className="text-[22px] font-bold leading-tight text-foreground">
                                        {current.que}
                                    </h2>
                                </div>

                                <div className={cn("grid gap-2.5", useTwoCols ? "grid-cols-2" : "grid-cols-1")}>
                                    {current.options.map((opt, i) => {
                                    const selected = answers[step] === opt.value;

                                    return (
                                        <motion.button
                                            key={opt.value}
                                            initial={{ opacity: 0, y: 12 }}
                                            animate={{ opacity: 1, y: 0 }}
                                            transition={{ duration: 0.28, delay: 0.05 + i * 0.05, ease: "easeOut" }}
                                            whileHover={!selected ? { y: -2 } : {}}
                                            onClick={() => pick(opt.value)}
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

                            {isLast && (
                                <motion.button
                                    layout
                                    disabled={!allAnswered}
                                    onClick={allAnswered ? onSubmit : undefined}
                                    animate={{
                                        backgroundColor: allAnswered ? "#F4623A" : "#EDE5DB",
                                        color: allAnswered ? "#FFFFFF" : "#7A6F68",
                                    }}
                                    whileHover={allAnswered ? { backgroundColor: "#C1440E" } : {}}
                                    whileTap={allAnswered ? { scale: 0.98 } : {}}
                                    transition={{ duration: 0.4, ease: "easeOut" }}
                                    className={cn(
                                        "mt-6 w-full h-14 inline-flex items-center justify-center gap-2 font-bold relative overflow-hidden rounded-[0.875rem] transition-shadow",
                                        allAnswered 
                                            ? "cursor-pointer shadow-[0_8px_20px_rgba(244,98,58,0.3)]" 
                                            : "cursor-not-allowed shadow-none"
                                    )}
                                >
                                <span className="text-base relative z-10">
                                    Let's Go
                                </span>
                                {allAnswered && (
                                    <span
                                        className="pointer-events-none absolute inset-0"
                                        style={{
                                            background:
                                            "linear-gradient(90deg, transparent 0%, rgba(255,255,255,0.3) 50%, transparent 100%)",
                                            backgroundSize: "200% 100%",
                                            animation: "shimmer-bar 2.5s linear infinite",
                                        }}
                                    />
                                )}
                                </motion.button>
                            )}
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

export default OnbordingModel