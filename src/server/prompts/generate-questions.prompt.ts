import { OnbordingType } from "@/schemas/onbording.schema";

export function generateQuestionsPrompt({
    ageRange, decisionStyle, selfDescription, vibe
}: OnbordingType): string {

return `
You are an expert personality assessment designer and creative scenario writer.

Your task is to generate a personalized set of dilemma-based questions for a browser game called "Just Pick Already".

The game helps users discover their personality by presenting realistic, thought-provoking situations across five different life areas.

---

# User Onboarding Context

Use the following onboarding information to subtly personalize the scenarios so they feel relevant to the user's mindset and life stage.

- Age Range: ${ageRange}
- Current Vibe: ${vibe}
- Decision Style: ${decisionStyle}
- Self Description: ${selfDescription}

Important guidelines for personalization:

- Adapt the tone and context of situations to fit the user's age range and mindset.
- Use the onboarding data only as inspiration.
- Do not mention the onboarding answers directly.
- Do not stereotype or make assumptions that are too specific.
- Keep scenarios universally relatable and inclusive.

---

# Zones

Generate exactly 5 zones, each containing exactly 5 questions.

The zones are:

1. SOCIAL_SITUATOINS
2. RELATIONSHIPS
3. CAREER
4. MORAL_GRAY_AREAS
5. INPULSE_VS_LOGIC

Each zone should focus on these themes:

- SOCIAL_SITUATOINS: social energy, boundaries, empathy, people-pleasing, confidence.
- RELATIONSHIPS: trust, vulnerability, loyalty, attachment, emotional openness.
- CAREER: ambition, risk-taking, authority, money vs passion, work-life balance.
- MORAL_GRAY_AREAS: ethics, fairness, honesty, loyalty under pressure.
- INPULSE_VS_LOGIC: instinct, self-control, planning, emotional vs rational decisions.

---

# Question Requirements

Each question must:

- Present a realistic dilemma or life situation in 1 to 2 sentences only.
- Be 25 to 60 words maximum. Short enough to read in 5 seconds, meaningful enough to feel real.
- Feel personal and emotionally engaging without being heavy or clinical.
- Avoid obvious right or wrong answers.
- Force the user to choose between multiple valid responses.
- Be relatable to a broad audience.
- Be inclusive and non-judgmental.
- Feel like a quick, vivid scenario — not a traditional quiz question.

The title (3-5 words) does the heavy lifting for context. The scenario only needs to add the specific tension or dilemma. Do not repeat what the title already conveys.

Each question should reveal traits such as:

- Introversion vs extroversion
- Empathy vs self-protection
- Loyalty vs independence
- Risk tolerance
- Ambition vs stability
- Ethics under pressure
- Impulsiveness vs careful reasoning
- People-pleasing vs boundary-setting

---

# Option Requirements

Each question must contain exactly 4 answer options.

Each option must:

- Represent a distinct and believable response.
- Reflect a different personality tendency.
- Be concise and natural sounding.
- Be approximately 5 to 15 words.
- Avoid clearly good or bad choices.
- Feel emotionally nuanced and realistic.
- Be written in first-person style starting with "I".

Good examples:

- "I say yes and trust myself to handle it."
- "I ask for some time to think it through."
- "I politely decline and protect my energy."
- "I talk to someone I trust before deciding."

Bad examples (too long, too formal, not first-person):

- "I directly but calmly address their negative comments and set a firm boundary with them."
- "Seek support from those who truly believe in your capabilities and vision."

---

# Writing Style

- Conversational and punchy. Every word earns its place.
- Slightly playful but psychologically rich.
- Easy to read in one pass — no re-reading required.
- Suitable for users across different ages and backgrounds.
- Never clinical, judgmental, or overly academic.
- Designed to make users pause for a second, not deliberate for a minute.

---

# Content Safety Rules

- Do not include extreme violence, abuse, or traumatic events.
- Do not include discriminatory or offensive content.
- Keep all scenarios emotionally interesting but safe for a general audience.
- Avoid political or religious assumptions.

---

# JSON Output Requirements

Return ONLY valid JSON. Do NOT include markdown, code fences, explanations, or introductory text.

The JSON must match this exact structure:

{
    "zones": [
        {
            "zone": "SOCIAL_SITUATOINS",
            "questions": [
                {
                    "id": "social_1",
                    "zone": "SOCIAL_SITUATOINS",
                    "title": "Short 3-5 word title",
                    "scenario": "1-2 sentence dilemma, 25-60 words max.",
                    "options": [
                        { "id": "option_1", "text": "First response option." },
                        { "id": "option_2", "text": "Second response option." },
                        { "id": "option_3", "text": "Third response option." },
                        { "id": "option_4", "text": "Fourth response option." }
                    ]
                }
            ]
        }
    ]
}

---

# ID Rules

Use these exact question IDs:

- SOCIAL_SITUATOINS → social_1 to social_5
- RELATIONSHIPS → relationships_1 to relationships_5
- CAREER → career_1 to career_5
- MORAL_GRAY_AREAS → moral_1 to moral_5
- INPULSE_VS_LOGIC → impulse_1 to impulse_5

Each option uses IDs: option_1, option_2, option_3, option_4.

---

# Final Validation Rules

Before returning the JSON, verify:

- Exactly 5 zones present.
- Each zone contains exactly 5 questions. Total = 25.
- Each question contains exactly 4 options.
- Every scenario is 60 words or fewer.
- Every option starts with "I" and is 15 words or fewer.
- Every question has: id, zone, title, scenario, options.
- Every option has: id, text.
- All enum names spelled exactly as listed.
- Output is valid JSON and contains nothing else.

Return the JSON now.
`.trim();
}