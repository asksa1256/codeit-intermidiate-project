'use client';

import { apiClient } from '@/lib/api/apiClient';
import { ReactNode, useEffect } from 'react';

import { tokenService } from '@/lib/api/tokenService';
import useAuthStore from '@/stores/authStore';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);

  useEffect(() => {
    const hydrateUserSession = async () => {
      // ✅ 세션 복구: 메모리상에 user는 없지만 서버 로그인 세션 상태(isLoggedIn)가 남아있을 때, 서버에서 user 정보 가져오기 (hydration)
      if (!user && document.cookie.includes('isLoggedIn=true')) {
        try {
          // 액세스 토큰만 만료되었을 경우, 즉시 로그아웃 대신 apiClient로 자동 토큰 재발급 시도 -> user 데이터 재요청
          const fetchedUser = await apiClient.get('/users/me').then(res => res.data);

          if (fetchedUser) {
            signIn({ user: fetchedUser });
          }
        } catch {
          // 토큰 재발급까지 실패하면 토큰 삭제 및 로그아웃 처리
          tokenService.clearTokens();
        }
      }
    };

    hydrateUserSession();
  }, [user, signIn]);

  // 서버(middleware)가 라우팅을 제어하므로, 클라이언트 페이지 전체에 적용되었던 로딩 스피너 제거
  return <>{children}</>;
};

export default AuthProvider;
