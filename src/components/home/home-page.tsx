import React from 'react'
import HeroSection from './hero-sec'
import HowToPlaySection from './how-to-play-sec'
import ResultCardSection from './result-card-sec'
import ZoneSections from './zone-sec'
import MapSection from './map-sec'
import PreviewSections from './preview-sec'
import EndCardSection from './end-card-sec'
import AdBlock from '../common/ad-block'
import Footer from '../common/footer'


const HomePageCom: React.FC = () => {
    return (
        <div className="min-h-screen relative bg-background text-foreground">
            <div className="dot-grid fixed inset-0 pointer-events-none opacity-[0.5] z-0" />

            <div className="relative z-10">
                <HeroSection />
                <MapSection />
                <PreviewSections />
                <HowToPlaySection />
                <ResultCardSection />
                <ZoneSections />
                <EndCardSection />
                <AdBlock />
                <Footer />
            </div>
        </div>
    )
}

export default HomePageCom