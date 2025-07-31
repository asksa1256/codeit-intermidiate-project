// 목록 페이지 검색바 컴포넌트
'use client';

import Image from 'next/image';

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

  // 검색 트리거 이벤트 (입력/버튼 공통)
  const handleTriggerSearch = (e: React.KeyboardEvent<HTMLInputElement> | React.MouseEvent) => {
    if ('key' in e && e.key !== 'Enter') return;
    handleSearch();
  };

  return (
    <div className='flex justify-center'>
      {/* 검색바 */}
      <section
        className='
          flex items-center
          w-[343px] h-[38px]
          md:w-[704px] md:h-[48px]
          lg:w-[400px] lg:h-[48px]
          rounded-full border border-gray-300 bg-white px-[15px]
        '
      >
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={handleTriggerSearch}
          placeholder='키보드를 검색해보세요'
          className='flex-1 text-sm placeholder:text-gray-400 outline-none border-none bg-transparent'
        />
        <Image
          src='/images/SearchIcon.svg'
          width={40}
          height={40}
          alt='검색 아이콘'
          className='w-6 md:w-[26px] cursor-pointer'
          onClick={handleTriggerSearch}
        />
      </section>
    </div>
  );
};

export default KeyboardsSearchBar;
