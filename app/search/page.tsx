"use client";

import { useState } from "react";
import { ItemCard } from "@/components/cards/ItemCard";
import { SearchBar } from "@/components/search/SearchBar";
import { searchPlaces } from "@/lib/data";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function SearchPage() {
  const locale = useLocaleStore((s) => s.locale);
  const [query, setQuery] = useState("");
  const results = searchPlaces(query);

  return (
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-10 sm:py-14 lg:px-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
          {t(locale, "검색", "Search")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "장소 이름, 주소, 태그로 검색해보세요.",
            "Search by place name, address, or tag.",
          )}
        </p>
      </header>

      <SearchBar
        value={query}
        onChange={setQuery}
        placeholder={t(
          locale,
          "예: 진주성, 진주냉면, 야경",
          "e.g. Jinjuseong, naengmyeon, night view",
        )}
        className="mb-10 max-w-xl"
      />

      {query.trim() === "" ? (
        <p className="text-sm text-muted-foreground">
          {t(locale, "검색어를 입력해주세요.", "Enter a search term.")}
        </p>
      ) : results.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          {t(
            locale,
            `"${query}"에 대한 검색 결과가 없습니다.`,
            `No results for "${query}".`,
          )}
        </p>
      ) : (
        <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
          {results.map((place) => (
            <ItemCard key={place.id} href={placeHref(place)} place={place} />
          ))}
        </div>
      )}
    </main>
  );
}
