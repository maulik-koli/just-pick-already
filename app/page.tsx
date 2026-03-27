import React from "react";
import Hero from "@mod/main/components/hero";
import AdBlock from "@/components/common/ad-block";
import StepCard from "@mod/main/components/step-card";
import AboutSection from "@mod/main/components/about-sec";
import PopularMovesSection from "@mod/main/components/popular-move-sec";


const HomePage: React.FC = () => {
  return (
    <div className="w-full container mx-auto flex flex-col pb-20">
      <Hero />
      <AdBlock />
      <StepCard />
      <PopularMovesSection />
      {/* <FeaturesSection /> */}
      <AboutSection />
      <AdBlock />
    </div>
  );
}

export default HomePage;