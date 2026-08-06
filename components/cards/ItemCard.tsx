"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { CATEGORY_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Place } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLocaleStore } from "@/store/useLocaleStore";
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
  const categoryLabel = t(locale, meta.label, meta.labelEn);

  const content = (
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ type: "spring", stiffness: 300, damping: 22 }}
      className={cn("group text-left", className)}
    >
      <div
        className={cn(
          "relative aspect-[4/3] overflow-hidden rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)]",
          selected && "ring-2 ring-primary ring-offset-2",
        )}
        style={
          place.image
            ? undefined
            : { background: `linear-gradient(140deg, ${meta.color}26, ${meta.color}0d)` }
        }
      >
        {place.image ? (
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="relative h-full w-full"
          >
            <Image
              src={place.image}
              alt={name}
              fill
              sizes="(min-width: 1024px) 25vw, 45vw"
              className="object-cover"
            />
          </motion.div>
        ) : (
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex h-full items-center justify-center text-6xl"
          >
            <span aria-hidden>{meta.icon}</span>
          </motion.div>
        )}
        {!onClick && (
          <FavoriteButton id={place.id} className="absolute right-3 top-3" />
        )}
        {place.rating != null && (
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
            ★ {place.rating.toFixed(1)}
          </span>
        )}
      </div>
      <div className="space-y-0.5 px-1 pt-3">
        <h3 className="truncate text-[15px] font-semibold">{name}</h3>
        <p className="flex items-center gap-1.5 text-sm text-muted-foreground">
          <span aria-hidden>{meta.icon}</span>
          {categoryLabel}
        </p>
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
