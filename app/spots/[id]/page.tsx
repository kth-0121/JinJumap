import { notFound } from "next/navigation";
import { SpotDetailClient } from "@/components/spot/SpotDetailClient";
import {
  getAllPlaces,
  getCoursesContainingPlace,
  getNearbyPlaces,
  getPlaceById,
} from "@/lib/data";

export function generateStaticParams() {
  return getAllPlaces().map((place) => ({ id: place.id }));
}

export default async function SpotDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const place = getPlaceById(id);
  if (!place) notFound();

  const nearby = getNearbyPlaces(place, 1.5, 6);
  const courses = getCoursesContainingPlace(place.id);

  return <SpotDetailClient place={place} courses={courses} nearby={nearby} />;
}
