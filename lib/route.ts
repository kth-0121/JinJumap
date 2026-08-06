import { TRANSPORT_SPEED_KMH } from "./constants";
import { haversineDistanceKm } from "./geo";
import type { Place, RouteLeg, RouteResult, TransportMode } from "./types";

function pickMode(distanceKm: number): TransportMode {
  if (distanceKm <= 1.0) return "도보";
  if (distanceKm <= 3.5) return "자전거";
  if (distanceKm <= 8) return "버스";
  return "자동차";
}

function buildLegs(order: Place[]): RouteLeg[] {
  const legs: RouteLeg[] = [];
  for (let i = 0; i < order.length - 1; i++) {
    const current = order[i];
    const next = order[i + 1];
    const distance = haversineDistanceKm(current, next);
    const mode = pickMode(distance);
    const minutes = Math.round((distance / TRANSPORT_SPEED_KMH[mode]) * 60);
    legs.push({
      from: current,
      to: next,
      mode,
      distanceKm: Math.round(distance * 10) / 10,
      minutes: Math.max(minutes, 1),
    });
  }
  return legs;
}

function summarize(order: Place[], legs: RouteLeg[]): RouteResult {
  return {
    order,
    legs,
    totalDistanceKm:
      Math.round(legs.reduce((sum, l) => sum + l.distanceKm, 0) * 10) / 10,
    totalMinutes: legs.reduce((sum, l) => sum + l.minutes, 0),
  };
}

// Rule-based greedy nearest-neighbor tour. Straight-line distance stands in
// for real road distance; swapping in a real directions API later only
// means replacing this function's body, since callers only depend on
// RouteResult's shape.
export function buildRecommendedRoute(
  start: Place,
  candidates: Place[],
): RouteResult {
  const remaining = candidates.filter((p) => p.id !== start.id);
  const order: Place[] = [start];
  let current = start;

  while (remaining.length > 0) {
    let nextIndex = 0;
    let nextDistance = Infinity;
    remaining.forEach((candidate, index) => {
      const distance = haversineDistanceKm(current, candidate);
      if (distance < nextDistance) {
        nextDistance = distance;
        nextIndex = index;
      }
    });

    const next = remaining.splice(nextIndex, 1)[0];
    order.push(next);
    current = next;
  }

  return summarize(order, buildLegs(order));
}

// For curated content (e.g. themed courses) whose visit order is authored,
// not derived — same distance/time rules as buildRecommendedRoute, but the
// given order is never reshuffled.
export function buildRouteFromOrder(order: Place[]): RouteResult {
  return summarize(order, buildLegs(order));
}
