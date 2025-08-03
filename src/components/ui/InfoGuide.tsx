'use client';

import Image from 'next/image';

import { ReactNode, useState } from 'react';

import useOutsideClick from '@/hooks/useClickOutside';
import useWindowWidth from '@/hooks/useWindowWidth';
import { cn } from '@/utils/style';

interface Props {
  children: ReactNode;
}

const InfoGuide = ({ children }: Props) => {
  const innerWidth = useWindowWidth();
  const [isShow, setIsShow] = useState(false);
  const isWeb = innerWidth >= 1280;
  const handleClickHidden = () => {
    if (isWeb) return;
    setIsShow(false);
  };
  const ref = useOutsideClick(handleClickHidden);

  const handleClickToggle = () => {
    if (isWeb) return;
    setIsShow((prev) => !prev);
  };

  return (
    <>
      {isShow && (
        <div className={cn('fixed top-0 left-0 right-0 bottom-0', isWeb ? 'hidden' : '')} />
      )}
      <div className='relative group' ref={ref}>
        <Image
          src='/images/InfoIcon.svg'
          width={20}
          height={20}
          alt='키보드 사진 가이드'
          className='cursor-pointer'
          onClick={handleClickToggle}
        />
        <div
          className={cn(
            'hidden absolute top-0 left-[calc(100%+10px)] p-4 border border-gray-300 rounded-2xl bg-white whitespace-nowrap z-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)]',
            isWeb ? 'group-hover:block' : '',
            isShow ? 'block' : '',
          )}
        >
          {children}
        </div>
      </div>
    </>
  );
};

export default InfoGuide;
