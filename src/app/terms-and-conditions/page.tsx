import React from "react";
import { Metadata } from "next";
import TermsAndConditionsPageComp from "@/components/legal-pages/terms-and-conditions-page";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Terms and Conditions",
  description:
    "Review the terms and conditions for using Just Pick Already, the free, browser-based AI personality game. Please read these terms before playing.",
  alternates: {
    canonical: `${SITE_URL}/terms-and-conditions`,
  },
};

const TermsAndConditionsPage: React.FC = () => {
    return <TermsAndConditionsPageComp />
}

export default TermsAndConditionsPage;
