// 무한 스크롤 키보드 목록 불러오는 fetcher
import axios from 'axios';

import type { KeyboardListType } from '@/types/keyboardTypes';

/**
 * 키보드 목록을 불러오는 API fetcher
 * @param cursor - 현재까지 불러온 마지막 데이터의 cursor (null이면 첫 페이지)
 * @returns list와 nextCursor를 담은 객체
 */
export const fetchKeyboardsAPI = async (cursor: number | null) => {
  try {
    const url = `https://winereview-api.vercel.app/16-3/wines?limit=10${
      cursor ? `&cursor=${cursor}` : ''
    }`;

    const res = await axios.get<KeyboardListType>(url);

    return {
      list: res.data.list,
      nextCursor: res.data.nextCursor,
    };
  } catch (err) {
    console.error('키보드 API 호출 실패', err);
    // 빈 리스트로라도 반환해서 UI가 깨지지 않게
    return {
      list: [],
      nextCursor: null,
    };
  }
};
