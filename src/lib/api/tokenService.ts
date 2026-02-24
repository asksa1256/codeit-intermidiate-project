/**
 * @description 이제 토큰은 서버 측 httpOnly 쿠키로 관리됩니다.
 * 클라이언트 측에서 직접 토큰에 접근하는 기능은 보안을 위해 제거했습니다.
 */

export const tokenService = {
  // 로그인 상태 확인이 필요한 경우, 클라이언트 측 마커 쿠키(isLoggedIn) 존재 여부만 체크
  getIsLoggedIn(): boolean {
    if (typeof window === 'undefined') return false;
    return document.cookie.includes('isLoggedIn=true');
  },

  clearTokens() {
    // 로그아웃 시 클라이언트 측 마커 쿠키만 제거
    // accessToken과 refreshToken은 httpOnly 쿠키이므로 서버에서 삭제
    document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
  }
};
