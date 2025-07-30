import Image from 'next/image';

import StarRating from '@/components/ui/StarRating';

const KeyboardMiniCard = () => {
  return (
    <article className='w-[192px] h-[160px] md:w-[232px] md:h-[185px] px-6 md:px-[30px] pt-6 bg-white rounded-xl shadow-primary'>
      <div className='flex gap-4 md:gap-6'>
        <div className='shrink-0 w-[52px] md:w-[60px] mt-[130%] md:mt-[118%]'>
          <div className='relative'>
            <figure className='absolute bottom-0 rotate-90 right-full origin-bottom-right w-[180px] aspect-[160/44] md:w-[200px] md:aspect-[184/56]'>
              <Image
                src='https://sprint-fe-project.s3.ap-northeast-2.amazonaws.com/Wine/user/1643/1753845442347/image_1753845442269.png'
                alt='키보드 이미지'
                fill
              />
            </figure>
          </div>
        </div>
        <div className='flex flex-col gap-1.5 w-full'>
          <span className='font-bold text-[28px] md:text-4xl text-gray-800'>4.8</span>
          <StarRating value={4} />
          <h6 className='text-[10px] md:text-xs text-gray-500 break-keep line-clamp-4'>
            Office Master 3모드 저소음 펜타그래프 유무선겸용 일반형 키보드
          </h6>
        </div>
      </div>
    </article>
  );
};

export default KeyboardMiniCard;
