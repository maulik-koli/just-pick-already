'use client'
import React, { useMemo } from 'react'
import MoveCard from './move-card'
import { POPULAR_MOVES_LIST } from '@/constants/moves-list'
import { useMovesStore } from '@/store'

interface MoveGridProps {
    isFilter?: boolean
}


const MoveGrid: React.FC<MoveGridProps> = ({ isFilter = false }) => {
    const selectedCategory = useMovesStore(state => state.selectedCategory)

    const frameworkList = useMemo(() => {
        if (!isFilter) return POPULAR_MOVES_LIST;

        return POPULAR_MOVES_LIST.filter((move) => {
            if (selectedCategory === "All") return true;
            return move.categories.includes(selectedCategory);
        });
    }, [selectedCategory, isFilter]);


    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
            {frameworkList.map((move, index) => (
                <MoveCard key={move.title} move={move} index={index} /> 
            ))}
        </div>
    )
}

export default MoveGrid