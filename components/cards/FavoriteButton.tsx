"use client";

import { cn } from "@/lib/utils";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export function FavoriteButton({
  id,
  className,
}: {
  id: string;
  className?: string;
}) {
  const isFavorite = useFavoritesStore((s) => s.isFavorite(id));
  const toggleFavorite = useFavoritesStore((s) => s.toggleFavorite);

  return (
    <button
      type="button"
      aria-pressed={isFavorite}
      aria-label={isFavorite ? "즐겨찾기 해제" : "즐겨찾기 추가"}
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
