
import React from 'react'
import CategoryChips from '@mod/moves/components/category-chips'
import MoveGrid from '@mod/moves/components/move-grid'


const MovesPage: React.FC = () => {
    return (
        <div className="w-full container mx-auto flex flex-col pt-10 pb-20">
            <div className='flex flex-col gap-3'>
                <h1 className='text-3xl sm:text-4xl md:text-5xl font-bold'>
                    Decision Moves
                </h1>
                <p className='text-left max-w-150 text-sm sm:text-base md:text-lg text-foreground/70'>
                    Proven thinking tools to help you make better choices. Pick one, use it, move on with confidence.
                </p>
            </div>

            <CategoryChips />

            <MoveGrid isFilter />
        </div>
    )
}

export default MovesPage