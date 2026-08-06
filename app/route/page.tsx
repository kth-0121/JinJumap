"use client";

import { useMemo, useState } from "react";
import dynamic from "next/dynamic";
import { ItemCard } from "@/components/cards/ItemCard";
import { RouteLegList } from "@/components/detail/RouteLegList";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceKm, formatMinutes } from "@/lib/format";
import { getAllPlaces, getPlaceById } from "@/lib/data";
import { t } from "@/lib/i18n";
import { buildRecommendedRoute } from "@/lib/route";
import type { CategoryId } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> },
);

const UTILITY_CATEGORIES: CategoryId[] = ["공영주차장", "화장실"];
const START_OPTIONS = getAllPlaces().filter(
  (p) => !UTILITY_CATEGORIES.includes(p.category),
);
const STOPS_PER_ROUTE = 6;

export default function RoutePlannerPage() {
  const locale = useLocaleStore((s) => s.locale);
  const [startId, setStartId] = useState<string | null>(null);

  const route = useMemo(() => {
    if (!startId) return null;
    const start = getPlaceById(startId);
    if (!start) return null;

    const pool = START_OPTIONS.filter((p) => p.id !== startId);
    const topPicks = [...pool]
      .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
      .slice(0, STOPS_PER_ROUTE - 1);

    return buildRecommendedRoute(start, [start, ...topPicks]);
  }, [startId]);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "추천 여행 동선", "Recommended Route")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "시작할 장소를 선택하면 추천 방문 순서, 이동 방법, 예상 시간을 알려드려요.",
            "Pick a starting point and we'll suggest a visit order, transport mode, and estimated time.",
          )}
        </p>
      </header>

      <section className="mb-10">
        <h2 className="mb-4 text-lg font-semibold">
          {t(locale, "1. 시작 장소 선택", "1. Choose a starting point")}
        </h2>
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {START_OPTIONS.map((place) => (
            <ItemCard
              key={place.id}
              place={place}
              selected={place.id === startId}
              onClick={() => setStartId(place.id)}
            />
          ))}
        </div>
      </section>

      {route && (
        <section>
          <h2 className="mb-4 text-lg font-semibold">
            {t(locale, "2. 추천 동선", "2. Recommended route")}
          </h2>
          <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
            <div className="h-[420px] overflow-hidden rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
              <MapView route={route} />
            </div>
            <div className="rounded-3xl bg-secondary/40 p-5">
              <p className="mb-4 text-sm text-muted-foreground">
                {t(locale, "총", "Total")} {formatDistanceKm(route.totalDistanceKm, locale)} ·{" "}
                {formatMinutes(route.totalMinutes, locale)}
              </p>
              <RouteLegList route={route} />
            </div>
          </div>
        </section>
      )}
    </main>
  );
}
