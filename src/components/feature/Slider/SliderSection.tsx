import { ReactNode } from 'react';

import ListSlider from '@/components/feature/Slider';

const SliderSection = ({ title }: { title?: string | ReactNode }) => {
  return (
    <section className='lg:w-285 lg:mx-auto mx-4 mt-4 mb-6 md:mt-5 md:mb-10'>
      <article className='bg-gray-100 p-5 md:p-[30px] rounded-xl md:rounded-2xl'>
        {title && <h4 className='text-lg md:text-xl font-bold mb-5 md:mb-[30px]'>{title}</h4>}

        <ListSlider />
      </article>
    </section>
  );
};

export default SliderSection;
