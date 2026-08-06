import type { Place } from "./types";

export function placeHref(place: Place): string {
  if (place.category === "축제" && place.festivalId) {
    return `/festivals/${place.festivalId}`;
  }
  return `/spots/${place.id}`;
}
