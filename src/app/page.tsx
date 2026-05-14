import React from "react";
import { Metadata } from "next";
import HomePageCom from "@/components/home/home-page";

export const metadata: Metadata = {
  title: "Just Pick Already",
  description: "Just Pick Already",
}


const HomePage: React.FC = () => {
  return <HomePageCom />;
}

export default HomePage;