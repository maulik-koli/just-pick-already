"use client"
import React from 'react'
import Link from 'next/link'
import Icon from '@/src/components/icons'
import { FrameworkListItem } from '@/src/constants/framwork-list'
import { categoryColors, iconColorList } from '@/src/lib/getStyle'

interface FrameworkCardProps {
    framework: FrameworkListItem
    index: number
}


const FrameworkCard: React.FC<FrameworkCardProps> = ({ framework, index }) => {
    const activeIconStyle = iconColorList[index % iconColorList.length] || { bg: 'bg-primary/10', text: 'text-primary' };

    return (
        <div className='relative group w-full bg-card rounded-xl border border-border p-5 sm:p-6 transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary/40 flex flex-col overflow-hidden'>

            <Link href='/frameworks/decision-matrix' className='absolute inset-0 z-20 focus:outline-none focus:ring-2 focus:ring-primary rounded-xl' aria-label={`Try ${framework.title}`} />
            
            <div className={`absolute -top-2 -right-4 sm:top-1 sm:right-1 opacity-5 group-hover:opacity-15 transition-all duration-500 group-hover:scale-110 pointer-events-none ${activeIconStyle.text}`}>
                <Icon name={framework.icon} width={80} height={80} />
            </div>
            
            <div className='flex flex-col relative z-10 h-full'>
                <div className={`rounded-lg p-2 aspect-square w-10 flex items-center justify-center transition-transform duration-300 group-hover:scale-110 mb-3 sm:mb-4 ${activeIconStyle.bg} ${activeIconStyle.text}`}>
                    <Icon name={framework.icon} width={20} height={20} />
                </div>

                <div className='flex flex-col mb-3 sm:mb-4'>
                    <h3 className='text-base sm:text-lg font-semibold text-text-primary transition-colors'>
                        {framework.title}
                    </h3>
                    <p className='text-foreground/70 text-sm leading-relaxed mt-1'>
                        {framework.description}
                    </p>
                </div>

                <div className='flex flex-wrap gap-2 mb-4'>
                    {framework.categories.map((category) => {
                        const chipColor = categoryColors[category] || "bg-text-muted/10 text-foreground/60";
                        return (
                            <span key={category} className={`text-[10px] sm:text-xs tracking-wider py-1 px-2.5 rounded-full font-medium ${chipColor}`}>
                                {category}
                            </span>
                        );
                    })}
                </div>

                <div className='w-full flex items-center justify-between mt-auto pt-4 border-t border-border/50'>
                    <p className='text-xs text-text-muted flex items-center gap-1.5 font-medium'>
                        <Icon name='Clock' width={14} height={14} className='opacity-70' />
                        {framework.time}
                    </p>
                    <div className='flex items-center gap-1.5 text-xs text-primary font-semibold opacity-0 group-hover:opacity-100 transition-all duration-300 transform translate-x-[-8px] group-hover:translate-x-0'>
                        Try it
                        <Icon name='MoveRight' width={14} height={14} className='text-primary transition-transform duration-300 group-hover:translate-x-1' />
                    </div>
                </div>
            </div>
        </div>
    )
}

export default FrameworkCard