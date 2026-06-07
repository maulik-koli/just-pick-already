import React from 'react'
import Footer from '@/components/common/footer'
import { 
    HeroSection, 
    EndCardSection, 
    HowToPlaySection, 
    MapSection, 
    PreviewSections, 
    ResultCardSection,
    ZoneSections
} from '@/components/home/sections'


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
                <Footer />
            </div>
        </div>
    )
}

export default HomePageCom