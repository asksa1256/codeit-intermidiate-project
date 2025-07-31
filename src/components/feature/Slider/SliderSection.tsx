'use client';

import { ReactNode, useEffect, useState } from 'react';

import ListSlider from '@/components/feature/Slider';
import { TEAM_ID } from '@/constants';
import { apiClient } from '@/lib/api/apiClient';

const SliderSection = ({ title }: { title?: string | ReactNode }) => {
  const [items, setItems] = useState([]);
  const [isError, setIsError] = useState(false);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await apiClient.get(`/${TEAM_ID}/wines/recommended?limit=10`);
        const data = res.data;
        setItems(data);
      } catch (err) {
        console.error(err);
        setIsError(true);
      }
    };
    fetchItems();
  }, []);

  return (
    <section className='w-full'>
      <article className='bg-gray-100 p-5 md:p-[30px] rounded-xl md:rounded-2xl'>
        {title && <h4 className='text-lg md:text-xl font-bold mb-5 md:mb-[30px]'>{title}</h4>}
        {!isError ? <ListSlider items={items} /> : <p>추천 데이터 가져오기에 실패했습니다.</p>}
      </article>
    </section>
  );
};

export default SliderSection;
