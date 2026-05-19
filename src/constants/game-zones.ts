import { Zone } from "@/generated/prisma/enums";
import { Users, Heart, Briefcase, Scale, Zap, LucideIcon } from 'lucide-react';

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
        x: 140, y: 130, w: 342, h: 288,
    },
    {
        id: "RELATIONSHIPS",
        name: "Relationships",
        colorVar: "bg-zone-relationships",
        borderVar: "border-zone-relationships",
        x: 1100, y: 70, w: 342, h: 288,
    },
    {
        id: "CAREER",
        name: "Career & Ambition",
        colorVar: "bg-zone-career",
        borderVar: "border-zone-career",
        x: 640, y: 380, w: 342, h: 288,
    },
    {
        id: "MORAL_GRAY_AREAS",
        name: "Moral Grey Areas",
        colorVar: "bg-zone-moral",
        borderVar: "border-zone-moral",
        x: 100, y: 640, w: 342, h: 288,
    },
    {
        id: "INPULSE_VS_LOGIC",
        name: "Impulse vs Logic",
        colorVar: "bg-zone-impulse",
        borderVar: "border-zone-impulse",
        x: 1120, y: 600, w: 376.2, h: 316.8,
    },
];

export type ZoneStyleType = Record<
    Zone,
    { fill: string; border: string; nameColor: string; Icon: LucideIcon; radius: string; rotate: number }
>

export const ZONE_STYLES: ZoneStyleType = {
    SOCIAL_SITUATOINS: {
        fill: "#FFD4B8",
        border: "#E8956A",
        nameColor: "#9A4A1E",
        Icon: Users,
        radius: "38% 62% 55% 45% / 48% 40% 60% 52%",
        rotate: -1.5,
    },
    RELATIONSHIPS: {
        fill: "#FFB8B8",
        border: "#D96A6A",
        nameColor: "#8A2E2E",
        Icon: Heart,
        radius: "58% 42% 48% 52% / 40% 56% 44% 60%",
        rotate: 2,
    },
    CAREER: {
        fill: "#FFF0B8",
        border: "#D4A835",
        nameColor: "#7A5A12",
        Icon: Briefcase,
        radius: "46% 54% 60% 40% / 52% 44% 56% 48%",
        rotate: -1,
    },
    MORAL_GRAY_AREAS: {
        fill: "#B8E8C8",
        border: "#5EA87A",
        nameColor: "#2E6A44",
        Icon: Scale,
        radius: "52% 48% 42% 58% / 44% 60% 40% 56%",
        rotate: 1.5,
    },
    INPULSE_VS_LOGIC: {
        fill: "#D4B8F0",
        border: "#8A5EC8",
        nameColor: "#4A2E7A",
        Icon: Zap,
        radius: "44% 56% 50% 50% / 58% 42% 56% 44%",
        rotate: -2,
    },
};