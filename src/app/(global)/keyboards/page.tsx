// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useState, useEffect } from 'react';

import InfiniteScroll from '@/components/feature/InfiniteScroll';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';

import type { KeyboardItemType, KeyboardListType } from '@/types/keyboardTypes';

const KeyboardsPage = () => {
  const [keyboards, setKeyboards] = useState<KeyboardItemType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchKeyboards = async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await axios.get<KeyboardListType>(
        `https://winereview-api.vercel.app/16-3/wines?limit=10${cursor ? `&cursor=${cursor}` : ''}`,
      );
      setKeyboards((prev) => [...prev, ...res.data.list]);
      setCursor(res.data.nextCursor);
      if (!res.data.nextCursor) setHasMore(false);
    } catch (err) {
      console.error('호출 실패', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchKeyboards();
  }, []);

  return (
    <div>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      <InfiniteScroll<KeyboardItemType>
        items={keyboards}
        loading={loading}
        hasMore={hasMore}
        fetchNext={fetchKeyboards}
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
