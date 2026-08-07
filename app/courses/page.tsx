"use client";

import { useState } from "react";
import { CourseCard } from "@/components/cards/CourseCard";
import { COURSE_THEME_META, COURSE_THEMES } from "@/lib/constants";
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
    <main className="mx-auto w-full max-w-[1600px] flex-1 px-6 py-10 sm:py-14 lg:px-10">
      <header className="mb-8 space-y-2">
        <h1 className="text-3xl font-bold tracking-tight sm:text-4xl">
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

      <div className="grid grid-cols-2 gap-x-5 gap-y-8 sm:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 2xl:grid-cols-6">
        {filtered.map((course) => (
          <CourseCard key={course.id} course={course} />
        ))}
      </div>
    </main>
  );
}
