// 키보드 목록 페이지
'use client';

import axios from 'axios';
import { useEffect, useState } from 'react';

import FilterFooterButton from '@/components/feature/Keyboards/Filter/FilterFooterButton';
import FilterOpenButton from '@/components/feature/Keyboards/Filter/FilterOpenButton';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import KeyboardsSearchBar from '@/components/feature/Keyboards/KeyboardsSearchBar';
import Modal from '@/components/feature/Modal';
import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import FilterRating from '@/components/ui/FilterRating';
import MultihandleSlider from '@/components/ui/RangeSlider/MultihandleSlider';

import type { KeyboardItemType } from '@/types/keyboardTypes';

const KeyboardsPage = () => {
  const [items, setItems] = useState<KeyboardItemType[]>([]);
  const [searchResults, setSearchResults] = useState<KeyboardItemType[] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const dataToRender = searchResults && searchResults.length > 0 ? searchResults : items;

  const isSearching = searchResults !== null;
  const isSearchEmpty = isSearching && searchResults?.length === 0;

  // 필터 초기화
  const handleResetFilters = () => {
    console.log('필터 초기화');
    // 여기에 필터 상태 초기화 로직이 들어갈 예정
  };

  // 필터 적용
  const handleApplyFilters = () => {
    console.log('필터 적용하기');
    setIsFilterOpen(false);
    // 필터 적용 로직은 나중에 연결
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
      <h1 className='text-2xl font-bold mb-4'>키보드 페이지</h1>

      {/* 검색창 */}
      <KeyboardsSearchBar onSearchResults={setSearchResults} />

      {/* 필터 열기 버튼 - 모바일/태블릿에서만 */}
      <div className='block lg:hidden'>
        <FilterOpenButton onClick={() => setIsFilterOpen(true)} />
      </div>

      {/* 필터 모달 */}
      <Modal open={isFilterOpen} onClose={() => setIsFilterOpen(false)} title='필터'>
        <div className='p-4 text-gray-700'>{/* 필터 UI 영역 (예: <FilterSidebar />) */}</div>
        <div className='w-[327px] h-[590px] p-4 flex flex-col gap-y-6 text-gray-800'>
          {/* 키보드 타입 필터 */}
          <section>
            <h3 className='text-[16px] leading-[26px] font-semibold text-gray-800'>
              KEYBOARD TYPES
            </h3>
            <div className='flex gap-[10px] mt-[44px]'>
              <ButtonDefault className='w-auto h-[32px] px-4 rounded-full text-md font-medium bg-primary text-white'>
                멤브레인
              </ButtonDefault>
              <ButtonDefault className='w-auto h-[32px] px-4 rounded-full text-md font-medium bg-white text-primary border border-primary'>
                기계식
              </ButtonDefault>
              <ButtonDefault className='w-auto h-[32px] px-4 rounded-full text-md font-medium bg-white text-primary border border-primary'>
                펜타그래프
              </ButtonDefault>
            </div>
          </section>
          <div className='w-full h-px bg-gray-100' />
          {/* 가격 슬라이더 필터*/}
          <section>
            <h3 className='text-xl font-semibold mb-2'>PRICE</h3>
            <div className='flex justify-between text-xs text-gray-500 mt-1'>
              <MultihandleSlider
                valueUpdater={(min, max) => {
                  console.log(min, max);
                }}
              />
            </div>
          </section>
          <div className='w-full h-px bg-gray-100' />
          {/* 평점 필터 */}
          <section>
            <h3 className='text-xl font-semibold mb-2'>RATING</h3>
            <div className='flex flex-col gap-1'>
              <FilterRating />
            </div>
          </section>
        </div>

        <div className='px-4 pb-4'>
          <FilterFooterButton onReset={handleResetFilters} onApply={handleApplyFilters} />
        </div>
      </Modal>

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
