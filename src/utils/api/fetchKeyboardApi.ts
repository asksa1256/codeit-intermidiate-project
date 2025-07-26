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
