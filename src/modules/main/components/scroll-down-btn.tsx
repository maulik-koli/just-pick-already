"use client"
import React from 'react'
import { Button } from '@heroui/react'
import Icon from '@/components/icons'


const ScrollDownButton: React.FC = () => {
    const handleScroll = () => {
        document.getElementById('popular-moves-section')?.scrollIntoView({ behavior: 'smooth' });
    };

    return (
        <div className='flex items-center justify-center'>
            <Button 
                variant='light' 
                className='text-text-muted hover:text-foreground data-[hover=true]:bg-transparent outline-0'
                disableRipple
                onClick={handleScroll}
            >
                or browse all 6 moves
                <Icon name='MoveDown' width={12} height={12} />
            </Button>
        </div>
    )
}

export default ScrollDownButton