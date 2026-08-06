"use client";

import { CategoryBadge } from "@/components/cards/CategoryBadge";
import { FavoriteButton } from "@/components/cards/FavoriteButton";
import { CATEGORY_META, PRICE_RANGE_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Place } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function DetailHeader({ place }: { place: Place }) {
  const locale = useLocaleStore((s) => s.locale);
  const meta = CATEGORY_META[place.category];
  const name = t(locale, place.name, place.nameEn ?? place.name);
  const description = place.description
    ? t(locale, place.description, place.descriptionEn ?? place.description)
    : undefined;

  const facts: { label: string; value: string }[] = [
    ...(place.address
      ? [{ label: t(locale, "주소", "Address"), value: place.address }]
      : []),
    ...(place.openHours
      ? [
          {
            label: t(locale, "운영시간", "Hours"),
            value: t(locale, place.openHours, place.openHoursEn ?? place.openHours),
          },
        ]
      : []),
    ...(place.phone
      ? [{ label: t(locale, "전화", "Phone"), value: place.phone }]
      : []),
    ...(place.priceRange
      ? [
          {
            label: t(locale, "가격대", "Price"),
            value: t(
              locale,
              PRICE_RANGE_META[place.priceRange].label,
              PRICE_RANGE_META[place.priceRange].labelEn,
            ),
          },
        ]
      : []),
  ];

  return (
    <header>
      <div
        className="relative flex h-64 items-center justify-center rounded-3xl text-8xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] sm:h-80"
        style={{ backgroundColor: `${meta.color}1a` }}
      >
        <span aria-hidden>{meta.icon}</span>
        <FavoriteButton id={place.id} className="absolute right-4 top-4" />
      </div>
      <div className="space-y-4 pt-6">
        <div className="flex flex-wrap items-center justify-between gap-2">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{name}</h1>
          {place.rating != null && (
            <span className="text-sm text-muted-foreground">
              ★ {place.rating.toFixed(1)}
            </span>
          )}
        </div>
        <CategoryBadge category={place.category} />
        {description && (
          <p className="max-w-2xl text-muted-foreground">{description}</p>
        )}
        {facts.length > 0 && (
          <dl className="grid grid-cols-1 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
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
