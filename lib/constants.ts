import type { CategoryId, CourseTheme, TransportMode } from "./types";

export const JINJU_CENTER = { lat: 35.191, lng: 128.09 };

// Clamps the map to the Jinju downtown/tourist area so users can't pan or
// zoom out to see the rest of the country.
export const JINJU_BOUNDS: [[number, number], [number, number]] = [
  [35.13, 128.0],
  [35.25, 128.16],
];

export const JINJU_MIN_ZOOM = 13;

export const CATEGORY_META: Record<
  CategoryId,
  { label: string; color: string; icon: string }
> = {
  관광지: { label: "관광지", color: "#e11d48", icon: "🏯" },
  맛집: { label: "맛집", color: "#f97316", icon: "🍜" },
  카페: { label: "카페", color: "#a16207", icon: "☕" },
  축제: { label: "축제", color: "#7c3aed", icon: "🎆" },
  전통시장: { label: "전통시장", color: "#16a34a", icon: "🧺" },
  체험: { label: "체험", color: "#0891b2", icon: "🎨" },
  포토존: { label: "포토존", color: "#db2777", icon: "📸" },
  공영주차장: { label: "공영주차장", color: "#475569", icon: "🅿️" },
  화장실: { label: "화장실", color: "#64748b", icon: "🚻" },
};

export const TRANSPORT_SPEED_KMH: Record<TransportMode, number> = {
  도보: 4.5,
  자전거: 14,
  버스: 20,
  자동차: 30,
};

export const TRANSPORT_ICON: Record<TransportMode, string> = {
  도보: "🚶",
  자전거: "🚲",
  버스: "🚌",
  자동차: "🚗",
};

export const COURSE_THEMES: CourseTheme[] = [
  "반나절",
  "하루",
  "가족",
  "연인",
  "혼자",
  "먹거리",
  "야경",
  "비오는날",
  "사진명소",
];
