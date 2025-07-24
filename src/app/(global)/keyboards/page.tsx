// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';

interface KeyboardItem {
  id: number;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview?: {
    id: number;
    content: string;
    createdAt: string;
    updatedAt: string;
  } | null;
}

const KeyboardsPage = () => {
  const [keyboards, setKeyboards] = useState<KeyboardItem[]>([]);

  useEffect(() => {
    axios
      .get('https://winereview-api.vercel.app/16-3/wines?limit=10')
      .then((res) => setKeyboards(res.data.list))
      .catch((err) => console.error('호출 실패', err));
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      <div className='flex flex-col gap-4'>
        {keyboards.map((keyboard) => (
          <IndexKeyboardsCard
            key={keyboard.id}
            name={keyboard.name}
            region={keyboard.region}
            price={keyboard.price}
            avgRating={keyboard.avgRating}
            image={keyboard.image}
            reviewCount={keyboard.reviewCount}
            recentReview={keyboard.recentReview || null}
          />
        ))}
      </div>
    </div>
  );
};

export default KeyboardsPage;
