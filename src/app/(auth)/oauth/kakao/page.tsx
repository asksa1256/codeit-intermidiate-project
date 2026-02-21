'use client';

import { useSearchParams, useRouter } from 'next/navigation';

import { useEffect, useState, useRef, Suspense } from 'react';

import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { SIGNIN_PAGE } from '@/constants';
import { AxiosApiAuth } from '@/lib/api/axios';
import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';

const KakaoOAuthContainer = () => {
  const router = useRouter();
  const searchParams = useSearchParams();
  const signIn = useAuthStore((state) => state.signIn);
  const addToast = useToastStore((state) => state.addToast);

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
        const { user } = await authService.signInBySocial(
          'KAKAO',
          KAKAO_REDIRECT_URI,
          code,
        );

        signIn({ user }); // 유저 정보 zustand store에 저장
        router.push('/');
        addToast({
          message: (
            <span>
              안녕하세요, <b>{user.nickname}</b>님!
            </span>
          ),
          type: 'success',
          duration: 2000,
        });
      } catch (err) {
        // 인가 코드를 못 받은 경우 (로그인 실패)
        console.error(err);
        addToast({
          message: '카카오 로그인에 실패했습니다. 다시 시도해주세요.',
          type: 'error',
          duration: 2000,
        });
        router.push(SIGNIN_PAGE);
      }
    };
    signInByKakao();
  }, [router, code, signIn, addToast]);

  return <LoadingSpinner text='카카오 로그인 처리중...' className='h-screen' />;
};

const KakaoOAuthPage = () => {
  return (
    <Suspense fallback={<LoadingSpinner text='카카오 로그인 처리중...' className='h-screen' />}>
      <KakaoOAuthContainer />
    </Suspense>
  );
};

export default KakaoOAuthPage;
