import Image from 'next/image';

import ButtonDefault from '@/components/ui/ButtonDefault';
import { KAKAO_AUTH_URL } from '@/constants';

const KakaoLoginButton = () => {
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
