import React from 'react'

const STEPCARDS = [
    { num: "01", title: "Pick a Move", desc: "Choose from proven methods used by leaders and psychologists." },
    { num: "02", title: "Apply the framework", desc: "Work through guided steps tailored to your chosen decision method." },
    { num: "03", title: "Get your decision", desc: "Receive a clear, actionable recommendation based on your analysis." },
]


const StepCard: React.FC = () => {
    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 bg-background'>
            <div className='max-w-256 mx-auto py-20 flex flex-col gap-14'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-text-primary tracking-tight'>
                    Three steps to a better decision
                </h2>
                
                <div className='grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8'>
                    {STEPCARDS.map((step) => (
                        <div 
                            key={step.num}
                            className='bg-card rounded-2xl p-8 pt-20 border border-border/40 shadow-sm flex flex-col items-center gap-4 relative'
                        >
                            <div className='absolute top-6 left-6 text-4xl sm:text-5xl font-bold text-primary-200/50 font-mono select-none'>
                                {step.num}
                            </div>
                            
                            <div className='flex flex-col items-center gap-3 w-full'>
                                <h3 className='text-lg sm:text-xl font-semibold text-text-primary text-center'>
                                    {step.title}
                                </h3>
                                <p className='text-foreground/70 text-center text-xs sm:text-sm leading-relaxed'>
                                    {step.desc}
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    )
}

export default StepCard