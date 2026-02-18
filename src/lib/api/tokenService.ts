import { ACCESS_TOKEN_KEY, REFRESH_TOKEN_KEY } from '@/constants';

export const tokenService = {
  getAccessToken(): string | null {
    if (typeof window === 'undefined') return null;

    // 쿠키에서 토큰 추출
    const name = ACCESS_TOKEN_KEY + '=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return null;
  },

  setAccessToken(token: string) {
    // 액세스 토큰 갱신 시 쿠키 갱신
    document.cookie = `${ACCESS_TOKEN_KEY}=${token}; path=/; max-age=${60 * 60 * 24}; sameSite=lax`;
  },

  getRefreshToken(): string | null {
    // 리프레쉬 토큰은 httpOnly이므로 클라이언트에서 접근 불가
    // API 라우트에서 리프레쉬 토큰 처리
    return 'httpOnly';
  },

  setRefreshToken(token: string) {
    // API 라우트에서 리프레쉬 토큰 처리
  },

  clearTokens() {
    // 로그아웃 API 호출로 토큰 삭제 처리
    // 클라이언트 쿠키 즉시 삭제
    document.cookie = `${ACCESS_TOKEN_KEY}=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC; sameSite=lax`;
  },
};
