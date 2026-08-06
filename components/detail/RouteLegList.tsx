import { TRANSPORT_ICON } from "@/lib/constants";
import { formatDistanceKm, formatMinutes } from "@/lib/format";
import type { RouteResult } from "@/lib/types";

export function RouteLegList({ route }: { route: RouteResult }) {
  return (
    <ol className="space-y-4">
      {route.order.map((place, index) => {
        const leg = route.legs[index];
        return (
          <li key={place.id}>
            <div className="flex items-center gap-3">
              <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-blue-700 text-sm font-bold text-white">
                {index + 1}
              </span>
              <span className="font-medium">{place.name}</span>
            </div>
            {leg && (
              <div className="ml-3.5 flex items-center gap-2 border-l-2 border-dashed border-border py-2 pl-6 text-sm text-muted-foreground">
                <span aria-hidden>{TRANSPORT_ICON[leg.mode]}</span>
                <span>{leg.mode}</span>
                <span>·</span>
                <span>{formatDistanceKm(leg.distanceKm)}</span>
                <span>·</span>
                <span>{formatMinutes(leg.minutes)}</span>
              </div>
            )}
          </li>
        );
      })}
    </ol>
  );
}
