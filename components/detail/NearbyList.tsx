import { ItemCard } from "@/components/cards/ItemCard";
import { placeHref } from "@/lib/links";
import type { Place } from "@/lib/types";

export function NearbyList({ places }: { places: Place[] }) {
  if (places.length === 0) {
    return (
      <p className="text-sm text-muted-foreground">
        주변에 추천할 장소가 없습니다.
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
          favoriteId={place.id}
          name={place.name}
          category={place.category}
          description={place.description}
          rating={place.rating}
        />
      ))}
    </div>
  );
}
