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

// 응답 - 토큰 만료(401 Unauthorized 에러) 시 자동 재발급
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.status || error?.response?.status;
    const isBrowser = typeof window !== 'undefined';
    const token = tokenService.getRefreshToken();

    if (status === 401 && !originalRequest._retry && isBrowser) {
      originalRequest._retry = true; // 요청 무한 루프 방지

      try {
        const refreshRes = await auth.refreshToken(token);
        const newAccessToken = refreshRes.data.accessToken;
        tokenService.setAccessToken(newAccessToken);

        originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

        return apiClient(originalRequest);
      } catch (refreshError) {
        // 리프레시 실패: 로그아웃
        signOutToLogin();
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그외 에러 리턴
  },
);
