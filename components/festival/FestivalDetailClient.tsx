"use client";

import Image from "next/image";
import { FavoriteButton } from "@/components/cards/FavoriteButton";
import { NearbyList } from "@/components/detail/NearbyList";
import { PlaceLocationMap } from "@/components/map/PlaceLocationMap";
import { t } from "@/lib/i18n";
import type { Festival, Place } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function FestivalDetailClient({
  festival,
  venuePlace,
  nearby,
}: {
  festival: Festival;
  venuePlace?: Place;
  nearby: Place[];
}) {
  const locale = useLocaleStore((s) => s.locale);
  const title = t(locale, festival.title, festival.titleEn ?? festival.title);
  const venueName = t(locale, festival.venue, festival.venueEn ?? festival.venue);

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10 sm:py-14">
      <header>
        <div className="relative flex h-64 items-center justify-center overflow-hidden rounded-3xl bg-violet-100 text-8xl shadow-[0_2px_10px_rgba(0,0,0,0.05)] sm:h-80">
          {festival.poster ? (
            <Image
              src={festival.poster}
              alt={title}
              fill
              sizes="(min-width: 1024px) 800px, 100vw"
              priority
              className="object-cover"
            />
          ) : (
            "🎆"
          )}
          <FavoriteButton id={festival.id} className="absolute right-4 top-4" />
        </div>
        {festival.poster && festival.posterCredit && (
          <p className="pt-2 text-xs text-muted-foreground">
            {festival.posterCreditUrl ? (
              <a
                href={festival.posterCreditUrl}
                target="_blank"
                rel="noopener noreferrer nofollow"
                className="hover:underline"
              >
                {t(locale, "사진", "Photo")}: {festival.posterCredit}
              </a>
            ) : (
              <>
                {t(locale, "사진", "Photo")}: {festival.posterCredit}
              </>
            )}
          </p>
        )}
        <div className="space-y-4 pt-6">
          <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">{title}</h1>
          <dl className="grid grid-cols-1 gap-3 border-t border-border pt-4 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">
                {t(locale, "기간", "Dates")}
              </dt>
              <dd>{festival.period}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">
                {t(locale, "장소", "Venue")}
              </dt>
              <dd>{venueName}</dd>
            </div>
            {festival.parkingInfo && (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">
                  {t(locale, "주차 정보", "Parking Info")}
                </dt>
                <dd>
                  {t(
                    locale,
                    festival.parkingInfo,
                    festival.parkingInfoEn ?? festival.parkingInfo,
                  )}
                </dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <section className="mt-12">
        <h2 className="mb-4 text-lg font-semibold">
          {t(locale, "프로그램 일정", "Program Schedule")}
        </h2>
        <ol className="space-y-3">
          {festival.schedule.map((item, index) => (
            <li
              key={`${item.date}-${item.time}-${index}`}
              className="flex flex-wrap gap-3 rounded-2xl bg-secondary/60 p-4 text-sm"
            >
              <span className="shrink-0 font-medium">
                {item.date} {item.time}
              </span>
              <span className="text-muted-foreground">
                {t(locale, item.program, item.programEn ?? item.program)}
              </span>
            </li>
          ))}
        </ol>
      </section>

      {venuePlace && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">
            {t(locale, "행사장 위치", "Venue Location")}
          </h2>
          <PlaceLocationMap places={[venuePlace]} />
        </section>
      )}

      {nearby.length > 0 && (
        <section className="mt-12">
          <h2 className="mb-4 text-lg font-semibold">
            {t(locale, "주변 추천", "Nearby Recommendations")}
          </h2>
          <NearbyList places={nearby} />
        </section>
      )}
    </main>
  );
}
