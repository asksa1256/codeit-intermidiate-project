'use client';

import Image from 'next/image';

import { useState } from 'react';

import ReviewAttributeSlider from '@/components/feature/reviewForm/ReviewAttributeSlider';
import ReviewColorCheckbox from '@/components/feature/reviewForm/ReviewColorCheckbox';
import ButtonDefault from '@/components/ui/ButtonDefault';
import StarRatingInput from '@/components/ui/StarRatingInput';
import { KEYBOARD_COLOR_MAP } from '@/constants';
import { KeyboardColorType } from '@/types/keyboardTypes';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  review?: MyReviewItemType | null;
}

const ReviewForm = ({ review }: Props) => {
  const [lightBold, setLightBold] = useState<number>(0);

  return (
    <form className='mt-10 -mb-4'>
      <div className='mb-10'>
        <div className='flex items-center gap-4'>
          <figure className='flex items-center justify-center w-[65px] h-[65px] bg-gray-100 shrink-0 rounded-lg md:w-[68px] md:h-[68px]'>
            <Image
              src='/images/KeyboardReviewIcon.svg'
              alt='키보드 아이콘'
              width={52}
              height={52}
            />
          </figure>
          <div className='grow'>
            <h3 className='font-bold break-keep md:text-lg md:font-semibold'>
              Sentinel Carbernet Sauvignon 2016
            </h3>
            <StarRatingInput updater={(value) => console.log(value)} className='mt-2 flex' />
          </div>
        </div>
        <textarea
          name='content'
          id='content'
          placeholder='후기를 작성해 주세요'
          className='block w-full h-[100px] mt-6 py-[14px] px-[20px] border border-gray-300 text-md resize-none rounded-xl outline-none placeholder:text-gray-500 md:h-[120px] md:rounded-2xl md:text-base'
        />
      </div>

      <div className='mb-10'>
        <h4 className='mb-6 text-lg font-bold'>키보드는 어땠나요?</h4>
        <div className='flex flex-col gap-4 md:gap-[18px]'>
          <ReviewAttributeSlider
            title='무게감'
            onUpdate={setLightBold}
            minLabel='가벼움'
            maxLabel='무거움'
          />
          <ReviewAttributeSlider
            title='타건감'
            onUpdate={setLightBold}
            minLabel='부드러움'
            maxLabel='선명함'
          />
          <ReviewAttributeSlider
            title='소리'
            onUpdate={setLightBold}
            minLabel='조용함'
            maxLabel='경쾌함'
          />
          <ReviewAttributeSlider
            title='반발력'
            onUpdate={setLightBold}
            minLabel='약함'
            maxLabel='강함'
          />
        </div>
      </div>

      <div className='mb-[53px] md:mb-12'>
        <h4 className='mb-6 text-lg font-bold'>키보드에 포함된 색상들을 선택해주세요.</h4>

        <div className='flex flex-wrap gap-2 md:gap-[10px]'>
          {(Object.entries(KEYBOARD_COLOR_MAP) as [KeyboardColorType, string][]).map(
            ([color, label]) => (
              <ReviewColorCheckbox key={color} color={color} label={label} />
            ),
          )}
        </div>
      </div>
      <ButtonDefault disabled type='submit' className='w-full h-[54px] rounded-xl'>
        리뷰 남기기
      </ButtonDefault>
    </form>
  );
};

export default ReviewForm;
