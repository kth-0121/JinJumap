"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CATEGORY_META } from "@/lib/constants";
import type { CategoryId } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CategoryBadge } from "./CategoryBadge";
import { FavoriteButton } from "./FavoriteButton";

export interface ItemCardProps {
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  favoriteId?: string;
  name: string;
  category: CategoryId;
  description?: string;
  rating?: number;
  className?: string;
}

export function ItemCard({
  href,
  onClick,
  selected,
  favoriteId,
  name,
  category,
  description,
  rating,
  className,
}: ItemCardProps) {
  const meta = CATEGORY_META[category];

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      whileHover={{ y: -4 }}
      whileTap={{ scale: 0.97 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn(
        "overflow-hidden rounded-3xl border bg-card text-left shadow-sm transition-shadow hover:shadow-lg",
        selected && "ring-2 ring-primary",
        className,
      )}
    >
      <div
        className="relative flex h-32 items-center justify-center text-5xl"
        style={{ backgroundColor: `${meta.color}1a` }}
      >
        <span aria-hidden>{meta.icon}</span>
        {favoriteId && (
          <FavoriteButton id={favoriteId} className="absolute right-2 top-2" />
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold">{name}</h3>
          {rating != null && (
            <span className="shrink-0 text-sm text-muted-foreground">
              ★ {rating.toFixed(1)}
            </span>
          )}
        </div>
        <CategoryBadge category={category} />
        {description && (
          <p className="line-clamp-2 text-sm text-muted-foreground">
            {description}
          </p>
        )}
      </div>
    </motion.div>
  );

  if (onClick) {
    return (
      <button type="button" onClick={onClick} className="w-full">
        {content}
      </button>
    );
  }
  if (href) return <Link href={href}>{content}</Link>;
  return content;
}
