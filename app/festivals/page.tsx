"use client";

import { FestivalCard } from "@/components/cards/FestivalCard";
import { getAllFestivals } from "@/lib/data";
import { t } from "@/lib/i18n";
import { useLocaleStore } from "@/store/useLocaleStore";

const festivals = getAllFestivals();

export default function FestivalsPage() {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10 sm:py-14">
      <header className="mb-10 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "축제", "Festivals")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "진주에서 열리는 축제 일정과 정보를 확인하세요.",
            "Check schedules and details for festivals held in Jinju.",
          )}
        </p>
      </header>

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4">
        {festivals.map((festival) => (
          <FestivalCard key={festival.id} festival={festival} />
        ))}
      </div>
    </main>
  );
}
