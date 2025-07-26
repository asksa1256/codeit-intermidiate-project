'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState, useCallback } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { LOGIN_PAGE, SIGNUP_PAGE, KEYBOARD_LIST_PAGE, KAKAO_LOGIN_PAGE } from '@/constants';
import { apiClient } from '@/lib/api/apiClient';
import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';
import useAuthStore from '@/stores/authStore';

const PUBLIC_PATHS = ['/', KEYBOARD_LIST_PAGE];
const AUTH_PATHS = [LOGIN_PAGE, SIGNUP_PAGE, KAKAO_LOGIN_PAGE];

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const { user, updateUser } = useAuthStore();

  const router = useRouter();
  const pathname = usePathname();

  // accessToken 재발급 + 재로그인 (user 전역 상태 저장): refreshToken 있을 때만 호출됨
  const refreshAccessTokenAndUser = useCallback(
    async (refreshToken: string) => {
      const auth = new AxiosApiAuth();

      try {
        setIsRefreshing(true);

        // 토큰 재설정
        const res = await auth.refreshToken(refreshToken);
        tokenService.setAccessToken(res.accessToken);

        // 유저 정보 다시 받아오기
        const { data } = await apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
        updateUser(data);

        return true;
      } catch (err) {
        console.error('accessToken 재발급 실패:', err);

        return false;
      } finally {
        setIsRefreshing(false);
      }
    },
    [updateUser],
  );

  // 리다이렉트 분기
  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.includes(pathname);
    const isAuthPath = AUTH_PATHS.includes(pathname);

    const checkAndRefreshToken = async () => {
      const refreshToken = tokenService.getRefreshToken();

      // ✅ 로그인/회원가입 페이지: 로그인 유저는 메인으로 리다이렉트
      if (isAuthPath) {
        if (user) {
          router.replace('/');
          return;
        }

        if (!refreshToken) {
          setIsAuthChecked(true); // 로그인/회원가입 페이지 그대로 표시
          return;
        }

        const success = await refreshAccessTokenAndUser(refreshToken);
        if (success) {
          router.replace('/');
        } else {
          setIsAuthChecked(true); // 재발급 실패: 로그인/회원가입 페이지 표시
        }

        return;
      }

      // ✅ 로그인 권한 필요 없는 공개 페이지 (메인, 키보드 목록 페이지): 권한 검사 없이 바로 페이지 본문 리턴
      if (isPublicPath) {
        setIsAuthChecked(true);
        return;
      }

      // 로그인 권한 필요 페이지 (키보드 상세, 프로필 페이지)
      if (!user) {
        if (!refreshToken) {
          const url = `${LOGIN_PAGE}?redirect_url=${encodeURIComponent(pathname)}`; // 로그인 후 해당 페이지로 리다이렉트
          router.replace(url);
          return;
        }

        // !user && refreshToken
        const success = await refreshAccessTokenAndUser(refreshToken);
        if (!success) {
          router.replace(LOGIN_PAGE);
          return;
        }

        setIsAuthChecked(true);
        return;
      }

      setIsAuthChecked(true);
    };

    checkAndRefreshToken();
  }, [pathname, router, user, refreshAccessTokenAndUser]);

  if (!isAuthChecked) return isRefreshing ? <LoadingSpinner text='로그인 확인중...' /> : null;

  return <>{children}</>;
};

export default RequireAuth;
