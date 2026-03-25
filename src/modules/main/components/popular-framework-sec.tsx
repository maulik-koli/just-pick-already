'use client'
import React from 'react'
import FrameworkGrid from '../../framework/components/framework-grid'
import Link from 'next/link'


const PopularFrameworkSection: React.FC = () => {
    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 bg-background'>
            <div className='container mx-auto py-20 flex flex-col gap-14'>
                <div className='w-full flex items-center justify-between'>
                    <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-text-primary tracking-tight'>
                        Popular Moves
                    </h2>

                    <Link href='/frameworks'>View More</Link>
                </div>
                
                <FrameworkGrid />
            </div>
        </section>
    )
}

export default PopularFrameworkSection