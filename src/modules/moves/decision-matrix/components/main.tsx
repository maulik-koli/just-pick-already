import React from 'react'
import ChoiceInputs from './choice-inputs'
import DecisionCard from './decision-card'
import ResultsPanel from './results-panel'

const DecisionMatrix: React.FC = () => {
    return (
        <div className='flex flex-col gap-6'>
            <ChoiceInputs />
            <DecisionCard />
            <ResultsPanel />
        </div>
    )
}

export default DecisionMatrix