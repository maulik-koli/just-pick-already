import React from "react";
import Hero from "@/src/modules/main/components/hero";
import AdBlock from "@/src/components/common/ad-block";
import StepCard from "@/src/modules/main/components/step-card";
import AboutSection from "@/src/modules/main/components/about-sec";
import PopularFrameworkSection from "@/src/modules/main/components/popular-framework-sec";
// import FeaturesSection from "@/src/modules/main/components/features-sec";

const HomePage: React.FC = () => {
  return (
    <div className="w-full container mx-auto flex flex-col pb-20">
      <Hero />
      <AdBlock />
      <StepCard />
      <PopularFrameworkSection />
      {/* <FeaturesSection /> */}
      <AboutSection />
      <AdBlock />
    </div>
  );
}

export default HomePage;