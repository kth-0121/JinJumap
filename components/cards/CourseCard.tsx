"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { COURSE_THEME_META } from "@/lib/constants";
import { t } from "@/lib/i18n";
import type { Course } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";

export function CourseCard({ course }: { course: Course }) {
  const locale = useLocaleStore((s) => s.locale);
  const title = t(locale, course.title, course.titleEn ?? course.title);
  const themeLabel = t(
    locale,
    COURSE_THEME_META[course.theme].label,
    COURSE_THEME_META[course.theme].labelEn,
  );
  const stopsLabel = t(
    locale,
    `${course.placeIds.length}개 장소`,
    `${course.placeIds.length} spots`,
  );

  return (
    <Link href={`/courses/${course.id}`} className="group block text-left">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-blue-100 to-indigo-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)]">
          <motion.div
            whileHover={{ scale: 1.04 }}
            transition={{ duration: 0.4, ease: "easeOut" }}
            className="flex h-full items-center justify-center text-6xl"
          >
            🗺️
          </motion.div>
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
            {stopsLabel}
          </span>
        </div>
        <div className="space-y-0.5 px-1 pt-3">
          <h3 className="truncate text-[15px] font-semibold">{title}</h3>
          <p className="text-sm text-muted-foreground">{themeLabel}</p>
        </div>
      </motion.div>
    </Link>
  );
}
