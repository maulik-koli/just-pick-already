import { useReducer } from "react"

type GhoastState = {
    name: string,
    weight: number,
    scores: Record<string, number>
}

const initialState: GhoastState = {
    name: '',
    scores: {},
    weight: 1
}

type GhoastAction = 
    | { type: 'SET_NAME'; payload: string }
    | { type: 'SET_WEIGHT'; payload: number }
    | { type: 'SET_SCORE'; payload: { choiceId: string; score: number } }
    | { type: 'RESET_GHOAST_STATE' }

const ghoastReducer = (state: GhoastState, action: GhoastAction): GhoastState => {
    switch (action.type) {
        case 'SET_NAME':
            return { ...state, name: action.payload }
        case 'SET_WEIGHT':
            return { ...state, weight: action.payload }
        case 'SET_SCORE':
            return { ...state, scores: { ...state.scores, [action.payload.choiceId]: action.payload.score } }
        case 'RESET_GHOAST_STATE':
            return initialState
        default:
            return state
    }
}

export const useGhostState = () => {
    const [state, dispatch] = useReducer(ghoastReducer, initialState)

    const setName = (name: string) => dispatch({ type: 'SET_NAME', payload: name })
    const setWeight = (weight: number) => dispatch({ type: 'SET_WEIGHT', payload: weight })
    const setScore = (choiceId: string, score: number) => dispatch({ type: 'SET_SCORE', payload: { choiceId, score } })
    const resetGhostState = () => dispatch({ type: 'RESET_GHOAST_STATE' })

    return { 
        state,
        setName,
        setWeight,
        setScore,
        resetGhostState
    }
}