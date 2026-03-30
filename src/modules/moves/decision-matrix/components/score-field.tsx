'use client'
import React from "react"
import Icon from "@/components/icons"
import { cn } from "@heroui/react"

interface ScoreFieldProps {
    value: number
    onChange: (val: number) => void
    isGhost?: boolean
}


const ScoreField: React.FC<ScoreFieldProps> = function({ value, onChange, isGhost }) {

    return (
        <div className={cn(
            "flex items-center justify-between gap-1 bg-content1 hover:bg-default-50 transition-colors rounded-md p-1 mx-auto w-[90px] border border-default-200 shadow-sm",
            isGhost ? 'opacity-50' : 'opacity-100'
        )}>
            <button 
                className="w-7 h-7 rounded-md flex items-center justify-center text-default-500 hover:text-foreground hover:bg-default-100 transition-colors disabled:opacity-30"
                onClick={() => onChange(Math.max(1, value - 1))}
                disabled={value <= 1}
            >
                <span className="text-lg leading-none mb-0.5">-</span>
            </button>
            <span className={cn(`w-6 text-center text-sm font-semibold`, isGhost && !value && 'text-default-300')}>
                {value || '--'}
            </span>
            <button 
                className="w-7 h-7 rounded-md flex items-center justify-center text-default-500 hover:text-foreground hover:bg-default-100 transition-colors disabled:opacity-30"
                onClick={() => onChange(Math.min(10, value + 1))}
                disabled={value >= 10}
            >
                <Icon name='Plus' width={12} height={12} />
            </button>
        </div>
    )
}

export default ScoreField;