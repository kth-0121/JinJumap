"use client";

import { ItemCard } from "@/components/cards/ItemCard";
import { HIDDEN_CATEGORY_META } from "@/lib/constants";
import { getHiddenPlaces } from "@/lib/data";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import type { HiddenCategory } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

const HIDDEN_CATEGORIES: HiddenCategory[] = [
  "골목식당",
  "감성카페",
  "로컬브랜드",
  "공방",
  "포토존",
];

const hiddenPlaces = getHiddenPlaces();

export default function HiddenJinjuPage() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-10 sm:py-14 lg:px-10">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "숨은 진주", "Hidden Jinju")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "현지인만 아는 골목식당, 감성카페, 로컬브랜드, 공방, 포토존을 소개합니다.",
            "Alley eateries, mood cafes, local brands, craft studios, and photo spots that only locals know.",
          )}
        </p>
      </header>

      {HIDDEN_CATEGORIES.map((category) => {
        const items = hiddenPlaces.filter(
          (p) => p.hiddenCategory === category,
        );
        if (items.length === 0) return null;

        return (
          <section key={category} className="mb-12">
            <h2 className="mb-4 text-lg font-semibold">
              {t(
                locale,
                HIDDEN_CATEGORY_META[category].label,
                HIDDEN_CATEGORY_META[category].labelEn,
              )}
            </h2>
            <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
              {items.map((place) => (
                <ItemCard key={place.id} href={placeHref(place)} place={place} />
              ))}
            </div>
          </section>
        );
      })}
    </main>
  );
}
