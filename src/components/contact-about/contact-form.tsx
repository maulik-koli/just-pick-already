'use client'
import React, { useState } from 'react'
import { motion } from 'framer-motion';

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { ShinyButton } from '../ui/shiny-button';
import { CheckCircle2 } from 'lucide-react';


const ContactForm: React.FC = () => {
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [message, setMessage] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleSubmit = () => {
        console.log("submit")
    };


    return (
        <div className="bg-card/80 backdrop-blur-md border-2 border-border rounded-3xl p-6 sm:p-8 shadow-xl">
            <form onSubmit={handleSubmit} className="flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-name" className="text-xs font-bold tracking-widest uppercase text-foreground/80 flex items-center gap-2">
                        Your Name
                    </Label>
                    <Input
                        id="contact-name"
                        placeholder="Player One"
                        required
                        value={name}
                        onChange={(e) => setName(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="bg-background/50 border-2 border-border rounded-xl h-14 px-4 text-sm focus-visible:border-primary focus-visible:ring-0 w-full shadow-inner transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-email" className="text-xs font-bold tracking-widest uppercase text-foreground/80 flex items-center gap-2">
                        Your Email
                    </Label>
                    <Input
                        id="contact-email"
                        type="email"
                        placeholder="player@world.com"
                        required
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="bg-background/50 border-2 border-border rounded-xl h-14 px-4 text-sm focus-visible:border-primary focus-visible:ring-0 w-full shadow-inner transition-colors"
                    />
                </div>

                <div className="flex flex-col gap-2">
                    <Label htmlFor="contact-message" className="text-xs font-bold tracking-widest uppercase text-foreground/80 flex items-center gap-2">
                        Transmission
                    </Label>
                    <Textarea
                        id="contact-message"
                        placeholder="What's on your mind?"
                        required
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        disabled={isLoading || isSuccess}
                        className="bg-background/50 border-2 border-border rounded-xl min-h-[140px] resize-none px-4 py-3 text-sm focus-visible:border-primary focus-visible:ring-0 w-full shadow-inner transition-colors"
                    />
                </div>

                <div className="mt-2">
                    {isSuccess ? (
                        <motion.div
                            initial={{ opacity: 0, scale: 0.9 }}
                            animate={{ opacity: 1, scale: 1 }}
                            className="flex items-center justify-center gap-3 bg-primary/10 border-2 border-primary/20 text-primary py-4 rounded-xl font-bold shadow-inner"
                        >
                            <CheckCircle2 className="size-5" />
                            <span>Transmission successful.</span>
                        </motion.div>
                    ) : (
                        <ShinyButton
                            variant="default"
                            hideShiny={true}
                            className="w-full rounded-xl py-4 h-auto text-base font-bold shadow-md"
                            disabled={isLoading}
                        >
                            {isLoading ? "SENDING..." : "SEND MESSAGE"}
                        </ShinyButton>
                    )}
                </div>
            </form>
        </div>
    )
}

export default ContactForm