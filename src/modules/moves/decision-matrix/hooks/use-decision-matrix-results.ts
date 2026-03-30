import { useMemo } from 'react'
import { useDecisionMatrixStore } from '../store/decision-matrix-store'

export interface ChoiceResult {
    id: string
    name: string
    score: number
    maxScore: number
    percentage: number
    rank: number
}


export const useDecisionMatrixResults = () => {
    const choices = useDecisionMatrixStore(state => state.choices)
    const criteria = useDecisionMatrixStore(state => state.criteria)
    const scores = useDecisionMatrixStore(state => state.scores)

    return useMemo(() => {
        if (choices.length === 0 || criteria.length === 0) {
            return { results: [], maxPossibleScore: 0, highestScore: 0, isReady: false }
        }

        const maxPossibleScore = criteria.reduce((sum, c) => sum + (10 * c.weight), 0)

        const rawResults = choices.map(choice => {
            const rawScore = criteria.reduce((sum, c) => {
                const val = scores[choice.id]?.[c.id] || 0
                return sum + (val * c.weight)
            }, 0)

            return {
                id: choice.id,
                name: choice.name,
                score: rawScore,
                maxScore: maxPossibleScore,
                percentage: maxPossibleScore > 0 ? (rawScore / maxPossibleScore) * 100 : 0,
            }
        })

        // Sort descending
        rawResults.sort((a, b) => b.score - a.score)

        // Assign ranks (handling ties)
        let currentRank = 1
        const results = rawResults.map((res, index) => {
            if (index > 0 && res.score < rawResults[index - 1].score) {
                currentRank = index + 1
            }
            return { ...res, rank: currentRank }
        })

        const highestScore = results.length > 0 ? results[0].score : 0

        // It is fully ready if every choice has a score for every criteria
        const isReady = choices.every(ch => 
            criteria.every(cr => scores[ch.id]?.[cr.id] !== undefined)
        )

        return {
            results,
            maxPossibleScore,
            highestScore,
            isReady
        }
    }, [choices, criteria, scores])
}
