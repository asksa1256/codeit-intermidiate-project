import { ReactNode } from 'react';

import ListSlider from '@/components/feature/Slider';
import { TEAM_ID } from '@/constants';
import { apiClient } from '@/lib/api/apiClient';

const SliderSection = async ({ title }: { title?: string | ReactNode }) => {
  const res = await apiClient.get(`/16-3/wines/recommended?limit=10`);
  const data = res.data;

  return (
    <section className='w-full'>
      <article className='bg-gray-100 p-5 md:p-[30px] rounded-xl md:rounded-2xl'>
        {title && <h4 className='text-lg md:text-xl font-bold mb-5 md:mb-[30px]'>{title}</h4>}
        <ListSlider items={data} />
      </article>
    </section>
  );
};

export default SliderSection;
