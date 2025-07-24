'use client';

import Image from 'next/image';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import { MyReviewItemType } from '@/types/reviewTypes';
import { formatRelativeTime } from '@/utils/formatters';

interface MyReviewItemProps {
  review: MyReviewItemType;
}

const MyReviewItem = ({ review }: MyReviewItemProps) => {
  const { rating, content, updatedAt, wine } = review;
  return (
    <li className='border border-gray-300 py-4 px-5 bg-white rounded-2xl mb-4 md:py-6 md:px-10 lg:mb-2 lg:pb-7'>
      <div className='flex items-center gap-[15px] mb-[17px] md:mb-5'>
        <RatingAndPrice
          label='rating'
          value={rating}
          className='text-md py-1 md:py-[6px] lg:py-2'
        />
        <span className='text-md text-gray-500 md:text-base'>{formatRelativeTime(updatedAt)}</span>
        <Dropdown className='inline-block ml-auto'>
          <Dropdown.Trigger className='block'>
            <Image
              src='/images/KebabIcon.svg'
              width={40}
              height={40}
              alt='케밥 메뉴 아이콘'
              className='w-6 md:w-[26px]'
            />
          </Dropdown.Trigger>
          <Dropdown.List className='mt-2 lg:mt-4'>
            <Dropdown.Item onClick={() => console.log('수정하기')}>수정하기</Dropdown.Item>
            <Dropdown.Item onClick={() => console.log('삭제하기')}>삭제하기</Dropdown.Item>
          </Dropdown.List>
        </Dropdown>
      </div>
      <h3 className='mb-[10px] text-md text-gray-500 line-clamp-1 md:text-base'>{wine.name}</h3>
      <p className='text-md text-ellipsis break-keep md:text-base'>{content}</p>
    </li>
  );
};

export default MyReviewItem;
