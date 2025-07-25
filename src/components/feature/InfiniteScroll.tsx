// 공용 무한 스크롤 컴포넌트
import React from 'react';
import { useEffect, useRef } from 'react';

import Spinner from '@/components/ui/Spinner';

// 목록, 상세, 개인 페이지에서 로딩할 데이터들의 타입이 다를 것이므로 props로 받아오게 했습니다.
interface InfiniteScrollProps<T> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
  renderItem: (item: T) => React.ReactNode;
}

const InfiniteScroll = <T,>({
  items,
  loading,
  hasMore,
  fetchNext,
  renderItem,
}: InfiniteScrollProps<T>) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchNext();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(observerRef.current);
    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [hasMore, loading, fetchNext]);

  return (
    <div className='w-full flex flex-col items-center'>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>{renderItem(item)}</React.Fragment>
      ))}
      {loading && (
        <div className='flex justify-center p-4'>
          <Spinner />
        </div>
      )}
      {!hasMore && (
        <p className='text-sm text-[var(--color-gray-500)]'>모든 데이터를 불러왔습니다.</p>
      )}
      <div ref={observerRef} className='h-10 w-full'></div>
    </div>
  );
};

export default InfiniteScroll;
