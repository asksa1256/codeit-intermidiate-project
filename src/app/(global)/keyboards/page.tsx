// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import KeyboardsSearchBar from '@/components/feature/Keyboards/KeyboardsSearchBar';
import EmptyList from '@/components/ui/EmptyList';

import type { KeyboardItemType } from '@/types/keyboardTypes';

interface FetchParams {
  limit: number;
  cursor?: number;
}

const KeyboardsPage = () => {
  const [items, setItems] = useState<KeyboardItemType[]>([]);
  const [searchResults, setSearchResults] = useState<KeyboardItemType[] | null>(null);
  const dataToRender = searchResults && searchResults.length > 0 ? searchResults : items;

  const isSearching = searchResults !== null;
  const isSearchEmpty = isSearching && searchResults?.length === 0;

  // 커서를 돌리며 키보드 리스트 불러오기
  useEffect(() => {
    const fetchAllItems = async () => {
      try {
        let cursor: number | null = null;
        let allItems: KeyboardItemType[] = [];

        while (true) {
          const params: FetchParams = { limit: 20 };
          if (cursor !== null) params.cursor = cursor;

          const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', { params });

          const dataArray: KeyboardItemType[] = res.data.list || [];
          allItems = [...allItems, ...dataArray];

          // nextCursor가 없으면 끝
          if (res.data.nextCursor == null) break;
          cursor = res.data.nextCursor;
        }

        setItems(allItems);
      } catch (err) {
        console.error('기본 데이터 호출 실패:', err);
      }
    };

    fetchAllItems();
  }, []);

  return (
    <div className='p-4'>
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>
      {/* 검색창: 검색 결과를 setSearchResults로 전달 */}
      <KeyboardsSearchBar onSearchResults={setSearchResults} />
      {isSearchEmpty ? (
        <EmptyList desc='검색 결과가 없습니다.' />
      ) : (
        <div className='mt-4 grid grid-cols-1 gap-4 md:gap-6 lg:gap-8'>
          {dataToRender.map((item) => (
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
      )}
    </div>
  );
};

export default KeyboardsPage;
