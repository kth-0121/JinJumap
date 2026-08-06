import { create } from "zustand";
import type { CategoryId } from "@/lib/types";
import { CATEGORY_META } from "@/lib/constants";

const ALL_CATEGORIES = Object.keys(CATEGORY_META) as CategoryId[];

interface FilterState {
  activeCategories: CategoryId[];
  toggleCategory: (category: CategoryId) => void;
  reset: () => void;
}

export const useFilterStore = create<FilterState>((set) => ({
  activeCategories: ALL_CATEGORIES,
  toggleCategory: (category) =>
    set((state) => ({
      activeCategories: state.activeCategories.includes(category)
        ? state.activeCategories.filter((c) => c !== category)
        : [...state.activeCategories, category],
    })),
  reset: () => set({ activeCategories: ALL_CATEGORIES }),
}));
