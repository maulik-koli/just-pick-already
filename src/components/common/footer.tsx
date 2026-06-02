'use client'
import React from 'react'
import Link from 'next/link'

const NAV_LINKS = [
    { href: "/about", label: "About" },
    { href: "/contact", label: "Contact" },
    { href: "/privacy-policy", label: "Privacy Policy" },
    { href: "/terms-and-conditions", label: "Terms and Conditions" },
]


const Footer: React.FC = () => {
    return (
        <footer className="px-4 py-8 max-md:py-6 border-t bg-muted text-muted-foreground">
            <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 max-md:text-center">
                <div className="flex flex-wrap items-center justify-center gap-x-6 gap-y-2 max-md:gap-x-4 text-sm text-muted-foreground">
                    {NAV_LINKS.map(li => (
                        <Link key={li.label} href={li.href} className="hover:underline">
                            {li.label}
                        </Link>
                    ))}
                </div>
                <p className="text-xs text-muted-foreground" >
                    © {new Date().getFullYear()} Just Pick Already
                </p>
            </div>
        </footer>
    )
}

export default Footer