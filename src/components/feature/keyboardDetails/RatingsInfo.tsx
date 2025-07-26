'use client';
import { useCallback, useEffect, useRef, useState } from 'react';

import { KeyboardItemType } from '@/types/keyboardTypes';
import { formatPrice, formatRating } from '@/utils/formatters';
import { cn } from '@/utils/style';

import ButtonDefault from '../../ui/ButtonDefault';
import RatingRangeBars from '../../ui/RangeSlider/RatingRangeBars';
import StarRating from '../../ui/StarRating';

interface Props {
  keyboardInfo: KeyboardItemType;
}

const RatingsInfo = ({ keyboardInfo }: Props) => {
  const [isFixedOnTop, setIsFixedOnTop] = useState(false);
  const stickyRef = useRef<HTMLElement | null>(null);
  const { avgRating, reviewCount, avgRatings } = keyboardInfo;

  const handleScroll = useCallback(() => {
    const rect = stickyRef.current?.getBoundingClientRect();
    const THRESHOLD = 1;

    if (!rect) {
      return;
    }

    if (rect.y < THRESHOLD) {
      setIsFixedOnTop(true);
    } else {
      setIsFixedOnTop(false);
    }
  }, []);

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [handleScroll]);

  if (reviewCount === 0) {
    return;
  }

  return (
    <section
      ref={stickyRef}
      className={cn(
        'sticky top-0 lg:order-1 bg-white lg:shadow-none pt-5 pb-[10px] px-4 lg:p-0 lg:pt-5 -mx-5 lg:m-0 z-1',
        {
          'shadow-[0_5px_10px_rgba(0,0,0,0.04)]': isFixedOnTop,
        },
      )}
    >
      <div className='flex flex-col md:flex-row lg:flex-col lg:items-start md:items-center md:justify-between gap-6 lg:gap-[20px] md:max-w-200 md:px-21 md:mx-auto'>
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
          <ButtonDefault className='text-md md:text-base font-medium w-25 md:w-28 h-10 md:h-[42px] px-[18px] py-4 rounded-xl lg:hidden'>
            리뷰 남기기
          </ButtonDefault>
        </div>
        <RatingRangeBars reviewCount={reviewCount} avgRatings={avgRatings} />
        <ButtonDefault className='text-md md:text-base font-medium w-25 md:w-28 h-10 md:h-[42px] px-[18px] py-4 rounded-xl hidden lg:flex'>
          리뷰 남기기
        </ButtonDefault>
      </div>
    </section>
  );
};

export default RatingsInfo;
