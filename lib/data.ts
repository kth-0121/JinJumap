import coursesData from "@/data/courses.json";
import festivalsData from "@/data/festivals.json";
import spotsData from "@/data/spots.json";
import { haversineDistanceKm } from "./geo";
import type { Course, Festival, Place } from "./types";

const places = spotsData as Place[];
const festivals = festivalsData as Festival[];
const courses = coursesData as Course[];

export function getAllPlaces(): Place[] {
  return places;
}

export function getPlaceById(id: string): Place | undefined {
  return places.find((p) => p.id === id);
}

export function getPlacesByCategory(category: Place["category"]): Place[] {
  return places.filter((p) => p.category === category);
}

export function getHiddenPlaces(): Place[] {
  return places.filter((p) => p.hidden);
}

export function getLandmarks(): Place[] {
  return places.filter((p) => p.landmark);
}

export function getNearbyPlaces(
  place: Place,
  radiusKm = 1,
  limit = 6,
): Place[] {
  return places
    .filter((p) => p.id !== place.id)
    .map((p) => ({ place: p, distance: haversineDistanceKm(place, p) }))
    .filter(({ distance }) => distance <= radiusKm)
    .sort((a, b) => a.distance - b.distance)
    .slice(0, limit)
    .map(({ place: p }) => p);
}

export function getAllFestivals(): Festival[] {
  return festivals;
}

export function getFestivalById(id: string): Festival | undefined {
  return festivals.find((f) => f.id === id);
}

export function getFestivalByPlaceId(placeId: string): Festival | undefined {
  return festivals.find((f) => f.placeId === placeId);
}

export function getAllCourses(): Course[] {
  return courses;
}

export function getCourseById(id: string): Course | undefined {
  return courses.find((c) => c.id === id);
}

export function getCoursesContainingPlace(placeId: string): Course[] {
  return courses.filter((c) => c.placeIds.includes(placeId));
}

export function getCoursePlaces(course: Course): Place[] {
  return course.placeIds
    .map((id) => getPlaceById(id))
    .filter((p): p is Place => Boolean(p));
}

export function searchPlaces(query: string): Place[] {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return places.filter((p) =>
    [p.name, p.address, ...(p.tags ?? [])]
      .filter(Boolean)
      .some((field) => field!.toLowerCase().includes(q)),
  );
}
