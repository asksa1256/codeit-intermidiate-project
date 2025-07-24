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
    <div className='w-[343px] h-[390px] p-4 rounded-xl border border-gray-300 shadow-sm flex flex-col bg-white'>
      {/* 이미지 */}
      <div className='w-[70px] h-[212px] rounded-md overflow-hidden mb-4'>
        <Image src={image} alt={name} width={500} height={500} className='object-cover' />
      </div>
      {/* 이름 */}
      <h3 className='text-xl font-semibold text-gray-800 line-clamp-2 mb-2'>{name}</h3>
      {/* 제조사 */}
      <div className='text-xs text-gray-500 mb-2'>{region}</div>
      {/* 가격 */}
      <div className='inline-flex w-auto'>
        <RatingAndPrice label='price' value={price} />
      </div>
      {/* 평점 */}
      <div className='mb-2'>{avgRating}</div>
      {/* 별점 5개 */}
      <StarRating value={avgRating} />
      {/* 리뷰 개수 */}
      <div className='text-xs text-gray-500 mb-2'>{reviewCount}개의 후기</div>
      {/* 최근 리뷰 */}
      {recentReview ? (
        <div className='text-xs text-gray-600 mb-2'>
          <span className='font-semibold'>최근 리뷰:</span> {recentReview.content}
        </div>
      ) : (
        <div className='text-xs text-gray-600 mb-2'>최근 리뷰가 없습니다.</div>
      )}
    </div>
  );
};

export default IndexKeyboardsCard;
