import type { Locale } from "./i18n";

export function formatDistanceKm(km: number, locale: Locale = "ko"): string {
  if (km < 1) return `${Math.round(km * 1000)}m`;
  return locale === "en" ? `${km.toFixed(1)} km` : `${km.toFixed(1)}km`;
}

export function formatMinutes(minutes: number, locale: Locale = "ko"): string {
  if (locale === "en") {
    if (minutes < 60) return `${minutes} min`;
    const h = Math.floor(minutes / 60);
    const m = minutes % 60;
    return m === 0 ? `${h}h` : `${h}h ${m}min`;
  }
  if (minutes < 60) return `${minutes}분`;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  return m === 0 ? `${h}시간` : `${h}시간 ${m}분`;
}
