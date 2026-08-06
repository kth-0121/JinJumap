"use client";

import { CourseCard } from "@/components/cards/CourseCard";
import { FestivalCard } from "@/components/cards/FestivalCard";
import { ItemCard } from "@/components/cards/ItemCard";
import { getCourseById, getFestivalById, getPlaceById } from "@/lib/data";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import { useFavoritesStore } from "@/store/useFavoritesStore";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function FavoritesPage() {
  const locale = useLocaleStore((s) => s.locale);
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
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "즐겨찾기", "Favorites")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "저장한 장소, 축제, 코스를 모아볼 수 있어요.",
            "All the places, festivals, and courses you've saved.",
          )}
        </p>
      </header>

      {isEmpty ? (
        <p className="text-sm text-muted-foreground">
          {t(
            locale,
            "아직 즐겨찾기한 항목이 없습니다.",
            "You haven't favorited anything yet.",
          )}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
          {placeCards.map((place) => (
            <ItemCard key={place.id} href={placeHref(place)} place={place} />
          ))}
          {festivalCards.map((festival) => (
            <FestivalCard key={festival.id} festival={festival} />
          ))}
          {courseCards.map((course) => (
            <CourseCard key={course.id} course={course} />
          ))}
        </div>
      )}
    </main>
  );
}
