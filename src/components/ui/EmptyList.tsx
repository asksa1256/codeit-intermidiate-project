import Image from 'next/image';

import { ReactNode } from 'react';

import { cn } from '@/utils/style';

interface Props {
  desc: string;
  children?: ReactNode;
  className?: string;
}

const EmptyList = ({ desc, children, className }: Props) => {
  const defaultStyle = 'flex items-center justify-center flex-col min-h-[375px] md:min-h-[442px]';
  const mergedClassName = cn(defaultStyle, className);

  return (
    <div className={mergedClassName}>
      <Image
        src='/images/EmptyListIcon.svg'
        alt='데이터가 없습니다'
        width={136}
        height={136}
        className='w-[100px] h-auto md:w-[136px]'
      />
      <p className='mt-8  text-gray-500 text-center md:mt-6 md:text-lg'>{desc}</p>
      {children && <div className='mt-10 md:mt-12'>{children}</div>}
    </div>
  );
};

export default EmptyList;
