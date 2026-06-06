'use client'
import React, { ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import Character from '../game/character';
import ContactForm from './contact-form';
import Footer from '../common/footer';
import ContactStatic from './contact-static';
import { LucideIcon, Mail } from 'lucide-react';
import { GithubIcon, Xicon } from '../icons/custom-icons';

const containerVariants = {
    hidden: { opacity: 0 },
    show: {
        opacity: 1,
        transition: { staggerChildren: 0.1, delayChildren: 0.2 },
    },
};

const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    show: { opacity: 1, y: 0, transition: { type: "spring" as const, stiffness: 300, damping: 24 } },
};


const ContactPageComp: React.FC = () => {
    return (
        <div className="min-h-screen bg-background text-foreground relative overflow-hidden flex flex-col">
            <div className="dot-grid fixed inset-0 pointer-events-none opacity-[0.4] z-0" />
            <div
                className={cn(
                    "absolute inset-0 pointer-events-none z-0",
                    "bg-[radial-gradient(ellipse_800px_600px_at_center_30%,var(--color-secondary))_0%,transparent_80%]"
                )}
            />

            <div className="h-30 shrink-0 w-full relative z-10" />

            <main className="relative z-10 grow flex flex-col items-center justify-center pb-16 px-6">
                <motion.div
                    initial="hidden"
                    animate="show"
                    variants={containerVariants}
                    className="w-full max-w-[1000px] grid grid-cols-1 lg:grid-cols-[1fr_1.2fr] gap-12 lg:gap-20 items-center"
                >
                    <div className="flex flex-col">
                        <motion.div variants={itemVariants} className="relative mb-6">
                            <div style={{ transform: "scale(1.5)", transformOrigin: "left bottom" }}>
                                <Character isMoving={true} facing="right" duration={1.5} />
                            </div>
                        </motion.div>

                        <motion.div variants={itemVariants} className="mb-2">
                            <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-primary">
                                [ SECURE CHANNEL ]
                            </span>
                        </motion.div>

                        <motion.h1
                            variants={itemVariants}
                            className="font-black tracking-tight text-5xl sm:text-6xl text-foreground"
                            style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}
                        >
                            Get in <span className="text-primary">touch.</span>
                        </motion.h1>

                        <motion.p
                            variants={itemVariants}
                            className="mt-6 text-lg text-muted-foreground max-w-[380px] leading-relaxed"
                        >
                            Spotted a bug in the matrix? Have a killer feature idea? Or just want to say hi? Drop your transmission here.
                        </motion.p>

                        <motion.div variants={itemVariants} className="mt-12 grid grid-cols-2 gap-6">
                            <LinkBlock
                                href="mailto:hello@justpickalready.in"
                                className="col-span-2 flex flex-row items-center gap-3"
                                IconCom={Mail}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                                        Email
                                    </span>
                                    <span className="text-sm font-medium text-foreground">hello@justpickalready.in</span>
                                </div>
                            </LinkBlock>

                            <LinkBlock
                                href="https://github.com/maulik-koli/just-pick-already"
                                target="_blank"
                                rel="noopener noreferrer"
                                className="col-span-2 flex flex-row items-center gap-3"
                                IconCom={GithubIcon}
                                iconProps={{ fill: "currentColor" }}
                            >
                                <div className="flex flex-col">
                                    <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-0.5">
                                        Source Code
                                    </span>
                                    <span className="text-sm font-medium text-foreground">Explore the repository</span>
                                </div>
                            </LinkBlock>
                        </motion.div>
                    </div>

                    <motion.div variants={itemVariants} className="relative w-full h-full">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/20 to-transparent rounded-3xl -z-10 blur-2xl opacity-60" />
                        
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </main>

            <ContactStatic />

            <div className="relative z-10 w-full">
                <Footer />
            </div>
        </div>
    )
}

export default ContactPageComp



interface LinkBlockProps extends ComponentPropsWithoutRef<'a'> {
    IconCom: LucideIcon | React.FC<React.SVGProps<SVGSVGElement>>
    iconProps?: React.SVGProps<SVGSVGElement>
}

const LinkBlock: React.FC<LinkBlockProps> = function ({ IconCom, iconProps, className, children, ...props }) {
    return (
        <a
            className={cn(
                "group relative p-6 bg-card/40 backdrop-blur-sm border border-border rounded-3xl hover:border-primary/50 transition-all duration-500 shadow-sm hover:shadow-lg hover:-translate-y-1 no-underline overflow-hidden", className
            )}
            {...props}
        >
            <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
            <div className="bg-primary/10 text-primary p-3 rounded-2xl w-fit mb-4 group-hover:scale-110 transition-transform duration-500 relative z-10">
                <IconCom className="size-6" {...iconProps} />
            </div>
            {children}
        </a>
    )
}