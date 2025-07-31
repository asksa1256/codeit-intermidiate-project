import { ReactNode } from 'react';

import { cn } from '@/utils/style';

interface Props {
  title: string;
  description: string;
  children?: ReactNode;
  className?: string;
}

const LandingPageCard = ({ title, description, children, className }: Props) => {
  return (
    <section
      className={cn(
        'relative whitespace-pre-wrap overflow-hidden bg-[#ebeef4] bg-linear-to-t border border-[#e0e6ee] max-w-160 h-106 md:h-80 rounded-2xl pt-6 md:pt-14 pl-6 my-12 md:my-24 mx-auto',
        className,
      )}
    >
      <div className='flex flex-col gap-2'>
        <h2 className='text-lg md:text-[22px] md:leading-8 font-bold'>{title}</h2>
        <p className='text-xs text-gray-500 leading-4'>{description}</p>
      </div>
      {children}
    </section>
  );
};

export default LandingPageCard;
