import { ItemCard } from "@/components/cards/ItemCard";
import { getHiddenPlaces } from "@/lib/data";
import { placeHref } from "@/lib/links";
import type { HiddenCategory } from "@/lib/types";

const HIDDEN_CATEGORIES: HiddenCategory[] = [
  "골목식당",
  "감성카페",
  "로컬브랜드",
  "공방",
  "포토존",
];

export default function HiddenJinjuPage() {
  const hiddenPlaces = getHiddenPlaces();

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">숨은 진주</h1>
        <p className="text-muted-foreground">
          현지인만 아는 골목식당, 감성카페, 로컬브랜드, 공방, 포토존을
          소개합니다.
        </p>
      </header>

      {HIDDEN_CATEGORIES.map((category) => {
        const items = hiddenPlaces.filter(
          (p) => p.hiddenCategory === category,
        );
        if (items.length === 0) return null;

        return (
          <section key={category} className="mb-10">
            <h2 className="mb-4 text-lg font-semibold">{category}</h2>
            <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((place) => (
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
            </div>
          </section>
        );
      })}
    </main>
  );
}
