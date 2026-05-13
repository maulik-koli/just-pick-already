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

    - Present a realistic dilemma or life situation.
    - Feel personal and emotionally engaging.
    - Reveal meaningful personality traits.
    - Avoid obvious "right" or "wrong" answers.
    - Force the user to choose between multiple valid responses.
    - Be relatable to a broad audience.
    - Be inclusive and non-judgmental.
    - Be written in 2 to 4 concise sentences.
    - Be approximately 40 to 120 words.
    - Be long enough to create meaningful context, but short enough to remain fun and easy to read.
    - Feel like a story-based situation rather than a traditional quiz question.

    Each question should explore traits such as:

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

    Each question must contain exactly 5 answer options.

    Each option must:

    - Represent a distinct and believable response.
    - Reflect a different personality tendency.
    - Be concise and natural sounding.
    - Be approximately 5 to 20 words.
    - Avoid clearly good or bad choices.
    - Feel emotionally nuanced and realistic.
    - Be written in first-person or action-oriented style.

    Good examples:

    - "I say yes and trust myself to handle it."
    - "I ask for some time to think it through."
    - "I politely decline and protect my energy."
    - "I talk to someone I trust before deciding."
    - "I choose the option that feels most exciting."

    ---

    # Writing Style

    - Conversational and engaging.
    - Insightful and psychologically rich.
    - Slightly playful but respectful.
    - Easy to understand.
    - Suitable for users across different ages and backgrounds.
    - Never clinical, judgmental, or overly academic.
    - Designed to make users pause and genuinely think about what they would do.

    ---

    # Content Safety Rules

    - Do not include extreme violence, abuse, or traumatic events.
    - Do not include discriminatory or offensive content.
    - Do not include illegal or dangerous instructions.
    - Keep all scenarios emotionally interesting but safe for a general audience.
    - Avoid political or religious assumptions.

    ---

    # JSON Output Requirements

    Return ONLY valid JSON.

    Do NOT include:

    - Markdown
    - Code fences
    - Explanations
    - Introductory text
    - Comments

    The JSON must match this exact structure:

    {
        "zones": [
            {
                "zone": "SOCIAL_SITUATOINS",
                "questions": [
                    {
                        "id": "social_1",
                        "zone": "SOCIAL_SITUATOINS",
                        "title": "Optional short title",
                        "scenario": "The full dilemma text.",
                        "options": [
                            {
                                "id": "option_1",
                                "text": "First response option."
                            },
                            {
                                "id": "option_2",
                                "text": "Second response option."
                            },
                            {
                                "id": "option_3",
                                "text": "Third response option."
                            },
                            {
                                "id": "option_4",
                                "text": "Fourth response option."
                            },
                            {
                                "id": "option_5",
                                "text": "Fifth response option."
                            }
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

    Each question must include the correct zone value.

    Each option must use these exact IDs:

    - option_1
    - option_2
    - option_3
    - option_4
    - option_5

    ---

    # Final Validation Rules

    Before returning the JSON, verify that:

    - Exactly 5 zones are present.
    - Each zone contains exactly 5 questions.
    - Total questions = 25.
    - Each question contains exactly 5 options.
    - Every question has:
    - id
    - zone
    - title
    - scenario
    - options
    - Every option has:
    - id
    - text
    - All enum names are spelled exactly as listed.
    - Output is valid JSON and contains nothing else.

    Return the JSON now.
    `.trim();
}