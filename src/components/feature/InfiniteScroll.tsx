// 공용 무한 스크롤 컴포넌트
import React from 'react';
import { useEffect, useRef } from 'react';

interface InfiniteScrollProps<T> {
  items: T[];
  loading: boolean;
  hasMore: boolean;
  fetchNext: () => void;
  renderItem: (item: T) => React.ReactNode;
  className?: string;
}

//제네릭 타입으로 여러 페이지에서 쓰기 편하게 해보기 items 부분에 사용하실 공통 타입을 넣어주시면 됩니다. className 프롭스를 통해 gap등을 설정해주시면 됩니다.
const InfiniteScroll = <T,>({
  items,
  loading,
  hasMore,
  fetchNext,
  renderItem,
  className,
}: InfiniteScrollProps<T>) => {
  const observerRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    if (!observerRef.current) return;

    const target = observerRef.current;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && hasMore && !loading) {
          fetchNext();
        }
      },
      { threshold: 0.5 },
    );

    observer.observe(target);
    return () => {
      if (target) observer.unobserve(target);
    };
  }, [hasMore, loading, fetchNext]);

  return (
    <div className={className}>
      {items.map((item, idx) => (
        <React.Fragment key={idx}>{renderItem(item)}</React.Fragment>
      ))}
    </div>
  );
};

export default InfiniteScroll;
