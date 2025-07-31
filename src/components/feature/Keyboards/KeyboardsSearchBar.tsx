// 목록 페이지 검색바 컴포넌트
'use client';

import axios from 'axios';
import { useState } from 'react';

import type { KeyboardItemType } from '@/types/keyboardTypes';

// 부모에게 결과를 전달하기 위한 props 타입
interface KeyboardsSearchBarProps {
  onSearchResults: (results: KeyboardItemType[] | null) => void;
}

const KeyboardsSearchBar = ({ onSearchResults }: KeyboardsSearchBarProps) => {
  const [query, setQuery] = useState('');

  // 검색 수행 함수 (API 호출, 서버 필터링)
  const handleSearch = async () => {
    const SearchedQuery = query;

    if (!SearchedQuery) {
      onSearchResults(null);
      return;
    }
    try {
      const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', {
        params: { limit: 30, name: SearchedQuery },
      });

      const dataArray: KeyboardItemType[] = res.data.list || [];
      onSearchResults(dataArray); // 서버 응답 그대로 전달
    } catch (err) {
      console.error('검색 중 오류 발생:', err);
    }
  };

  // 검색 트리거 이벤트
  const handleTriggerSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key !== 'Enter') return;
    handleSearch();
  };

  return (
    <>
      {/* 검색바 */}
      <section>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleTriggerSearch}
          placeholder='키보드를 검색해보세요'
          className='h-[38px] border border-gray-300 rounded-[50px] grow-1 pl-[45px] pr-[15px] bg-[url(/images/SearchIcon.svg)] bg-position-[center_left_15px] bg-no-repeat text-md outline-none focus:ring-2 focus:ring-primary hover:border-primary md:h-12 md:pl-[55px] md:pr-5 md:bg-position-[center_left_20px] md:text-base lg:max-w-200 lg:ml-auto'
        />
      </section>
    </>
  );
};

export default KeyboardsSearchBar;
