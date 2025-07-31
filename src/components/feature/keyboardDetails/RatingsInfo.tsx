'use client';

import { Dispatch, SetStateAction } from 'react';

import ButtonDefault from '@/components/ui/ButtonDefault';
import RatingRangeBars from '@/components/ui/RangeSlider/RatingRangeBars';
import StarRating from '@/components/ui/StarRating';
import useSticky from '@/hooks/useSticky';
import { apiClient } from '@/lib/api/apiClient';
import { KeyboardDetailType } from '@/types/keyboardTypes';
import { formatPrice, formatRating } from '@/utils/formatters';
import { cn } from '@/utils/style';

import Modal from '../Modal';
import ReviewForm, { ReviewFormValues } from '../reviewForm/ReviewForm';

interface Props {
  keyboardInfo: KeyboardDetailType;
  isCreateModalOpen: boolean;
  onCreateModalOpen: Dispatch<SetStateAction<boolean>>;
  updateTrigger: Dispatch<SetStateAction<number>>;
}

const STICKY_TOP = 50;
const TABLET_STICKY_TOP = 70;

const RatingsInfo = ({
  keyboardInfo,
  isCreateModalOpen,
  onCreateModalOpen,
  updateTrigger,
}: Props) => {
  const { isFixedOnTop, stickyRef } = useSticky(STICKY_TOP, TABLET_STICKY_TOP);
  const { id, name, avgRating, reviewCount, avgRatings } = keyboardInfo;

  const handleCreateReview = async (formValues: ReviewFormValues) => {
    const reviewData = { ...formValues, wineId: id };
    try {
      await apiClient.post(`/${process.env.NEXT_PUBLIC_TEAM}/reviews`, reviewData);
      updateTrigger((prev) => prev + 1);
      onCreateModalOpen(false);
    } catch (e) {
      console.log('리뷰 작성 실패', e);
    }
  };

  return (
    <>
      {reviewCount ? (
        // z-index-5
        <section
          ref={stickyRef}
          className={cn(
            'sticky top-[50px] md:top-[70px] lg:order-1 bg-white lg:shadow-none pt-5 pb-[10px] px-4 lg:p-0 lg:pt-5 -mx-5 lg:m-0 z-5',
            {
              'shadow-[0_5px_10px_rgba(0,0,0,0.04)]': isFixedOnTop,
            },
          )}
        >
          <div className='flex flex-col md:flex-row lg:flex-col lg:items-start md:items-center md:justify-between gap-6 lg:gap-[20px] md:max-w-285 lg:max-w-200 md:px-21 lg:px-0 md:mx-auto'>
            <div className='flex justify-between items-center md:flex-wrap md:gap-y-5'>
              <div className='flex items-center gap-4 md:gap-5 md:grow-1 md:basis-[300px]'>
                <div className='text-4xl md:text-[54px] leading-[100%] font-extrabold'>
                  {formatRating(avgRating)}
                </div>
                <div className='flex flex-col gap-[5px]'>
                  <StarRating className='details-star' value={avgRating} />
                  <div className='text-md text-gray-500'>{formatPrice(reviewCount)}개의 후기</div>
                </div>
              </div>
              <ButtonDefault
                className='text-md md:text-base font-medium w-25 md:w-28 h-10 md:h-[42px] px-[18px] py-4 rounded-xl lg:hidden'
                onClick={() => {
                  onCreateModalOpen(true);
                }}
              >
                리뷰 남기기
              </ButtonDefault>
            </div>
            <RatingRangeBars reviewCount={reviewCount} avgRatings={avgRatings} />
            <ButtonDefault
              className='text-md md:text-base font-medium w-25 md:w-28 h-10 md:h-[42px] px-[18px] py-4 rounded-xl hidden lg:flex'
              onClick={() => {
                onCreateModalOpen(true);
              }}
            >
              리뷰 남기기
            </ButtonDefault>
          </div>
        </section>
      ) : undefined}
      {/* 리뷰 생성 모달 */}
      <Modal
        open={isCreateModalOpen}
        onClose={() => {
          onCreateModalOpen(false);
        }}
        size='lg'
        title='리뷰 등록'
      >
        <ReviewForm keyboardTitle={name} onSubmit={handleCreateReview} />
      </Modal>
    </>
  );
};

export default RatingsInfo;
