'use client'
import React from 'react'
import { useDecisionMatrixStore } from '../store/decision-matrix-store'

import { Slider } from '@heroui/react'
import Icon from '@/components/icons'
import GhoastRow from './ghoast-row'
import ScoreField from './score-field'


const DecisionGrid: React.FC = () => {
    const criteria = useDecisionMatrixStore(state => state.criteria)
    const choices = useDecisionMatrixStore(state => state.choices)
    const scores = useDecisionMatrixStore(state => state.scores)
    const updateCriteria = useDecisionMatrixStore(state => state.updateCriteria)
    const removeCriteria = useDecisionMatrixStore(state => state.removeCriteria)
    const updateScore = useDecisionMatrixStore(state => state.updateScore)

    const gridTemplateColumns = `minmax(150px, 1.5fr) 130px repeat(${choices.length}, minmax(130px, 1fr))`


    return (
        <div className="w-full bg-content1 border-[0.5px] border-default-200 rounded-[12px] overflow-hidden shadow-none overflow-x-auto">
            <div style={{ minWidth: 'max-content' }} className="flex flex-col w-full">
                
                <div 
                    className="grid items-center bg-default-50/50 border-b-[0.5px] border-default-200"
                    style={{ gridTemplateColumns }}
                >
                    <div className="text-xs uppercase text-default-500 tracking-[0.05em] py-3 px-4 font-semibold">
                        Factor
                    </div>
                    <div className="text-xs uppercase text-default-500 tracking-[0.05em] py-3 px-3 font-semibold">
                        Weight
                    </div>
                    {choices.map((ch) => (
                        <div key={ch.id} className="text-xs uppercase text-default-500 tracking-[0.05em] py-3 px-2 font-semibold text-center truncate">
                            {ch.name || `Choice ${choices.length}`}
                        </div>
                    ))}
                </div>

                {criteria.map((crit) => (
                    <div 
                        key={crit.id} 
                        className="grid items-center border-b-[0.5px] border-default-200 last:border-b-0 hover:bg-default-50/40 transition-colors group"
                        style={{ gridTemplateColumns }}
                    >
                        <div className="py-[10px] px-4 flex items-center justify-between">
                            <input 
                                className="w-full bg-transparent border-b border-default-200 focus:border-primary focus:outline-none! outline-none text-sm text-foreground placeholder:text-default-300 transition-colors p-1 rounded-none!"
                                value={crit.name}
                                onChange={(e) => updateCriteria(crit.id, e.target.value, crit.weight)}
                                placeholder="Factor name..."
                            />
                            <button 
                                onClick={() => removeCriteria(crit.id)}
                                className="text-default-300 hover:text-danger opacity-0 group-hover:opacity-100 transition-opacity p-1 ml-1 shrink-0 cursor-pointer"
                            >
                                <Icon name='X' width={16} height={16} />
                            </button>
                        </div>

                        <div className="py-[10px] px-3 flex items-center justify-between gap-3">
                            <Slider 
                                size="sm"
                                step={1}
                                maxValue={10}
                                minValue={1}
                                value={crit.weight}
                                onChange={(val) => updateCriteria(crit.id, crit.name, val as number)}
                                className="flex-1 w-full"
                                color="primary"
                                showTooltip={false}
                                classNames={{ track: "bg-default-100", thumb: "w-4 h-4" }}
                            />
                            <span className="text-primary font-medium text-sm w-4 text-right shrink-0">
                                {crit.weight}
                            </span>
                        </div>

                        {choices.map(choice => {
                            const rawScore = scores[choice.id]?.[crit.id]
                            const currentScore = typeof rawScore === 'number' ? rawScore : 0
                            
                            return (
                                <div key={choice.id} className="py-[10px] px-2 flex items-center justify-center">
                                    <ScoreField 
                                        value={currentScore}
                                        onChange={(val) => updateScore(choice.id, crit.id, val)}
                                    />
                                </div>
                            )
                        })}
                    </div>
                ))}

                <GhoastRow gridTemplateColumns={gridTemplateColumns} />
            </div>
        </div>
    )
}

export default DecisionGrid