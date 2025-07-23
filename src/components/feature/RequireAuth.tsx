'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { LOGIN_PAGE, SIGNUP_PAGE } from '@/constants';
import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const [isRefreshing, setIsRefreshing] = useState(false);

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

      if (pathname === LOGIN_PAGE || pathname === SIGNUP_PAGE) {
        // 로그인/회원가입 페이지: accessToken 있을 경우 해당 페이지로 접근하면 메인으로 리다이렉트
        if (accessToken) {
          router.replace('/');
          return;
        }

        if (refreshToken) {
          const success = await refreshAccessToken(refreshToken);
          if (success) {
            router.replace('/'); // accessToken 재발급 성공 시 메인으로 리다이렉트
          } else {
            setIsAuthChecked(true); // 실패 시 그냥 로그인 페이지 유지
          }
          return;
        }

        setIsAuthChecked(true);
        return;
      }

      // 로그인/회원가입 외 페이지 접근: 로그인 권한 필요
      if (!accessToken) {
        if (refreshToken) {
          const success = await refreshAccessToken(refreshToken);
          if (success) {
            // accessToken 재발급 성공: 해당 페이지 표시
            setIsAuthChecked(true);
          } else {
            // accessToken 재발급 실패: 로그인 페이지로 리다이렉트
            router.replace(LOGIN_PAGE);
          }
        } else {
          // accessToken, refreshToken 둘 다 없음: 로그인 페이지로 리다이렉트
          router.replace(LOGIN_PAGE);
        }
        return;
      }

      setIsAuthChecked(true);
    };

    checkAndRefreshToken();
  }, [pathname, router]);

  if (!isAuthChecked) return isRefreshing ? <LoadingSpinner /> : null;

  return <>{children}</>;
};

export default RequireAuth;
