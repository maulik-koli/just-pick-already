import React from "react";
import { Metadata } from "next";
import HomePageCom from "@/components/home/home-page";
import { SITE_URL } from "@/constants/seo";

export const metadata: Metadata = {
  title: "Free AI Personality Test | Get Your Results in 5 Minutes",
  description:
    "Discover your true personality with a free AI-powered browser game. No sign up, no login needed. Just pick your choices across 5 zones and get a detailed, shareable personality card in minutes.",
  openGraph: {
    url: SITE_URL,
    title: "Free AI Personality Test | Get Your Results in 5 Minutes",
    description:
      "Play a free personality game in your browser. Answer real-life dilemmas, explore 5 themed zones, and get an AI-generated personality profile you can share.",
  },
  twitter: {
    title: "Free AI Personality Test | Get Your Results in 5 Minutes",
    description:
      "Play a free personality game in your browser. Answer real-life dilemmas, explore 5 themed zones, and get an AI-generated personality profile you can share.",
  },
  alternates: {
    canonical: SITE_URL,
  },
};


const HomePage: React.FC = () => {
  return <HomePageCom />;
}

export default HomePage;