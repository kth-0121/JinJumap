"use client";

import { useState } from "react";
import { ItemCard } from "@/components/cards/ItemCard";
import { Input } from "@/components/ui/input";
import { searchPlaces } from "@/lib/data";
import { t } from "@/lib/i18n";
import { placeHref } from "@/lib/links";
import { useLocaleStore } from "@/store/useLocaleStore";

export default function SearchPage() {
  const locale = useLocaleStore((s) => s.locale);
  const [query, setQuery] = useState("");
  const results = searchPlaces(query);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
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

      <Input
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t(
          locale,
          "예: 진주성, 진주냉면, 야경",
          "e.g. Jinjuseong, naengmyeon, night view",
        )}
        className="mb-8 h-12 rounded-full px-5"
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
        <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
          {results.map((place) => (
            <ItemCard key={place.id} href={placeHref(place)} place={place} />
          ))}
        </div>
      )}
    </main>
  );
}
