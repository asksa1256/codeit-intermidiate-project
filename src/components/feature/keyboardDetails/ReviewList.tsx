'use client';
import { Dispatch, SetStateAction, useState } from 'react';

import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { KeyboardDetailType } from '@/types/keyboardTypes';

import ReviewCard from './ReviewCard';

interface Props {
  keyboardInfo: KeyboardDetailType;
  onCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  updateTrigger: Dispatch<SetStateAction<number>>;
}

const LIMIT = 10;

const ReviewList = ({ keyboardInfo, onCreateModalOpen, updateTrigger }: Props) => {
  const [cursor, setCursor] = useState(LIMIT);
  const [isLoading, setIsLoading] = useState(false);
  const reviewList = keyboardInfo.reviews;
  const maxCursor = reviewList.length;
  const loadMoreReview = () => {
    if (cursor >= maxCursor) {
      return;
    }
    setIsLoading(true);
    setTimeout(() => {
      setCursor((prev) => prev + LIMIT);
      setIsLoading(false);
    }, 500);
  };

  const observingRef = useIntersectionObserver(loadMoreReview);

  return (
    <section className='flex flex-col lg:grow-1 items-center lg:items-start gap-4 md:gap-6 lg:gap-5 mt-[10px] md:mt-[18px] lg:mt-0'>
      <div className='hidden lg:block text-xl font-bold mt-5 mb-[10px]'>리뷰 목록</div>
      {reviewList[0] ? (
        reviewList.map((review, idx) => {
          if (cursor <= idx) {
            return;
          }
          return (
            <ReviewCard
              key={review.id}
              review={review}
              keyboardName={keyboardInfo.name}
              updateTrigger={updateTrigger}
            />
          );
        })
      ) : (
        <div className='lg:mt-38 lg:w-275 mb-30 lg:mb-63'>
          <EmptyList desc='작성된 리뷰가 없어요'>
            <ButtonDefault
              className='font-medium w-34 md:w-42 h-12 px-7 py-[14px] rounded-xl'
              onClick={() => {
                onCreateModalOpen(true);
              }}
            >
              리뷰 남기기
            </ButtonDefault>
          </EmptyList>
        </div>
      )}
      {isLoading ? (
        <LoadingSpinner className='w-full my-8' />
      ) : (
        <div ref={observingRef} className='h-25' />
      )}
    </section>
  );
};

export default ReviewList;
