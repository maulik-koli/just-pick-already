import React from 'react'

const AdBlock: React.FC = () => {
    return (
        <section className="px-4 py-12 max-w-4xl mx-auto">
            <div
                className="w-full h-25 flex items-center justify-center rounded-lg text-muted-foreground bg-muted"
            >
                <span className="text-sm font-medium">Ad</span>
            </div>
        </section>
    )
}

export default AdBlock