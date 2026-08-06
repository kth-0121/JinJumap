"use client";

import { useState } from "react";
import Link from "next/link";
import { COURSE_THEME_META, COURSE_THEMES, DIFFICULTY_META } from "@/lib/constants";
import { getAllCourses } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { CourseTheme } from "@/lib/types";
import { cn } from "@/lib/utils";
import { useLocaleStore } from "@/store/useLocaleStore";

const THEMES: (CourseTheme | "전체")[] = ["전체", ...COURSE_THEMES];

export default function CoursesPage() {
  const locale = useLocaleStore((s) => s.locale);
  const [theme, setTheme] = useState<CourseTheme | "전체">("전체");
  const courses = getAllCourses();
  const filtered =
    theme === "전체" ? courses : courses.filter((c) => c.theme === theme);

  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-6 py-10">
      <header className="mb-6 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight">
          {t(locale, "여행 코스", "Travel Courses")}
        </h1>
        <p className="text-muted-foreground">
          {t(
            locale,
            "테마별로 준비된 추천 코스를 확인하세요.",
            "Browse recommended courses by theme.",
          )}
        </p>
      </header>

      <div className="mb-8 flex flex-wrap gap-2">
        {THEMES.map((theme_) => (
          <button
            key={theme_}
            type="button"
            onClick={() => setTheme(theme_)}
            className={cn(
              "rounded-full border px-3 py-1.5 text-sm font-medium transition-colors",
              theme === theme_
                ? "border-transparent bg-primary text-primary-foreground"
                : "border-border text-muted-foreground hover:bg-muted",
            )}
          >
            {theme_ === "전체"
              ? t(locale, "전체", "All")
              : t(
                  locale,
                  COURSE_THEME_META[theme_].label,
                  COURSE_THEME_META[theme_].labelEn,
                )}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
        {filtered.map((course) => {
          const title = t(locale, course.title, course.titleEn ?? course.title);
          const description = course.description
            ? t(locale, course.description, course.descriptionEn ?? course.description)
            : undefined;
          return (
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
                  <h3 className="font-semibold">{title}</h3>
                  {course.difficulty && (
                    <span className="shrink-0 text-xs text-muted-foreground">
                      {t(
                        locale,
                        DIFFICULTY_META[course.difficulty].label,
                        DIFFICULTY_META[course.difficulty].labelEn,
                      )}
                    </span>
                  )}
                </div>
                <span className="inline-flex rounded-full bg-secondary px-2.5 py-1 text-xs font-medium">
                  {t(
                    locale,
                    COURSE_THEME_META[course.theme].label,
                    COURSE_THEME_META[course.theme].labelEn,
                  )}
                </span>
                {description && (
                  <p className="line-clamp-2 text-sm text-muted-foreground">
                    {description}
                  </p>
                )}
                <p className="text-xs text-muted-foreground">
                  {t(
                    locale,
                    `${course.placeIds.length}개 장소`,
                    `${course.placeIds.length} spots`,
                  )}
                </p>
              </div>
            </Link>
          );
        })}
      </div>
    </main>
  );
}
