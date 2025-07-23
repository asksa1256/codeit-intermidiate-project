'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';

export default function ClientAutoLogin() {
  const router = useRouter();

  useEffect(() => {
    const auth = new AxiosApiAuth();

    const tryAutoLogin = async () => {
      const token = tokenService.getRefreshToken();

      try {
        const res = await auth.refreshToken(token);
        if (res.ok) {
          router.push('/');
        } else {
          console.log('자동 로그인 실패, 로그아웃');
          auth.signOut();
        }
      } catch (error) {
        console.error('자동 로그인 중 오류:', error);
      }
    };

    tryAutoLogin();
  }, [router]);

  return null;
}
