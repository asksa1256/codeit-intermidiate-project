'use client';

import Image from 'next/image';

import React from 'react';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import RatingAndPrice from '@/components/ui/RatingAndPrice';

type KeyboardColorType =
  | 'CHERRY'
  | 'BERRY'
  | 'OAK'
  | 'VANILLA'
  | 'PEPPER'
  | 'BAKING'
  | 'GRASS'
  | 'APPLE'
  | 'PEACH'
  | 'CITRUS'
  | 'TROPICAL'
  | 'MINERAL'
  | 'FLOWER'
  | 'TOBACCO'
  | 'EARTH'
  | 'CHOCOLATE'
  | 'SPICE'
  | 'CARAMEL'
  | 'LEATHER';
type KeyboardCategoryType = 'RED' | 'WHITE' | 'SPARKLING';

interface KeyboardItemType {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  type: KeyboardCategoryType;
  avgRating: number;
  reviewCount: number;
  recentReview: {
    user: {
      id: number;
      nickname: string;
      image: string;
    };
    updatedAt: string;
    createdAt: string;
    content: string;
    aroma: KeyboardColorType[];
    rating: number;
    id: number;
  } | null;
  userId: number;
}

interface MyKeyboardItemProps {
  keyboard: KeyboardItemType;
}

const MyKeyboardItem = ({ keyboard }: MyKeyboardItemProps) => {
  const { name, region, price } = keyboard;

  const imageSlice = keyboard.image.split('/');
  const lastImageURL = keyboard.image.split('/')[imageSlice.length - 1];
  const image = encodeURIComponent(lastImageURL);
  const newImageSrc = keyboard.image.replace(lastImageURL, image);

  return (
    <li className='flex mb-[10px] border border-gray-300 rounded-xl'>
      <div className='relative shrink-0 w-[108px] px-[14px] md:w-[176px] md:px-5 self-center md:self-end'>
        <div className='relative pt-[180%] md:w-[70%] md:mx-auto overflow-hidden'>
          <figure className='absolute bottom-0 right-full rotate-90 origin-bottom-right w-[180%] aspect-[180/100] md:w-[220%] md:aspect-[220/100]'>
            <Image
              src={newImageSrc}
              alt={name}
              width={300}
              height={300}
              className='w-full h-full object-contain object-left md:object-cover'
            />
          </figure>
        </div>
      </div>
      <div className='relative grow pt-[25px] pr-12 pb-6 md:py-[30px] md:pr-[86px] lg:pr-[124px]'>
        <h3 className='mb-[10px] text-lg font-semibold break-keep md:text-[28px] md:leading-[1.17] md:mb-[20px]'>
          {name}
        </h3>
        <p className='mb-[10px] text-md text-gray-500 md:text-base md:mb-[20px]'>{region}</p>
        <RatingAndPrice label='price' value={price} className='md:py-[5.5px]' />
        <Dropdown className='absolute top-5 right-5 md:top-[30px] md:right-10'>
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
    </li>
  );
};

export default MyKeyboardItem;
