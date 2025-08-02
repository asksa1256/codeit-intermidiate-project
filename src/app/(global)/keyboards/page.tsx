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
import SliderSection from '@/components/feature/Slider/SliderSection';
import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import LoadingSpinner from '@/components/ui/LoadingSpinner';
import ScrollLoading from '@/components/ui/ScrollLoading';
import { TEAM_ID } from '@/constants';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiClient } from '@/lib/api/apiClient';

import type { KeyboardItemType, KeyboardCategoryType } from '@/types/keyboardTypes';

const LIST_LIMIT = 10;

const getKeyboardList = async (queryString: string) => {
  const q = queryString ? `&${queryString}` : '';
  const res = await apiClient.get(`/${TEAM_ID}/wines?limit=${LIST_LIMIT}${q}`);
  return res.data;
};

const KeyboardsPage = () => {
  const [items, setItems] = useState<KeyboardItemType[] | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const [selectedType, setSelectedType] = useState<KeyboardCategoryType | null>(null); // 키보드 타입 필터용
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 300000]); // 가격 슬라이더 필터용
  const [selectedRating, setSelectedRating] = useState<number | null>(null); // 평점 필터용

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

  const [cursor, setCursor] = useState<number | null>(null); // 일반 무한 스크롤용
  const [totalCount, setTotalCount] = useState<number>(0);
  const [query, setQuery] = useState('');

  const router = useRouter();

  const ScrollLimit = 10; // 스크롤 시 불러올 데이터 개수

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

  const isFiltering =
    selectedType !== null || priceRange[0] > 0 || priceRange[1] < 300000 || selectedRating !== null;

  const emptyMessage = isFiltering
    ? '선택한 필터 조건에 맞는 키보드가 없습니다.'
    : '검색 결과가 없습니다.';

  // 필터 초기화 버튼 함수
  const handleResetFilters = () => {
    setSelectedType(null);
    setPriceRange([0, 300000]);
    setSelectedRating(null);
  };

  const getQueryString = () => {
    const params = new URLSearchParams();

    const [min, max] = priceRange;

    if (selectedType) params.append('type', selectedType); // type
    if (min !== 0) params.append('minPrice', String(min)); // minPrice
    if (max !== 300000) params.append('maxPrice', String(max)); // maxPrice
    if (selectedRating) params.append('rating', String(selectedRating)); // rating
    if (query) params.append('name', query); // name 검색어

    return params.toString();
  };

  // 필터 적용 버튼 함수
  const handleApplyFilters = async () => {
    const q = getQueryString();

    try {
      setIsLoading(true);
      const { list, nextCursor, totalCount } = await getKeyboardList(q);

      // 필터 변경 시 기존 데이터, 커서 초기화
      setItems(list);
      setCursor(nextCursor ?? null);
      setIsFilterOpen(false);
      setTotalCount(totalCount);
    } catch (error) {
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  // 키보드 타입 필터 라디오 함수
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

  // 기본 키보드 데이터 요청
  useEffect(() => {
    const fetchItems = async () => {
      try {
        setIsLoading(true);
        const res = await apiClient.get(`/${TEAM_ID}/wines`, {
          params: { limit: ScrollLimit },
        });

        const dataArray: KeyboardItemType[] = res.data.list || [];
        setItems(dataArray);
        setCursor(res.data.nextCursor);
        setTotalCount(res.data.totalCount);
      } catch (err) {
        console.error('기본 데이터 호출 실패:', err);
      } finally {
        setIsLoading(false);
      }
    };

    fetchItems();
  }, []);

  // 무한 스크롤
  const fetchMoreItems = async () => {
    if (cursor === null) return;

    const q = getQueryString();

    try {
      const res = await apiClient.get(`/${TEAM_ID}/wines?${q}`, {
        params: { limit: ScrollLimit, cursor },
      });

      const dataArray: KeyboardItemType[] = res.data.list || [];
      setItems((prev) => [...(prev ?? []), ...dataArray]);
      setCursor(res.data.nextCursor);
      setTotalCount(res.data.totalCount);
    } catch (err) {
      console.error('기본 데이터 호출 실패:', err);
    }
  };

  const targetRef = useIntersectionObserver(() => {
    fetchMoreItems();
  });

  return (
    <div className='px-4 pt-[15px] pb-[100px] m-auto max-w-[1140px] md:pt-5 md:pb-[50px] md:px-5 lg:px-0'>
      <SliderSection />
      <div>
        {/* 검색 영역 :: S */}
        <div className='flex gap-4 mt-5'>
          {/* 필터 열기 버튼 - 모바일/태블릿에서만 */}
          <FilterOpenButton onClick={() => setIsFilterOpen(true)} />
          {/* 검색창 */}
          <KeyboardsSearchBar
            query={query}
            onChange={setQuery}
            handleApplyFilters={handleApplyFilters}
          />
          {/* 키보드 등록 버튼 */}
          <ButtonDefault
            onClick={() => setKeyboardOpen(true)}
            className='fixed bottom-[35px] left-4 right-4 w-auto h-12 text-md font-bold rounded-xl z-10 md:static md:w-[220px] md:rounded-2xl md:text-base md:shrink-0 md:z-auto lg:hidden'
          >
            키보드 등록하기
          </ButtonDefault>
        </div>
        {/* 검색 영역 :: E */}

        {/* 하단 영역 :: S */}
        <div className='flex items-start gap-10 mt-6'>
          {/* 필터 영역 :: S */}
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
            setKeyboardOpen={setKeyboardOpen}
          />

          {/* 리스트 영역 :: S */}
          <div className='grow-1'>
            {!items ? (
              <LoadingSpinner />
            ) : items.length === 0 ? (
              <EmptyList desc={emptyMessage} />
            ) : (
              items.map((item) => (
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
              ))
            )}
            <ScrollLoading
              endRef={targetRef}
              hasNextPage={items?.length !== totalCount && cursor !== null}
            />
          </div>
        </div>
        {/* 하단 영역 :: E */}

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
    </div>
  );
};

export default KeyboardsPage;
