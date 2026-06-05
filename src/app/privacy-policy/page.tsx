import React from "react";
import { Metadata } from "next";
import PrivacyPolicyPageComp from "@/components/legal-pages/privacy-policy-page";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Privacy Policy",
  description:
    "Read the privacy policy for Just Pick Already. No personal data is collected. The game is completely free and anonymous. Understand how we handle your information.",
  alternates: {
    canonical: `${SITE_URL}/privacy-policy`,
  },
};

const PrivacyPolicyPage: React.FC = () => {
    return <PrivacyPolicyPageComp />
}

export default PrivacyPolicyPage;
