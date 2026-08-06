"use client";

import { useState } from "react";
import { ItemCard } from "@/components/cards/ItemCard";
import { Input } from "@/components/ui/input";
import { searchPlaces } from "@/lib/data";
import { placeHref } from "@/lib/links";

export default function SearchPage() {
  const [query, setQuery] = useState("");
  const results = searchPlaces(query);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">검색</h1>
        <p className="text-muted-foreground">
          장소 이름, 주소, 태그로 검색해보세요.
        </p>
      </header>

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder="예: 진주성, 진주냉면, 야경"
        className="mb-8 h-12 rounded-full px-5"
      />

      {query.trim() === "" ? (
        <p className="text-sm text-muted-foreground">검색어를 입력해주세요.</p>
      ) : results.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          &quot;{query}&quot;에 대한 검색 결과가 없습니다.
        </p>
      ) : (
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
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
      )}
    </main>
  );
}
