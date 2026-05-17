import { create } from "zustand";
import { Zone } from "@/generated/prisma/enums";

interface PlayState {
    x: number;
    y: number;
    facing: "left" | "right";
    isMoving: boolean;
    activeZone: Zone | null;

    setPosition: (x: number, y: number, facing: "left" | "right", isMoving: boolean) => void;
    openZone: (z: Zone) => void;
    closeModal: () => void;
}


export const usePlayStore = create<PlayState>()((set) => ({
    x: 500,
    y: 500,
    facing: "right",
    isMoving: false,
    activeZone: null,
    
    setPosition: (x, y, facing, isMoving) => set({ x, y, facing, isMoving }),
    openZone: (z) => set({ activeZone: z, isMoving: false }),
    closeModal: () => set({ activeZone: null }),
}))