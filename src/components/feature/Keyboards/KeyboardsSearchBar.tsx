// 목록 페이지 검색바 컴포넌트
'use client';

import Image from 'next/image';

import axios from 'axios';
import { useState } from 'react';

import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';

import type { KeyboardItemRecentReview } from '@/types/keyboardTypes';

interface KeyboardItem {
  id: string;
  name: string;
  region: string;
  image: string;
  price: number;
  avgRating: number;
  reviewCount: number;
  recentReview: KeyboardItemRecentReview | null;
}

const KeyboardsSearchBar = () => {
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<KeyboardItem[]>([]);

  const handleSearch = async () => {
    const cleanQuery = query.trim().toLowerCase();
    if (!cleanQuery) {
      setResults([]);
      return;
    }

    try {
      const res = await axios.get('https://winereview-api.vercel.app/16-3/wines?limit=10', {
        params: { search: cleanQuery },
      });

      // 응답 구조 확인
      console.log('API 응답:', res.data);

      const dataArray = res.data.list; // 여기서 list로 접근
      if (!Array.isArray(dataArray)) {
        console.error('API 응답 형식이 예상과 다릅니다.', res.data);
        setResults([]);
        return;
      }

      const filtered = dataArray.filter((item: KeyboardItem) =>
        item.name.toLowerCase().includes(cleanQuery),
      );

      setResults(filtered);
    } catch (err) {
      console.error('검색 중 오류 발생:', err);
    }
  };

  return (
    <div className='p-4'>
      {/* 검색바 */}
      <div className='flex items-center w-full max-w-[343px] h-[38px] rounded-full border border-gray-300 bg-white px-[15px]'>
        <input
          type='text'
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
          placeholder='키보드를 검색해보세요'
          className='flex-1 text-sm placeholder:text-gray-400 outline-none border-none bg-transparent'
        />
        <Image
          src='/images/SearchIcon.svg'
          width={40}
          height={40}
          alt='검색 아이콘'
          className='w-6 md:w-[26px] cursor-pointer'
          onClick={handleSearch}
        />
      </div>

      {/* 검색 결과 */}
      <div className='mt-4 flex flex-col gap-4'>
        {results.map((item) => (
          <IndexKeyboardsCard
            key={item.id}
            name={item.name}
            region={item.region}
            image={item.image}
            price={item.price}
            avgRating={item.avgRating}
            reviewCount={item.reviewCount}
            recentReview={item.recentReview}
          />
        ))}
      </div>

      {/* 결과 없음 */}
      {query.trim() !== '' && results.length === 0 && (
        <p className='mt-4 text-gray-400'>검색 결과가 없습니다.</p>
      )}
    </div>
  );
};

export default KeyboardsSearchBar;
