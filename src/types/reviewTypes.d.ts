import { ReviewUser } from '@/types/userTypes';

export interface ReviewUser {
  id: number;
  nickname: string;
  image: string | null;
}

// ==================================================================================

/**
 * - 리뷰 아이템 기본
 */
export interface ReviewItemBase {
  id: number;
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: KeyboardColorType[];
  content: string;
  createdAt: string;
  updatedAt: string;
  user: ReviewUser;
  isLiked?: boolean;
}

// ==================================================================================

/**
 * - Page : 모달에서 사용이 되는지 확인이 필요함
 * - 리뷰 아이템
 */
export interface ReviewItemType extends ReviewItemBase {
  wineId: number;
  teamId: string;
}

// ==================================================================================

/**
 * - Page : 내가 작성한 리뷰 리스트 페이지
 * - 내가 작성한 리뷰 아이템
 */
export interface MyReviewItemType extends ReviewItemBase {
  wine: {
    id: number;
    name: string;
    region: string;
    image: string;
    price: number;
    type: KeyboardCategoryType;
    avgRating: number;
  };
}

/**
 * - Page : 내가 작성한 리뷰 리스트 페이지
 * - 내가 작성한 리뷰 리스트 response
 */
export interface MyReviewListType {
  list: MyReviewItemType[];
  totalCount: number;
  nextCursor: number | null;
}
