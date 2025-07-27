import Link from 'next/link';

import UserThumbnail from '../ui/UserThumbnail';

interface HeaderProps {
  loginStatus?: boolean;
  imgSrc?: string | null;
}

const HeaderComponent = ({ loginStatus = false, imgSrc = null }: HeaderProps) => {
  return (
    <header className='mx-auto my-5 flex  items-center justify-between bg-black rounded-2xl	 text-white md:px-[79px] md:py-[25px] '>
      <Link href='/' className='font-bold text-xl'>
        tadak
      </Link>
      <div className='flex items-center gap-10 font-medium'>
        {loginStatus ? (
          <UserThumbnail imgSrc={imgSrc} />
        ) : (
          <>
            {' '}
            <Link href='/login'>로그인</Link>
            <Link href='/signUp'>회원가입</Link>
          </>
        )}
      </div>
    </header>
  );
};

export default HeaderComponent;
