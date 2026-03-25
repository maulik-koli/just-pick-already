import React from 'react'

const AboutSection: React.FC = () => {
    return (
        <section className='w-full px-4 sm:px-6 lg:px-8 bg-background'>
            <div className='max-w-256 mx-auto py-20 flex flex-col gap-10'>
                <h2 className='text-2xl sm:text-3xl md:text-4xl font-semibold text-center text-text-primary tracking-tight'>
                    Why this exists
                </h2>

                <div className='max-w-200 m-auto text-center text-lg text-foreground/70'>
                    Lorem ipsum dolor sit amet consectetur, adipisicing elit. Dignissimos quis aliquid omnis modi id corporis laboriosam sint earum minima dolore ipsum magnam, inventore dolorum dolorem non facilis in temporibus consequatur provident sapiente atque quidem? Atque dolor aliquid architecto vitae ex labore deserunt perspiciatis quis, eveniet excepturi quas enim quo fuga. Lorem ipsum dolor, 
                </div>
            </div>
        </section>
    )
}

export default AboutSection