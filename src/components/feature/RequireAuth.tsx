'use client';

import { usePathname, useRouter } from 'next/navigation';

import { ReactNode, useEffect, useState } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SIGNIN_PAGE, SIGNUP_PAGE, KEYBOARD_LIST_PAGE, KAKAO_LOGIN_PAGE } from '@/constants';
import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

const PUBLIC_PATHS = ['/', KEYBOARD_LIST_PAGE];
const AUTH_PATHS = [SIGNIN_PAGE, SIGNUP_PAGE, KAKAO_LOGIN_PAGE];

const RequireAuth = ({ children }: { children: ReactNode }) => {
  const [isAuthChecked, setIsAuthChecked] = useState(false);
  const user = useAuthStore((state) => state.user);
  const addToast = useToastStore((state) => state.addToast);

  const router = useRouter();
  const pathname = usePathname();

  // 리다이렉트 분기
  useEffect(() => {
    const isPublicPath = PUBLIC_PATHS.includes(pathname);
    const isAuthPath = AUTH_PATHS.includes(pathname);

    const checkUser = async () => {
      // ✅ 로그인/회원가입 페이지: 로그인 유저는 메인으로 리다이렉트
      if (isAuthPath) {
        if (user) {
          setIsAuthChecked(false);
          router.replace('/');
          return;
        }

        setIsAuthChecked(true); // 비회원: 로그인/회원가입 페이지 표시
        return;
      }

      // ✅ 퍼블릭 페이지 (메인, 키보드 목록 페이지): 권한 검사, 리다이렉트 없이 페이지 표시
      if (isPublicPath) {
        setIsAuthChecked(true);
        return;
      }

      // ✅ 회원 전용 페이지 (키보드 상세, 내 프로필 페이지): 권한 없으면 로그인 페이지로 리다이렉트
      if (!user) {
        router.replace(SIGNIN_PAGE);
        addToast({ message: '로그인이 필요합니다.', type: 'error', duration: 2000 });
        return;
      }

      setIsAuthChecked(true); // 그 외 페이지: 로그인 후 접근 가능
    };

    checkUser();
  }, [pathname, router, user, addToast]);

  if (!isAuthChecked) return <LoadingSpinner text='로그인 확인중...' className='h-screen' />;

  return <>{children}</>;
};

export default RequireAuth;
