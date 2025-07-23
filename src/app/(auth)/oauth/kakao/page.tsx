'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState, useRef } from 'react';

import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';

const KakaoOAuthPage = () => {
  const router = useRouter();
  const searchParams = useSearchParams();

  const isProcessedRef = useRef(false); // 인가 코드 요청 중복 실행 방지
  const [code, setCode] = useState<string | null>(null); // 인가 요청 1회 완료 시 ref 업데이트 트리거

  // 인가 코드 한 번만 받기
  useEffect(() => {
    const currentCode = searchParams.get('code');
    if (currentCode) setCode(currentCode);
  }, [searchParams]);

  useEffect(() => {
    // 인가 코드가 null이거나, 이미 인가 코드를 받았다면 실행 X
    if (!code || isProcessedRef.current) return;

    const authService = new AxiosApiAuth();

    isProcessedRef.current = true;

    const signIn = async () => {
      try {
        const res = await authService.signInBySocial(
          'KAKAO',
          process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI,
          code,
        );
        console.log(res);

        tokenService.setAccessToken(res.accessToken);
        tokenService.setRefreshToken(res.refreshToken);

        router.push('/');
      } catch (err) {
        // code가 없는 경우 (로그인 실패)
        console.log('카카오 인가 코드를 찾을 수 없습니다.: ' + err);
        router.push('/login');
      }
    };
    signIn();
  }, [router, code]);

  return <div>카카오 로그인 처리중...</div>;
};

export default KakaoOAuthPage;
