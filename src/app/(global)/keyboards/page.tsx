// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useState, useEffect, use } from 'react';

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
      .get('https://winereview-api.vercel.app/16-3/wines?limit=5')
      .then((res) => setKeyboards(res.data.list))
      .catch((err) => console.error('호출 실패', err));
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      <div className='grid grid-cols-2 gap-4'>
        <IndexKeyboardsCard
          name='Keychron K3'
          price='99,000원'
          alt='키보드 이미지'
          rating={4.5}
          imageUrl=''
        />
      </div>
    </div>
  );
};

export default KeyboardsPage;
