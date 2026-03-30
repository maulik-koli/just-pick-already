'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { useDecisionMatrixStore } from '../store/decision-matrix-store'
import { Button } from '@heroui/react'
import Icon from '@/components/icons'
import DecisionGrid from './decision-grid'


const DecisionCard: React.FC = () => {
    const choices = useDecisionMatrixStore(state => state.choices)
    const addCriteria = useDecisionMatrixStore(state => state.addCriteria)

    if (choices.length === 0) {
        return null
    }


    return (
        <motion.div 
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.3 }}
            className="flex flex-col relative mt-6"
        >
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-4">
                <div className="flex flex-col gap-1">
                    <h3 className="text-lg font-semibold text-foreground">Factor & Weights</h3>
                    <p className="text-sm text-default-500">
                        Define the factors. Rate importance from 1 to 10.
                    </p>
                </div>
                <Button 
                    variant="bordered" 
                    size="sm" 
                    onPress={() => addCriteria()}
                    startContent={<Icon name='Plus' width={14} height={14} />}
                    className="font-medium shrink-0 border border-default-200 bg-transparent hover:bg-default-50 text-default-700"
                >
                    Add factor
                </Button>
            </div>
            
            <DecisionGrid />
        </motion.div>
    )
}

export default DecisionCard;