"use client";

import { TRANSPORT_META } from "@/lib/constants";
import { formatDistanceKm, formatMinutes } from "@/lib/format";
import { t } from "@/lib/i18n";
import type { RouteResult } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function RouteLegList({ route }: { route: RouteResult }) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <ol className="space-y-4">
      {route.order.map((place, index) => {
        const leg = route.legs[index];
        const name = t(locale, place.name, place.nameEn ?? place.name);
        return (
          <li key={place.id}>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="font-medium">{name}</span>
            </div>
            {leg && (
              <div className="ml-3.5 flex items-center gap-2 border-l-2 border-dashed border-border py-2 pl-6 text-sm text-muted-foreground">
                <span aria-hidden>{TRANSPORT_META[leg.mode].icon}</span>
                <span>
                  {t(
                    locale,
                    TRANSPORT_META[leg.mode].label,
                    TRANSPORT_META[leg.mode].labelEn,
                  )}
                </span>
                <span>·</span>
                <span>{formatDistanceKm(leg.distanceKm, locale)}</span>
                <span>·</span>
                <span>{formatMinutes(leg.minutes, locale)}</span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
