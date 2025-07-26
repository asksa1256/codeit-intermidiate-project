// 공용 무한 스크롤 컴포넌트
import React from 'react';
import { useEffect, useRef } from 'react';

import Spinner from '@/components/ui/Spinner';

interface InfiniteScrollProps<T> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
  renderItem: (item: T) => React.ReactNode;
}

//제네릭 타입으로 여러 페이지에서 쓰기 편하게 해보기 items 부분에 사용하실 공통 타입을 넣어주시면 됩니다.
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
// TODO 스피너 및 hasMore는 확장성을 위해 불 빼두자.
export default InfiniteScroll;
