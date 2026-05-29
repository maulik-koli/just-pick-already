import React from "react";
import { Metadata } from "next";
import AboutPageComp from "@/components/contact-about/about-page";

export const metadata: Metadata = {
  title: "About | Just Pick Already",
  description: "Stop overthinking. Just pick already. Learn more about the AI-powered personality game.",
}

const AboutPage: React.FC = () => {
  return <AboutPageComp />;
}

export default AboutPage;
