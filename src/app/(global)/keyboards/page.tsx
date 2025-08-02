// 키보드 목록 페이지
import KeyboardBottom from '@/components/feature/Keyboards/KeyboardBottom';
import SliderSection from '@/components/feature/Slider/SliderSection';

const KeyboardsPage = () => {
  return (
    <div className='px-4 pt-[15px] pb-[100px] m-auto max-w-[1140px] md:pt-5 md:pb-[50px] md:px-5 lg:px-0'>
      <SliderSection />
      <KeyboardBottom />
    </div>
  );
};

export default KeyboardsPage;
