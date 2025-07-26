'use client';
import Image from 'next/image';

import { Button } from '@headlessui/react';
import { useState } from 'react';

import HeartIcon from '@/assets/icons/HeartIcon.svg';
import KeyboardColorTags from '@/components/ui/KeyboardColorTags';
import { ReviewItemType } from '@/types/reviewTypes';
import { formatRelativeTime } from '@/utils/formatters';

import KeyboardProperties from '../../ui/RangeSlider/KeyboardProperties';
import RatingAndPrice from '../../ui/RatingAndPrice';
import UserThumbnail from '../../ui/UserThumbnail';

interface Props {
  review: ReviewItemType;
}

const ReviewCard = ({ review }: Props) => {
  const [isReviewFolded, setIsReviewFolded] = useState(true);
  const {
    user,
    isLiked,
    updatedAt,
    aroma,
    content,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    rating,
  } = review;
  const { image, nickname } = user;
  const KEBAB_ICON_URL = '/images/KebabIcon.svg';
  const DOWN_ARROW_ICON_URL = '/images/DownArrowIcon.svg';
  const UP_ARROW_ICON_URL = '/images/UpArrowIcon.svg';

  return (
    <section className='relative border-1 border-gray-300 rounded-xl p-4 pb-2 md:px-10 md:pt-8 md:pb-5 w-full md:max-w-200'>
      <div className='flex justify-between items-start'>
        <div className='flex items-center gap-4'>
          <UserThumbnail className='w-[42px] md:w-16 h-[42px] md:h-16' imgSrc={image} />
          <div className='flex flex-col'>
            <span className='font-semibold md:text-lg'>{nickname}</span>
            <span className='text-md md:text-base text-gray-500'>
              {formatRelativeTime(updatedAt)}
            </span>
          </div>
        </div>
        <div className='flex gap-[18px] md:gap-6'>
          <Button className='w-8 md:w-[38px] h-8 md:h-[38px]'>
            <HeartIcon />
          </Button>
          <Image
            className='md:w-[38px] md:h-[38px]'
            src={KEBAB_ICON_URL}
            alt='리뷰 수정과 삭제 메뉴 버튼'
            width={32}
            height={32}
          />
        </div>
      </div>
      <KeyboardColorTags aroma={aroma}>
        <RatingAndPrice
          className='absolute right-4 md:right-10 shadow-[10px_0_0_white,-20px_0_15px_white]'
          label='rating'
          value={rating}
        />
      </KeyboardColorTags>
      {isReviewFolded ? (
        <div className='text-center h-[30px]'>
          <Button
            onClick={() => {
              setIsReviewFolded(false);
            }}
          >
            <Image
              className='w-[30px] h-[30px]'
              src={DOWN_ARROW_ICON_URL}
              alt='리뷰 상세 펼치기 버튼'
              width={30}
              height={30}
            />
          </Button>
        </div>
      ) : undefined}
      {!isReviewFolded ? (
        <>
          <div className='text-md md:text-base'>{content}</div>
          <KeyboardProperties
            lightBold={lightBold}
            smoothTannic={smoothTannic}
            drySweet={drySweet}
            softAcidic={softAcidic}
          />
          <div className='text-center'>
            <Button
              onClick={() => {
                setIsReviewFolded(true);
              }}
            >
              <Image
                className='w-[30px] h-[30px]'
                src={UP_ARROW_ICON_URL}
                alt='리뷰 상세 접기 버튼'
                width={30}
                height={30}
              />
            </Button>
          </div>
        </>
      ) : undefined}
    </section>
  );
};

export default ReviewCard;
