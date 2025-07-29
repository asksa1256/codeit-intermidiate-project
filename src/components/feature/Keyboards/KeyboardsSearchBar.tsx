// 목록 페이지 검색바 컴포넌트
'use client';

import Image from 'next/image';

import axios from 'axios';
import { useState } from 'react';

import type { KeyboardItemType } from '@/types/keyboardTypes';

// 부모에게 결과를 전달하기 위한 props 타입
interface KeyboardsSearchBarProps {
  onSearchResults: (results: KeyboardItemType[]) => void;
}

const KeyboardsSearchBar = ({ onSearchResults }: KeyboardsSearchBarProps) => {
  const [query, setQuery] = useState('');

  const handleSearch = async () => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      onSearchResults([]); // 검색어 없으면 빈 배열 전달
      return;
    }
    // TODO name 파라미터 params에 다시 사용하기
    try {
      // limit 값대로 불러와서 필터링
      const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', {
        params: { limit: 20 },
      });

      const dataArray: KeyboardItemType[] = res.data.list || [];

      const filtered = dataArray.filter((item) => item.name.toLowerCase().includes(cleanQuery));

      // name 필드의 indexOf 순서로 정렬
      const sorted = [...filtered].sort((a, b) => {
        const aPos = a.name.toLowerCase().indexOf(cleanQuery);
        const bPos = b.name.toLowerCase().indexOf(cleanQuery);
        return aPos - bPos;
      });

      // 결과를 페이지에 전달
      onSearchResults(sorted);
    } catch (err) {
      console.error('검색 중 오류 발생:', err);
    }
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
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='키보드를 검색해보세요'
          className='flex-1 text-sm placeholder:text-gray-400 outline-none border-none bg-transparent'
        />
        {/*TODO 함수로 분리 */}
        <Image
          src='/images/SearchIcon.svg'
          width={40}
          height={40}
          alt='검색 아이콘'
          className='w-6 md:w-[26px] cursor-pointer'
          onClick={handleSearch}
        />
      </section>
    </div>
  );
};

export default KeyboardsSearchBar;
