import { ResultScores } from "@/schemas/result.schema";
import { ZONE_STYLES } from "./game-zones";


export const RESULT_LOADER_LINES = [
    "Decoding your choices...",
    "Consulting the universe...",
    "Reading between the lines...",
    "Mapping your decision DNA...",
    "Almost there...",
];

export const TRAIT_LABELS: { key: keyof ResultScores; label: string }[] = [
    { key: "intuition", label: "Intuition" },
    { key: "logic", label: "Logic" },
    { key: "empathy", label: "Empathy" },
    { key: "ambition", label: "Ambition" },
    { key: "riskTolerance", label: "Risk Tolerance" },
    { key: "independence", label: "Independence" },
    { key: "adaptability", label: "Adaptability" },
    { key: "morality", label: "Morality" },
    { key: "impulsiveness", label: "Impulsiveness" },
    { key: "socialEnergy", label: "Social Energy" },
];

export const ZONE_KEY_TO_LABEL: Record<string, string> = {
    SOCIAL_SITUATOINS: "Social Situations",
    RELATIONSHIPS: "Relationships",
    CAREER: "Career",
    MORAL_GRAY_AREAS: "Moral Gray Areas",
    INPULSE_VS_LOGIC: "Impulse vs Logic",
};

export const ZONE_KEY_TO_COLOR: Record<string, string> = {
    SOCIAL_SITUATOINS: ZONE_STYLES.SOCIAL_SITUATOINS.border,
    RELATIONSHIPS: ZONE_STYLES.RELATIONSHIPS.border,
    CAREER: ZONE_STYLES.CAREER.border,
    MORAL_GRAY_AREAS: ZONE_STYLES.MORAL_GRAY_AREAS.border,
    INPULSE_VS_LOGIC: ZONE_STYLES.INPULSE_VS_LOGIC.border,
};
