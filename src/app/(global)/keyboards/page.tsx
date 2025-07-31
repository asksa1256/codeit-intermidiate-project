// 키보드 목록 페이지
'use client';

import { useRouter } from 'next/navigation';

import axios from 'axios';
import { useEffect, useState } from 'react';

import KeyboardForm from '@/components/feature/Form/KeyboardForm';
import { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import FilterModal from '@/components/feature/Keyboards/Filter/FilterModal';
import FilterOpenButton from '@/components/feature/Keyboards/Filter/FilterOpenButton';
import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import KeyboardsSearchBar from '@/components/feature/Keyboards/KeyboardsSearchBar';
import Modal from '@/components/feature/Modal';
import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import { TEAM_ID } from '@/constants';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import { apiClient } from '@/lib/api/apiClient';

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
  const [items, setItems] = useState<KeyboardItemType[] | null>(null);
  const [searchResults, setSearchResults] = useState<KeyboardItemType[] | null>(null);
  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [selectedType, setSelectedType] = useState<KeyboardCategoryType | null>(null); // 키보드 타입 필터용
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]); // 가격 슬라이더 필터용
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // 평점 필터용
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [tempInitialValues, setTempInitialValues] = useState<KeyboardFormValues>(); // 키보드 등록용

  const router = useRouter();

  const handleSubmit = async (formData: KeyboardFormValues) => {
    const payload = {
      ...formData,
      price: +formData.price,
      type: formData.type ?? KEYBOARD_TYPES_MAP[0].type,
    };

    // 키보드 등록 api
    try {
      const res = await apiClient.post(`/${TEAM_ID}/wines`, payload);
      const data = res?.data;

      router.replace(`/keyboards/${data.id}`);
    } catch (err) {
      throw err;
    }
  };

  useEffect(() => {
    const getValues = async () => {
      const res = await apiClient.get(`/${TEAM_ID}/wines/1398`);
      const data = res.data;

      const sanitizedData: KeyboardFormValues = {
        name: data.name,
        price: data.price,
        region: data.region,
        type: data.type,
        image: data.image,
      };

      setTempInitialValues(sanitizedData);
    };
    getValues();
  }, []);

  const dataToRender = searchResults && searchResults.length > 0 ? searchResults : items;

  const isSearching = searchResults !== null;
  const isSearchEmpty = isSearching && searchResults?.length === 0;

  const isFiltering =
    selectedType !== null || priceRange[0] > 0 || priceRange[1] < 300000 || selectedRating !== null;

  const emptyMessage = isFiltering
    ? '선택한 필터 조건에 맞는 키보드가 없습니다.'
    : '검색 결과가 없습니다.';

  // 필터 초기화 버튼 함수
  const handleResetFilters = () => {
    console.log('필터 초기화');
    setSelectedType(null);
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

      if (selectedType) {
        params.type = selectedType;
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
    setSelectedType((prev) => (prev === type ? null : type));
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
    <div className='px-4 pt-[15px] pb-[100px] m-auto max-w-[1140px] md:pt-5 md:pb-[50px] md:px-5 lg:px-0'>
      <div>슬라이드바 영역</div>
      <div className='flex gap-4 mt-5'>
        {/* 필터 열기 버튼 - 모바일/태블릿에서만 */}
        <FilterOpenButton onClick={() => setIsFilterOpen(true)} />
        {/* 키보드 등록하기 버튼 */}
        <KeyboardsSearchBar onSearchResults={setSearchResults} />
        <ButtonDefault
          onClick={() => setKeyboardOpen(true)}
          className='fixed bottom-[35px] left-4 right-4 w-auto h-12 text-md font-bold rounded-xl z-10 md:static md:w-[220px] md:rounded-2xl md:text-base md:shrink-0 md:z-auto lg:hidden'
        >
          키보드 등록하기
        </ButtonDefault>
        {/* 키보드 등록 모달 */}
        <Modal
          open={keyboardOpen}
          onClose={() => setKeyboardOpen(false)}
          title='키보드 등록'
          size='md'
          showCloseButton={true}
        >
          <KeyboardForm onSubmit={handleSubmit} onClose={() => setKeyboardOpen(false)} />
        </Modal>
      </div>

      {/* 하단 영역 시작 부분 */}
      <div className='flex items-start gap-10 mt-6'>
        {/* 필터 모달 영역 */}
        <FilterModal
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          selectedType={selectedType}
          onToggleType={handleToggle}
          onReset={handleResetFilters}
          onApply={handleApplyFilters}
          priceRange={priceRange}
          onChangePrice={handlePriceChange}
          selectedRating={selectedRating}
          onChangeRating={handleRatingChange}
        />

        {/* 검색 결과 dataToRender가 null이 아닐 때만 map을 실행 */}
        {isSearchEmpty ? (
          <EmptyList desc={emptyMessage} />
        ) : (
          <div className='grow-1'>
            {dataToRender &&
              dataToRender.map((item) => (
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
          </div>
        )}
      </div>
      {/* 하단영역 끝 부분 */}
    </div>
  );
};

export default KeyboardsPage;
