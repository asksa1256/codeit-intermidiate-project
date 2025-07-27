'use client';

import { useEffect, useState } from 'react';

import MyKeyboardList from '@/components/feature/myProfile/MyKeyboardList';
import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import { apiClient } from '@/lib/api/apiClient';
import { MyKeyboardItemType, MyKeyboardListType } from '@/types/keyboardTypes';

const TEAM = process.env.NEXT_PUBLIC_TEAM;
const DEFAULT_LIMIT = 10;

const MyKeyboardArea = () => {
  const [keyboardList, setKeyboardList] = useState<MyKeyboardItemType[] | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [nextCursor, setNextCursor] = useState<number | null>(null);

  useEffect(() => {
    const getReviewList = async () => {
      try {
        const res = await apiClient.get(`/${TEAM}/users/me/wines?limit=${DEFAULT_LIMIT}`);
        const data: MyKeyboardListType = res.data;
        const { list, nextCursor, totalCount } = data;

        setKeyboardList(list);
        setTotalCount(totalCount);
        setNextCursor(nextCursor);
      } catch (error) {
        console.error(error);
      }
    };

    getReviewList();
  }, []);

  if (keyboardList === null) {
    return (
      <div className='flex items-center justify-center h-[50vh]'>
        <div className=' w-8 h-8 border-4 mb-4 border-gray-300 border-t-primary rounded-full animate-spin' />
      </div>
    );
  }

  const isListEmpty = keyboardList.length === 0;

  return (
    <>
      <span className='absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      {isListEmpty ? (
        <EmptyList desc='등록된 키보드가 없어요.'>
          {/* [ ] onClick시 키보드 등록 모달 열기 */}
          <ButtonDefault className='inline-flex items-center justify-center px-[15px] w-auto h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'>
            키보드 등록 하기
          </ButtonDefault>
        </EmptyList>
      ) : (
        <MyKeyboardList keyboardList={keyboardList} />
      )}
    </>
  );
};

export default MyKeyboardArea;
