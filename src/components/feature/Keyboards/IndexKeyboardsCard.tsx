// 목록 페이지의 키보드 카드 컴포넌트
import Link from 'next/link';

import React from 'react';

import CustomRightArrowIcon from '@/components/ui/Icon/CustomRightArrowIcon';
import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import StarRating from '@/components/ui/StarRating';
import { formatRating } from '@/utils/formatters';

import type { KeyboardItemRecentReview } from '@/types/keyboardTypes';

interface IndexKeyboardsCardProps {
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: KeyboardItemRecentReview | null;
  keyboardId: number;
}

const IndexKeyboardsCard = ({
  name,
  region,
  image,
  price,
  reviewCount,
  avgRating,
  recentReview,
  keyboardId,
}: IndexKeyboardsCardProps) => {
  return (
    <Link
      href={`/keyboards/${keyboardId}`}
      className='group block mb-5 border border-gray-300 rounded-xl md:rounded-2xl bg-white  hover:-translate-y-2 hover:shadow-primary hover:border-primary transition-all'
    >
      <div className='flex'>
        {/* 이미지 영역 */}
        <div className='w-[126px] px-3 shrink-0 self-center md:w-[160px] md:pl-0 md:self-end lg:w-[168px]'>
          <KeyboardThumbnail
            imgSrc={image}
            keyboardName={name}
            className='pt-[200%] md:w-[60%] md:ml-10 md:pt-[180%] lg:ml-12'
            ratioClass='w-[200%] aspect-[200/100] md:w-[250%] md:aspect-[250/100]'
          />
        </div>

        {/* 본문 컨텐츠 */}
        <div className='pt-[30px] pr-5 pb-7 grow md:flex md:gap-[45px] md:pt-10 md:pr-10 md:pb-6 lg:pt-9 lg:pr-[53px] lg:pb-6 lg:gap-[70px]'>
          <div className='grow-1'>
            <h3 className='text-xl font-semibold line-clamp-2 md:mb-5 md:text-3xl'>{name}</h3>
            <span className='block mb-2 text-md text-gray-500 md:mb-3 md:text-base lg:mb-4'>
              {region}
            </span>
            <RatingAndPrice
              label='price'
              value={price}
              className='rounded-[10px] py-[2.5px] px-[10px] md:rounded-xl md:py-[8px] md:px-[15px]'
            />
          </div>

          <div className='flex items-center gap-[15px] mt-[22px] md:shrink-0 md:flex-col md:items-start md:mt-0 md:gap-[10px]'>
            <strong className='text-[28px] font-extrabold md:text-5xl'>
              {formatRating(avgRating)}
            </strong>
            <div className='md:mb-[10px]'>
              <StarRating value={avgRating} className='w-[14px] md:w-6' />
              <div className='mt-[5px] text-xs text-gray-500 md:mt-[10px] md:text-md'>
                {reviewCount}개의 후기
              </div>
            </div>
            <div className='ml-auto md:mt-auto w-[32px] md:w-[36px]'>
              <CustomRightArrowIcon className=' text-gray-300 transition-all -translate-x-2 group-hover:translate-x-2 group-hover:text-primary' />
            </div>
          </div>
        </div>
      </div>

      {/* 최신 후기 영역 */}
      <div className='border-t border-gray-300 py-[7px] px-5 text-md md:py-5 md:px-10 md:text-base lg:px-12'>
        {recentReview ? (
          <>
            <h4 className='mb-2 font-semibold'>최신 후기</h4>
            <p className='text-gray-500 line-clamp-3'>{recentReview.content}</p>
          </>
        ) : (
          <p className='py-3 text-gray-600 text-center'>최신 후기가 없습니다.</p>
        )}
      </div>
    </Link>
  );
};

export default IndexKeyboardsCard;
