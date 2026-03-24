"use client"
import React from 'react'
import { Button } from '@heroui/react'
import Icon from '@/src/components/icons'


const ScrollDownButton: React.FC = () => {
    return (
        <div className='flex items-center justify-center'>
            <Button 
                variant='light' 
                className='text-text-muted hover:text-foreground data-[hover=true]:bg-transparent outline-0'
                disableRipple
            >
                or browse all 6 moves
                <Icon name='MoveDown' width={12} height={12} />
            </Button>
        </div>
    )
}

export default ScrollDownButton