'use client';

import { useParams } from 'next/navigation';

import { useEffect, useState } from 'react';

import KeyboardInfoCard from '@/components/feature/keyboardDetails/KeyboardInfoCard';
import RatingsInfo from '@/components/feature/keyboardDetails/RatingsInfo';
import ReviewList from '@/components/feature/keyboardDetails/ReviewList';
import { apiClient } from '@/lib/api/apiClient';
import { KeyboardDetailType } from '@/types/keyboardTypes';

const KeyboardDetailsPage = () => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardDetailType | null>(null);
  const params = useParams();
  const { keyboardid } = params;
  console.log(keyboardid);

  const getKeyboardInfo = async () => {
    try {
      const res = await apiClient(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${keyboardid}`);
      setKeyboardInfo(res.data);
    } catch (e) {
      console.log('키보드 상세 데이터 받아오기 실패');
      throw e;
    }
  };

  useEffect(() => {
    getKeyboardInfo();
  }, []);

  if (!keyboardInfo) {
    return;
  }

  return (
    <main className='max-w-285 px-4 pt-[30px] pb-10 md:px-5 lg:px-0 md:pt-10 md:pb-20 lg:pt-10 lg:mx-auto'>
      <KeyboardInfoCard keyboardInfo={keyboardInfo} />
      <div className='lg:flex lg:items-start lg:gap-15 lg:justify-between'>
        <RatingsInfo keyboardInfo={keyboardInfo} />
        <ReviewList reviewList={keyboardInfo['reviews']} />
      </div>
    </main>
  );
};

export default KeyboardDetailsPage;
