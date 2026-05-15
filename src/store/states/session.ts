import { create } from "zustand";
import { persist } from 'zustand/middleware';

type SessionState = {
    sessionId: string | null,
    openOnbordingModel: boolean,

    setSessionId: (id: string) => void
    toggleOnbordingModel: (open: boolean) => void
}

export const useSessionStore = create<SessionState>()(persist((set) => ({
    sessionId: null,
    openOnbordingModel: false,

    setSessionId: (id) => set({ sessionId: id }),
    toggleOnbordingModel: (open) => set({ openOnbordingModel: open }),
}), {
    name: "session",
    partialize: (state) => ({
        sessionId: state.sessionId,
    }),
}))