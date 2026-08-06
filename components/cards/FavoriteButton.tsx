"use client";

import { t } from "@/lib/i18n";
import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useLocaleStore } from "@/store/useLocaleStore";

export function FavoriteButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const locale = useLocaleStore((s) => s.locale);
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={
        isFavorite
          ? t(locale, "즐겨찾기 해제", "Remove from favorites")
          : t(locale, "즐겨찾기 추가", "Add to favorites")
      }
      onClick={(e) => {
        e.preventDefault();
        e.stopPropagation();
        toggleFavorite(id);
      }}
      className={cn(
        "flex h-8 w-8 items-center justify-center rounded-full bg-white/90 text-base shadow-sm transition-transform hover:scale-110",
        className,
      )}
    >
      {isFavorite ? "❤️" : "🤍"}
    </button>
  );
}
