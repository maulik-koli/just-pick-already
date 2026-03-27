import { MovesType } from "@/type/move"

type StepsType = {
    id: string,
    title: string,
    description: string
}

type ExplanationType = {
    whyItWork: string,
    steps: StepsType[]
}


export const MOVES_EXPLANATOIN: Record<MovesType, ExplanationType> = {
    'decision-matrix': {
        whyItWork: "Hard decisions feel hard because your brain is trying to hold too many things at once. The moment you write it all down, assign weights, and score it, the fog clears. You're not changing your values, you're finally seeing them organized.",
        steps: [
            {
                id: "1",
                title: "Define your decision",
                description: "Write down exactly what you're deciding. The clearer the question, the more useful the result."
            },
            {
                id: "2",
                title: "List your options",
                description: "Add 2-4 choices you're seriously considering. Don't overthink it, you can always edit later."
            },
            {
                id: "3",
                title: "Pick what matters",
                description: "Add the factors that actually affect this decision. things like cost, effort, time, or risk."
            },
            {
                id: "4",
                title: "Set the weights",
                description: "Not all factors are equal. Give each one a weight from 1-10 based on how much it matters to you."
            },
            {
                id: "5",
                title: "Score each option",
                description: "For every option, rate how well it performs on each factor, again from 1-10. Be honest."
            },
            {
                id: "6",
                title: "See the winner",
                description: "The app multiplies your scores by the weights and adds them up. Highest score wins."
            }
        ]
    },
    "eisenhower-matrix": {
        whyItWork: "Most people are busy but not productive. The difference is almost always this: they're spending their time on things that feel urgent but don't actually matter. The Eisenhower Matrix forces you to separate the two, and once you see your tasks sorted clearly, it becomes obvious where your real attention should go.",
        steps: [
            {
                id: "1",
                title: "Write down everything on your plate",
                description: "Dump all your tasks, decisions, and responsibilities out of your head. Don't filter yet, just list them."
            },
            {
                id: "2",
                title: "Ask two questions per task",
                description: "Is this urgent? Does it actually matter to my goals? Your answers will place it in one of four quadrants."
            },
            {
                id: "3",
                title: "Drop each task into a quadrant",
                description: "Urgent and important goes in Q1. Important but not urgent goes in Q2. Urgent but not important goes in Q3. Neither goes in Q4."
            },
            {
                id: "4",
                title: "Act on what each quadrant tells you",
                description: "Q1 you do now. Q2 you schedule and protect. Q3 you delegate or push back on. Q4 you cut without guilt."
            },
            {
                id: "5",
                title: "Notice where most of your time is going",
                description: "The pattern your tasks form tells you a lot. If Q1 is overflowing, you are in reactive mode. If Q2 is empty, that is the real problem."
            }
        ]
    },
    "10-10-10-rule": {
        whyItWork: "Most regret doesn't come from making the wrong choice. It comes from making a choice while only thinking about the next ten minutes. This rule pulls you out of the emotion of the moment and makes you face the longer version of yourself, the one who has to live with whatever you decide today.",
        steps: [
            {
                id: "1",
                title: "Name the decision clearly",
                description: "Write down exactly what you are deciding. Be specific, vague decisions produce vague answers."
            },
            {
                id: "2",
                title: "Ask how you will feel in 10 minutes",
                description: "This captures your gut reaction. Is it relief, guilt, excitement, anxiety? This is usually the emotional pull driving the decision."
            },
            {
                id: "3",
                title: "Ask how you will feel in 10 months",
                description: "The medium term is where most consequences actually land. Will this still matter? Will you be glad you did it or wish you had chosen differently?"
            },
            {
                id: "4",
                title: "Ask how you will feel in 10 years",
                description: "From this distance, most small decisions disappear completely. The ones that do not disappear are the ones worth paying attention to."
            },
            {
                id: "5",
                title: "Look at the pattern",
                description: "If all three feel good, move forward with confidence. If 10 minutes feels good but 10 months and 10 years feel bad, that is your answer right there."
            }
        ]
    },
    "pre-mortem": {
        whyItWork: `Most plans fail for reasons that were visible from the beginning, we just did not want to look. The pre-mortem gives you permission to look. By asking "what went wrong" before anything has gone wrong, you catch the cracks while they are still cheap to fix.`,
        steps: [
            {
                id: "1",
                title: "Write down your plan or decision",
                description: "Be clear about what you are committing to. The more specific you are here, the more useful the exercise becomes."
            },
            {
                id: "2",
                title: "Jump to the future",
                description: "Imagine it is six months from now and things went badly. Not a little off track, completely failed. Hold that picture in your mind."
            },
            {
                id: "3",
                title: "Write the failure story",
                description: "Describe what happened as if you are telling someone after the fact. What went wrong, when did it start falling apart, what was the moment it became unfixable."
            },
            {
                id: "4",
                title: "Pull out the root causes",
                description: "Read back what you wrote and extract the specific reasons things failed. Not the symptoms, the actual underlying causes."
            },
            {
                id: "5",
                title: "Build your prevention plan",
                description: "For each root cause, write one concrete thing you can do now to prevent it. These become your early warning signs and your action items."
            },
            {
                id: "6",
                title: "Decide with open eyes",
                description: "You now know where the weak points are. Go ahead with the plan if you still believe in it, but go in prepared instead of blindly optimistic."
            }
        ]
    },
    "second-order-thinking": {
        whyItWork: "Every action has a reaction, and that reaction has a reaction of its own. The problem is our brains are wired to stop at the first one. We see the immediate result, feel satisfied, and move on. Second order thinking refuses to stop there. It follows the chain until the real consequences show up, the ones that actually determine whether a decision was good or not.",
        steps: [
            {
                id: "1",
                title: "Write down your decision",
                description: "State clearly what you are thinking of doing. One clean sentence is enough."
            },
            {
                id: "2",
                title: "Ask what happens immediately",
                description: "What is the direct and obvious result of this action? This is your first order consequence. Write it down."
            },
            {
                id: "3",
                title: "Ask what happens because of that",
                description: "Now take that first consequence and ask what follows from it. This is second order. It is usually less obvious and more important."
            },
            {
                id: "4",
                title: "Keep going one level deeper",
                description: "Take your second order consequence and ask again. What does that lead to? Third and fourth order consequences are where the real insight usually lives."
            },
            {
                id: "5",
                title: "Look at where the chain ends up",
                description: "Read the full chain from top to bottom. Does the final consequence still feel acceptable? If not, you have just found something worth reconsidering."
            },
            {
                id: "6",
                title: "Adjust your decision if needed",
                description: "You do not have to abandon the plan. But if the chain revealed something uncomfortable, now is the time to account for it before you commit."
            }
        ]
    },
    "regret-minimization": {
        whyItWork: "The reason hard decisions feel hard is because we are weighing them against the wrong timeframe. We compare the fear of doing something against the comfort of not doing it, both measured in the next few weeks. The regret minimization framework changes the measuring stick entirely. Suddenly you are not asking what feels safer right now, you are asking what you can live with for the rest of your life.",
        steps: [
            {
                id: "1",
                title: "Write down the decision you are facing",
                description: "State it clearly and honestly. Do not soften it or frame it in a way that already leans toward one answer."
            },
            {
                id: "2",
                title: "Imagine you are 80 years old",
                description: "You have lived your whole life. You have seen how things turned out. You are looking back at this exact moment you are in right now."
            },
            {
                id: "3",
                title: "Play out each option from that perspective",
                description: "If you choose option A, how does that chapter of your life read from age 80? What did it lead to, what did it cost you, what did it give you?"
            },
            {
                id: "4",
                title: "Do the same for option B",
                description: "Same question, different path. From the end of your life looking back, how does this choice feel? Better, worse, or about the same?"
            },
            {
                id: "5",
                title: "Ask which choice leaves more regret",
                description: "Not which one is safer or easier right now. Which one, from the perspective of your 80 year old self, do you wish you had made differently."
            },
            {
                id: "6",
                title: "Let that answer guide you",
                description: "You do not have to ignore practical concerns. But if one choice clearly produces more regret from the long view, that is information worth taking seriously."
            }
        ]
    },
}