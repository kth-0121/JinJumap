"use client";

import { CATEGORY_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLocaleStore } from "@/store/useLocaleStore";

export function CategoryBadge({
  category,
  className,
}: {
  category: CategoryId;
  className?: string;
}) {
  const locale = useLocaleStore((s) => s.locale);
  const meta = CATEGORY_META[category];
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1 rounded-full px-2.5 py-1 text-xs font-medium text-white shadow-sm",
        className,
      )}
      style={{ backgroundColor: meta.color }}
    >
      <span aria-hidden>{meta.icon}</span>
      {t(locale, meta.label, meta.labelEn)}
    </span>
  );
}
