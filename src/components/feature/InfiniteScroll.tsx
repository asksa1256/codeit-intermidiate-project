// 공용 무한 스크롤 컴포넌트
import axios from 'axios';
import { useEffect, useRef, useState } from 'react';

import Spinner from '@/components/ui/Spinner';

interface Item {
  id: number;
  name: string;
  image: string;
  price: number;
  region: string;
  avgRating: number;
  reviewCount: number;
  // 필요한 props를 여기에 추가해 주세요.
}

const InfiniteScroll = () => {
  const [items, setItems] = useState<Item[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const observerRef = useRef<HTMLDivElement | null>(null);

  //  데이터 요청 함수
  const fetchItems = async () => {
    if (!hasMore || loading) return; // 중복 방지
    setLoading(true);

    try {
      const res = await axios.get(
        `https://winereview-api.vercel.app/16-3/wines?limit=10${cursor ? `&cursor=${cursor}` : ''}`,
      );

      const newItems: Item[] = res.data.list;
      const nextCursor: number | null = res.data.nextCursor;

      setItems((prev) => [...prev, ...newItems]);
      setCursor(nextCursor);
      if (!nextCursor) {
        setHasMore(false);
      }
    } catch (err) {
      console.error('데이터 요청 실패', err);
    } finally {
      setLoading(false);
    }
  };

  // IntersectionObserver로 스크롤 감지
  useEffect(() => {
    if (!observerRef.current) return;

    const observer = new IntersectionObserver(
      (entries) => {
        const target = entries[0];
        if (target.isIntersecting && hasMore && !loading) {
          fetchItems();
        }
      },
      { threshold: 0.5 }, // 50% 보일 때 트리거
    );

    observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasMore, loading]);

  // 첫 로드
  useEffect(() => {
    fetchItems();
  }, []);

  return (
    <div className='w-full flex flex-col items-center'>
      {/* 렌더링된 아이템들 */}
      {items.map((item) => (
        <div key={item.id} className='w-[343px] h-[360px] border mb-4'>
          <p>{item.name}</p>
          <img src={item.image} alt={item.name} width={100} height={100} />
          <p>{item.price}원</p>
        </div>
      ))}

      {/* 로딩 표시 스피너 */}
      {loading && (
        <div className='flex justify-center p-4'>
          <Spinner />
        </div>
      )}

      {/* 더 불러올 데이터가 없을 때 */}
      {!hasMore && <p>모든 데이터를 불러왔습니다.</p>}

      {/* 스크롤 트리거용 요소 */}
      <div ref={observerRef} className='h-10 w-full'></div>
    </div>
  );
};

export default InfiniteScroll;
