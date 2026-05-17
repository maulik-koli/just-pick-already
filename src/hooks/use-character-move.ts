import { useEffect, useRef, useState } from "react";
import { WORLD_HEIGHT, WORLD_WIDTH, ZONESS_STAICS_DATA } from "@/constants/game-zones";
import { usePlayStore } from "@/store";

export const CHAR_W = 48;
export const CHAR_H = 64;
export const SPEED = 4.2;


export const useCharacterMove = () => {
    const { setPosition, openZone } = usePlayStore();
    const [viewport, setViewport] = useState<{ w: number, h:number }>({ w: 1200, h: 800 });

    const keys = useRef<Record<string, boolean>>({});
    const raf = useRef<number | null>(null);
    const containerRef = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const onResize = () => {
            if (containerRef.current) {
                setViewport({
                    w: containerRef.current.clientWidth,
                    h: containerRef.current.clientHeight,
                });
            }
        };
        onResize();
        window.addEventListener("resize", onResize);
        return () => window.removeEventListener("resize", onResize);
    }, []);

    useEffect(() => {
        const down = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = true; };
        const up = (e: KeyboardEvent) => { keys.current[e.key.toLowerCase()] = false; };
        window.addEventListener("keydown", down);
        window.addEventListener("keyup", up);

        return () => {
            window.removeEventListener("keydown", down);
            window.removeEventListener("keyup", up);
        };
    }, []);

    useEffect(() => {
        const tick = () => {
            const state = usePlayStore.getState();
            if (state.activeZone) {
                raf.current = requestAnimationFrame(tick);
                return;
            }

            const k = keys.current;
            let dx = 0;
            let dy = 0;
            if (k["arrowup"] || k["w"]) dy -= 1;
            if (k["arrowdown"] || k["s"]) dy += 1;
            if (k["arrowleft"] || k["a"]) dx -= 1;
            if (k["arrowright"] || k["d"]) dx += 1;

            const moving = dx !== 0 || dy !== 0;
            let nx = state.x;
            let ny = state.y;
            let face = state.facing;

            if (moving) {
                const len = Math.hypot(dx, dy);
                nx = Math.max(0, Math.min(WORLD_WIDTH - CHAR_W, state.x + (dx / len) * SPEED));
                ny = Math.max(0, Math.min(WORLD_HEIGHT - CHAR_H, state.y + (dy / len) * SPEED));
                if (dx > 0) face = "right";
                else if (dx < 0) face = "left";
            }

            if (moving || state.isMoving !== moving) {
                setPosition(nx, ny, face, moving);
            }

            const cx = nx + CHAR_W / 2;
            const cy = ny + CHAR_H / 2;
            const inside = ZONESS_STAICS_DATA.find(
                (z) => cx >= z.x && cx <= z.x + z.w && cy >= z.y && cy <= z.y + z.h,
            );
            if (inside) {
                openZone(inside.id);
            }

            raf.current = requestAnimationFrame(tick);
        };

        raf.current = requestAnimationFrame(tick);
        return () => {
            if (raf.current) cancelAnimationFrame(raf.current);
        };
    }, [openZone, setPosition]);

    return {
        viewport,
        containerRef
    }
}