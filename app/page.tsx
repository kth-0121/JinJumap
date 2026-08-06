"use client";

import dynamic from "next/dynamic";
import { useState } from "react";
import { CategoryFilterBar } from "@/components/map/CategoryFilterBar";
import { MapBottomSheet } from "@/components/map/MapBottomSheet";
import { ItemCard } from "@/components/cards/ItemCard";
import { DiscoveryShelf } from "@/components/home/DiscoveryShelf";
import { ResizableSplit } from "@/components/home/ResizableSplit";
import { SearchBar } from "@/components/search/SearchBar";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPlaces, getHiddenPlaces, getPlacesByCategory } from "@/lib/data";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import { useFilterStore } from "@/store/useFilterStore";
import { useLocaleStore } from "@/store/useLocaleStore";
import { useIsDesktop } from "@/hooks/useIsDesktop";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> },
);

const places = getAllPlaces();

const topAttractions = [...getPlacesByCategory("관광지")]
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  .slice(0, 6);
const topEats = [...getPlacesByCategory("맛집")]
  .sort((a, b) => (b.rating ?? 0) - (a.rating ?? 0))
  .slice(0, 6);
const hiddenPicks = getHiddenPlaces().slice(0, 6);

export default function Home() {
  const locale = useLocaleStore((s) => s.locale);
  const isDesktop = useIsDesktop();
  const activeCategories = useFilterStore((s) => s.activeCategories);
  const [query, setQuery] = useState("");

  const q = query.trim().toLowerCase();
  const filteredPlaces = places.filter((p) => {
    if (activeCategories.length > 0 && !activeCategories.includes(p.category)) {
      return false;
    }
    if (!q) return true;
    return [p.name, p.nameEn, p.address, ...(p.tags ?? [])]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(q));
  });

  const showShelves = q === "" && activeCategories.length === 0;

  const listContent = (
    <div className="space-y-8">
      <div className="space-y-4">
        <div>
          <h1 className="text-2xl font-bold tracking-tight sm:text-3xl">
            {t(locale, "한눈에 보는 진주", "Jinju at a Glance")}
          </h1>
          <p className="mt-1 text-sm text-muted-foreground sm:text-base">
            {t(
              locale,
              "진주의 관광지, 맛집, 카페, 축제, 로컬상권을 한눈에 확인하세요.",
              "See Jinju's attractions, restaurants, cafes, festivals, and local scene at a glance.",
            )}
          </p>
        </div>
        <SearchBar
          value={query}
          onChange={setQuery}
          placeholder={t(locale, "이번엔 어디로 떠나볼까요?", "Where to next?")}
        />
        <CategoryFilterBar />
      </div>

      {showShelves ? (
        <div className="space-y-10">
          <DiscoveryShelf
            title={t(locale, "대표 관광지", "Popular Attractions")}
            places={topAttractions}
          />
          <DiscoveryShelf
            title={t(locale, "맛집 베스트", "Top-rated Eats")}
            places={topEats}
          />
          <DiscoveryShelf
            title={t(locale, "숨은 진주 살짝 보기", "A Peek at Hidden Jinju")}
            places={hiddenPicks}
          />
        </div>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3">
          {filteredPlaces.map((place) => (
            <ItemCard key={place.id} href={placeHref(place)} place={place} />
          ))}
        </div>
      )}
    </div>
  );

  if (isDesktop) {
    return (
      <main className="flex-1">
        <ResizableSplit
          left={
            <div className="h-[calc(100vh-61px)] overflow-y-auto px-8 py-8">
              {listContent}
            </div>
          }
          right={
            <div className="h-[calc(100vh-61px)] overflow-hidden">
              <MapView places={filteredPlaces} />
            </div>
          }
        />
      </main>
    );
  }

  return (
    <div className="relative flex-1">
      <div className="fixed inset-x-0 bottom-0 top-[61px] -z-10">
        <MapView places={filteredPlaces} />
      </div>
      <MapBottomSheet>{listContent}</MapBottomSheet>
    </div>
  );
}
