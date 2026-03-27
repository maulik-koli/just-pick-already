import { CategoryType, MovesType } from "@/type/move"
import { IconType } from "../components/icons"

export type MoveListItem = {
    title: string,
    slug: MovesType,
    description: string,
    subtitle: string,
    categories: CategoryType[],
    time: string,
    icon: IconType
}


export const MOVES_LIST: Record<MovesType, MoveListItem> = {
    'decision-matrix': {
        title: "Decision Matrix",
        slug: 'decision-matrix',
        subtitle: "Compare choices across weighted factors to find the objectively strongest option",
        categories: ["Prioritization", "Risk"],
        time: "5-10 minutes",
        icon: "Scale",
        description: "A scoring system that removes gut feeling from your decision. You pick what matters, rate each option against it, and let the math show you the winner."
    },
    'regret-minimization': {
        title: "Regret Minimization",
        slug: "regret-minimization",
        subtitle: "Fast-forward your life 60 years. Which path would your future self regret NOT taking?",
        categories: ["Psychology", "Long-term Thinking"],
        time: "8-12 minutes",
        icon: "Brain",
        description: "You fast forward to age 80 and look back at this moment. Which choice would the older version of you wish you had made? It sounds simple but it has a way of cutting through every excuse and fear that is clouding the decision right now.",
    },
    "second-order-thinking": {
        title: "Second Order Thinking",
        slug: "second-order-thinking",
        subtitle: "Don't just think about what happens next. Think about what happens after that",
        categories: ["Strategy", "Long-term Thinking"],
        time: "6-10 minutes",
        icon: "Layers",
        description: "Most people think one step ahead. Second order thinking asks what happens after that. It is the difference between a decision that looks good today and one that actually holds up over time.",
    },
    "10-10-10-rule": {
        title: "10/10/10 Rule",
        slug: "10-10-10-rule",
        subtitle: "Your feeling right now isn't the only one that matters. Check in with your future self at 3 key moments",
        categories: ["Psychology", "Long-term Thinking"],
        time: "8-10 minutes",
        icon: "Clock",
        description: "A reality check for decisions that feel overwhelming in the moment. You ask yourself how you'll feel about this choice in 10 minutes, 10 months, and 10 years. The answer usually makes it obvious.",
    },
    "eisenhower-matrix": {
        title: "Eisenhower Matrix",
        slug: "eisenhower-matrix",
        subtitle: "Sort your tasks and decisions by urgency and importance to cut through the noise.",
        categories: ["Prioritization", "Risk"],
        time: "7-12 minutes",
        icon: "Target",
        description: "A simple 2x2 grid that sorts everything on your plate into four buckets: do it, schedule it, delegate it, or cut it. No more treating every task like it's equally important.",
    },
    "pre-mortem": {
        title: "Pre-Mortem",
        slug: "pre-mortem",
        subtitle: "Flip to pessimist mode. What could go wrong? How do you prevent it?",
        categories: ["Risk"],
        time: "8-15 minutes",
        icon: "Waypoints",
        description: "Instead of hoping your plan works, you imagine it already failed. Then you work backwards to figure out why. It sounds pessimistic but it is one of the most effective ways to bulletproof a decision before you commit to it.",
    },
}

export const POPULAR_MOVES_LIST = [
    MOVES_LIST['decision-matrix'],
    MOVES_LIST['regret-minimization'],
    MOVES_LIST['second-order-thinking'],
    MOVES_LIST['10-10-10-rule'],
    MOVES_LIST['eisenhower-matrix'],
    MOVES_LIST['pre-mortem']
]