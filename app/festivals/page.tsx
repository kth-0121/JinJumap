import Link from "next/link";
import { FavoriteButton } from "@/components/cards/FavoriteButton";
import { getAllFestivals, getPlaceById } from "@/lib/data";

export default function FestivalsPage() {
  const festivals = getAllFestivals();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">축제</h1>
        <p className="text-muted-foreground">
          진주에서 열리는 축제 일정과 정보를 확인하세요.
        </p>
      </header>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {festivals.map((festival) => {
          const venuePlace = getPlaceById(festival.placeId);
          return (
            <Link
              key={festival.id}
              href={`/festivals/${festival.id}`}
              className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
            >
              <div className="relative flex h-32 items-center justify-center bg-violet-100 text-4xl">
                🎆
                <FavoriteButton
                  id={festival.id}
                  className="absolute right-2 top-2"
                />
              </div>
              <div className="space-y-1.5 p-4">
                <h3 className="font-semibold">{festival.title}</h3>
                <p className="text-sm text-muted-foreground">
                  {festival.period}
                </p>
                <p className="text-sm text-muted-foreground">
                  {venuePlace?.name ?? festival.venue}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
