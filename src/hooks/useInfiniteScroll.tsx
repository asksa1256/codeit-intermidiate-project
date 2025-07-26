// 무한 스크롤 커스텀 훅
import { useState, useCallback } from 'react';

interface FetcherResponse<T> {
  list: T[];
  nextCursor: number | null;
}

// fetcher는 limit과 cursor를 받아서 데이터를 반환하도록 타입을 정의
type Fetcher<T> = (cursor: number | null, limit: number) => Promise<FetcherResponse<T>>;

export const useInfiniteScrollFetcher = <T,>(fetcher: Fetcher<T>, limit = 5) => {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchNext = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);

    try {
      // limit을 fetcher로 넘김
      const res = await fetcher(cursor, limit);

      setItems((prev) => [...prev, ...res.list]);
      setCursor(res.nextCursor);

      if (res.nextCursor === null) {
        setHasMore(false);
      }
    } finally {
      setLoading(false);
    }
  }, [fetcher, cursor, limit, hasMore, loading]);

  return { items, loading, hasMore, fetchNext };
};
