"use client";

import { motion } from "framer-motion";
import Image from "next/image";
import Link from "next/link";
import { getPlaceById } from "@/lib/data";
import { t } from "@/lib/i18n";
import type { Festival } from "@/lib/types";
import { useLocaleStore } from "@/store/useLocaleStore";
import { FavoriteButton } from "./FavoriteButton";

export function FestivalCard({ festival }: { festival: Festival }) {
  const locale = useLocaleStore((s) => s.locale);
  const venuePlace = getPlaceById(festival.placeId);
  const title = t(locale, festival.title, festival.titleEn ?? festival.title);
  const venueName = venuePlace
    ? t(locale, venuePlace.name, venuePlace.nameEn ?? venuePlace.name)
    : t(locale, festival.venue, festival.venueEn ?? festival.venue);

  return (
    <Link href={`/festivals/${festival.id}`} className="group block text-left">
      <motion.div
        initial={{ opacity: 0, y: 8 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ type: "spring", stiffness: 300, damping: 22 }}
      >
        <div className="relative aspect-[4/3] overflow-hidden rounded-3xl bg-gradient-to-br from-violet-100 to-fuchsia-50 shadow-[0_2px_10px_rgba(0,0,0,0.05)] transition-shadow duration-300 group-hover:shadow-[0_18px_34px_rgba(0,0,0,0.12)]">
          {festival.poster ? (
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="relative h-full w-full"
            >
              <Image
                src={festival.poster}
                alt={title}
                fill
                sizes="(min-width: 1024px) 25vw, 45vw"
                className="object-cover"
              />
            </motion.div>
          ) : (
            <motion.div
              whileHover={{ scale: 1.04 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="flex h-full items-center justify-center text-6xl"
            >
              🎆
            </motion.div>
          )}
          <FavoriteButton id={festival.id} className="absolute right-3 top-3" />
          <span className="absolute bottom-3 left-3 inline-flex items-center gap-1 rounded-full bg-white/90 px-2 py-1 text-xs font-semibold text-foreground shadow-sm backdrop-blur-sm">
            {festival.period.split(" ~ ")[0]}
          </span>
        </div>
        <div className="space-y-0.5 px-1 pt-3">
          <h3 className="truncate text-[15px] font-semibold">{title}</h3>
          <p className="truncate text-sm text-muted-foreground">{venueName}</p>
        </div>
      </motion.div>
    </Link>
  );
}
