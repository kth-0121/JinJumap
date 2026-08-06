import Link from "next/link";
import { notFound } from "next/navigation";
import { DetailHeader } from "@/components/detail/DetailHeader";
import { NearbyList } from "@/components/detail/NearbyList";
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

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-6 py-10">
      <DetailHeader place={place} />

      {courses.length > 0 && (
        <section className="mt-8">
          <h2 className="mb-3 text-lg font-semibold">이 코스에 포함됨</h2>
          <div className="flex flex-wrap gap-2">
            {courses.map((course) => (
              <Link
                key={course.id}
                href={`/courses/${course.id}`}
                className="rounded-full border px-4 py-2 text-sm font-medium transition-colors hover:bg-muted"
              >
                {course.title}
              </Link>
            ))}
          </div>
        </section>
      )}

      <section className="mt-10">
        <h2 className="mb-3 text-lg font-semibold">주변 추천</h2>
        <NearbyList places={nearby} />
      </section>
    </main>
  );
}
