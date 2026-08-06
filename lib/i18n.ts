export type Locale = "ko" | "en";

export function t(locale: Locale, ko: string, en: string): string {
  return locale === "en" ? en : ko;
}
