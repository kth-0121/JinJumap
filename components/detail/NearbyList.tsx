"use client";

import { ItemCard } from "@/components/cards/ItemCard";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import type { Place } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function NearbyList({ places }: { places: Place[] }) {
  const locale = useLocaleStore((s) => s.locale);

  if (places.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        {t(
          locale,
          "주변에 추천할 장소가 없습니다.",
          "There are no nearby recommendations.",
        )}
      </p>
    );
  }

  return (
    <div className="flex gap-4 overflow-x-auto pb-2">
      {places.map((place) => (
        <ItemCard
          key={place.id}
          className="w-64 shrink-0"
          href={placeHref(place)}
          place={place}
        />
      ))}
    </div>
  );
}
