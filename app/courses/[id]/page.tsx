import { notFound } from "next/navigation";
import { CourseDetailClient } from "@/components/course/CourseDetailClient";
import { getAllCourses, getCourseById, getCoursePlaces } from "@/lib/data";

export function generateStaticParams() {
  return getAllCourses().map((course) => ({ id: course.id }));
}

export default async function CourseDetailPage({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const course = getCourseById(id);
  if (!course) notFound();

  const places = getCoursePlaces(course);

  return <CourseDetailClient course={course} places={places} />;
}
