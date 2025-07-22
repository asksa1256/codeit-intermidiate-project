// 목록 페이지의 키보드 카드 컴포넌트
import Image from 'next/image';

import React from 'react';

interface IndexKeyboardsCardProps {
  name: string;
  alt: string;
  price: string;
  rating: number;
  reviewCount: number;
  imageUrl: string;
}

const IndexKeyboardsCard: React.FC<IndexKeyboardsCardProps> = ({
  name,
  price,
  rating,
  reviewCount,
  imageUrl,
}) => {
  return (
    <div className='w-[343px] h-[390px] p-4 rounded-xl border border-gray-300 shadow-sm flex flex-col bg-white'>
      {/* 이미지 영역 */}
      <div className='w-[70px] h-[212px] rounded-md overflow-hidden mb-4'>
        <Image src={imageUrl} alt={name} className='w-[500px] h-[500px] object-cover' />
      </div>
      {/* 제목 */}
      <h3 className='text-sm font-semibold text-gray-800 line-clamp-2 mb-2'>{name}</h3>

      {/* 가격 */}
      <div className='text-primary font-bold text-base mb-2'>{price}</div>

      {/* 평점/리뷰 */}
      <div className='flex items-center text-sm text-gray-500'>
        <span className='mr-1'>⭐</span>
        <span className='font-medium text-gray-800'>{rating.toFixed(1)}</span>
        <span className='ml-1 text-gray-400'>({reviewCount}개의 후기)</span>
      </div>
    </div>
  );
};

export default IndexKeyboardsCard;
