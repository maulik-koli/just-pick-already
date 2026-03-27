'use client'
import React from 'react'
import Link from 'next/link'
import Icon from '../icons'
import { STATIC_LINKS } from '@/constants/static-links'
import NavLink from '../common/nav-link'

const NAV_LINKS = [
    { href: '/moves', label: "Moves" },
    { href: '/about', label: "About" },
    { href: '/contact', label: "Contact" }
]


const Header: React.FC = () => {
    return (
        <header className='h-16 sticky top-0 z-50 flex border-b border-border bg-card'>
            <div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
                <Link href='/' className='text-foreground hover:text-primary transition-colors duration-300'>
                    <span className='text-xl font-bold '>
                        Just Pick Already
                    </span>
                </Link>
                <nav className='flex gap-6'>
                    {NAV_LINKS.map((nav) => (
                        <NavLink
                            href={nav.href}
                            key={nav.href}
                        >
                            {nav.label}
                        </NavLink>
                    ))}
                    <a 
                        type='button'
                        href={STATIC_LINKS.github}
                        target='_blank'
                        className='text-text-muted! hover:text-foreground! transition-colors duration-300 cursor-pointer'
                    >
                        <Icon name='github' width={18} height={18} fill='currentColor' />
                    </a>
                </nav>
            </div>
        </header>  
    )
}

export default Header