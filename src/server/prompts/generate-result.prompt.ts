import { Zone } from "@/generated/prisma/client";
import { OnbordingType } from "@/schemas/onbording.schema";

export type AnswerPayloadItem = {
    questionId: string;
    zone: Zone;
    questionTitle: string;
    scenario: string;
    selectedOptionText: string;
    allOptions: string[];
};


export function generateResultPrompt(
    answers: AnswerPayloadItem[],
    onboarding: OnbordingType
): string {
    const answersBlock = answers.map((a, i) =>
    `Q${i + 1} [${a.zone}]
Title: ${a.questionTitle}
Scenario: ${a.scenario}
All options: ${a.allOptions.map((o, idx) => `(${idx + 1}) ${o}`).join(" | ")}
User chose: ${a.selectedOptionText}`
    )
        .join("\n\n");

return `
You are a personality profiler for a browser game called "Just Pick Already".

Your job is to analyze a user's choices across 25 dilemma-based scenarios and generate a rich, insightful, and engaging personality profile.

The tone should be: warm, direct, slightly playful, psychologically grounded. Never clinical. Never generic. Make the user feel seen.

---

# User Onboarding Context

- Age Range: ${onboarding.ageRange}
- Current Vibe: ${onboarding.vibe}
- Decision Style: ${onboarding.decisionStyle}
- Self Description: ${onboarding.selfDescription}

Use this context to make the profile feel personally relevant. Do not quote it back directly.

---

# User Answers

${answersBlock}

---

# Your Task

Analyze all 25 answers holistically. Look for patterns across zones, contradictions, and surprising tendencies. Generate a personality profile in the exact JSON structure below.

---

# Field Instructions

**title** (string)
A 3-5 word personality archetype. Creative and specific. Not generic (avoid "The Balanced Person", "The Thinker"). Examples: "The Quiet Strategist", "The Reluctant Leader", "The Calculated Rebel".

**subtitle** (string)
One punchy sentence that captures the core tension or duality in their personality. Max 12 words.

**summary** (string)
2-3 sentences. The most honest, insightful read of who this person is based on their choices. Should feel like something a perceptive friend would say — not a horoscope. Reference actual patterns from their answers without quoting options verbatim.

**scores** (object, all values 0-100 integers)
Score each trait honestly based on the answer patterns. Do not default everything to 50-70. Use the full range — some traits will be genuinely high or low.

Traits to score:
- intuition: how much they trust gut feeling over data
- logic: how systematically they reason through decisions
- empathy: how much they factor in others' feelings
- ambition: drive, goal orientation, desire to grow
- riskTolerance: comfort with uncertainty and bold moves
- independence: preference for self-reliance over consensus
- adaptability: how flexibly they respond to change
- morality: how principled their choices are under pressure
- impulsiveness: tendency to act without deliberating
- socialEnergy: comfort and enjoyment in social situations (high = extrovert leaning)

**topTraits** (array of exactly 4 strings)
Single words or short phrases (2 words max). The 4 most defining traits that emerged. Be specific. Examples: "Boundary-setter", "Slow burner", "Systems thinker", "Quietly ambitious".

**strengths** (array of exactly 3 strings)
Genuine strengths revealed by their choices. Each should be one clear sentence starting with "You". Reference actual behavior patterns, not platitudes.

**blindSpots** (array of exactly 2 strings)
Honest, constructive blind spots. Not harsh — framed as growth edges. Each one sentence starting with "You". These should feel like something worth reflecting on, not a criticism.

**zoneInsights** (object)
One insight per zone. Each value is 1 sentence (max 15 words) that captures the defining pattern from that zone's answers. Be specific to what they actually chose.

Zones: SOCIAL_SITUATOINS, RELATIONSHIPS, CAREER, MORAL_GRAY_AREAS, INPULSE_VS_LOGIC

**mostSurprisingChoice** (object)
Find the single answer that most contradicts or adds nuance to their overall pattern.
- question: the scenario title and a brief description (max 20 words)
- explanation: why this choice stood out given everything else (1-2 sentences, starts with "Your answer")

**shareText** (string)
Exactly this format: "I got [title] on Just Pick Already." — replace [title] with the actual title value.

---

# Output Rules

- Return ONLY valid JSON. No markdown, no code fences, no explanation, no preamble.
- All strings must be properly escaped.
- Scores must be integers between 0 and 100.
- Do not use placeholder text or generic filler.
- Every insight must be grounded in the actual answers provided — no hallucinated patterns.

---

# JSON Structure

{
  "title": "",
  "subtitle": "",
  "summary": "",
  "scores": {
    "intuition": 0,
    "logic": 0,
    "empathy": 0,
    "ambition": 0,
    "riskTolerance": 0,
    "independence": 0,
    "adaptability": 0,
    "morality": 0,
    "impulsiveness": 0,
    "socialEnergy": 0
  },
  "topTraits": ["", "", "", ""],
  "strengths": ["", "", ""],
  "blindSpots": ["", ""],
  "zoneInsights": {
    "SOCIAL_SITUATOINS": "",
    "RELATIONSHIPS": "",
    "CAREER": "",
    "MORAL_GRAY_AREAS": "",
    "INPULSE_VS_LOGIC": ""
  },
  "mostSurprisingChoice": {
    "question": "",
    "explanation": ""
  },
  "shareText": ""
}

Return the JSON now.
    `.trim();
}