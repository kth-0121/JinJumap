import { ItemCard } from "@/components/cards/ItemCard";
import { placeHref } from "@/lib/links";
import type { Place } from "@/lib/types";

export function DiscoveryShelf({
  title,
  places,
}: {
  title: string;
  places: Place[];
}) {
  if (places.length === 0) return null;

  return (
    <section>
      <h2 className="mb-3 text-lg font-semibold tracking-tight">{title}</h2>
      <div className="no-scrollbar flex gap-4 overflow-x-auto pb-1">
        {places.map((place) => (
          <ItemCard
            key={place.id}
            href={placeHref(place)}
            place={place}
            className="w-[168px] shrink-0 sm:w-44"
          />
        ))}
      </div>
    </section>
  );
}
