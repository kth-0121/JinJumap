"use client";

import Link from "next/link";
import { ItemCard } from "@/components/cards/ItemCard";
import { getCourseById, getFestivalById, getPlaceById } from "@/lib/data";
import { placeHref } from "@/lib/links";
import { useFavoritesStore } from "@/store/useFavoritesStore";

export default function FavoritesPage() {
  const favoriteIds = useFavoritesStore((s) => s.favoriteIds);

  const placeCards = favoriteIds
    .map((id) => getPlaceById(id))
    .filter((p): p is NonNullable<typeof p> => Boolean(p));
  const festivalCards = favoriteIds
    .map((id) => getFestivalById(id))
    .filter((f): f is NonNullable<typeof f> => Boolean(f));
  const courseCards = favoriteIds
    .map((id) => getCourseById(id))
    .filter((c): c is NonNullable<typeof c> => Boolean(c));

  const isEmpty =
    placeCards.length === 0 &&
    festivalCards.length === 0 &&
    courseCards.length === 0;

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">즐겨찾기</h1>
        <p className="text-muted-foreground">
          저장한 장소, 축제, 코스를 모아볼 수 있어요.
        </p>
      </header>

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">
          아직 즐겨찾기한 항목이 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {placeCards.map((place) => (
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
          {festivalCards.map((festival) => (
            <Link
              key={festival.id}
              href={`/festivals/${festival.id}`}
              className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex h-32 items-center justify-center bg-violet-100 text-4xl">
                🎆
              </div>
              <div className="space-y-1 p-4">
                <h3 className="font-semibold">{festival.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {festival.period}
                </p>
              </div>
            </Link>
          ))}
          {courseCards.map((course) => (
            <Link
              key={course.id}
              href={`/courses/${course.id}`}
              className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="flex h-32 items-center justify-center bg-muted text-4xl">
                🗺️
              </div>
              <div className="space-y-1 p-4">
                <h3 className="font-semibold">{course.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {course.theme}
                </p>
              </div>
            </Link>
          ))}
        </div>
      )}
    </main>
  );
}
