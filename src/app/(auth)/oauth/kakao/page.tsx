'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect } from 'react';

import { AxiosApiAuth } from '@/lib/api/axios';

const KakaoOAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => {
    const authService = new AxiosApiAuth();
    const code = searchParams.get('code');

    if (code) {
      const signIn = async () => {
        try {
          const res = await authService.signInBySocial(
            'KAKAO',
            process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
            code,
          );
          console.log(res);
          router.push('/');
        } catch (err) {
          console.log(err);
          router.push('/login');
        }
      };
      signIn();
    } else {
      // code가 없는 경우 (로그인 실패)
      console.error('카카오 인가 코드를 찾을 수 없습니다.');
    }
  }, [router, searchParams]);

  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoOAuthPage;
