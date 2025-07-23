import Image from 'next/image';

import ButtonDefault from '@/components/ui/ButtonDefault';

const KakaoLoginButton = () => {
  const REST_API_KEY = process.env.NEXT_PUBLIC_KAKAO_APP_KEY;
  const REDIRECT_URI = process.env.NEXT_PUBLIC_KAKAO_REDIRECT_URI;
  const KAKAO_AUTH_URL = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const handleLogin = () => {
    window.location.href = KAKAO_AUTH_URL;
  };

  return (
    <ButtonDefault onClick={handleLogin} className='w-full btn-outlined'>
      <span className='relative w-6 h-6 rounded-full'>
        <Image src='/images/KakaoIcon.svg' alt='카카오톡 로고' fill={true} />
      </span>
      <span className='text-gray-800 text-sm md:text-base'>카카오로 시작하기</span>
    </ButtonDefault>
  );
};

export default KakaoLoginButton;
