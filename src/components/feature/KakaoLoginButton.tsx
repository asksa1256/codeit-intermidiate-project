import Image from 'next/image';

import ButtonDefault from '@/components/ui/ButtonDefault';
import { KAKAO_REST_API_KEY } from '@/constants';

const KakaoLoginButton = () => {
  const handleLogin = () => {
    const currentOrigin = window.location.origin;
    const REDIRECT_URI = `${currentOrigin}/oauth/kakao`;
    window.location.href = `https://kauth.kakao.com/oauth/authorize?client_id=${KAKAO_REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;
  };

  return (
    <ButtonDefault
      onClick={handleLogin}
      className='w-full bg-white border border-gray-300 sm:rounded-xl hover:border-[#FEE500] hover:bg-[#FEE500]'
    >
      <span className='relative w-6 h-6 rounded-full'>
        <Image src='/images/KakaoIcon.svg' alt='카카오톡 로고' fill={true} />
      </span>
      <span className='text-gray-800 text-sm md:text-base'>카카오로 시작하기</span>
    </ButtonDefault>
  );
};

export default KakaoLoginButton;
