// 키보드 목록 페이지
'use client';

import { useEffect } from 'react';

import InfiniteScroll from '@/components/feature/InfiniteScroll';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import useInfiniteScroll from '@/hooks/useInfiniteScroll'; //  커스텀 훅
import { fetchKeyboardsAPI } from '@/utils/api/fetchKeyboardApi'; //  API fetcher

import type { KeyboardItemType } from '@/types/keyboardTypes';

const KeyboardsPage = () => {
  const { items, loading, hasMore, fetchNext } =
    useInfiniteScroll<KeyboardItemType>(fetchKeyboardsAPI);

  useEffect(() => {
    fetchNext(); // 첫 페이지 로딩
  }, [fetchNext]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>

      <InfiniteScroll<KeyboardItemType>
        items={items}
        loading={loading}
        hasMore={hasMore}
        fetchNext={fetchNext}
        renderItem={(keyboard) => (
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
        )}
      />
    </div>
  );
};

export default KeyboardsPage;
