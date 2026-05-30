import React from 'react'
// import AdBlock from '../common/ad-block'
import Footer from '../common/footer'
import { 
    HeroSection, 
    EndCardSection, 
    HowToPlaySection, 
    MapSection, 
    PreviewSections, 
    ResultCardSection,
    ZoneSections
} from './sections'


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
                {/* <AdBlock /> */}
                <Footer />
            </div>
        </div>
    )
}

export default HomePageCom