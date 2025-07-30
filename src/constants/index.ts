// api
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;
export const KAKAO_REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;

// token
export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// pages
export const LOGIN_PAGE = '/login';
export const SIGNUP_PAGE = '/signUp';
export const KEYBOARD_LIST_PAGE = '/keyboards';
export const KAKAO_LOGIN_PAGE = '/oauth/kakao';

// images
export const DEFAULT_PROFILE_IMG_URL =
  'https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1693/1753524666758/UserThumbEmpty.png'; // api 요청 에러 방지용 기본 이미지 url

// constants
export const KEYBOARD_TYPES_MAP = [
  { id: 1, type: 'RED', value: '기계식' },
  { id: 2, type: 'WHITE', value: '멤브레인' },
  { id: 3, type: 'SPARKLING', value: '펜타그래프' },
];

// aroma 속성 색상값 매핑
export const KEYBOARD_COLOR_MAP = {
  CHERRY: '레드',
  BERRY: '퍼플',
  OAK: '브라운',
  VANILLA: '베이지',
  PEPPER: '블랙',
  BAKING: '연노랑',
  GRASS: '그린',
  APPLE: '라임',
  PEACH: '핑크',
  CITRUS: '오렌지',
  TROPICAL: '레인보우',
  MINERAL: '투명',
  FLOWER: '연보라',
  TOBACCO: '그레이',
  EARTH: '블루',
  CHOCOLATE: '스카이',
  SPICE: '옐로우',
  CARAMEL: '반투명',
  LEATHER: '화이트',
};
