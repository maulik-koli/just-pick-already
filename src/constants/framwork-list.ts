import { IconType } from "../components/icons"
import { CategoryType } from "./categories"

export type FrameworkListItem = {
    title: string,
    description: string,
    categories: CategoryType[],
    time: string,
    icon: IconType
}

export const FRMAWORK_LIST: FrameworkListItem[] = [
    {
        title: "Decision Matrix",
        description: "Compare choices across weighted factors to find the objectively strongest option",
        categories: ["Prioritization", "Risk"],
        time: "5-10 minutes",
        icon: "Scale"
    },
    {
        title: "Regret Minimization",
        description: "Fast-forward your life 60 years. Which path would your future self regret NOT taking?",
        categories: ["Psychology", "Long-term Thinking"],
        time: "8-12 minutes",
        icon: "Brain"
    },
    {
        title: "Second Order Thinking",
        description: "Don't just think about what happens next. Think about what happens after that",
        categories: ["Strategy", "Long-term Thinking"],
        time: "6-10 minutes",
        icon: "Layers"
    },
    {
        title: "10/10/10 Rule",
        description: "Your feeling right now isn't the only one that matters. Check in with your future self at 3 key moments",
        categories: ["Psychology", "Long-term Thinking"],
        time: "8-10 minutes",
        icon: "Clock"
    },
     {
        title: "Eisenhower Matrix",
        description: "Sort your tasks and decisions by urgency and importance to cut through the noise.",
        categories: ["Prioritization", "Risk"],
        time: "7-12 minutes",
        icon: "Target"
    },
    {
        title: "Pre-Mortem",
        description: "Flip to pessimist mode. What could go wrong? How do you prevent it?",
        categories: ["Risk"],
        time: "8-15 minutes",
        icon: "Waypoints"
    },
]