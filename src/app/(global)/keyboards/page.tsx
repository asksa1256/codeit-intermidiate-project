// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useState, useEffect, useCallback } from 'react';

import InfiniteScroll from '@/components/feature/InfiniteScroll';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import KeyboardsSearchBar from '@/components/feature/Keyboards/KeyboardsSearchBar';

import type { KeyboardItemType, KeyboardListType } from '@/types/keyboardTypes';

const KeyboardsPage = () => {
  // 상태 관리
  const [items, setItems] = useState<KeyboardItemType[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);

  // 데이터 가져오기
  const fetchNext = useCallback(async () => {
    if (loading || !hasMore) return;

    setLoading(true);
    try {
      const res = await axios.get<KeyboardListType>(
        `https://winereview-api.vercel.app/16-3/wines?limit=5${cursor !== null ? `&cursor=${cursor}` : ''}`,
      );

      //TODO 테스트 완료되면 삭제하기
      console.log('이번 요청에 보낸 cursor:', cursor);
      console.log('API 응답 nextCursor:', res.data.nextCursor);
      console.log('API 응답 전체', res.data);

      setItems((prev) => [...prev, ...res.data.list]);
      setCursor(res.data.nextCursor);
      if (!res.data.nextCursor) setHasMore(false);
    } catch (err) {
      console.error('데이터 호출 실패', err);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading]);

  // 첫 로딩. 페이지가 마운팅 될 때 한 번만 실행
  useEffect(() => {
    fetchNext();
  }, [fetchNext]);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      <KeyboardsSearchBar />

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
        className='grid grid-cols-1 gap-4 md:gap-6 lg:gap-8'
      />
      {!hasMore && <p className='text-sm text-gray-500 mt-4'>모든 데이터를 불러왔습니다.</p>}
    </div>
  );
};

export default KeyboardsPage;
