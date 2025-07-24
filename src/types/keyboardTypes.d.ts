import { ReviewItemBase, ReviewItemType, ReviewUser } from '@/types/reviewTypes';

/**
 * KeyboardColorType 한글 이름 매핑
 * - CHERRY      => 레드
 * - BERRY       => 퍼플
 * - OAK         => 브라운
 * - VANILLA     => 베이지
 * - PEPPER      => 블랙
 * - BAKING      => 연노랑
 * - GRASS       => 그린
 * - APPLE       => 라임
 * - PEACH       => 핑크
 * - CITRUS      => 오렌지
 * - TROPICAL    => 레인보우
 * - MINERAL     => 투명
 * - FLOWER      => 연보라
 * - TOBACCO     => 그레이
 * - EARTH       => 블루
 * - CHOCOLATE   => 스카이
 * - SPICE       => 옐로우
 * - CARAMEL     => 반투명
 * - LEATHER     => 화이트
 */
export type KeyboardColorType =
  | 'CHERRY'
  | 'BERRY'
  | 'OAK'
  | 'VANILLA'
  | 'PEPPER'
  | 'BAKING'
  | 'GRASS'
  | 'APPLE'
  | 'PEACH'
  | 'CITRUS'
  | 'TROPICAL'
  | 'MINERAL'
  | 'FLOWER'
  | 'TOBACCO'
  | 'EARTH'
  | 'CHOCOLATE'
  | 'SPICE'
  | 'CARAMEL'
  | 'LEATHER';

/**
 * KeyboardCategoryType 설명
 * - RED        => 기계식
 * - WHITE      => 멤브레인
 * - SPARKLING  => 펜타그래프
 */
export type KeyboardCategoryType = 'RED' | 'WHITE' | 'SPARKLING';

// ==================================================================================

/**
 * - 키보드 아이템 기본
 */
interface KeyboardItemBase {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: KeyboardCategoryType;
  avgRating: number;
  reviewCount: number;
  userId: number;
}

// ==================================================================================

/**
 * - Page : 키보드 목록 페이지
 * - 키보드 아이템
 */
interface KeyboardItemType extends KeyboardItemBase {
  recentReview: KeyboardItemRecentReview | null;
}

interface KeyboardItemRecentReview {
  id: number;
  rating: number;
  user: ReviewUser;
  updatedAt: string;
  createdAt: string;
  content: string;
  aroma: KeyboardColorType[];
}

/**
 * - Page : 키보드 목록 페이지
 * - 키보드 리스트 response
 */
interface KeyboardListType {
  list: KeyboardItemType[];
  totalCount: number;
  nextCursor: number | null;
}

// ==================================================================================

/**
 * - Page : 내가 등록한 키보드 페이지
 * - 내가 등록한 키보드 아이템
 */
interface MyKeyboardItemType extends KeyboardItemBase {
  recentReview: null;
}

/**
 * - Page : 내가 등록한 키보드 페이지
 * - 내가 등록한 키보드 리스트 response
 */
interface MyKeyboardListType {
  list: MyKeyboardItemType[];
  totalCount: number;
  nextCursor: number | null;
}

// ==================================================================================

/**
 * - Page : 키보드 상세 페이지
 * - 키보드 상세 타입
 */
interface KeyboardDetailType extends KeyboardItemBase {
  recentReview: DetailRecentReview | null;
  reviews: ReviewItemType[];
  avgRatings: AvgRatings;
}

interface DetailRecentReview extends ReviewItemBase {
  likes: {
    user: {
      id: number;
    };
  }[];
}

interface AvgRatings {
  '1': number;
  '2': number;
  '3': number;
  '4': number;
  '5': number;
}
