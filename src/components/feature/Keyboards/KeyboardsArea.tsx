'use client';

import Image from 'next/image';
import Link from 'next/link';

import { useState } from 'react';

import FilterModalBack from '@/components/feature/Keyboards/Filter/FilterModalBack';
import Modal from '@/components/feature/Modal';
import ButtonDefault from '@/components/ui/ButtonDefault';
import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import StarRating from '@/components/ui/StarRating';

import IndexKeyboardsCard from './IndexKeyboardsCard';

const KeyboardsArea = () => {
  const [isFilterModal, setIsFilterModal] = useState(false); // 필터 모달
  const [isKeyboardModal, setIsKeyboardModal] = useState(false); // 키보드 등록 모달

  // 아마 여기서 리스트 api
  const [items, setItems] = useState<KeyboardItemType[] | null>(null);
  const [searchResults, setSearchResults] = useState<KeyboardItemType[] | null>(null);
  const [selectedType, setSelectedType] = useState<KeyboardCategoryType | null>(null);
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]);
  const [selectedRating, setSelectedRating] = useState<number | null>(null);

  const dataToRender = searchResults && searchResults.length > 0 ? searchResults : items;

  const isSearching = searchResults !== null;
  const isSearchEmpty = isSearching && searchResults?.length === 0;

  const isFiltering =
    selectedType !== null || priceRange[0] > 0 || priceRange[1] < 300000 || selectedRating !== null;

  const emptyMessage = isFiltering
    ? '선택한 필터 조건에 맞는 키보드가 없습니다.'
    : '검색 결과가 없습니다.';

  return (
    <div>
      {/* 검색 영역 :: S */}
      <div className='flex gap-4 mt-5'>
        {/* FilterOpenButton :: S */}
        <button
          type='button'
          className='w-[38px] border border-gray-300 aspect-square rounded-lg shrink-0 grow-0 basis-auto md:w-12 lg:hidden'
          onClick={() => {
            setIsFilterModal(true);
          }}
        >
          <Image
            src='/images/FilterIcon.svg'
            alt='필터 열기'
            width={22}
            height={22}
            className='w-[22px] h-[22px] m-auto md:w-[26px] md:h-[26px]'
          />
        </button>

        <input
          type='text'
          name='name' // 검색 쿼리스트링 스웨거 스키마
          placeholder='키보드를 검색해 보세요'
          className='h-[38px] border border-gray-300 rounded-[50px] grow-1 pl-[45px] pr-[15px] bg-[url(/images/SearchIcon.svg)] bg-position-[center_left_15px] bg-no-repeat text-md outline-none focus:ring-2 focus:ring-primary hover:border-primary md:h-12 md:pl-[55px] md:pr-5 md:bg-position-[center_left_20px] md:text-base lg:max-w-200 lg:ml-auto'
        />

        {/* 키보드 등록하기 버튼 :: S */}
        <ButtonDefault
          onClick={() => setIsKeyboardModal(true)}
          className='fixed bottom-[35px] left-4 right-4 w-auto h-12 text-md font-bold rounded-xl z-10 md:static md:w-[220px] md:rounded-2xl md:text-base md:shrink-0 md:z-auto lg:hidden'
        >
          키보드 등록하기
        </ButtonDefault>
        {/* 키보드 등록하기 버튼 :: E */}
      </div>
      {/* 검색 영역 :: E */}

      {/* 하단 영역 :: S */}
      <div className='flex items-start gap-10 mt-6'>
        {/* 필터 영역 :: S */}
        <FilterModalBack open={isFilterModal} onClose={setIsFilterModal} />
        {/* 필터 영역 :: E */}
        {/* 리스트 영역 :: S */}
        <div className='grow-1'>
          {/* 키보드 카드 영역 :: S */}
          {dataToRender?.map((item) => (
            <IndexKeyboardsCard
              key={item.id}
              name={item.name}
              region={item.region}
              image={item.image}
              price={item.price}
              avgRating={item.avgRating}
              reviewCount={item.reviewCount}
              recentReview={item.recentReview}
              keyboardId={item.id}
            />
          ))}
          {/* 키보드 카드 영역 :: E */}
        </div>
        {/* 리스트 영역 :: E */}
      </div>
      {/* 하단 영역 :: E */}

      {/* 키보드 등록하기 :: S */}
      <Modal open={isKeyboardModal} onClose={() => setIsKeyboardModal(false)}>
        여기에 키보드 등록하기 폼 모달 들어갈 예정
      </Modal>
      {/* 키보드 등록하기 :: E */}
    </div>
  );
};

export default KeyboardsArea;
