import { notFound } from "next/navigation";
import { FestivalDetailClient } from "@/components/festival/FestivalDetailClient";
import {
  getAllFestivals,
  getFestivalById,
  getNearbyPlaces,
  getPlaceById,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllFestivals().map((festival) => ({ id: festival.id }));
}

export default async function FestivalDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const festival = getFestivalById(id);
  if (!festival) notFound();

  const venuePlace = getPlaceById(festival.placeId);
  const nearby = venuePlace ? getNearbyPlaces(venuePlace, 1.5, 6) : [];

  return (
    <FestivalDetailClient
      festival={festival}
      venuePlace={venuePlace}
      nearby={nearby}
    />
  );
}
