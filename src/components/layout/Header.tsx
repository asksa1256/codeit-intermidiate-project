'use client';
import Link from 'next/link';

import { useShallow } from 'zustand/shallow';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import UserThumbnail from '@/components/ui/UserThumbnail';
import useSticky from '@/hooks/useSticky';
import { tokenService } from '@/lib/api/tokenService';
import useAuthStore from '@/stores/authStore';
import { cn } from '@/utils/style';

interface HeaderProps {
  imgSrc?: string | null;
}

const STICKY_TOP = 0;

const HeaderComponent = ({ imgSrc = null }: HeaderProps) => {
  const { isFixedOnTop, stickyRef } = useSticky(STICKY_TOP);
  const { user, signOut } = useAuthStore(
    useShallow((state) => ({
      user: state.user,
      signOut: state.signOut,
    })),
  );

  const handleSignOut = () => {
    signOut(); // user 전역 상태 초기화
    tokenService.clearTokens(); // 토큰 제거
  };

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
          {user ? (
            <Dropdown className='flex'>
              <Dropdown.Trigger>
                <UserThumbnail
                  imgSrc={user.image ?? imgSrc}
                  className='w-6 h-6 md:w-11 md:h-11 border-0'
                />
              </Dropdown.Trigger>
              <Dropdown.List className='mt-10 md:mt-13'>
                <Dropdown.Item variant='link' href='/myprofile'>
                  마이페이지
                </Dropdown.Item>
                <Dropdown.Item onClick={handleSignOut}>로그아웃</Dropdown.Item>
              </Dropdown.List>
            </Dropdown>
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
