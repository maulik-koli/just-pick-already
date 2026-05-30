import React, { useRef } from 'react'
import * as htmlToImage from 'html-to-image'
import { Download } from 'lucide-react'

import { Result } from '@/schemas/result.schema'
import { IdentityHeader, SummaryCard, TraitScores, TopTraits } from './common-result-section'

export const DownloadPosterBtn: React.FC<{ data: Result }> = ({ data }) => {
    const posterRef = useRef<HTMLDivElement>(null)

    const handleDownloadPng = async () => {
        if (!posterRef.current) return;
        try {
            const dataUrl = await htmlToImage.toPng(posterRef.current, {
                pixelRatio: 2,
                backgroundColor: 'transparent',
            });
            const a = document.createElement("a");
            a.href = dataUrl;
            a.download = "result.png";
            a.click();
        } catch (e) {
            console.error("Failed to generate image", e);
        }
    }



    return (
        <>
            <button 
                onClick={handleDownloadPng} 
                className="inline-flex items-center justify-center gap-2 px-4 h-10 rounded-full border-2 border-primary text-sm font-semibold transition-colors cursor-pointer text-primary bg-transparent hover:bg-primary hover:text-white"
            >
                <Download className="w-4 h-4" /><span>Save as PNG</span>
            </button>

            <div className="absolute w-0 h-0 overflow-hidden pointer-events-none">
                <div ref={posterRef} className="w-[864px] p-8">
                    <div className="relative flex flex-col gap-6 p-8 rounded-[2rem] border border-border shadow-[0_20px_60px_-15px_rgba(0,0,0,0.1)] overflow-hidden" style={{ backgroundColor: 'var(--color-card, #ffffff)' }}>
                        <div className="absolute inset-0 dot-texture opacity-50 pointer-events-none" />
                        
                        <div className="relative z-10 flex flex-col gap-6 text-left">
                            <IdentityHeader data={data} disableAnimation />
                            <SummaryCard text={data.summary} disableAnimation />
                            <TraitScores scores={data.scores} disableAnimation />
                            <TopTraits traits={data.topTraits} disableAnimation />
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}
