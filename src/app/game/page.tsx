import React from 'react'
import { Metadata } from 'next'
import GameScreen from '@/components/game/game-screen'
import { SITE_URL } from '@/constants/seo'

export const metadata: Metadata = {
    title: "Play the Personality Game",
    description:
        "Walk your stickman through 5 themed zones, face real-life moral dilemmas, and discover your true personality. A fun, free browser game with AI-powered analysis.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: `${SITE_URL}/game`,
    },
}

const GamePage: React.FC = () => {
    return (
        <div className='overflow-hidden!'>
            <GameScreen />
        </div>
    )
}

export default GamePage
