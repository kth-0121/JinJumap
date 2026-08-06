import { notFound } from "next/navigation";
import { FavoriteButton } from "@/components/cards/FavoriteButton";
import { NearbyList } from "@/components/detail/NearbyList";
import { FestivalVenueMap } from "@/components/festival/FestivalVenueMap";
import {
  getAllFestivals,
  getFestivalById,
  getNearbyPlaces,
  getPlaceById,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllFestivals().map((festival) => ({ id: festival.id }));
}

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const festival = getFestivalById(id);
  if (!festival) notFound();

  const venuePlace = getPlaceById(festival.placeId);
  const nearby = venuePlace ? getNearbyPlaces(venuePlace, 1.5, 6) : [];

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <header className="overflow-hidden rounded-3xl border shadow-sm">
        <div className="relative flex h-56 items-center justify-center bg-violet-100 text-8xl">
          🎆
          <FavoriteButton id={festival.id} className="absolute right-4 top-4" />
        </div>
        <div className="space-y-3 p-6">
          <h1 className="text-2xl font-bold tracking-tight">
            {festival.title}
          </h1>
          <dl className="grid grid-cols-1 gap-2 text-sm sm:grid-cols-2">
            <div>
              <dt className="text-muted-foreground">기간</dt>
              <dd>{festival.period}</dd>
            </div>
            <div>
              <dt className="text-muted-foreground">장소</dt>
              <dd>{festival.venue}</dd>
            </div>
            {festival.parkingInfo && (
              <div className="sm:col-span-2">
                <dt className="text-muted-foreground">주차 정보</dt>
                <dd>{festival.parkingInfo}</dd>
              </div>
            )}
          </dl>
        </div>
      </header>

      <section className="mt-8">
        <h2 className="mb-3 text-lg font-semibold">프로그램 일정</h2>
        <ol className="space-y-3">
          {festival.schedule.map((item, index) => (
            <li
              key={`${item.date}-${item.time}-${index}`}
              className="flex flex-wrap gap-3 rounded-2xl border p-3 text-sm"
            >
              <span className="shrink-0 font-medium">
                {item.date} {item.time}
              </span>
              <span className="text-muted-foreground">{item.program}</span>
            </li>
          ))}
        </ol>
      </section>

      {venuePlace && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">행사장 위치</h2>
          <FestivalVenueMap places={[venuePlace]} />
        </section>
      )}

      {nearby.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">주변 추천</h2>
          <NearbyList places={nearby} />
        </section>
      )}
    </main>
  );
}
