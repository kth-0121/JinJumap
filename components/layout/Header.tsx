"use client";

import Link from "next/link";
import { t } from "@/lib/i18n";
import { useLocaleStore } from "@/store/useLocaleStore";
import { LanguageSwitcher } from "./LanguageSwitcher";

export function Header() {
  const locale = useLocaleStore((s) => s.locale);

  const navLinks = [
    { href: "/", label: t(locale, "홈", "Home") },
    { href: "/route", label: t(locale, "추천 동선", "Route") },
    { href: "/courses", label: t(locale, "코스", "Courses") },
    { href: "/hidden", label: t(locale, "숨은 진주", "Hidden Jinju") },
    { href: "/festivals", label: t(locale, "축제", "Festivals") },
    { href: "/search", label: t(locale, "검색", "Search") },
    { href: "/favorites", label: t(locale, "즐겨찾기", "Favorites") },
  ];

  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="flex items-center justify-between gap-4 px-6 py-4">
        <Link href="/" className="shrink-0 text-lg font-bold tracking-tight">
          {t(locale, "한눈에 보는 진주", "Jinju at a Glance")}
        </Link>
        <nav className="no-scrollbar flex gap-4 overflow-x-auto text-sm font-medium whitespace-nowrap text-muted-foreground">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
        <LanguageSwitcher />
      </div>
    </header>
  );
}
