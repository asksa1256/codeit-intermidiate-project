'use client';
import SwiperCore from 'swiper';
import { Navigation, Autoplay } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

import 'swiper/css';
import 'swiper/css/navigation';
import KeyboardMiniCard from '@/components/feature/keyboardDetails/KeyboardMiniCard';
import useWindowWidth from '@/hooks/useWindowWidth';

const ListSlider = () => {
  const innerWidth = useWindowWidth();
  const isMobile = innerWidth < 640;
  SwiperCore.use([Navigation, Autoplay]);

  return (
    <Swiper
      slidesPerView='auto'
      spaceBetween={16}
      loop={false}
      navigation={true}
      autoplay={{
        delay: 2500,
        disableOnInteraction: true, // 사용자 상호작용시 슬라이더 일시 정지
      }}
      speed={1000}
      modules={[Autoplay, Navigation]}
    >
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
      <SwiperSlide style={isMobile ? { width: 192 } : { width: 232 }}>
        <KeyboardMiniCard href='/slider' />
      </SwiperSlide>
    </Swiper>
  );
};

export default ListSlider;
