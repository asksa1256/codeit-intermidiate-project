// 무한 스크롤 커스텀 훅
import { useState, useCallback } from 'react';

interface FetcherResponse<T> {
  list: T[];
  nextCursor: number | null;
}

type Fetcher<T> = (cursor: number | null) => Promise<FetcherResponse<T>>;

const useInfiniteScroll = <T,>(fetcher: Fetcher<T>) => {
  const [items, setItems] = useState<T[]>([]);
  const [cursor, setCursor] = useState<number | null>(null);
  const [hasMore, setHasMore] = useState(true);
  const [loading, setLoading] = useState(false);

  const fetchNext = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const res = await fetcher(cursor);
      setItems((prev) => [...prev, ...res.list]);
      setCursor(res.nextCursor);
      if (!res.nextCursor) setHasMore(false);
    } finally {
      setLoading(false);
    }
  }, [cursor, hasMore, loading, fetcher]);

  return { items, loading, hasMore, fetchNext };
};

export default useInfiniteScroll;
