'use client';
import Link from 'next/link';

import useSticky from '@/hooks/useSticky';
import { cn } from '@/utils/style';

import UserThumbnail from '../ui/UserThumbnail';

interface HeaderProps {
  loginStatus?: boolean;
  imgSrc?: string | null;
}

const STICKY_TOP = 0;

const HeaderComponent = ({ loginStatus = false, imgSrc = null }: HeaderProps) => {
  const { isFixedOnTop, stickyRef } = useSticky(STICKY_TOP);

  return (
    <header
      ref={stickyRef}
      className={cn(
        'flex sticky top-0 text-white transition-all duration-300 ease-in-out lg:w-285 bg-black rounded-xl md:rounded-2xl h-[50px] md:h-[70px] mx-4 lg:mx-auto my-5 px-5 md:px-15 z-999',
        {
          'rounded-none md:rounded-none lg:w-full px-9 md:px-19 mx-0': isFixedOnTop,
        },
      )}
    >
      <div className='flex items-center justify-between w-full lg:w-255 mx-auto'>
        <Link href='/' className='font-bold text-xl'>
          tadak
        </Link>
        <div className='flex items-center gap-5 md:gap-10 font-medium text-md md:text-base'>
          {loginStatus ? (
            <UserThumbnail imgSrc={imgSrc} />
          ) : (
            <>
              <Link href='/login'>로그인</Link>
              <Link href='/signUp'>회원가입</Link>
            </>
          )}
        </div>
      </div>
    </header>
  );
};

export default HeaderComponent;
