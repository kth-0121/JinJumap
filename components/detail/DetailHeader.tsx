import { CategoryBadge } from "@/components/cards/CategoryBadge";
import { FavoriteButton } from "@/components/cards/FavoriteButton";
import { CATEGORY_META } from "@/lib/constants";
import type { Place } from "@/lib/types";

export function DetailHeader({ place }: { place: Place }) {
  const meta = CATEGORY_META[place.category];

  const facts: { label: string; value: string }[] = [
    ...(place.address ? [{ label: "주소", value: place.address }] : []),
    ...(place.openHours ? [{ label: "운영시간", value: place.openHours }] : []),
    ...(place.phone ? [{ label: "전화", value: place.phone }] : []),
    ...(place.priceRange ? [{ label: "가격대", value: place.priceRange }] : []),
  ];

  return (
    <header className="overflow-hidden rounded-3xl border shadow-sm">
      <div
        className="relative flex h-56 items-center justify-center text-8xl"
        style={{ backgroundColor: `${meta.color}1a` }}
      >
        <span aria-hidden>{meta.icon}</span>
        <FavoriteButton id={place.id} className="absolute right-4 top-4" />
      </div>
      <div className="space-y-3 p-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-2xl font-bold tracking-tight">{place.name}</h1>
          {place.rating != null && (
            <span className="text-sm text-muted-foreground">
              ★ {place.rating.toFixed(1)}
            </span>
          )}
        </div>
        <CategoryBadge category={place.category} />
        {place.description && (
          <p className="text-muted-foreground">{place.description}</p>
        )}
        {facts.length > 0 && (
          <dl className="grid grid-cols-1 gap-2 pt-2 text-sm sm:grid-cols-2">
            {facts.map((fact) => (
              <div key={fact.label}>
                <dt className="text-muted-foreground">{fact.label}</dt>
                <dd>{fact.value}</dd>
              </div>
            ))}
          </dl>
        )}
      </div>
    </header>
  );
}
