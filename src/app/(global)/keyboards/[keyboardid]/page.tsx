'use client';

import { useParams } from 'next/navigation';

import { useCallback, useEffect, useState } from 'react';

import KeyboardInfoCard from '@/components/feature/keyboardDetails/KeyboardInfoCard';
import RatingsInfo from '@/components/feature/keyboardDetails/RatingsInfo';
import ReviewList from '@/components/feature/keyboardDetails/ReviewList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import { apiClient } from '@/lib/api/apiClient';
import { KeyboardDetailType } from '@/types/keyboardTypes';

const KeyboardDetailsPage = () => {
  const [keyboardInfo, setKeyboardInfo] = useState<KeyboardDetailType | null>(null);
  // const [reviewList,setReviewList] = useState([]);
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const params = useParams();
  const { keyboardid } = params;

  const getKeyboardInfo = useCallback(async () => {
    try {
      setIsLoading(true);
      const res = await apiClient(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${keyboardid}`);
      setKeyboardInfo(res.data);
    } catch (e) {
      console.log('키보드 상세 데이터 받아오기 실패');
      throw e;
    } finally {
      setIsLoading(false);
    }
  }, [keyboardid]);

  //patch, delete등의 정보 수정이 일어나면 다시 데이터fetch
  useEffect(() => {
    getKeyboardInfo();
  }, [getKeyboardInfo, updateTrigger]);

  if (!keyboardInfo) {
    return;
  }

  return (
    <main className='lg:max-w-285 px-4 pt-[30px] pb-10 md:px-5 lg:px-0 md:pt-10 md:pb-20 lg:pt-10 lg:mx-auto'>
      {isLoading ? (
        <LoadingSpinner />
      ) : (
        <>
          <KeyboardInfoCard keyboardInfo={keyboardInfo} />
          <div className='lg:flex lg:items-start lg:gap-15 lg:justify-between'>
            <RatingsInfo keyboardInfo={keyboardInfo} updateTrigger={setUpdateTrigger} />
            <ReviewList keyboardInfo={keyboardInfo} updateTrigger={setUpdateTrigger} />
          </div>
        </>
      )}
    </main>
  );
};

export default KeyboardDetailsPage;
