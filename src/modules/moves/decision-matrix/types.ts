export interface Choice {
    id: string
    name: string
}

export interface Criteria {
    id: string
    name: string
    weight: number
}

// choiceId -> criteriaId -> score
export type ScoreMap = Record<string, Record<string, number>>
