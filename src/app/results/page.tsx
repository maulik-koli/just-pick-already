import React, { Suspense } from "react";
import { Metadata } from "next";
import ResultPage from "@/components/result/result-page";
import ResultLoadingScreen from "@/components/result/result-loading";

export const metadata: Metadata = {
    title: "Your Result — Just Pick Already",
    description: "Your personalized decision-making profile. See what your choices reveal about you.",
}


const ResultsPage: React.FC = () => {
    return (
        <Suspense fallback={<ResultLoadingScreen />}>
            <ResultPage />
        </Suspense>
    );
}

export default ResultsPage;
