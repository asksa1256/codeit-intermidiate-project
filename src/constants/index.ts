// api
export const BASE_URL = process.env.NEXT_PUBLIC_BACKEND_URL;
export const TEAM_ID = process.env.NEXT_PUBLIC_TEAM;
export const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
export const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
export const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

// token
export const ACCESS_TOKEN_KEY = 'accessToken';
export const REFRESH_TOKEN_KEY = 'refreshToken';

// pages
export const LOGIN_PAGE = '/login';
export const SIGNUP_PAGE = '/signUp';
