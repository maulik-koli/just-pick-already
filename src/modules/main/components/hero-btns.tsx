'use client'
import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { Button, cn } from "@heroui/react";
import Icon from '@/src/components/icons';

type Moves = "decision-matrix" | "pre-mortem" | "eisenhower-matrix" | "regret-minimization"

const ButtonValues: Record<Moves, { name: string, buttonLable: string  }> = {
    "decision-matrix": {
        name: "the Decision Matrix",
        buttonLable: "Can't choose between options?",
    },
    "pre-mortem": {
        buttonLable: "Scared I'll make the wrong call",
        name: "the Pre-Mortem",
    },
    "eisenhower-matrix": {
        buttonLable: "Too many things on my plate",
        name: "the Eisenhower Matrix",
    },
    "regret-minimization": {
        buttonLable: "Need to think long-term",
        name: "Regret Minimization",
    },
}


const HeroButtons: React.FC = () => {
    const [selecteedChoice, setSelectedChoice] = useState<Moves>("decision-matrix");

    const RedirectButtonMove = ButtonValues[selecteedChoice]

    return (
        <div className='w-full flex flex-col gap-10 items-center mt-2'>
            <div className='w-full flex flex-col items-center gap-3'>
                <div className='flex gap-3'>
                    <SelectButton
                        isSelected={selecteedChoice === "decision-matrix"}
                        onSelect={() => setSelectedChoice("decision-matrix")}
                        value={ButtonValues["decision-matrix"].buttonLable}
                    />
                    <SelectButton
                        isSelected={selecteedChoice === "pre-mortem"}
                        onSelect={() => setSelectedChoice("pre-mortem")}
                        value={ButtonValues["pre-mortem"].buttonLable}
                    />
                </div>
                <div className='flex gap-3'>
                    <SelectButton
                        isSelected={selecteedChoice === "eisenhower-matrix"}
                        onSelect={() => setSelectedChoice("eisenhower-matrix")}
                        value={ButtonValues["eisenhower-matrix"].buttonLable}
                    />
                    <SelectButton
                        isSelected={selecteedChoice === "regret-minimization"}
                        onSelect={() => setSelectedChoice("regret-minimization")}
                        value={ButtonValues["regret-minimization"].buttonLable}
                    />
                </div>
            </div>
            <div className='flex items-center justify-center'>
                <motion.button 
                    layout
                    className="bg-primary text-primary-foreground flex items-center justify-center font-semibold text-[15px] rounded-[10px] px-9 py-[15px] hover:bg-primary/85 active:scale-[0.97] transition-all duration-150 hover:-translate-y-px max-sm:w-full overflow-hidden"
                >
                    <AnimatePresence mode="popLayout" initial={false}>
                        <motion.span
                            key={selecteedChoice}
                            initial={{ y: 20, opacity: 0, filter: 'blur(4px)' }}
                            animate={{ y: 0, opacity: 1, filter: 'blur(0px)' }}
                            exit={{ y: -20, opacity: 0, filter: 'blur(4px)' }}
                            transition={{ duration: 0.25, ease: "easeOut" }}
                            className="flex items-center gap-2 whitespace-nowrap"
                        >
                            Try {RedirectButtonMove.name}
                            <Icon name='MoveRight' width={16} height={16} />
                        </motion.span>
                    </AnimatePresence>
                </motion.button>
            </div>
        </div>
    )
}

export default HeroButtons



interface SelectButtonProps {
    value: string,
    isSelected: boolean,
    onSelect: () => void,
}

const SelectButton = ({value, isSelected, onSelect}: SelectButtonProps) => {
    return (
         <Button 
            className={cn(
                'border',
                isSelected ? 'border-primary bg-primary/5 text-primary' : "bg-card border-border "
            )}
            value={value}
            onPress={onSelect}
        >
            {value}
        </Button>
    )
}