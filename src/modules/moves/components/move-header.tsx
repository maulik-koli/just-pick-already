import React from 'react';
import Link from 'next/link';
import Icon from '@/components/icons';
import { CategoryType } from '@/type/move';

interface MoveHeaderProps {
    title: string;
    description: string;
    categories: CategoryType[];
    time: string;
    // icon: IconType;
}


const MoveHeader: React.FC<MoveHeaderProps> = ({ categories, description, time, title }) => {
    return (
        <section className="w-full relative flex flex-col md:flex-row md:items-start justify-between gap-10 md:gap-16">

            <div className="flex-1 w-full flex flex-col">
                <Link href="/moves">
                    <div className='flex items-center gap-2 cursor-pointer text-sm py-4'>
                        <Icon name='ArrowLeft' width={12} height={12} />
                        Back to Moves
                    </div>  
                </Link>
                <div className="flex flex-wrap items-center gap-3 mb-6">
                    {categories.map((cate, idx) => (
                        <span 
                            key={idx} 
                            className="px-3 py-1 rounded-full text-xs font-medium bg-primary/10 text-primary border border-primary/20"
                        >
                            {cate}
                        </span>
                    ))}
                    <div className="flex items-center gap-1.5 text-xs font-medium text-text-secondary bg-background border border-border px-3 py-1 rounded-full">
                        <Icon name='Clock' width={12} height={12} />
                        {time}
                    </div>
                </div>

                <div className='flex flex-col gap-4'>
                    <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-foreground">
                        {title}
                    </h1>
                    
                    <p className="text-lg md:text-xl text-text-secondary leading-relaxed md:w-4/5">
                        {description}
                    </p>
                </div>
            </div>


            <div className="hidden md:flex shrink-0 items-center justify-center w-48 h-48 lg:w-64 lg:h-64 rounded-3xl bg-primary/5 border border-primary/10 shadow-primaryGlow relative overflow-hidden">
                Mascot
            </div>
        </section>
    );
};

export default MoveHeader;