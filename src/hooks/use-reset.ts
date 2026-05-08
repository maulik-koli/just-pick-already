import { MovesType } from "@/type/move";
import { useDecisionMatrixStore } from "@/modules/moves/decision-matrix/store/decision-matrix-store";
import { useMemo } from "react";

export const useRestMovesData = (slug: MovesType) => {
    const resetDecisionMatrix = useDecisionMatrixStore(state => state.reset)

    const REST_MAP = useMemo(() => {
        return {
            'decision-matrix': resetDecisionMatrix,
            'second-order-thinking': () => console.log('temp')
        } as Record<MovesType, () => void>
    }, [])

    const fn = REST_MAP[slug]

    if (!fn) {
        throw new Error(`No reset function found for slug: ${slug}`)
    }

    return fn
}