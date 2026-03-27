import 'server-only';
import { MovesType } from "@/type/move"

type AiQuestions = {
    id: string,
    questions: string
}

export const AI_QUESTIONS: Record<MovesType, AiQuestions[]> = {
    'decision-matrix': [
        {
            id: 'dm-01',
            questions: "Why this this choice won?"
        },
        {
            id: 'dm-02',
            questions: "What would a risk-averse person score differently?"
        },
        {
            id: 'dm-03',
            questions: "What am I missing?"
        },
        {
            id: 'dm-04',
            questions: "Ask AI to explain the verdict"
        },
    ],
    'regret-minimization': [
        {
            id: 'rm-01',
            questions: "What would my 80-year-old self say?"
        },
        {
            id: 'rm-02',
            questions: "What am I really afraid of?"
        },
        {
            id: 'rm-03',
            questions: "What if I'm wrong about what I'll regret?"
        },
        {
            id: 'rm-04',
            questions: "What's the no-regrets move?"
        },
    ],
    'second-order-thinking': [
        {
            id: 'sot-01',
            questions: "Am I missing consequences?"
        },
        {
            id: 'sot-02',
            questions: "What's the opposite chain?"
        },
        {
            id: 'sot-03',
            questions: "Is this decision reversible?"
        },
        {
            id: 'sot-04',
            questions: "What's the worst that could happen?"
        },
        {
            id: 'sot-05',
            questions: "What would a wise person do?"
        }
    ],
    '10-10-10-rule': [
        {
            id: 'ten-01',
            questions: "How can I make the first 10 months easier?"
        },
        {
            id: 'ten-02',
            questions: "What if my 10-month prediction is wrong?"
        },
        {
            id: 'ten-03',
            questions: "What would I want in 10 years?"
        },
        {
            id: 'ten-04',
            questions: "What if I don't make this decision?"
        },
    ],
    'eisenhower-matrix': [
        {
            id: 'em-01',
            questions: "How do I delegate Q3?"
        },
        {
            id: 'em-02',
            questions: "What should I focus on for Q2?"
        },
        {
            id: 'em-03',
            questions: "How do I protect my Q2 time?"
        },
        {
            id: 'em-04',
            questions: "Is Q4 really time-wasting?"
        },
    ],
    'pre-mortem': [
        {
            id: 'pm-01',
            questions: "What am I missing?"
        },
        {
            id: 'pm-02',
            questions: "Is this prevention plan realistic?"
        },
        {
            id: 'pm-03',
            questions: "What would experts do differently?"
        },
        {
            id: 'pm-04',
            questions: "What's my 'go/no-go' trigger?"
        },
    ]
}