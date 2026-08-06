export type CategoryId =
  | "관광지"
  | "맛집"
  | "카페"
  | "축제"
  | "전통시장"
  | "체험"
  | "포토존"
  | "공영주차장"
  | "화장실";

export type HiddenCategory =
  | "골목식당"
  | "감성카페"
  | "로컬브랜드"
  | "공방"
  | "포토존";

export type TransportMode = "도보" | "자동차" | "버스" | "자전거";

export type CourseTheme =
  | "반나절"
  | "하루"
  | "가족"
  | "연인"
  | "혼자"
  | "먹거리"
  | "야경"
  | "비오는날"
  | "사진명소";

export type PriceRange = "저가" | "보통" | "고가";
export type CourseDifficulty = "쉬움" | "보통" | "어려움";

export interface Place {
  id: string;
  name: string;
  nameEn?: string;
  category: CategoryId;
  lat: number;
  lng: number;
  address?: string;
  description?: string;
  descriptionEn?: string;
  image?: string;
  imageCredit?: string;
  imageCreditUrl?: string;
  tags?: string[];
  openHours?: string;
  openHoursEn?: string;
  phone?: string;
  priceRange?: PriceRange;
  rating?: number;
  landmark?: boolean;
  hidden?: boolean;
  hiddenCategory?: HiddenCategory;
  festivalId?: string;
}

export interface FestivalScheduleItem {
  date: string;
  time: string;
  program: string;
  programEn?: string;
}

export interface Festival {
  id: string;
  placeId: string;
  title: string;
  titleEn?: string;
  poster?: string;
  posterCredit?: string;
  posterCreditUrl?: string;
  period: string;
  schedule: FestivalScheduleItem[];
  venue: string;
  venueEn?: string;
  parkingInfo?: string;
  parkingInfoEn?: string;
}

export interface Course {
  id: string;
  title: string;
  titleEn?: string;
  theme: CourseTheme;
  description?: string;
  descriptionEn?: string;
  image?: string;
  difficulty?: CourseDifficulty;
  placeIds: string[];
}

export interface RouteLeg {
  from: Place;
  to: Place;
  mode: TransportMode;
  distanceKm: number;
  minutes: number;
}

export interface RouteResult {
  order: Place[];
  legs: RouteLeg[];
  totalDistanceKm: number;
  totalMinutes: number;
}
