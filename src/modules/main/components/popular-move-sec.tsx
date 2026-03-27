'use client'
import React from 'react'
import MoveGrid from '@mod/moves/components/move-grid'
import NavLink from '@/components/common/nav-link'
import Icon from '@/components/icons'


const PopularMovesSection: React.FC = () => {
    return (
        <section id="popular-moves-section" className='w-full px-4 sm:px-6 lg:px-8 bg-background'>
            <div className='container mx-auto py-20 flex flex-col gap-14'>
                <div className='w-full flex items-center justify-between'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-text-primary tracking-tight'>
                        Popular Moves
                    </h2>

                    <NavLink href='/moves' className='flex items-center gap-2'>
                        View More
                        <Icon name='MoveRight' width={12} height={12} />
                    </NavLink>
                </div>
                
                <MoveGrid />
            </div>
        </section>
    )
}

export default PopularMovesSection