"use client"
import React from 'react'
import Link from 'next/link'

const Footer: React.FC = () => {
    return (
        <div className='py-6 bg-card border-t border border-border'>
            <div className='w-full max-w-7xl mx-auto flex items-center justify-between'>
                <span className='flex gap-4'>
                    <Link href="/privacy-policy" className='text-foreground hover:text-primary-200 transition-colors'>
                        Privacy Policy
                    </Link>
                    <Link href="/terms-of-service" className='text-foreground hover:text-primary-200 transition-colors'>
                        Terms of Service
                    </Link>
                </span>
                <span className='text-sm text-text-muted'>
                    © {new Date().getFullYear()} Just Pick Already. All rights reserved.
                </span>
            </div>
        </div>
    )
}

export default Footer