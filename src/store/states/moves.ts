import { CategoryType } from "@/type/move";
import { create } from "zustand";


type MovesState = {
    selectedCategory: CategoryType
    setSelectedCategory: (cate: CategoryType) => void
}

export const useMovesStore = create<MovesState>((set) => ({
    selectedCategory: "All",

    setSelectedCategory: (cate) => set({ selectedCategory: cate })
}))