import React from 'react';
import { Sparkles, Route, Zap, BrainCircuit, Target, Lightbulb } from 'lucide-react';

const FeaturesSection: React.FC = () => {
    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 bg-background overflow-hidden'>
            <div className='max-w-[1024px] mx-auto pt-10 pb-28 flex flex-col gap-14 relative'>
                <div className='absolute top-0 right-0 -mr-20 w-72 h-72 bg-primary/10 rounded-full blur-[100px] -z-10' />
                <div className='absolute bottom-0 left-0 -ml-20 w-72 h-72 bg-secondary/10 rounded-full blur-[100px] -z-10' />

                <div className='flex flex-col items-center gap-4 relative z-10'>
                    <div className='inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary/10 text-primary text-sm font-semibold mb-2'>
                        <Sparkles size={16} />
                        <span>Why It Works</span>
                    </div>
                    <h2 className='text-3xl sm:text-4xl md:text-5xl font-bold text-center text-text-primary tracking-tight leading-tight max-w-[768px]'>
                        Stop Overthinking. <br className="hidden sm:block" />
                        Start <span className="text-primary">Moving Forward.</span>
                    </h2>
                    <p className='text-foreground/70 text-center text-lg max-w-[672px]'>
                        Whether it&apos;s a life-altering career move or figuring out what to eat for dinner, our tools adapt to the gravity of your choices.
                    </p>
                </div>

                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 z-10'>
                    
                    <div className='md:col-span-2 md:row-span-2 group relative overflow-hidden bg-card rounded-2xl border border-border/40 shadow-sm p-8 transition-all duration-300 hover:shadow-primaryGlow flex flex-col justify-between'>
                        <div className="absolute top-4 right-4 p-4 opacity-5 transition-transform group-hover:scale-110 duration-700 ease-out">
                            <BrainCircuit size={200} className="text-primary" />
                        </div>
                        <div className="absolute inset-0 bg-linear-to-brrom-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                        
                        <div className='relative z-10 flex flex-col h-full'>
                            <div className='w-14 h-14 bg-primary/10 text-primary rounded-xl flex items-center justify-center mb-6'>
                                <Route size={28} />
                            </div>
                            <div className='mt-auto pt-32 sm:pt-40'>
                                <h3 className='text-2xl font-semibold mb-3 text-text-primary'>Mental Models that Work</h3>
                                <p className='text-foreground/70 text-base leading-relaxed max-w-[480px]'>
                                    We don&apos;t just flip coins. We use proven psychological frameworks like the Eisenhower Matrix and Pre-mortem analysis to map out your mind to help you finally decide.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='group relative overflow-hidden bg-card rounded-2xl border border-border/40 shadow-sm p-8 transition-all duration-300 hover:border-secondary/50 hover:shadow-secondaryGlow flex flex-col justify-between min-h-[220px]'>
                         <div className="absolute inset-0 bg-linear-to-tl from-secondary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                         <div className='relative z-10 h-full flex flex-col'>
                            <div className='w-12 h-12 bg-secondary/10 text-secondary rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-secondary group-hover:text-white'>
                                <Target size={24} />
                            </div>
                            <div className='mt-auto pt-6'>
                                <h3 className='text-lg font-semibold mb-2 text-text-primary'>Laser Focused</h3>
                                <p className='text-foreground/70 text-sm'>
                                    Get instant clarity on your next move. No messy spreadsheets required.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='group relative overflow-hidden bg-card rounded-2xl border border-border/40 shadow-sm p-8 transition-all duration-300 hover:border-success/50 hover:shadow-sm flex flex-col justify-between min-h-[220px]'>
                        <div className="absolute inset-0 bg-linear-to-tr from-success/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 pointer-events-none" />
                         <div className='relative z-10 h-full flex flex-col'>
                            <div className='w-12 h-12 bg-success/10 text-success rounded-xl flex items-center justify-center mb-5 transition-transform duration-300 group-hover:scale-110 group-hover:bg-success group-hover:text-white'>
                                <Zap size={24} />
                            </div>
                            <div className='mt-auto pt-6'>
                                <h3 className='text-lg font-semibold mb-2 text-text-primary'>Frictionless</h3>
                                <p className='text-foreground/70 text-sm'>
                                    No sign-up walls. Zero barriers to entry. Just jump in and decide.
                                </p>
                            </div>
                        </div>
                    </div>

                    <div className='md:col-span-3 group relative overflow-hidden bg-card rounded-2xl border border-border/40 shadow-sm p-8 md:p-10 transition-all duration-300 hover:border-primary/40 flex flex-col sm:flex-row items-center justify-between gap-8 hover:shadow-primaryGlow'>
                         <div className="absolute inset-0 bg-linear-to-r from-primary/5 via-secondary/5 to-primary/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                         <div className='relative z-10 flex-1 max-w-[672px]'>
                            <h3 className='text-2xl font-semibold mb-3 text-text-primary'>Ready to unblock your decisions?</h3>
                            <p className='text-foreground/70 text-base'>
                                You already have the answer inside you. We just give you the aesthetic and psychological tools to filter out the noise and find it.
                            </p>
                        </div>
                        <div className="relative z-10 shrink-0">
                             <div className='w-20 h-20 bg-primary/5 rounded-full flex items-center justify-center border border-primary/20 transition-all duration-500 group-hover:scale-110 group-hover:bg-primary/10'>
                                <Lightbulb size={32} className="text-primary" />
                             </div>
                        </div>
                    </div>

                </div>
            </div>
        </section>
    );
}

export default FeaturesSection;
