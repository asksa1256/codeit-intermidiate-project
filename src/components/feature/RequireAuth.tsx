'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { LOGIN_PAGE, SIGNUP_PAGE } from '@/constants';
import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

  const router = useRouter();
  const pathname = usePathname();
  const PUBLIC_PATHS = [LOGIN_PAGE, SIGNUP_PAGE];
  const isPublicPath = PUBLIC_PATHS.includes(pathname) || pathname.startsWith('/oauth/kakao'); // 로그인/회원가입/소셜 로그인

  // refreshToken 기반 accessToken 재발급 받기
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

  useEffect(() => {
    const checkAndRefreshToken = async () => {
      const accessToken = tokenService.getAccessToken();
      const refreshToken = tokenService.getRefreshToken();

      if (isPublicPath) {
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
      } else {
        // 로그인/회원가입/소셜 로그인 외 페이지 접근
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
  }, [pathname, router, isPublicPath]);

  if (!isAuthChecked) return isRefreshing ? <LoadingSpinner text='로그인 확인중...' /> : null;

  return <>{children}</>;
};

export default RequireAuth;
