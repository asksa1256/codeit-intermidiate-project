// 무한 스크롤 커스텀 훅 fetcher
import axios from 'axios';

import type { KeyboardItemType, KeyboardListType } from '@/types/keyboardTypes';

export const fetchKeyboardsAPI = async (
  cursor: number | null,
  limit: number,
): Promise<{ list: KeyboardItemType[]; nextCursor: number | null }> => {
  const url = `https://winereview-api.vercel.app/16-3/wines?limit=${limit}${
    cursor !== null ? `&cursor=${cursor}` : ''
  }`;
  const res = await axios.get<KeyboardListType>(url);

  return { list: res.data.list, nextCursor: res.data.nextCursor };
};

// 페이지에서 사용법 예시
//
// 커스텀 훅 사용
// const { items, loading, hasMore, fetchNext } =
//  useInfiniteScrollFetcher<KeyboardItemType>(fetchKeyboardsAPI, 5); 불러오실 공통 타입과 한번에 불러온 리스트 값을 수정해주시면 됩니다.
// 첫 페이지 로딩
// useEffect(() => {
//   fetchNext();
// }, [fetchNext]);
