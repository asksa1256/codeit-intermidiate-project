import axios, { AxiosInstance } from 'axios';

import useAuthStore from '@/stores/authStore';

import { AxiosApiAuth } from './axios';
import { tokenService } from './tokenService';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const auth = new AxiosApiAuth();
const { refreshToken, setTokens, signOut } = useAuthStore.getState();

// 요청 헤더에 accessToken 추가
apiClient.interceptors.request.use((config) => {
  const token = tokenService.getAccessToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// 응답 - 토큰 만료(401 Unauthorized 에러) 시 자동 재발급
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.status || error?.response?.status;

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 요청 무한 루프 방지

      if (refreshToken) {
        try {
          const { accessToken } = await auth.refreshToken(refreshToken);
          setTokens(accessToken, refreshToken);
          tokenService.setAccessToken(accessToken); // 이미 유저 전역에서 관리되지만, 추후 쿠키 토큰용으로 사용할 수도 있어서 임시 보류

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch {
          // 재발급 실패 시 토큰 삭제 후 로그인 페이지 이동 처리
          signOut(); // 유저 전역 상태에서 삭제
          auth.signOut(); // 토큰만 따로 삭제 (쿠키 토큰용)
          window.location.href = '/login';

          return Promise.reject(error);
        }
      } else {
        // refreshToken 없으면 바로 로그인 페이지로
        window.location.href = '/login';
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); // 그외 에러 리턴
  },
);
