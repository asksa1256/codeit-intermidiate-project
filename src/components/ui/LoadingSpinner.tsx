'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import { cn } from '@/utils/style';

interface LoadingSpinnerProps {
  text?: string;
  className?: string;
}

const LoadingSpinner = ({ text, className }: LoadingSpinnerProps) => {
  const [showHintMsg, setShowHintMsg] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const timer = setTimeout(() => {
      setShowHintMsg(true);
    }, 5000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <section className={cn('flex flex-col items-center justify-center', className)}>
      <div className='w-8 h-8 border-4 border-gray-300 border-t-primary rounded-full animate-spin' />
      {text && <p className='mt-4'>{text}</p>}
      {showHintMsg && (
        <p>
          요청이 지연되고 있어요.
          <button
            onClick={() => router.refresh()}
            className='text-md bg-primary-10 text-primary font-bold px-3 py-1 rounded-xl'
          >
            새로고침
          </button>
        </p>
      )}
    </section>
  );
};

export default LoadingSpinner;
