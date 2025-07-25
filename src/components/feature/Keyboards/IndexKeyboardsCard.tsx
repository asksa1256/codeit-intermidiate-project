// 목록 페이지의 키보드 카드 컴포넌트
import Image from 'next/image';

import React from 'react';

import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import StarRating from '@/components/ui/StarRating';

import type { KeyboardItemRecentReview } from '@/types/keyboardTypes';

interface IndexKeyboardsCardProps {
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: KeyboardItemRecentReview | null;
}

const IndexKeyboardsCard = ({
  name,
  region,
  image,
  price,
  reviewCount,
  avgRating,
  recentReview,
}: IndexKeyboardsCardProps) => {
  return (
    <div className='w-[343px] h-[360px] p-4 rounded-xl border border-gray-300 shadow-sm flex flex-col bg-white'>
      {/* 이미지 */}
      <div className='w-[150px] h-[150px] overflow-hidden relative rounded-lg'>
        <KeyboardThumbnail
          imgSrc={image}
          keyboardName={name}
          ratioClass='w-[70%] aspect-[70/100]'
        />
      </div>
      {/* 키보드명 */}
      <h3 className='text-xl font-semibold text-gray-800 line-clamp-2 mb-2 truncate'>{name}</h3>
      {/* 제조사 */}
      <div className='text-xs text-gray-500 mb-2'>{region}</div>
      {/* 가격 */}
      <span className='inline-flex w-auto'>
        <RatingAndPrice label='price' value={price} />
      </span>
      <div className='flex items-center justify-between'>
        {/* 왼쪽: 평점 숫자, 별점, 리뷰 개수 */}
        <div className='flex items-center gap-2'>
          {/* 평점 숫자 */}
          <div className='text-lg font-bold'>{avgRating}</div>

          {/* 별점 5개 */}
          <StarRating value={avgRating} />

          {/* 리뷰 개수 */}
          <div className='text-xs text-gray-500'>{reviewCount}개의 후기</div>
        </div>

        {/* 오른쪽: 화살표 아이콘 */}
        <Image
          src='/images/RightArrowIcon.svg'
          alt='오른쪽 이동'
          width={20}
          height={20}
          className='cursor-pointer'
        />
      </div>
      {/* 최근 리뷰 */}
      <div className='mt-2 pt-2 border-t border-gray-300'>
        {recentReview ? (
          <div className='text-xs text-gray-600 mb-2'>
            <span className='font-semibold'>최신 후기:</span> {recentReview.content}
          </div>
        ) : (
          <div className='text-xs text-gray-600 mb-2'>최신 후기가 없습니다.</div>
        )}
      </div>
    </div>
  );
};

export default IndexKeyboardsCard;
