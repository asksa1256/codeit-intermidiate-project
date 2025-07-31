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
  const [updateTrigger, setUpdateTrigger] = useState(0);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const params = useParams();
  const { keyboardid } = params;

  console.log(isCreateModalOpen);

  const getKeyboardInfo = useCallback(async () => {
    try {
      const res = await apiClient(`/${process.env.NEXT_PUBLIC_TEAM}/wines/${keyboardid}`);
      setKeyboardInfo(res.data);
    } catch (e) {
      console.log('키보드 상세 데이터 받아오기 실패');
      throw e;
    } finally {
    }
  }, [keyboardid]);

  //patch, delete등의 정보 수정이 일어나면 다시 데이터fetch
  useEffect(() => {
    getKeyboardInfo();
  }, [getKeyboardInfo, updateTrigger]);

  return (
    <main className='lg:max-w-285 px-4 pt-[30px] pb-10 md:px-5 lg:px-0 md:pt-10 md:pb-20 lg:pt-10 lg:mx-auto'>
      {!keyboardInfo ? (
        <div className='w-full pt-50 md:pt-100'>
          <LoadingSpinner />
        </div>
      ) : (
        <>
          <KeyboardInfoCard keyboardInfo={keyboardInfo} />
          <div className='lg:flex lg:items-start lg:gap-15 lg:justify-between'>
            <RatingsInfo
              keyboardInfo={keyboardInfo}
              isCreateModalOpen={isCreateModalOpen}
              onCreateModalOpen={setIsCreateModalOpen}
              updateTrigger={setUpdateTrigger}
            />
            <ReviewList
              keyboardInfo={keyboardInfo}
              onCreateModalOpen={setIsCreateModalOpen}
              updateTrigger={setUpdateTrigger}
            />
          </div>
        </>
      )}
    </main>
  );
};

export default KeyboardDetailsPage;
