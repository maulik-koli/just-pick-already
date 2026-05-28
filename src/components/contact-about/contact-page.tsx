'use client'
import React, { ComponentPropsWithoutRef } from 'react'
import { motion } from 'framer-motion'
import { cn } from '@/lib/utils'

import Character from '../game/character';
import ContactForm from './contact-form';
import Footer from '../common/footer';
import { Bug, Lightbulb, LucideIcon, Mail, ShieldAlert } from 'lucide-react';
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

const STATIC_CARDS = [
    {
        title: "Bug Reports",
        icon: <Bug className="size-6 text-red-400" />,
        desc: "Found a glitch in the matrix? Give us the steps to reproduce it. The more detail you provide, the faster we patch reality.",
        color: "bg-red-500/5 border-red-500/20"
    },
    {
        title: "Feature Requests",
        icon: <Lightbulb className="size-6 text-yellow-400" />,
        desc: "Have an idea to make the game better? We log every suggestion into the master databank. If it fits the lore, it gets built.",
        color: "bg-yellow-500/5 border-yellow-500/20"
    },
    {
        title: "Direct Access",
        icon: <ShieldAlert className="size-6 text-blue-400" />,
        desc: "No bots. No automated replies. Every transmission is decrypted and read directly by the core developer team.",
        color: "bg-blue-500/5 border-blue-500/20"
    }
]


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
    
            <main className="relative z-10 grow flex flex-col items-center justify-center pt-24 pb-16 px-6">
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
                            className="font-black tracking-tight text-4xl sm:text-5xl text-foreground"
                        >
                            Get in touch.
                        </motion.h1>
            
                        <motion.p
                            variants={itemVariants}
                            className="mt-4 text-base sm:text-lg text-muted-foreground max-w-[340px]"
                        >
                            Spotted a bug in the matrix? Have a killer feature idea? Or just want to say hi? Drop it here.
                        </motion.p>
        
                    <motion.div variants={itemVariants} className="mt-10 grid grid-cols-2 gap-4">
                        <LinkBlock
                            href="mailto:hello@justpickalready.in"
                            className="flex flex-col"
                            IconCom={Mail}
                        >
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                                Email
                            </span>
                            <span className="text-sm font-medium text-foreground">hello@justpickalready.in</span>
                        </LinkBlock>
        
                        <LinkBlock
                            href="https://x.com/justpickalready"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex flex-col"
                            IconCom={Xicon}
                            iconProps={{fill: "currentColor"}}
                        >
                            <span className="text-xs font-bold tracking-widest text-muted-foreground uppercase mb-1">
                                Twitter / X
                            </span>
                            <span className="text-sm font-medium text-foreground">@justpickalready</span>
                        </LinkBlock>
        
                        <LinkBlock
                            href="https://github.com/maulik-koli/just-pick-already"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="col-span-2 flex flex-row items-center gap-3"
                            IconCom={GithubIcon}
                            iconProps={{fill: "currentColor"}}
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
        
                    <motion.div variants={itemVariants} className="relative">
                        <div className="absolute inset-0 bg-linear-to-br from-primary/10 to-transparent rounded-3xl -z-10 blur-xl" />
                        
                        <ContactForm />
                    </motion.div>
                </motion.div>
            </main>
    
            <section className="relative z-10 w-full bg-card/30 border-y border-border/50 py-24 px-6 backdrop-blur-sm">
                <div className="max-w-[1000px] mx-auto">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.6 }}
                        className="flex flex-col items-center text-center mb-16"
                    >
                    <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-primary mb-3">
                        [ TRANSMISSION LOGS ]
                    </span>
                    <h2 className="text-3xl sm:text-4xl font-black tracking-tight text-foreground" style={{ fontFamily: "system-ui, -apple-system, sans-serif" }}>
                        Before you hit send.
                    </h2>
                    <p className="mt-4 text-base text-muted-foreground max-w-lg">
                        Here is what you need to know about how your messages are handled by the mainframe.
                    </p>
                    </motion.div>
        
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    {STATIC_CARDS.map((item, i) => (
                        <motion.div
                            key={i}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.1 }}
                            className={cn("p-6 rounded-3xl border flex flex-col gap-4 relative overflow-hidden group hover:border-primary/50 transition-colors shadow-sm", item.color)}
                        >
                            <div className="bg-background rounded-2xl p-3 w-fit shadow-sm border border-border/50">
                                {item.icon}
                            </div>
                            <div>
                                <h3 className="text-lg font-bold text-foreground mb-2">{item.title}</h3>
                                <p className="text-sm text-muted-foreground leading-relaxed">
                                    {item.desc}
                                </p>
                            </div>
                        </motion.div>
                    ))}
                    </div>
                </div>
            </section>
        
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

const LinkBlock: React.FC<LinkBlockProps> = function({ IconCom, iconProps, className, children, ...props }){
    return (
       <a 
            className={cn(
                "group relative p-4 bg-card border border-border rounded-2xl hover:border-primary transition-all duration-300 shadow-sm hover:shadow-md hover:-translate-y-1 no-underline", className
            )}
            {...props}
        >
            <div className="bg-primary/10 text-primary p-2 rounded-xl w-fit mb-3 group-hover:scale-110 transition-transform">
                <IconCom className="size-5" {...iconProps} />
            </div>
            {children}
        </a> 
    )
}