'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState, useRef } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { AxiosApiAuth } from '@/lib/api/axios';
import { tokenService } from '@/lib/api/tokenService';
import useAuthStore from '@/stores/authStore';

const KakaoOAuthPage = () => {
  // routing
  const router = useRouter();
  const searchParams = useSearchParams();

  // authStore
  const signIn = useAuthStore((state) => state.signIn);

  // 인가 코드 요청 중복 실행 방지
  const isProcessedRef = useRef(false);
  const [code, setCode] = useState<string | null>(null); // 인가 요청 1회 완료 시 ref 업데이트 트리거

  // 인가 코드 먼저 받기
  useEffect(() => {
    const currentCode = searchParams.get('code');
    if (currentCode) setCode(currentCode);
  }, [searchParams]);

  useEffect(() => {
    // 인가 코드가 null이거나, 이미 인가 코드를 받았다면 실행 X
    if (!code || isProcessedRef.current) return;

    const authService = new AxiosApiAuth();

    isProcessedRef.current = true; // 인가 코드 받았으면 flag = true

    const signInByKakao = async () => {
      try {
        const KAKAO_REDIRECT_URI = `${window.location.origin}/oauth/kakao`;
        const { user, accessToken, refreshToken } = await authService.signInBySocial(
          'KAKAO',
          KAKAO_REDIRECT_URI,
          code,
        );

        tokenService.setAccessToken(accessToken);
        tokenService.setRefreshToken(refreshToken);
        signIn({ user }); // 유저 정보 zustand store에 저장

        router.push('/');
      } catch (err) {
        // code가 없는 경우 (로그인 실패)
        console.log('카카오 인가 코드를 찾을 수 없습니다.: ' + err);
        router.push('/login');
      }
    };
    signInByKakao();
  }, [router, code, signIn]);

  return <LoadingSpinner text='카카오 로그인 처리중...' className='h-screen' />;
};

export default KakaoOAuthPage;
