import axios, { AxiosInstance } from 'axios';

import useAuthStore from '@/stores/authStore';

export const apiClient: AxiosInstance = axios.create({
  // 이제 클라이언트 측에서 Next.js 미들웨어가 처리하는 '프록시 경로'를 베이스로 사용합니다.
  baseURL: '/api/proxy',
});

// 응답 인터셉터 - 401 Unauthorized 에러 시 토큰 재발급 시도
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.response?.status;

    // 401 에러(Unauthorized) 발생 시 토큰 갱신 시도
    if (status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;

      try {
        // 서버에서 httpOnly 쿠키인 refreshToken 조회 후 액세스 토큰 갱신
        await axios.post('/api/auth/refresh');

        // 토큰 갱신 성공 시 원래의 요청 재시도 (미들웨어가 새로 발급된 accessToken 쿠키를 읽어 요청을 가공)
        return apiClient(originalRequest);
      } catch (refreshError) {
        // 갱신 실패 시 로그아웃 처리
        const { signOut } = useAuthStore.getState();
        signOut();

        // 서버 측 쿠키도 삭제하기 위해 로그아웃 API 호출
        await axios.post('/api/auth/logout');

        if (typeof window !== 'undefined') {
          window.location.href = '/signin';
        }

        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error);
  },
);
