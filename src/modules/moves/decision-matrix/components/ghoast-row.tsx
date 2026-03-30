'use client'
import React from 'react'
import { useGhostState } from '../hooks/use-ghoast-state'
import { useDecisionMatrixStore } from '../store/decision-matrix-store'
import { Slider } from '@heroui/react'
import ScoreField from './score-field'

interface GhoastRowProps {
    gridTemplateColumns: string
}


const GhoastRow: React.FC<GhoastRowProps> = ({ gridTemplateColumns }) => {
    const { state, setName, setWeight, setScore, resetGhostState } = useGhostState()
    const choices = useDecisionMatrixStore(state => state.choices)
    const addCriteria = useDecisionMatrixStore(state => state.addCriteria)
    const updateCriteria = useDecisionMatrixStore(state => state.updateCriteria)
    const updateScore = useDecisionMatrixStore(state => state.updateScore)

    
    const commitGhostRow = () => {
        if (!state.name.trim()) return

        // Call store action
        addCriteria()

        // grab the latest state instantly after mutation
        const latestState = useDecisionMatrixStore.getState()
        const newCriteria = latestState.criteria[latestState.criteria.length - 1]

        if (newCriteria) {
            updateCriteria(newCriteria.id, state.name, state.weight)
            
            Object.entries(state.scores).forEach(([choiceId, score]) => {
                if (score > 0) {
                    updateScore(choiceId, newCriteria.id, score)
                }
            })
        }

        // Reset ghost row
        resetGhostState()
    }


    const handleGhostKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === 'Enter' || e.key === 'Tab') {
            if (state.name.trim()) {
                e.preventDefault()
                commitGhostRow()
            }
        }
    }

    const handleBlur = (e: React.FocusEvent<HTMLDivElement>) => {
        // If the new focus target is still inside our ghost row, do nothing
        if (e.currentTarget.contains(e.relatedTarget as Node)) {
            return
        }
        
        // If focus left the ghost row entirely, automatically commit it if it has a name
        if (state.name.trim()) {
            commitGhostRow()
        }
    }


    return (
         <div 
            className="grid items-center transition-opacity border-b-[0.5px] border-default-200 last:border-b-0"
            style={{ gridTemplateColumns }}
            onBlur={handleBlur}
        >
            <div className="py-[10px] px-4">
                <input 
                    className="w-full bg-transparent border-none focus:outline-none outline-none text-[14px] text-foreground placeholder:text-default-400"
                    value={state.name}
                    onChange={(e) => setName(e.target.value)}
                    onKeyDown={handleGhostKeyDown}
                    placeholder="e.g. Commute, Culture..."
                />
            </div>
            <div className="py-[10px] px-3 flex items-center justify-between gap-3">
                <Slider 
                    size="sm"
                    step={1}
                    maxValue={10}
                    minValue={1}
                    value={state.weight}
                    onChange={(val) => setWeight(val as number)}
                    className="flex-1 w-full"
                    color="primary"
                    showTooltip={false}
                    classNames={{ track: "bg-default-100", thumb: "w-4 h-4" }}
                />
                <span className="text-primary font-medium text-sm w-4 text-right shrink-0">
                    {state.weight}
                </span>
            </div>
            {choices.map(choice => (
                <div key={choice.id} className="py-[10px] px-2 flex items-center justify-center">
                    <ScoreField 
                        isGhost={state.name.trim().length === 0}
                        value={state.scores[choice.id] || 0}
                        onChange={(val) => setScore(choice.id, val)}
                    />
                </div>
            ))}
        </div>
    )
}

export default GhoastRow