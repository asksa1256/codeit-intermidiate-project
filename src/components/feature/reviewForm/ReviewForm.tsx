'use client';

import Image from 'next/image';

import { useForm } from 'react-hook-form';

import ReviewFormCheckbox from '@/components/feature/reviewForm/ReviewFormCheckbox';
import ReviewFormRating from '@/components/feature/reviewForm/ReviewFormRating';
import ReviewFormSlider from '@/components/feature/reviewForm/ReviewFormSlider';
import ButtonDefault from '@/components/ui/ButtonDefault';
import { KeyboardColorType } from '@/types/keyboardTypes';
import { MyReviewItemType, ReviewItemType } from '@/types/reviewTypes';

export interface ReviewFormValues {
  rating: number;
  lightBold: number;
  smoothTannic: number;
  drySweet: number;
  softAcidic: number;
  aroma: KeyboardColorType[];
  content: string;
}

interface Props {
  keyboardTitle: string;
  initReview?: MyReviewItemType | ReviewItemType | null;
  onSubmit: (value: ReviewFormValues) => void;
}

const ReviewForm = ({ keyboardTitle, initReview = null, onSubmit }: Props) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { isSubmitting, isValid, isDirty },
  } = useForm<ReviewFormValues>({
    mode: 'onChange',
    defaultValues: {
      rating: initReview?.rating ?? 0,
      lightBold: initReview?.lightBold ?? 5,
      smoothTannic: initReview?.smoothTannic ?? 5,
      drySweet: initReview?.drySweet ?? 5,
      softAcidic: initReview?.softAcidic ?? 5,
      content: initReview?.content ?? '',
      aroma: initReview?.aroma ?? [],
    },
  });

  const handleSubmitForm = async (formValues: ReviewFormValues) => {
    // isSubmitting이 제대로 동작하기 위해 async/await로 수정됨.
    await onSubmit(formValues);
  };

  const isEdit = initReview !== null;
  const isSubmitDisabled = isEdit ? !(isDirty && isValid) : !isValid;
  const isEditLoading = isEdit ? '리뷰 수정중....' : '리뷰 등록중...';

  return (
    <form onSubmit={handleSubmit(handleSubmitForm)}>
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
            <h3 className='font-bold break-keep md:text-lg md:font-semibold'>{keyboardTitle}</h3>
            <ReviewFormRating name='rating' control={control} />
          </div>
        </div>
        <textarea
          placeholder='후기를 작성해 주세요'
          className='block w-full h-[100px] mt-6 py-[14px] px-[20px] border border-gray-300 text-md resize-none rounded-xl outline-none placeholder:text-gray-500 md:h-[120px] md:rounded-2xl md:text-base'
          {...register('content', {
            required: true,
            setValueAs: (v) => v.trim(),
          })}
        />
      </div>

      <div className='mb-10'>
        <h4 className='mb-6 text-lg font-bold'>키보드는 어땠나요?</h4>
        <div className='flex flex-col gap-4 md:gap-[18px]'>
          <ReviewFormSlider
            title='무게감'
            minLabel='가벼움'
            maxLabel='무거움'
            name='lightBold'
            control={control}
          />
          <ReviewFormSlider
            title='타건감'
            minLabel='부드러움'
            maxLabel='선명함'
            name='smoothTannic'
            control={control}
          />
          <ReviewFormSlider
            title='소리'
            minLabel='조용함'
            maxLabel='경쾌함'
            name='drySweet'
            control={control}
          />
          <ReviewFormSlider
            title='반발력'
            minLabel='약함'
            maxLabel='강함'
            name='softAcidic'
            control={control}
          />
        </div>
      </div>

      <div className='mb-[53px] md:mb-12'>
        <h4 className='mb-6 text-lg font-bold'>키보드에 포함된 색상들을 선택해주세요.</h4>
        <div className='flex flex-wrap gap-2 md:gap-[10px]'>
          <ReviewFormCheckbox name='aroma' control={control} />
        </div>
      </div>
      <ButtonDefault
        disabled={isSubmitDisabled || isSubmitting}
        type='submit'
        className='w-full h-[54px] rounded-xl'
      >
        {isSubmitting ? isEditLoading : '리뷰 남기기'}
      </ButtonDefault>
    </form>
  );
};

export default ReviewForm;
