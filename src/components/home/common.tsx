'use client'
import React, { useRef } from 'react'
import { useInView, motion } from 'framer-motion';
import { cn } from '@/lib/utils';

interface SectionHeaderProps {
    label: string;
    title?: string;
    description?: string;
    titleClass?: string;
}

export const SectionHeader: React.FC<SectionHeaderProps> = ({ label, title, description, titleClass }) => {
    return (
        <>
            <div className="text-center mb-3">
                <span className="inline-block text-[11px] font-bold tracking-[0.25em] text-primary">
                    [ {label} ]
                </span>
            </div>
            {title &&<h2 className={cn("text-3xl sm:text-4xl font-bold text-center mb-3 text-foreground", titleClass)}>
                {title}
            </h2>}
            {description && (
                <p className="text-center mb-12 text-muted-foreground">
                    {description}
                </p>
            )}
        </>
    );
}



interface RevealProps {
    children: React.ReactNode;
    className?: string;
    delay?: number;
}

export const Reveal: React.FC<RevealProps> = ({ children, className, delay = 0 }) => {
    const ref = useRef<HTMLDivElement>(null);
    const inView = useInView(ref, { once: true, margin: "-80px" });

    return (
        <motion.div
            ref={ref}
            initial={{ opacity: 0, y: 24 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.55, delay, ease: [0.16, 1, 0.3, 1] }}
            className={cn(className)}
        >
            {children}
        </motion.div>
    );
}