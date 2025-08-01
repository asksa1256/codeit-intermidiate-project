import Image from 'next/image';

import { ReactNode } from 'react';

interface Props {
  children: ReactNode;
}

const InfoGuide = ({ children }: Props) => {
  return (
    <div className='relative group'>
      <Image
        src='/images/InfoIcon.svg'
        width={20}
        height={20}
        alt='키보드 사진 가이드'
        className='cursor-pointer'
      />
      <div className='hidden absolute top-0 left-[calc(100%+10px)] p-4 border border-gray-300 rounded-2xl bg-white whitespace-nowrap z-10 shadow-[0_4px_20px_0_rgba(0,0,0,0.08)] group-hover:block'>
        {children}
      </div>
    </div>
  );
};

export default InfoGuide;
