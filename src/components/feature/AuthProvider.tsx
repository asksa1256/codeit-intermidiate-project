'use client';

import axios from 'axios';
import { ReactNode, useEffect } from 'react';

import useAuthStore from '@/stores/authStore';
import { UserData } from '@/types/userTypes';

const AuthProvider = ({ children }: { children: ReactNode }) => {
  const user = useAuthStore((state) => state.user);
  const signIn = useAuthStore((state) => state.signIn);

  useEffect(() => {
    const hydrateUserSession = async () => {
      // ✅ 세션 복구: 메모리상에 user는 없지만 서버 로그인 세션 상태(isLoggedIn)가 남아있을 때, 서버에서 user 정보 가져오기 (hydration)
      if (!user && document.cookie.includes('isLoggedIn=true')) {
        try {
          const { user: fetchedUser } = await axios.get('/api/auth/me').then((res: { data: { user: UserData } }) => res.data);
          if (fetchedUser) {
            signIn({ user: fetchedUser });
          }
        } catch {
          // 쿠키는 있지만 실제 세션 토큰은 만료된 경우, isLoggedIn 플래그 파기
          document.cookie = 'isLoggedIn=; path=/; expires=Thu, 01 Jan 1970 00:00:00 UTC;';
        }
      }
    };

    hydrateUserSession();
  }, [user, signIn]);

  // 서버(middleware)가 라우팅을 제어하므로, 클라이언트 페이지 전체에 적용되었던 로딩 스피너 제거
  return <>{children}</>;
};

export default AuthProvider;
