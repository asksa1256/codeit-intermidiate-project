// 목록 페이지의 키보드 카드 컴포넌트
import Image from 'next/image';

import React from 'react';

import RatingAndPrice from '@/components/ui/RatingAndPrice';
import StarRating from '@/components/ui/StarRating';

interface IndexKeyboardsCardProps {
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const IndexKeyboardsCard = (props: IndexKeyboardsCardProps) => {
  const { name, region, image, price, avgRating, reviewCount, recentReview } = props;
  return (
    <div className='w-[343px] h-[360px] p-4 rounded-xl border border-gray-300 shadow-sm flex flex-col bg-white'>
      {/* 이미지 */}
      <div className='w-[70px] h-[212px] rounded-md overflow-hidden mb-4'>
        <Image src={image} alt={name} width={500} height={500} className='object-cover' />
      </div>
      {/* 이름 */}
      <h3 className='text-xl font-semibold text-gray-800 line-clamp-2 mb-2'>{name}</h3>
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
      {recentReview ? (
        <div className='text-xs text-gray-600 mb-2'>
          <span className='font-semibold'>최신 후기:</span> {recentReview.content}
        </div>
      ) : (
        <div className='text-xs text-gray-600 mb-2'>최신 후기가 없습니다.</div>
      )}
    </div>
  );
};

export default IndexKeyboardsCard;
