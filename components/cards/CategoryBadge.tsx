import { CATEGORY_META } from "@/lib/constants";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";

export function CategoryBadge({
  category,
  className,
}: {
  category: CategoryId;
  className?: string;
}) {
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
      {meta.label}
    </span>
  );
}
