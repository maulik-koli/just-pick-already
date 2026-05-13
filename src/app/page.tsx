'use client'
import React from "react";
import { Button } from "@/components/ui/button";
import { OnbordingType } from "@/schemas/onbording.schema";


const HomePage: React.FC = () => {

  const handleSubmit = async () => {
    const data: OnbordingType = {
      ageRange: "AGE_18_24",
      decisionStyle: "THINK_IT_THROUGH",
      selfDescription: "IT_DEPENDS_ON_THE_SITUATION",
      vibe: "OVERTHINKING"
    }

    try {
      await fetch("/api/start", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
      })
    }
    catch (err) {
      console.log(err)
    }
  }

  return (
    <div className="w-full h-screen container mx-auto flex items-center justify-center pb-20">
      <Button onClick={handleSubmit}>Submit</Button>
    </div>
  );
}

export default HomePage;