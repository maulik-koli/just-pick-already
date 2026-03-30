'use client'
import React from 'react'
import { Reorder, AnimatePresence, useDragControls } from 'framer-motion'
import { Button, Input } from '@heroui/react'

import { useDecisionMatrixStore } from '../store/decision-matrix-store'
import { Choice } from '../types'
import Icon from '@/components/icons'


const ChoicePill: React.FC<{ choice: Choice }> = ({ choice }) => {
    const updateChoice = useDecisionMatrixStore(state => state.updateChoice)
    const removeChoice = useDecisionMatrixStore(state => state.removeChoice)
    const controls = useDragControls()

    return (
        <Reorder.Item
            value={choice}
            id={choice.id}
            dragListener={false}
            dragControls={controls}
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 0.9 }}
            transition={{ duration: 0.2 }}
        >
            <Input
                size="sm"
                radius="full"
                value={choice.name}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => updateChoice(choice.id, e.target.value)}
                placeholder="Choice..."
                classNames={{
                    base: "w-auto",
                    inputWrapper: "bg-content1 border border-default-200 focus-within:border-primary data-[focus=true]:border-primary shadow-sm px-3 py-1.5",
                    input: "w-28 transition-all text-sm font-medium !outline-none",
                }}
                startContent={
                    <div 
                        className="cursor-grab active:cursor-grabbing text-default-400 hover:text-foreground touch-none mr-1 flex items-center"
                        onPointerDown={(e: React.PointerEvent<HTMLDivElement>) => controls.start(e)}
                    >
                        <Icon name='GripVertical' width={16} height={16} />
                    </div>
                }
                endContent={
                    <button 
                        onClick={() => removeChoice(choice.id)}
                        className="text-default-400 hover:text-danger flex items-center transition-colors rounded-full p-0.5 ml-1"
                    >
                        <Icon name='X' width={16} height={16} />
                    </button>
                }
            />
        </Reorder.Item>
    )
}



const ChoiceInputs: React.FC = () => {
    const choices = useDecisionMatrixStore(state => state.choices)
    const addChoice = useDecisionMatrixStore(state => state.addChoice)
    const reorderChoices = useDecisionMatrixStore(state => state.reorderChoices)

    const canAdd = choices.length < 5

    return (
        <div className="flex flex-col gap-4">
            <div className="flex flex-col gap-1">
                <h3 className="text-lg font-semibold text-foreground">Choice Input</h3>
                <p className="text-sm text-default-500">
                    Add up to 5 options you are deciding between.
                </p>
            </div>
            
            <div className="flex flex-wrap items-center gap-3">
                
                <Reorder.Group 
                    axis="x" 
                    values={choices} 
                    onReorder={reorderChoices} 
                    className="flex flex-wrap items-center gap-3"
                >
                    <AnimatePresence mode="popLayout">
                        {choices.map(choice => (
                            <ChoicePill  key={choice.id} choice={choice} />
                        ))}
                    </AnimatePresence>
                </Reorder.Group>
                
                {canAdd && (
                    <Button 
                        variant="flat" 
                        size="sm" 
                        radius="full" 
                        color="primary"
                        onPress={() => addChoice('end')}
                        startContent={<Icon name='Plus' width={16} height={16} />}
                        className="font-medium"
                    >
                        {choices.length === 0 ? 'Add First Choice' : 'Add Choice'}
                    </Button>
                )}
            </div>
        </div>
    )
}

export default ChoiceInputs
