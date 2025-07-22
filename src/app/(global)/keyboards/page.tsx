// 키보드 목록 페이지
import React from 'react';

import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';

export default function KeyboardsPage() {
  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      <div className='grid grid-cols-2 gap-4'>
        <IndexKeyboardsCard
          name='Keychron K3'
          price='99,000원'
          alt='키보드 이미지'
          rating={4.5}
          reviewCount={120}
          imageUrl=''
        />
      </div>
    </div>
  );
}
