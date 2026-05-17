import { Zone } from "@/generated/prisma/enums";

export const WORLD_WIDTH = 1600;
export const WORLD_HEIGHT = 1000;

export interface ZoneStatic {
    id: Zone;
    name: string;
    colorVar: string;
    borderVar: string;
    // boundaries in world coordinates (px)
    x: number;
    y: number;
    w: number;
    h: number;
}

export const ZONESS_STAICS_DATA: ZoneStatic[] = [
    {
        id: "SOCIAL_SITUATOINS",
        name: "Social Situations",
        colorVar: "bg-zone-social",
        borderVar: "border-zone-social",
        x: 140, y: 130, w: 380, h: 320,
    },
    {
        id: "RELATIONSHIPS",
        name: "Relationships",
        colorVar: "bg-zone-relationships",
        borderVar: "border-zone-relationships",
        x: 1100, y: 70, w: 380, h: 320,
    },
    {
        id: "CAREER",
        name: "Career & Ambition",
        colorVar: "bg-zone-career",
        borderVar: "border-zone-career",
        x: 720, y: 380, w: 380, h: 320,
    },
    {
        id: "MORAL_GRAY_AREAS",
        name: "Moral Grey Areas",
        colorVar: "bg-zone-moral",
        borderVar: "border-zone-moral",
        x: 100, y: 640, w: 380, h: 320,
    },
    {
        id: "INPULSE_VS_LOGIC",
        name: "Impulse vs Logic",
        colorVar: "bg-zone-impulse",
        borderVar: "border-zone-impulse",
        x: 1120, y: 600, w: 418, h: 352,
    },
];