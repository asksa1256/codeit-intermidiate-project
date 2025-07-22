'use client';

import { useRouter } from 'next/navigation';

import { useEffect } from 'react';

export default function ClientAutoLogin() {
  const router = useRouter();

  useEffect(() => {
    const tryAutoLogin = async () => {
      try {
        const res = await fetch('/api/auth/refresh', {
          method: 'POST',
          credentials: 'include',
          headers: {
            'Content-Type': 'application/json',
          },
        });

        if (res.ok) {
          router.push('/');
        } else {
          console.log('자동 로그인 실패, 로그아웃 시도');
          await fetch('/api/auth/signOut', { method: 'POST' });
        }
      } catch (error) {
        console.error('자동 로그인 중 오류:', error);
      }
    };

    tryAutoLogin();
  }, [router]);

  return null;
}
