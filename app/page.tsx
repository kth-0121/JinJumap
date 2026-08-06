"use client";

import dynamic from "next/dynamic";
import { CategoryFilterBar } from "@/components/map/CategoryFilterBar";
import { ItemCard } from "@/components/cards/ItemCard";
import { Skeleton } from "@/components/ui/skeleton";
import { getAllPlaces } from "@/lib/data";
import { placeHref } from "@/lib/links";
import { useFilterStore } from "@/store/useFilterStore";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> },
);

const places = getAllPlaces();

export default function Home() {
  const activeCategories = useFilterStore((s) => s.activeCategories);
  const filteredPlaces = places.filter((p) =>
    activeCategories.includes(p.category),
  );

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          한눈에 보는 진주
        </h1>
        <p className="text-muted-foreground">
          진주의 관광지, 맛집, 카페, 축제, 로컬상권을 한눈에 확인하세요.
        </p>
      </header>

      <div className="mb-6">
        <CategoryFilterBar />
      </div>

      <div className="mb-8 h-[420px] overflow-hidden rounded-3xl border shadow-sm">
        <MapView places={filteredPlaces} />
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filteredPlaces.map((place) => (
          <ItemCard
            key={place.id}
            href={placeHref(place)}
            favoriteId={place.id}
            name={place.name}
            category={place.category}
            description={place.description}
            rating={place.rating}
          />
        ))}
      </div>
    </main>
  );
}
