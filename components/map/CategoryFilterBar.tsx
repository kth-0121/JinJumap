"use client";

import { motion } from "framer-motion";
import { CATEGORY_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useFilterStore } from "@/store/useFilterStore";
import { useLocaleStore } from "@/store/useLocaleStore";

const CATEGORIES = Object.keys(CATEGORY_META) as CategoryId[];

export function CategoryFilterBar() {
  const locale = useLocaleStore((s) => s.locale);
  const activeCategories = useFilterStore((s) => s.activeCategories);
  const toggleCategory = useFilterStore((s) => s.toggleCategory);

  return (
    <div className="no-scrollbar flex gap-6 overflow-x-auto border-b border-border">
      {CATEGORIES.map((category) => {
        const meta = CATEGORY_META[category];
        const active = activeCategories.includes(category);
        return (
          <motion.button
            key={category}
            type="button"
            whileTap={{ scale: 0.94 }}
            onClick={() => toggleCategory(category)}
            aria-pressed={active}
            className={cn(
              "flex shrink-0 flex-col items-center gap-2 border-b-2 px-0.5 pb-3 pt-1 text-xs font-medium whitespace-nowrap transition-colors",
              active
                ? "border-foreground text-foreground"
                : "border-transparent text-muted-foreground hover:text-foreground",
            )}
          >
            <span
              aria-hidden
              className={cn("text-2xl transition-opacity", !active && "opacity-50")}
            >
              {meta.icon}
            </span>
            {t(locale, meta.label, meta.labelEn)}
          </motion.button>
        );
      })}
    </div>
  );
}
