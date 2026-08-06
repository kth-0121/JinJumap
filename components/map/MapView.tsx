"use client";

import L from "leaflet";
import { MapContainer, Marker, Polyline, Popup, TileLayer } from "react-leaflet";
import {
  CATEGORY_META,
  JINJU_BOUNDS,
  JINJU_CENTER,
  JINJU_MIN_ZOOM,
} from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Place, RouteResult } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

function createPlaceIcon(place: Place) {
  const meta = CATEGORY_META[place.category];
  const size = place.landmark ? 40 : 30;
  const html = `
    <div class="jinju-pin${place.landmark ? " jinju-pin--landmark" : ""}"
         style="width:${size}px;height:${size}px;background:${meta.color};font-size:${size * 0.55}px;">
      <span>${meta.icon}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

function createStopIcon(order: number) {
  const size = 30;
  const html = `
    <div class="jinju-pin" style="width:${size}px;height:${size}px;background:#1d4ed8;color:white;font-weight:700;font-size:14px;">
      <span>${order}</span>
    </div>
  `;
  return L.divIcon({
    html,
    className: "",
    iconSize: [size, size],
    iconAnchor: [size / 2, size / 2],
    popupAnchor: [0, -size / 2],
  });
}

export function MapView({
  places,
  route,
  className,
}: {
  places?: Place[];
  route?: RouteResult;
  className?: string;
}) {
  const locale = useLocaleStore((s) => s.locale);

  return (
    <MapContainer
      center={[JINJU_CENTER.lat, JINJU_CENTER.lng]}
      zoom={14}
      minZoom={JINJU_MIN_ZOOM}
      maxBounds={JINJU_BOUNDS}
      maxBoundsViscosity={1.0}
      scrollWheelZoom
      className={className ?? "h-full w-full"}
    >
      <TileLayer
        url="https://{s}.basemaps.cartocdn.com/light_all/{z}/{x}/{y}{r}.png"
        attribution='&copy; <a href="https://carto.com/attributions">CARTO</a> &copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a>'
      />

      {route && (
        <>
          <Polyline
            positions={route.order.map((p) => [p.lat, p.lng])}
            pathOptions={{ color: "#1d4ed8", weight: 4, opacity: 0.8 }}
          />
          {route.order.map((place, index) => (
            <Marker
              key={place.id}
              position={[place.lat, place.lng]}
              icon={createStopIcon(index + 1)}
            >
              <Popup>
                <div className="space-y-1">
                  <p className="font-semibold">
                    {index + 1}. {t(locale, place.name, place.nameEn ?? place.name)}
                  </p>
                  <p className="text-xs text-muted-foreground">
                    {t(
                      locale,
                      CATEGORY_META[place.category].label,
                      CATEGORY_META[place.category].labelEn,
                    )}
                  </p>
                </div>
              </Popup>
            </Marker>
          ))}
        </>
      )}

      {!route &&
        places?.map((place) => (
          <Marker
            key={place.id}
            position={[place.lat, place.lng]}
            icon={createPlaceIcon(place)}
          >
            <Popup>
              <div className="space-y-1">
                <p className="font-semibold">
                  {t(locale, place.name, place.nameEn ?? place.name)}
                </p>
                <p className="text-xs text-muted-foreground">
                  {t(
                    locale,
                    CATEGORY_META[place.category].label,
                    CATEGORY_META[place.category].labelEn,
                  )}
                </p>
                {place.description && (
                  <p className="text-xs">
                    {t(
                      locale,
                      place.description,
                      place.descriptionEn ?? place.description,
                    )}
                  </p>
                )}
              </div>
            </Popup>
          </Marker>
        ))}
    </MapContainer>
  );
}
