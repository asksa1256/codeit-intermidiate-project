import axios, { AxiosInstance } from 'axios';

import useAuthStore from '@/stores/authStore';

import { AxiosApiAuth } from './axios';
import { tokenService } from './tokenService';

export const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const auth = new AxiosApiAuth();
const { signOut } = useAuthStore.getState();

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
    const refreshToken = tokenService.getRefreshToken();

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 요청 무한 루프 방지

      if (refreshToken) {
        try {
          const { accessToken } = await auth.refreshToken(refreshToken);
          tokenService.setAccessToken(accessToken);

          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch {
          // 재발급 실패 시 토큰 삭제 후 로그인 페이지 이동 처리
          signOut(); // 유저 전역 상태 null
          auth.signOut(); // 토큰만 따로 삭제

          return Promise.reject(error);
        }
      } else {
        return Promise.reject(error);
      }
    }

    return Promise.reject(error); // 그외 에러 리턴
  },
);
