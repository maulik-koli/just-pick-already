import { create } from "zustand";
import { CategoryType } from "@/src/constants/categories";

type MovesState = {
    selectedCategory: CategoryType
    setSelectedCategory: (cate: CategoryType) => void
}

export const useMovesStore = create<MovesState>((set) => ({
    selectedCategory: "All",

    setSelectedCategory: (cate) => set({ selectedCategory: cate })
}))