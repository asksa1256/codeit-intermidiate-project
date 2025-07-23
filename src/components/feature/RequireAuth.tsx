'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { LOGIN_PAGE, SIGNUP_PAGE } from '@/constants';
import { tokenService } from '@/lib/api/tokenService';

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const router = useRouter();
  const pathname = usePathname();
  const [isAuthChecked, setIsAuthChecked] = useState(false);

  useEffect(() => {
    const accessToken = tokenService.getAccessToken();
    const isLoginPage = pathname === LOGIN_PAGE;

    if (!accessToken && !isLoginPage) {
      alert('로그인이 필요한 페이지입니다.'); // 추후 토스트 or 모달로 교체
      router.replace(LOGIN_PAGE);
      return;
    }

    const unauthenticatedPages = [LOGIN_PAGE, SIGNUP_PAGE]; // 로그인 유저가 접근할 수 없는 페이지들
    if (accessToken && unauthenticatedPages.includes(pathname)) {
      router.replace('/');
      return;
    }

    setIsAuthChecked(true);
  }, [pathname, router]);

  // 리다이렉트 중에는 children을 숨기고 로딩 스피너 표시
  if (!isAuthChecked) return <LoadingSpinner />;

  return <>{children}</>;
};

export default RequireAuth;
