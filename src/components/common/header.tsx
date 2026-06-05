"use client";
import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { motion, useScroll, useMotionValueEvent, AnimatePresence } from "framer-motion";

import { GithubIcon } from "@/components/icons/custom-icons";
import { Button } from "@/components/ui/button";
import { Play } from "lucide-react";
import { useHandleStart } from "@/hooks/use-handle-start";

const allowedPaths = ["/", "/about", "/contact", "/privacy-policy", "/terms-and-conditions", "/results"];

const Header: React.FC = () => {
    const pathname = usePathname();
    const { scrollY } = useScroll();
    const { handleStartGame } = useHandleStart()

    const isAllowedPath = allowedPaths.includes(pathname);

    const [scrolledPastHero, setScrolledPastHero] = useState(false);

    useMotionValueEvent(scrollY, "change", (latest) => {
        if (latest > 600) {
            setScrolledPastHero(true);
        } else {
            setScrolledPastHero(false);
        }
    });

    if (!isAllowedPath) return null;
    const isVisible = pathname === "/" ? scrolledPastHero : true;


    return (
        <AnimatePresence>
            {isVisible && (
                <motion.header
                    initial={{ y: -100, x: "-50%", opacity: 0 }}
                    animate={{ y: 0, x: "-50%", opacity: 1 }}
                    exit={{ y: -100, x: "-50%", opacity: 0 }}
                    transition={{ type: "spring", stiffness: 400, damping: 25 }}
                    className="fixed top-4 left-1/2 z-50 px-6 py-2.5 max-md:px-4 max-md:py-2 flex items-center justify-between w-[95%] max-md:w-[98%] max-w-5xl bg-background/80 backdrop-blur-md border border-border rounded-2xl shadow-sm"
                >
                    <div className="flex-1 flex items-center">
                        <Link
                            href="/"
                            className="font-black text-xl max-md:text-base tracking-tight text-primary transition-transform hover:scale-[1.02]"
                        >
                            JUST PICK ALREADY
                        </Link>
                    </div>

                    <nav className="flex items-center gap-6 max-md:gap-3 text-sm font-bold tracking-wide">
                        <Link href="/about" className="text-muted-foreground hover:text-foreground transition-colors max-md:hidden">
                            ABOUT
                        </Link>
                        <Link href="/contact" className="text-muted-foreground hover:text-foreground transition-colors max-md:hidden">
                            CONTACT
                        </Link>
                        <a
                            href="https://github.com"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="text-muted-foreground hover:text-foreground transition-colors"
                        >
                            <GithubIcon className="w-5 h-5 fill-current" />
                        </a>

                        <Button
                            className="bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm transition-all rounded-xl px-5 h-9 font-bold tracking-wider gap-2 flex items-center max-md:px-3 max-md:text-xs"
                            onClick={handleStartGame}
                            type="button"
                        >
                            <Play fill='currentColor' strokeWidth={2} className='w-4 h-4' />
                            PLAY
                        </Button>
                    </nav>
                </motion.header>
            )}
        </AnimatePresence>
    );
};

export default Header;
