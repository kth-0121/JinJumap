import { create } from "zustand";
import type { CategoryId } from "@/lib/types";

interface FilterState {
  activeCategories: CategoryId[];
  toggleCategory: (category: CategoryId) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeCategories: [],
  toggleCategory: (category) =>
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((c) => c !== category)
        : [...state.activeCategories, category],
    })),
  reset: () => set({ activeCategories: [] }),
}));
