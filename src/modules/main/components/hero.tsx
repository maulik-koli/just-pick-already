import React from 'react'
import HeroButtons from './hero-btns'
import ScrollDownButton from './scroll-down-btn'

const Hero: React.FC = () => {
    return (
        <div className='w-full flex flex-col items-center pt-16 pb-20 px-4 space-y-8'>
            <BadgeChip />
            
            <div className='flex flex-col gap-3'>
                <h1 className='w-full max-w-180 text-center text-5xl sm:text-[5.5rem] font-black tracking-tight leading-[1.1] sm:leading-20'>
                    What Are You <br/>
                    <span className='text-primary'>
                        Stuck On?
                    </span>
                </h1>
                
                <p className='w-full text-text-muted font-normal text-base sm:text-lg text-center'>
                    Pick what sounds like you. We'll find the right Move.
                </p>
            </div>
            
            <div className='w-full flex flex-col items-center gap-2'>
                <HeroButtons />
                <ScrollDownButton />
            </div>
        </div>
    )
}

export default Hero



const BadgeChip = function() {
    return (
        <div className='group relative flex items-center justify-center gap-3 rounded-full border border-border/60 bg-card px-5 py-2 backdrop-blur-md transition-all duration-500 hover:border-primary/50 hover:bg-card/60 hover:shadow-primaryGlow cursor-default'>
            <div className='absolute inset-0 rounded-full bg-linear-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-0 transition-opacity duration-500 group-hover:opacity-100'></div>
            
            <div className='relative flex items-center gap-3 z-10'>
                <span className='relative flex h-2 w-2'>
                    <span className='absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-75'></span>
                    <span className='relative inline-flex h-2 w-2 rounded-full bg-primary'></span>
                </span>
                <span className='text-xs font-semibold uppercase tracking-wider text-foreground/90'>Free</span>
                
                <span className='h-1 w-1 rounded-full bg-border' />
                
                <span className='text-xs font-semibold uppercase tracking-wider text-foreground/90'>No sign up</span>
                
                <span className='h-1 w-1 rounded-full bg-border' />
                
                <span className='text-xs font-semibold uppercase tracking-wider bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent'>
                    Just Decide
                </span>
            </div>
        </div>
    )
}