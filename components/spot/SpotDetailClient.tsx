"use client";

import Link from "next/link";
import { DetailHeader } from "@/components/detail/DetailHeader";
import { NearbyList } from "@/components/detail/NearbyList";
import { t } from "@/lib/i18n";
import type { Course, Place } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function SpotDetailClient({
  place,
  courses,
  nearby,
}: {
  place: Place;
  courses: Course[];
  nearby: Place[];
}) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:py-14">
      <DetailHeader place={place} />

      {courses.length > 0 && (
        <section className="mt-10">
          <h2 className="mb-4 text-lg font-semibold">
            {t(locale, "이 코스에 포함됨", "Featured in these courses")}
          </h2>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {t(locale, course.title, course.titleEn ?? course.title)}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">
          {t(locale, "주변 추천", "Nearby Recommendations")}
        </h2>
        <NearbyList places={nearby} />
      </section>
    </main>
  );
}
