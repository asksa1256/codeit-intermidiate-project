'use client';
import { useRef, useState } from 'react';
import SwiperCore, { Swiper as SwiperType } from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import RightArrowIcon from '@/assets/icons/RightArrowIcon.svg';
import KeyboardMiniCard from '@/components/feature/keyboardDetails/KeyboardMiniCard';
import IconButton from '@/components/ui/Button/IconButton';
import useWindowWidth from '@/hooks/useWindowWidth';
import { KeyboardMiniItem } from '@/types/keyboardTypes';

const SLIDES_MIN_LENGTH = 3;
const SLIDE_MD_WIDTH = 232;
const SLIDE_SM_WIDTH = 192;

interface ItemsProps {
  items: KeyboardMiniItem[];
}

const ListSlider = ({ items }: ItemsProps) => {
  SwiperCore.use([Navigation, Autoplay]);
  const swiperRef = useRef<SwiperType>(null);

  const [isBeginning, setIsBeginning] = useState(true);
  const [isEnd, setIsEnd] = useState(false);

  const innerWidth = useWindowWidth();
  const isMobile = innerWidth < 640;

  return (
    <div className='relative'>
      <Swiper
        className='!pr-5 md:!pr-[30px]'
        slidesPerView='auto'
        spaceBetween={16}
        loop={false}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false, // 사용자 상호작용시 슬라이더 일시 정지 비활성화
        }}
        speed={1000}
        modules={[Autoplay, Navigation]}
        onBeforeInit={(swiper) => {
          swiperRef.current = swiper;
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
        onAfterInit={(swiper) => {
          if (swiper.slides.length < SLIDES_MIN_LENGTH) {
            setIsEnd(true);
          }
        }}
        onSlideChange={(swiper) => {
          setIsBeginning(swiper.isBeginning);
          setIsEnd(swiper.isEnd);
        }}
      >
        {items.map((item: KeyboardMiniItem) => (
          <SwiperSlide
            key={item.id}
            style={isMobile ? { width: SLIDE_SM_WIDTH } : { width: SLIDE_MD_WIDTH }}
          >
            <KeyboardMiniCard item={item} />
          </SwiperSlide>
        ))}
      </Swiper>

      <div className='absolute top-1/2 left-0 -translate-y-1/2 -mt-6 w-full z-[3]'>
        <IconButton
          icon={RightArrowIcon}
          iconReverse
          rounded
          className='absolute left-5 shadow-md'
          disabled={isBeginning}
          onClick={() => swiperRef.current?.slidePrev()}
        />
        <IconButton
          icon={RightArrowIcon}
          rounded
          className='absolute right-5 shadow-md'
          disabled={isEnd}
          onClick={() => swiperRef.current?.slideNext()}
        />
      </div>
    </div>
  );
};

export default ListSlider;
