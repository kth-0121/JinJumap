"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSE_THEMES } from "@/lib/constants";
import { getAllCourses } from "@/lib/data";
import type { CourseTheme } from "@/lib/types";
import { cn } from "@/lib/utils";

const THEMES: (CourseTheme | "전체")[] = ["전체", ...COURSE_THEMES];

export default function CoursesPage() {
  const [theme, setTheme] = useState<CourseTheme | "전체">("전체");
  const courses = getAllCourses();
  const filtered =
    theme === "전체" ? courses : courses.filter((c) => c.theme === theme);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">여행 코스</h1>
        <p className="text-muted-foreground">
          테마별로 준비된 추천 코스를 확인하세요.
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {THEMES.map((t) => (
          <button
            key={t}
            type="button"
            onClick={() => setTheme(t)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              theme === t
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => (
          <Link
            key={course.id}
            href={`/courses/${course.id}`}
            className="overflow-hidden rounded-3xl border bg-card shadow-sm transition-shadow hover:shadow-lg"
          >
            <div className="flex h-32 items-center justify-center bg-muted text-4xl">
              🗺️
            </div>
            <div className="space-y-2 p-4">
              <div className="flex items-center justify-between gap-2">
                <h3 className="font-semibold">{course.title}</h3>
                {course.difficulty && (
                  <span className="shrink-0 text-xs text-muted-foreground">
                    {course.difficulty}
                  </span>
                )}
              </div>
              <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                {course.theme}
              </span>
              {course.description && (
                <p className="line-clamp-2 text-sm text-muted-foreground">
                  {course.description}
                </p>
              )}
              <p className="text-xs text-muted-foreground">
                {course.placeIds.length}개 장소
              </p>
            </div>
          </Link>
        ))}
      </div>
    </main>
  );
}
