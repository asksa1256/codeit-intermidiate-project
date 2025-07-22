import axios, { AxiosInstance } from 'axios';

const apiClient: AxiosInstance = axios.create({
  baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
  withCredentials: true,
});

// 응답 - 토큰 만료(401 Unauthorized 에러) 시 자동 재발급
apiClient.interceptors.response.use(
  (res) => res,
  async (error) => {
    const originalRequest = error.config;
    const status = error?.status || error?.response?.status;
    const isBrowser = typeof document !== 'undefined';

    if (status === 401 && !originalRequest._retry && isBrowser) {
      originalRequest._retry = true; // 요청 무한 루프 방지

      try {
        const refreshRes = await fetch('/api/auth/refresh', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (refreshRes.ok) {
          // accessToken은 next.js 서버가 쿠키에 자동 저장
          return apiClient(originalRequest); // 재시도
        } else {
          // 리프레시 토큰 요청 실패: 로그아웃 처리
          await fetch('/api/auth/signOut', { method: 'POST' });
          window.location.href = '/login';
          return Promise.reject(error);
        }
      } catch (refreshError) {
        // 리프레시 토큰 요청 실패: 로그아웃 처리
        await fetch('/api/auth/signOut', { method: 'POST' });
        window.location.href = '/login';
        return Promise.reject(refreshError);
      }
    }

    return Promise.reject(error); // 그외 에러 리턴
  },
);

// const apiClient: AxiosInstance = axios.create({
//   baseURL: process.env.NEXT_PUBLIC_BACKEND_URL,
// });

// // 요청 - 토큰 자동 첨부
// apiClient.interceptors.request.use(
//   (config) => {
//     const token = tokenService.getAccessToken();
//     if (token && config.headers) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => Promise.reject(error),
// );

// // 응답 - 토큰 만료(401 Unauthorized 에러) 시 자동 재발급
// apiClient.interceptors.response.use(
//   (res) => res,
//   async (error) => {
//     const originalRequest = error.config;
//     const status = error?.status || error?.response?.status;
//     const isBrowser = typeof window !== 'undefined';

//     if (status === 401 && !originalRequest._retry && isBrowser) {
//       originalRequest._retry = true; // 요청 무한 루프 방지

//       const refreshToken = tokenService.getRefreshToken();
//       if (!refreshToken) return Promise.reject(error);

//       try {
//         const res = await axios.post(`/${process.env.NEXT_PUBLIC_TEAM}/auth/refresh-token`);
//         const newAccessToken = res.data.accessToken;
//         tokenService.setAccessToken(newAccessToken);
//         originalRequest.headers.Authorization = `Bearer ${newAccessToken}`;

//         return apiClient(originalRequest); // 새 액세스 토큰으로 재요청
//       } catch (refreshError) {
//         // 리프레시 토큰 요청 실패: 로그아웃 처리
//         tokenService.clearTokens();
//         window.location.href = '/login';

//         return Promise.reject(refreshError);
//       }
//     }

//     return Promise.reject(error); // 그외 에러 리턴
//   },
// );
