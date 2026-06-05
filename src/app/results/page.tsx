import React, { Suspense } from "react";
import { Metadata } from "next";
import ResultPage from "@/components/result/result-page";
import ResultLoadingScreen from "@/components/result/result-loading";
import { SITE_URL } from "@/constants/seo";

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
        <Suspense fallback={<ResultLoadingScreen />}>
            <ResultPage />
        </Suspense>
    );
}

export default ResultsPage;
