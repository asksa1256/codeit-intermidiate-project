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
      const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', {
        params: { search: cleanQuery, limit: 100 },
      });

      const dataArray: KeyboardItem[] = res.data.list || [];

      // 1) 필터링
      const filtered = dataArray.filter((item) => item.name.toLowerCase().includes(cleanQuery));

      // 2) indexOf 문자가 먼저 포함된 아이템부터 정렬
      filtered.sort((a, b) => {
        const aPos = a.name.toLowerCase().indexOf(cleanQuery);
        const bPos = b.name.toLowerCase().indexOf(cleanQuery);
        return aPos - bPos;
      });

      setResults(filtered);
    } catch (err) {
      console.error('검색 중 오류 발생:', err);
    }
  };

  return (
    <div className='p-4'>
      {/* 검색바 */}
      <section
        className='className="
            flex items-center
            w-[343px] h-[38px]
            md:w-[704px] md:h-[48px]
            lg:w-[400px] lg:h-[48px]
            rounded-full border border-gray-300 bg-white px-[15px]
          "'
      >
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
      </section>

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
