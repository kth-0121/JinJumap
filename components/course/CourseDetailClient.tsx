"use client";

import dynamic from "next/dynamic";
import { RouteLegList } from "@/components/detail/RouteLegList";
import { Skeleton } from "@/components/ui/skeleton";
import { formatDistanceKm, formatMinutes } from "@/lib/format";
import { buildRouteFromOrder } from "@/lib/route";
import type { Course, Place } from "@/lib/types";

const MapView = dynamic(
  () => import("@/components/map/MapView").then((m) => m.MapView),
  { ssr: false, loading: () => <Skeleton className="h-full w-full" /> },
);

export function CourseDetailClient({
  course,
  places,
}: {
  course: Course;
  places: Place[];
}) {
  const route = buildRouteFromOrder(places);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
          {course.theme}
        </span>
        <h1 className="text-3xl font-bold tracking-tight">{course.title}</h1>
        {course.description && (
          <p className="text-muted-foreground">{course.description}</p>
        )}
        <p className="text-sm text-muted-foreground">
          총 {formatDistanceKm(route.totalDistanceKm)} ·{" "}
          {formatMinutes(route.totalMinutes)}
          {course.difficulty && ` · 난이도 ${course.difficulty}`}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-[420px] overflow-hidden rounded-3xl border shadow-sm">
          <MapView route={route} />
        </div>
        <div className="rounded-3xl border bg-card p-5 shadow-sm">
          <RouteLegList route={route} />
        </div>
      </div>
    </main>
  );
}
