'use client'
import { cn } from '@heroui/react';
import Link from 'next/link';
import React from 'react'

interface NavLinkProps {
    href: string;
    children: React.ReactNode;
    className?: string
}

const NavLink: React.FC<NavLinkProps> = ({ href, children,className }) => {
    return (
        <Link 
            href={href}
            className={cn(
                'text-sm text-text-muted! hover:text-primary-200! transition-colors duration-300',
                className
            )}
        >
            {children}
        </Link>
    )
}

export default NavLink