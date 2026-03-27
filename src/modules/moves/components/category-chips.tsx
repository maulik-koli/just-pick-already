"use client"
import React from 'react'
import { CATEGORIES } from '@/constants/categories'
import { cn } from '@heroui/react'
import { useMovesStore } from '@/store'


const CategoryChips: React.FC = () => {
    const { selectedCategory, setSelectedCategory } = useMovesStore(state => state)
    
    return (
        <div className='w-full flex py-8 px-1 items-center gap-3'>
            {CATEGORIES.map((cate, index) => (
                <div 
                    key={`${cate}-${index}`}
                    className={cn(
                        'py-1 px-3 rounded-2xl text-base border cursor-pointer',
                        selectedCategory === cate
                            ? 'bg-primary/10 border-primary text-primary'
                            : 'bg-card border-border text-foreground/70'
                    )}
                    onClick={() => setSelectedCategory(cate)}
                >
                    {cate}
                </div>
            ))}
        </div>
    )
}

export default CategoryChips