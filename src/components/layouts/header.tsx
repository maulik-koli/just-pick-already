'use client'
import { Link } from '@heroui/react'
import React from 'react'

const Header: React.FC = () => {
    return (
        <header className='h-16 sticky top-0 z-50 flex border-b border-border bg-card'>
            <div className='container mx-auto flex items-center justify-between'>
                <span className='text-xl font-bold text-foreground'>
                    Just Pick Already
                </span>
                <nav className='flex gap-2'>
                    <Link href="/moves" className='text-foreground'>
                        Moves
                    </Link>
                </nav>
            </div>
        </header>  
    )
}

export default Header