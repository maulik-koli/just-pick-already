import React from "react";
import Hero from "@/src/modules/main/components/hero";

const HomePage: React.FC = () => {
  return (
    <div className="container mx-auto flex flex-col">
      <Hero />
    </div>
  );
}

export default HomePage;