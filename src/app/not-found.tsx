'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

const NotFound = () => {
  const router = useRouter();
  const [counter, setCounter] = useState<number>(3);

  useEffect(() => {
    if (counter <= 0) return;

    const intervalCounter = setInterval(() => {
      setCounter((prev) => prev - 1);
    }, 1000);

    return () => {
      clearInterval(intervalCounter);
    };
  }, [counter]);

  useEffect(() => {
    if (counter === 1) router.push('/');
  }, [router, counter]);

  return (
    <section className='flex flex-col items-center justify-center h-screen bg-gray-100 text-center'>
      <h2 className='text-7xl leading-none mb-6 text-primary font-bold fade-up fade-up-delay-1 bg-gradient-to-r from-[#8642db] to-[#f1e0fc] bg-clip-text text-transparent'>
        404 Not Found
      </h2>
      <p className='text-[--color-gray-500] mb-6 fade-up fade-up-delay-2'>
        페이지를 찾을 수 없어요! <br />
        <span className='font-medium text-[--color-primary]'>{counter}초 뒤 메인 페이지</span>로
        이동합니다.
      </p>
    </section>
  );
};

export default NotFound;
