import React from "react";
import { Metadata } from "next";
import AboutPageComp from "@/components/contact-about/about-page";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "About | The Story Behind the Game",
  description:
    "Learn why Just Pick Already was built. A free, anonymous personality discovery game that replaces boring questionnaires with real-life dilemmas and AI-generated insights.",
  openGraph: {
    url: `${SITE_URL}/about`,
    title: "About | The Story Behind the Game",
    description:
      "The story behind the free AI personality game that turns self-discovery into an interactive adventure.",
  },
  alternates: {
    canonical: `${SITE_URL}/about`,
  },
};

const AboutPage: React.FC = () => {
  return <AboutPageComp />;
}

export default AboutPage;
