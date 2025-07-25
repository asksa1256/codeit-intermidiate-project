'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { LOGIN_PAGE, SIGNUP_PAGE, KEYBOARD_LIST_PAGE, KAKAO_LOGIN_PAGE } from '@/constants';
import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  // 로그인 하지 않아도 접근 가능한 페이지: 랜딩, 로그인, 회원가입, 소셜 로그인, 키보드 목록 페이지
  const PUBLIC_PATHS = ['/', KEYBOARD_LIST_PAGE];
  const isPublicPath = PUBLIC_PATHS.includes(pathname);
  const AUTH_PATHS = [LOGIN_PAGE, SIGNUP_PAGE, KAKAO_LOGIN_PAGE];
  const isAuthPath = AUTH_PATHS.includes(pathname);

  // refreshToken 기반 accessToken 재발급 함수
  const refreshAccessToken = async (refreshToken: string) => {
    const auth = new AxiosApiAuth();

    try {
      setIsRefreshing(true);
      const res = await auth.refreshToken(refreshToken);
      tokenService.setAccessToken(res.accessToken);
      return true;
    } catch (err) {
      console.error('accessToken 재발급 실패:', err);
      return false;
    } finally {
      setIsRefreshing(false);
    }
  };

  // 로그인, 회원가입, 카카오 로그인 경로만 로그인 이후 메인으로 리다이렉트
  // 메인, 키보드 페이지: 리다이렉트 X. 그대로 보여주기.
  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = tokenService.getAccessToken();
      const refreshToken = tokenService.getRefreshToken();

      if (isAuthPath) {
        // Auth(로그인/회원가입/카카오 로그인) 페이지: 로그인 유저는 메인으로 리다이렉트
        if (accessToken) {
          router.replace('/');
          return;
        }

        if (!refreshToken) {
          setIsAuthChecked(true);
          return;
        }

        const success = await refreshAccessToken(refreshToken);
        if (success) {
          router.replace('/');
        } else {
          setIsAuthChecked(true);
        }
        return;
      } else if (isPublicPath) {
        // 로그인 권한 필요 없는 공개 페이지 (메인, 키보드 목록 페이지): 권한 검사 없이 바로 페이지 본문 리턴
        setIsAuthChecked(true);
        return;
      } else {
        // 그외 권한 필요 페이지 (키보드 상세, 프로필 페이지)
        if (!accessToken) {
          if (!refreshToken) {
            router.replace(LOGIN_PAGE);
            return;
          }

          const success = await refreshAccessToken(refreshToken);
          if (!success) {
            router.replace(LOGIN_PAGE);
            return;
          }

          setIsAuthChecked(true);
          return;
        }

        setIsAuthChecked(true);
      }
    };

    checkAndRefreshToken();
  }, [pathname, router, isAuthPath, isPublicPath]);

  if (!isAuthChecked) return isRefreshing ? <LoadingSpinner text='로그인 확인중...' /> : null;

  return <>{children}</>;
};

export default RequireAuth;
