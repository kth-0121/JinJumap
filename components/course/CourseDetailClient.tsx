"use client";

import dynamic from "next/dynamic";
import { RouteLegList } from "@/components/detail/RouteLegList";
import { Skeleton } from "@/components/ui/skeleton";
import { COURSE_THEME_META, DIFFICULTY_META } from "@/lib/constants";
import { formatDistanceKm, formatMinutes } from "@/lib/format";
import { t } from "@/lib/i18n";
import { buildRouteFromOrder } from "@/lib/route";
import type { Course, Place } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

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
  const locale = useLocaleStore((s) => s.locale);
  const route = buildRouteFromOrder(places);
  const title = t(locale, course.title, course.titleEn ?? course.title);
  const description = course.description
    ? t(locale, course.description, course.descriptionEn ?? course.description)
    : undefined;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
      <header className="mb-8 space-y-2">
        <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
          {t(
            locale,
            COURSE_THEME_META[course.theme].label,
            COURSE_THEME_META[course.theme].labelEn,
          )}
        </span>
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
        {description && <p className="text-muted-foreground">{description}</p>}
        <p className="text-sm text-muted-foreground">
          {t(locale, "총", "Total")} {formatDistanceKm(route.totalDistanceKm, locale)} ·{" "}
          {formatMinutes(route.totalMinutes, locale)}
          {course.difficulty &&
            ` · ${t(locale, "난이도", "Difficulty")} ${t(
              locale,
              DIFFICULTY_META[course.difficulty].label,
              DIFFICULTY_META[course.difficulty].labelEn,
            )}`}
        </p>
      </header>

      <div className="grid grid-cols-1 gap-6 lg:grid-cols-[2fr_1fr]">
        <div className="h-[420px] overflow-hidden rounded-3xl shadow-[0_2px_10px_rgba(0,0,0,0.05)]">
          <MapView route={route} />
        </div>
        <div className="rounded-3xl bg-secondary/40 p-5">
          <RouteLegList route={route} />
        </div>
      </div>
    </main>
  );
}
