"use client";

import dynamic from "next/dynamic";
import { Skeleton } from "@/components/ui/skeleton";
import type { Place } from "@/lib/types";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> },
);

export function PlaceLocationMap({ places }: { places: Place[] }) {
  return (
    <div className="h-[320px] overflow-hidden rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
      <MapView places={places} />
    </div>
  );
}
