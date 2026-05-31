import React from "react";
import { Metadata } from "next";
import TermsAndConditionsPageComp from "@/components/legal-pages/terms-and-conditions-page";

export const metadata: Metadata = {
  title: "Terms and Conditions | Just Pick Already",
  description: "Terms and Conditions for Just Pick Already. Please read these terms before using the site.",
}

const TermsAndConditionsPage: React.FC = () => {
    return <TermsAndConditionsPageComp />
}

export default TermsAndConditionsPage;
