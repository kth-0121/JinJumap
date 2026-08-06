import type {
  CategoryId,
  CourseDifficulty,
  CourseTheme,
  HiddenCategory,
  PriceRange,
  TransportMode,
} from "./types";

export const JINJU_CENTER = { lat: 35.191, lng: 128.09 };

// Clamps the map to the Jinju downtown/tourist area so users can't pan or
// zoom out to see the rest of the country.
export const JINJU_BOUNDS: [[number, number], [number, number]] = [
  [35.12, 128.0],
  [35.25, 128.19],
];

export const JINJU_MIN_ZOOM = 13;

export const CATEGORY_META: Record<
  CategoryId,
  { label: string; labelEn: string; color: string; icon: string }
> = {
  관광지: { label: "관광지", labelEn: "Attractions", color: "#e11d48", icon: "🏯" },
  맛집: { label: "맛집", labelEn: "Restaurants", color: "#f97316", icon: "🍜" },
  카페: { label: "카페", labelEn: "Cafes", color: "#a16207", icon: "☕" },
  축제: { label: "축제", labelEn: "Festivals", color: "#7c3aed", icon: "🎆" },
  전통시장: { label: "전통시장", labelEn: "Markets", color: "#16a34a", icon: "🧺" },
  체험: { label: "체험", labelEn: "Experiences", color: "#0891b2", icon: "🎨" },
  포토존: { label: "포토존", labelEn: "Photo Spots", color: "#db2777", icon: "📸" },
  공영주차장: { label: "공영주차장", labelEn: "Parking", color: "#475569", icon: "🅿️" },
  화장실: { label: "화장실", labelEn: "Restrooms", color: "#64748b", icon: "🚻" },
};

export const TRANSPORT_SPEED_KMH: Record<TransportMode, number> = {
  도보: 4.5,
  자전거: 14,
  버스: 20,
  자동차: 30,
};

export const TRANSPORT_META: Record<
  TransportMode,
  { icon: string; label: string; labelEn: string }
> = {
  도보: { icon: "🚶", label: "도보", labelEn: "Walk" },
  자전거: { icon: "🚲", label: "자전거", labelEn: "Bike" },
  버스: { icon: "🚌", label: "버스", labelEn: "Bus" },
  자동차: { icon: "🚗", label: "자동차", labelEn: "Car" },
};

export const COURSE_THEME_META: Record<
  CourseTheme,
  { label: string; labelEn: string }
> = {
  반나절: { label: "반나절", labelEn: "Half-day" },
  하루: { label: "하루", labelEn: "Full-day" },
  가족: { label: "가족", labelEn: "Family" },
  연인: { label: "연인", labelEn: "Couples" },
  혼자: { label: "혼자", labelEn: "Solo" },
  먹거리: { label: "먹거리", labelEn: "Foodie" },
  야경: { label: "야경", labelEn: "Night View" },
  비오는날: { label: "비오는날", labelEn: "Rainy Day" },
  사진명소: { label: "사진명소", labelEn: "Photo Spots" },
};

export const COURSE_THEMES: CourseTheme[] = Object.keys(
  COURSE_THEME_META,
) as CourseTheme[];

export const HIDDEN_CATEGORY_META: Record<
  HiddenCategory,
  { label: string; labelEn: string }
> = {
  골목식당: { label: "골목식당", labelEn: "Alley Eateries" },
  감성카페: { label: "감성카페", labelEn: "Mood Cafes" },
  로컬브랜드: { label: "로컬브랜드", labelEn: "Local Brands" },
  공방: { label: "공방", labelEn: "Craft Studios" },
  포토존: { label: "포토존", labelEn: "Photo Spots" },
};

export const PRICE_RANGE_META: Record<
  PriceRange,
  { label: string; labelEn: string }
> = {
  저가: { label: "저가", labelEn: "Budget" },
  보통: { label: "보통", labelEn: "Moderate" },
  고가: { label: "고가", labelEn: "Premium" },
};

export const DIFFICULTY_META: Record<
  CourseDifficulty,
  { label: string; labelEn: string }
> = {
  쉬움: { label: "쉬움", labelEn: "Easy" },
  보통: { label: "보통", labelEn: "Moderate" },
  어려움: { label: "어려움", labelEn: "Hard" },
};
