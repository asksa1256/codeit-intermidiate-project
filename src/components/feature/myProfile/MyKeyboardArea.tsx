'use client';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import MyKeyboardList from '@/components/feature/myProfile/MyKeyboardList';
import MyListLoading from '@/components/feature/myProfile/MyListLoading';
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
  const isListEmpty = keyboardList?.length === 0;

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

  const handleDeleteKeyboard = async (keyboardId: number) => {
    try {
      await apiClient.delete(`/${TEAM}/wines/${keyboardId}`);

      setKeyboardList((prev) => {
        if (prev === null) return prev;
        return prev.filter((keyboard) => keyboard.id !== keyboardId);
      });
      setTotalCount((totalCount) => totalCount - 1);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        alert('삭제 권한이 없습니다.');
        return;
      }

      alert('키보드 삭제에 실패 하였습니다.');
      throw error;
    }
  };

  console.log(nextCursor);

  // 데이터 로딩시
  if (keyboardList === null) return <MyListLoading />;

  return (
    <>
      <span className='absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      {isListEmpty ? (
        <EmptyList desc='등록된 키보드가 없어요.'>
          <ButtonDefault className='inline-flex items-center justify-center px-[15px] w-auto h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'>
            키보드 등록 하기
          </ButtonDefault>
        </EmptyList>
      ) : (
        <MyKeyboardList keyboardList={keyboardList} onDelete={handleDeleteKeyboard} />
      )}
    </>
  );
};

export default MyKeyboardArea;
