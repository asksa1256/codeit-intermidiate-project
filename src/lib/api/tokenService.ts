// cookie 기반
export const tokenService = {
  getAccessToken(): string | null {
    if (typeof document === 'undefined') return null;
    return getCookieValue('accessToken');
  },
  setAccessToken(token: string) {
    document.cookie = `accessToken=${token}; path=/; secure; sameSite=Lax`;
  },
  getRefreshToken(): string | null {
    if (typeof document === 'undefined') return null;
    return getCookieValue('refreshToken');
  },
  setRefreshToken(token: string) {
    document.cookie = `refreshToken=${token}; path=/; secure; sameSite=Lax`;
  },
  clearTokens() {
    document.cookie = `accessToken=; Max-Age=0; path=/`;
    document.cookie = `refreshToken=; Max-Age=0; path=/`;
  },
};

function getCookieValue(key: string): string | null {
  const match = document.cookie.match(new RegExp(`${key}=([^;]+)`));
  return match ? decodeURIComponent(match[1]) : null;
}
