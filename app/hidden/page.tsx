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
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
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
          <section key={category} className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">
              {t(
                locale,
                HIDDEN_CATEGORY_META[category].label,
                HIDDEN_CATEGORY_META[category].labelEn,
              )}
            </h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
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
