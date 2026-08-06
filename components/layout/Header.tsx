import Link from "next/link";

const NAV_LINKS = [
  { href: "/", label: "홈" },
  { href: "/route", label: "추천 동선" },
  { href: "/courses", label: "코스" },
  { href: "/hidden", label: "숨은 진주" },
  { href: "/festivals", label: "축제" },
  { href: "/search", label: "검색" },
  { href: "/favorites", label: "즐겨찾기" },
];

export function Header() {
  return (
    <header className="border-b bg-background/80 backdrop-blur">
      <div className="mx-auto flex max-w-6xl items-center justify-between gap-6 px-6 py-4">
        <Link
          href="/"
          className="shrink-0 text-lg font-bold tracking-tight"
        >
          한눈에 보는 진주
        </Link>
        <nav className="no-scrollbar flex gap-4 overflow-x-auto text-sm font-medium whitespace-nowrap text-muted-foreground">
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="transition-colors hover:text-foreground"
            >
              {link.label}
            </Link>
          ))}
        </nav>
      </div>
    </header>
  );
}
