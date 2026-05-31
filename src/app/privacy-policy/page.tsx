import React from "react";
import { Metadata } from "next";
import PrivacyPolicyPageComp from "@/components/legal-pages/privacy-policy-page";

export const metadata: Metadata = {
  title: "Privacy Policy | Just Pick Already",
  description: "Privacy Policy for Just Pick Already. Understand what information we collect and how we use it.",
}

const PrivacyPolicyPage: React.FC = () => {
    return <PrivacyPolicyPageComp />
}

export default PrivacyPolicyPage;
