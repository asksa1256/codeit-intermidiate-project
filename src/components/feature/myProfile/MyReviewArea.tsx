'use client';

import Link from 'next/link';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import MyListLoading from '@/components/feature/myProfile/MyListLoading';
import MyReviewList from '@/components/feature/myProfile/MyReviewList';
import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import EmptyList from '@/components/ui/EmptyList';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiClient } from '@/lib/api/apiClient';
import useToastStore from '@/stores/toastStore';
import { MyReviewItemType, MyReviewListType } from '@/types/reviewTypes';

const TEAM = process.env.NEXT_PUBLIC_TEAM;
const DEFAULT_LIMIT = 10;

const fetchReviewList = async (cursor: number | null): Promise<MyReviewListType> => {
  const cursorQuery = cursor ? `&cursor=${cursor}` : '';
  const res = await apiClient.get(`/${TEAM}/users/me/reviews?limit=${DEFAULT_LIMIT}${cursorQuery}`);
  return res.data;
};

const MyReviewArea = () => {
  const addToast = useToastStore((state) => state.addToast);
  const [reviewList, setReviewList] = useState<MyReviewItemType[] | null>(null);
  const [cursor, setCursor] = useState<number | null>(0);
  const [totalCount, setTotalCount] = useState<number>(0);
  const [isLoading, setIsLoading] = useState(false);
  const isListEmpty = reviewList?.length === 0;

  const getReviewList = async () => {
    if (cursor === null) return;
    if (isLoading) return;

    try {
      setIsLoading(true);

      const data = await fetchReviewList(cursor);
      const { list, nextCursor, totalCount } = data;

      setReviewList((prev) => (prev === null ? list : [...prev, ...list]));
      setTotalCount(totalCount);
      setCursor(nextCursor);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  const targetRef = useIntersectionObserver(getReviewList);

  useEffect(() => {
    getReviewList();
  }, []);

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await apiClient.delete(`/${TEAM}/reviews/${reviewId}`);

      setReviewList((prev) => {
        if (prev === null) return prev;
        return prev.filter((review) => review.id !== reviewId);
      });
      setTotalCount((totalCount) => totalCount - 1);
      addToast({ message: '리뷰 삭제 성공', type: 'success', duration: 2000 });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        addToast({
          message: '본인이 작성한 리뷰만 삭제 가능합니다.',
          type: 'error',
          duration: 2000,
        });
        return;
      }

      addToast({ message: '리뷰 삭제 실패', type: 'error', duration: 2000 });
      throw error;
    }
  };

  // 리뷰 수정
  const handleEditReview = async (
    reviewId: number,
    formValues: ReviewFormValues,
  ): Promise<void> => {
    try {
      const res = await apiClient.patch(`/${TEAM}/reviews/${reviewId}`, formValues);

      // 리뷰리스트 스키마와 동일한 스키마로 만들어주기 위해 teamId, wineId값 제외하고 적용
      const {
        id,
        rating,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma,
        content,
        createdAt,
        updatedAt,
        user,
      } = res.data;

      const updateData = {
        id,
        rating,
        lightBold,
        smoothTannic,
        drySweet,
        softAcidic,
        aroma,
        content,
        createdAt,
        updatedAt,
        user,
      };

      setReviewList((prev) => {
        if (prev === null) return prev;
        return prev.map((review) =>
          review.id === reviewId ? { ...review, ...updateData } : review,
        );
      });
      addToast({ message: '리뷰 수정 성공', type: 'success', duration: 2000 });
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        addToast({
          message: '본인이 작성한 리뷰만 수정 가능합니다.',
          type: 'error',
          duration: 2000,
        });
        return;
      }

      addToast({ message: '리뷰 수정 실패', type: 'error', duration: 2000 });
      throw error;
    }
  };

  // 데이터 로딩시
  if (reviewList === null) return <MyListLoading />;

  return (
    <>
      <span className='rounded-2xl absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      <div>
        {isListEmpty ? (
          <EmptyList desc='작성된 리뷰가 없어요'>
            <Link
              href='/keyboards'
              className='inline-flex items-center justify-center px-[15px] h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'
            >
              키보드 구경 하러 가기
            </Link>
          </EmptyList>
        ) : (
          <MyReviewList
            reviewList={reviewList}
            onReviewDelete={handleDeleteReview}
            onReviewEdit={handleEditReview}
            endRef={targetRef}
            hasNextPage={reviewList.length !== totalCount && cursor !== null}
          />
        )}
      </div>
    </>
  );
};

export default MyReviewArea;
