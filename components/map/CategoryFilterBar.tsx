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
    <div className="flex flex-wrap gap-2">
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
              "inline-flex items-center gap-1.5 rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              active
                ? "border-transparent text-white shadow-sm"
                : "border-border bg-background text-muted-foreground hover:bg-muted",
            )}
            style={active ? { backgroundColor: meta.color } : undefined}
          >
            <span aria-hidden>{meta.icon}</span>
            {t(locale, meta.label, meta.labelEn)}
          </motion.button>
        );
      })}
    </div>
  );
}
