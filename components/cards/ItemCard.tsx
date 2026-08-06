"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { CATEGORY_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Place } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLocaleStore } from "@/store/useLocaleStore";
import { CategoryBadge } from "./CategoryBadge";
import { FavoriteButton } from "./FavoriteButton";

export interface ItemCardProps {
  place: Place;
  href?: string;
  onClick?: () => void;
  selected?: boolean;
  className?: string;
}

export function ItemCard({
  place,
  href,
  onClick,
  selected,
  className,
}: ItemCardProps) {
  const locale = useLocaleStore((s) => s.locale);
  const meta = CATEGORY_META[place.category];
  const name = t(locale, place.name, place.nameEn ?? place.name);
  const description = place.description
    ? t(locale, place.description, place.descriptionEn ?? place.description)
    : undefined;

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
        {!onClick && (
          <FavoriteButton id={place.id} className="absolute right-2 top-2" />
        )}
      </div>
      <div className="space-y-2 p-4">
        <div className="flex items-center justify-between gap-2">
          <h3 className="truncate font-semibold">{name}</h3>
          {place.rating != null && (
            <span className="shrink-0 text-sm text-muted-foreground">
              ★ {place.rating.toFixed(1)}
            </span>
          )}
        </div>
        <CategoryBadge category={place.category} />
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
