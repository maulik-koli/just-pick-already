import React, { Suspense } from "react";
import { Metadata } from "next";
import { SITE_URL } from "@/constants/seo";
import ResultPage from "@/components/result/result-page";
import FullScreenLoader from "@/components/common/full-screen-loader";

export const metadata: Metadata = {
    title: "Your Personality Results",
    description:
        "See your AI-generated personality profile. Dominant traits, strengths, blind spots, and a shareable personality card based on your choices.",
    robots: {
        index: false,
        follow: false,
    },
    alternates: {
        canonical: `${SITE_URL}/results`,
    },
};


const ResultsPage: React.FC = () => {
    return (
        <Suspense fallback={<FullScreenLoader />}>
            <ResultPage />
        </Suspense>
    );
}

export default ResultsPage;
