'use client';

import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import { KeyboardDetailType } from '@/types/keyboardTypes';

interface Props {
  keyboardInfo: KeyboardDetailType;
}

const KeyboardInfoCard = ({ keyboardInfo }: Props) => {
  const { image, name, region, price } = keyboardInfo;

  const imageSlice = image.split('/');
  const lastImageURL = image.split('/')[imageSlice.length - 1];
  const encodedImage = encodeURIComponent(lastImageURL);
  const newImageSrc = image.replace(lastImageURL, encodedImage);

  return (
    <section className='flex items-center gap-7 md:gap-15 lg:gap-21 border-1 border-gray-300 rounded-xl w-full md:max-w-200 lg:max-w-285 min-h-53 md:min-h-65 pl-5 pr-7 md:px-15 md:mx-auto md:mb-10 lg:mb-15'>
      <div className='relative shrink-0 w-25 md:w-35 md:self-end'>
        <KeyboardThumbnail
          className='md:w-[80%] md:mx-auto'
          keyboardName={name}
          imgSrc={newImageSrc}
        />
      </div>
      <div className='flex flex-col items-start gap-[10px] md:gap-5 break-keep'>
        <div className='text-xl md:text-2xl lg:text-[30px] font-semibold leading-[100%]'>
          {name}
        </div>
        <div className='text-gray-500'>{region}</div>
        <RatingAndPrice className='flex-none' label='price' value={price} />
      </div>
    </section>
  );
};

export default KeyboardInfoCard;
