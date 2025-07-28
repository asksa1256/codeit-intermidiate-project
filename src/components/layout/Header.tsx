'use client';
import Link from 'next/link';

import UserThumbnail from '@/components/ui/UserThumbnail';
import useSticky from '@/hooks/useSticky';
import useAuthStore from '@/stores/authStore';
import { cn } from '@/utils/style';

interface HeaderProps {
  imgSrc?: string | null;
}

const STICKY_TOP = 0;

const HeaderComponent = ({ imgSrc = null }: HeaderProps) => {
  const { isFixedOnTop, stickyRef } = useSticky(STICKY_TOP);
  const user = useAuthStore((state) => state.user);

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
        <Link
          href='/myprofile'
          className='flex items-center gap-5 md:gap-10 font-medium text-md md:text-base'
        >
          {user ? (
            <UserThumbnail imgSrc={user.image ?? imgSrc} className='w-11 h-11 border-0' />
          ) : (
            <>
              <Link href='/login'>로그인</Link>
              <Link href='/signUp'>회원가입</Link>
            </>
          )}
        </Link>
      </div>
    </header>
  );
};

export default HeaderComponent;
