'use client'
import React, { useMemo } from 'react'
import FrameworkCard from './framework-card'
import { FRMAWORK_LIST } from '@/src/constants/framwork-list'
import { useMovesStore } from '@/src/store'

interface FrameworkGridProps {
    isFilter?: boolean
}


const FrameworkGrid: React.FC<FrameworkGridProps> = ({ isFilter = false }) => {
    const selectedCategory = useMovesStore(state => state.selectedCategory)

    const frameworkList = useMemo(() => {
        if (!isFilter) return FRMAWORK_LIST;

        return FRMAWORK_LIST.filter((fw) => {
            if (selectedCategory === "All") return true;
            return fw.categories.includes(selectedCategory);
        });
    }, [selectedCategory, isFilter]);


    return (
        <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
            {frameworkList.map((framework, index) => (
                <FrameworkCard key={framework.title} framework={framework} index={index} /> 
            ))}
        </div>
    )
}

export default FrameworkGrid