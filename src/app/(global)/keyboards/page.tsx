// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import FilterModal from '@/components/feature/Keyboards/Filter/FilterModal';
import FilterOpenButton from '@/components/feature/Keyboards/Filter/FilterOpenButton';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import KeyboardsSearchBar from '@/components/feature/Keyboards/KeyboardsSearchBar';
import EmptyList from '@/components/ui/EmptyList';

import type { KeyboardItemType, KeyboardCategoryType } from '@/types/keyboardTypes';

interface FilterParams {
  teamId: string;
  limit: number;
  cursor?: number;
  type?: KeyboardCategoryType;
  minPrice?: number;
  maxPrice?: number;
  rating?: number;
  name?: string;
}

const KeyboardsPage = () => {
  const [items, setItems] = useState<KeyboardItemType[]>([]);
  const [searchResults, setSearchResults] = useState<KeyboardItemType[] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedTypes, setSelectedTypes] = useState<KeyboardCategoryType[]>([]); // 키보드 타입 필터용
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]); // 가격 슬라이더 필터용
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // 평점 필터용
  const INITIAL_SELECTED_TYPES: KeyboardCategoryType[] = [];

  const dataToRender = searchResults && searchResults.length > 0 ? searchResults : items;

  const isSearching = searchResults !== null;
  const isSearchEmpty = isSearching && searchResults?.length === 0;

  // 필터 초기화 버튼 함수
  const handleResetFilters = () => {
    console.log('필터 초기화');
    setSelectedTypes(INITIAL_SELECTED_TYPES);
    setPriceRange([0, 300000]);
    setSelectedRating(null);
  };

  // 필터 적용 버튼 함수
  const handleApplyFilters = async () => {
    try {
      console.log('필터 적용하기');
      setIsFilterOpen(false); // 모달 닫기

      const params: FilterParams = {
        teamId: '16-3',
        limit: 20,
      };

      if (selectedTypes.length > 0) {
        // 여러 타입 중 첫 번째만 전송 (API가 단일 타입만 받는 경우)
        params.type = selectedTypes[0];
      }

      if (priceRange[0] > 0) {
        params.minPrice = priceRange[0];
      }

      if (priceRange[1] < 300000) {
        params.maxPrice = priceRange[1];
      }

      if (selectedRating !== null) {
        params.rating = selectedRating;
      }

      const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', {
        params,
      });

      const filteredList = res.data.list || [];
      setSearchResults(filteredList);
    } catch (error) {
      console.error('필터 적용 실패:', error);
    }
  };

  // 키보드 타입 필터 체크박스 함수
  const handleToggle = (type: KeyboardCategoryType) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type],
    );
  };
  // 가격 슬라이더 함수
  const handlePriceChange = ([min, max]: [number, number]) => {
    setPriceRange([min, max]);
  };

  // 평점 필터 함수
  const handleRatingChange = (value: number | null) => {
    setSelectedRating(value);
  };

  useEffect(() => {
    const fetchItems = async () => {
      try {
        const res = await axios.get('https://winereview-api.vercel.app/16-3/wines', {
          params: { limit: 20 },
        });

        const dataArray: KeyboardItemType[] = res.data.list || [];
        setItems(dataArray);
      } catch (err) {
        console.error('기본 데이터 호출 실패:', err);
      }
    };

    fetchItems();
  }, []);

  return (
    <div className='p-4'>
      {/* 검색창 */}
      <KeyboardsSearchBar onSearchResults={setSearchResults} />

      {/* 필터 열기 버튼 - 모바일/태블릿에서만 */}
      <div className='block lg:hidden'>
        <FilterOpenButton onClick={() => setIsFilterOpen(true)} />
      </div>

      {/* 필터 모달 */}
      <FilterModal
        open={isFilterOpen}
        onClose={() => setIsFilterOpen(false)}
        selectedTypes={selectedTypes}
        onToggleType={handleToggle}
        onReset={handleResetFilters}
        onApply={handleApplyFilters}
        priceRange={priceRange}
        onChangePrice={handlePriceChange}
        selectedRating={selectedRating}
        onChangeRating={handleRatingChange}
      />

      {/* 검색 결과 */}
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
