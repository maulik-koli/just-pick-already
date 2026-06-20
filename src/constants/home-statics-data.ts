
export const DRIFTING_ZONES = [
    { text: "Social Situations", top: "12%", left: "8%", dur: 18 },
    { text: "Career", top: "22%", right: "10%", dur: 22 },
    { text: "Relationships", top: "70%", left: "12%", dur: 20 },
    { text: "Moral Grey Areas", top: "82%", right: "8%", dur: 26 },
    { text: "Impulse vs Logic", top: "55%", left: "75%", dur: 24 },
]

export const MAP_ZONES = [
    { 
        name: "Social Situations",
        line: "The party. The small talk. The escape plan.",
        zone_color: "bg-zone-social",
        top: "58%", left: "12%",
        w: 170, h: 90, rot: -3
    },
    { 
        name: "Career",
        line: "Money, meaning, and your weekends.",
        zone_color: "bg-zone-relationships", 
        top: "30%", left: "18%", 
        w: 150, h: 80, rot: 2
    },
    { 
        name: "Relationships",
        line: "Honest answers, awkward truths.",
        zone_color: "bg-zone-career",
        top: "12%", left: "40%",
        w: 170, h: 90, rot: -2
    },
    { 
        name: "Moral Grey Areas",
        line: "No right answer. Pick anyway.",
        zone_color: "bg-zone-moral",
        top: "50%", left: "48%",
        w: 175, h: 90, rot: 3
    },
    { 
        name: "Impulse vs Logic",
        line: "The booking page is open. The clock is ticking.",
        zone_color: "bg-zone-impulse",
        top: "20%", left: "70%",
        w: 180, h: 95, rot: -2
    },
]

export const PREVIEW_CARDS = [
    { 
        zone: "Social Situations",
        accent: "#E8B894",
        q: "Your closest friend asks for your honest opinion on a decision you think is a mistake. You..."
    },
    {
        zone: "Career",
        accent: "#E8C97A",
        q: "You get offered your dream role but it means relocating away from everyone you know. You..."
    },
    {   
        zone: "Moral Grey Areas",
        accent: "#D9A589",
        q: "You are next in line for a promotion. A colleague who needs it more also applied. You..."
    },
    { 
        zone: "Relationships",
        accent: "#E89A9A",
        q: "Your partner wants to merge finances. You have always kept yours separate. You..."
    },
    { 
        zone: "Impulse vs Logic",
        accent: "#D89A7A",
        q: "The flight is half price but leaves in 6 hours. Your week is fully booked. You..."
    },
]

export const STEPS = [
    { n: "1", title: "Quick warm-up", desc: "Answer 4 quick questions to set the scene." },
    { n: "2", title: "Walk the world", desc: "Move your character through 5 life zones." },
    { n: "3", title: "Face dilemmas", desc: "Real choices. No right or wrong answers." },
    { n: "4", title: "Get your profile", desc: "Receive your AI-generated personality read." },
];

export const PERSONAS = [
    { title: "The Calculated Romantic", traits: ["Loyal", "Overthinking", "Risk-Averse"], rot: -8 },
    { title: "The Reluctant Leader", traits: ["Ambitious", "Conflict-Avoidant", "Principled"], rot: -3 },
    { title: "The Chaotic Optimist", traits: ["Impulsive", "Warm", "Adaptable"], rot: 2 },
    { title: "The Quiet Strategist", traits: ["Reserved", "Analytical", "Patient"], rot: 7 },
];

export const ZONES_SECTION_DATA = [
    { name: "Social Situations", line: "The party. The small talk. The escape plan.", zone_color: "bg-zone-social" },
    { name: "Relationships", line: "Honest answers, awkward truths.", zone_color: "bg-zone-relationships" },
    { name: "Career", line: "Money, meaning, and your weekends.", zone_color: "bg-zone-career" },
    { name: "Moral Grey Areas", line: "No right answer. Pick anyway.", zone_color: "bg-zone-moral" },
    { name: "Impulse vs Logic", line: "The booking page is open. The clock is ticking.", zone_color: "bg-zone-impulse" },
];

export const MASCOT_CHARACTER = [
    { 
        src: "/mascot_1.webp",
        className: "absolute right-[2%] top-[10%] w-[100px] md:right-[5%] lg:right-[15%] md:top-[15%] md:w-[180px] lg:w-[240px]", delay: 0, duration: 6, rot: [-2, 2, -2]
    },
    {   
        src: "/mascot_4.webp",
        className: "absolute left-[2%] top-[15%] w-[90px] hidden sm:block md:left-[5%] lg:left-[12%] md:top-[25%] md:w-[150px] lg:w-[200px]",
        delay: 1, duration: 5, rot: [3, -3, 3]
    },
    { 
        src: "/mascot_5.webp",
        className: "absolute left-[5%] bottom-[10%] w-[80px] md:left-[10%] lg:left-[22%] md:bottom-[15%] md:w-[130px] lg:w-[160px]",
        delay: 2.5, duration: 7, rot: [-4, 4, -4]
    },
    { 
        src: "/mascot_6.webp",
        className: "absolute right-[5%] bottom-[12%] w-[85px] hidden sm:block md:right-[10%] lg:right-[25%] md:bottom-[15%] md:w-[140px] lg:w-[180px]",
        delay: 1.5, duration: 5.5, rot: [2, -2, 2]
    },
]