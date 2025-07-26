'use client';

import Link from 'next/link';

import { useEffect, useState } from 'react';

import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import EmptyList from '@/components/ui/EmptyList';
import { apiClient } from '@/lib/api/apiClient';
import { MyReviewItemType, MyReviewListType } from '@/types/reviewTypes';

const TEAM = process.env.NEXT_PUBLIC_TEAM;
const DEFAULT_LIMIT = 10;

const MyReviewList = () => {
  const [reviewList, setReviewList] = useState<MyReviewItemType[] | null>(null);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const getReviewList = async () => {
      try {
        const res = await apiClient.get(`/${TEAM}/users/me/reviews?limit=${DEFAULT_LIMIT}`);
        const data: MyReviewListType = res.data;
        const { list, nextCursor, totalCount } = data;

        setReviewList(list);
        setTotalCount(totalCount);
        setNextCursor(nextCursor);
      } catch (error) {
        console.error(error);
      }
    };

    getReviewList();
  }, []);

  return (
    <>
      <span className='rounded-2xl absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      <div>
        {!reviewList ? (
          <EmptyList desc='작성된 리뷰가 없어요'>
            <Link
              href='/keyboards'
              className='inline-flex items-center justify-center px-[15px] h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'
            >
              키보드 구경 하러 가기
            </Link>
          </EmptyList>
        ) : (
          <ul>
            {reviewList.map((review) => (
              <MyReviewItem key={review.id} review={review} />
            ))}
          </ul>
        )}
      </div>
    </>
  );
};

export default MyReviewList;
