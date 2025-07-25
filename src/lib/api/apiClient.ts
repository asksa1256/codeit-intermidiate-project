import axios, { AxiosInstance } from 'axios';

import { AxiosApiAuth } from './axios';
import { tokenService } from './tokenService';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
});

const auth = new AxiosApiAuth();

const signOutToLogin = () => {
  auth.signOut();
  window.location.href = '/login';
};

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
    const refreshTkn = tokenService.getRefreshToken();

    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true; // 요청 무한 루프 방지

      if (refreshTkn) {
        try {
          const { accessToken } = await auth.refreshToken(refreshTkn);
          tokenService.setAccessToken(accessToken);
          originalRequest.headers.Authorization = `Bearer ${accessToken}`;
          return apiClient(originalRequest);
        } catch {
          // 재발급 실패 시 토큰 삭제 후 로그인 페이지 이동 처리
          signOutToLogin();
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
