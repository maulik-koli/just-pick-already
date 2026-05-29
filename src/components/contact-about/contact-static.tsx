'use client'
import React from 'react'
import { motion } from 'framer-motion'
import { Bug, Lightbulb, ShieldAlert } from 'lucide-react'
import { cn } from '@/lib/utils'

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


const ContactStatic: React.FC = () => {
    return (
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
    )
}

export default ContactStatic