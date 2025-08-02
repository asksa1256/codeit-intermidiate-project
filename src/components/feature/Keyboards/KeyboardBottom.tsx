'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useRef, useState } from 'react';

import KeyboardForm from '@/components/feature/Form/KeyboardForm';
import { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import FilterContent from '@/components/feature/Keyboards/Filter/FilterContent';
import FilterOpenButton from '@/components/feature/Keyboards/Filter/FilterOpenButton';
import KeyboardList from '@/components/feature/Keyboards/KeyboardList';
import KeyboardsSearchBar, {
  KeyboardsSearchBarHandle,
} from '@/components/feature/Keyboards/KeyboardsSearchBar';
import Modal from '@/components/feature/Modal';
import MyListLoading from '@/components/feature/myProfile/MyListLoading';
import ButtonDefault from '@/components/ui/ButtonDefault';
import { TEAM_ID } from '@/constants';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import useIntersectionObserver from '@/hooks/useIntersectionObserver';
import { apiClient } from '@/lib/api/apiClient';

import type { KeyboardItemType, KeyboardCategoryType } from '@/types/keyboardTypes';

const LIST_LIMIT = 10;

const getKeyboardList = async (queryString: string, cursor?: number | null) => {
  const q = queryString ? `&${queryString}` : '';
  const cursorString = cursor ? `&cursor=${cursor}` : '';
  const res = await apiClient.get(`/${TEAM_ID}/wines?limit=${LIST_LIMIT}${q}${cursorString}`);
  return res.data;
};

export interface KeyboardListQueryParams {
  type: KeyboardCategoryType | null;
  minPrice: number;
  maxPrice: number;
  rating: number | null;
  name: string;
}

const INIT_QUERY_STRING = {
  type: null,
  minPrice: 0,
  maxPrice: 300000,
  rating: null,
  name: '',
};

const KeyboardBottom = () => {
  const [keyboardList, setKeyboardList] = useState<KeyboardItemType[] | null>(null);
  const [cursor, setCursor] = useState<number | null>(0);
  const [totalCount, setTotalCount] = useState<number>(0);

  const searchBarRef = useRef<KeyboardsSearchBarHandle>(null);
  const [queryString, setQueryString] = useState<KeyboardListQueryParams>(INIT_QUERY_STRING);

  const [isLoading, setIsLoading] = useState(false);

  const [isFilterOpen, setIsFilterOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);

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

  const getQueryString = (value: Partial<KeyboardListQueryParams> | undefined = queryString) => {
    const params = new URLSearchParams();

    const newQueryString = {
      ...queryString,
      ...value,
    };

    setQueryString(newQueryString);

    const { type, minPrice, maxPrice, rating, name } = newQueryString;

    if (type) params.append('type', type); // type
    if (minPrice !== 0) params.append('minPrice', String(minPrice)); // minPrice
    if (maxPrice !== 300000) params.append('maxPrice', String(maxPrice)); // maxPrice
    if (rating) params.append('rating', String(rating)); // rating
    if (name) params.append('name', name); // name 검색어

    return params.toString();
  };

  // 필터 초기화 버튼 함수
  const handleResetFilters = () => {
    setQueryString(INIT_QUERY_STRING);
    searchBarRef.current?.resetInput();
    fetchKeyboardList(INIT_QUERY_STRING);
  };

  // 초기 데이터 / 필터링 데이터 api 함수
  const fetchKeyboardList = async (value: Partial<KeyboardListQueryParams> = INIT_QUERY_STRING) => {
    if (isLoading) return;

    try {
      setIsLoading(true);
      const q = getQueryString(value);
      const data = await getKeyboardList(q);

      const { list, nextCursor, totalCount } = data;

      const dataArray: KeyboardItemType[] = list || [];
      setKeyboardList(dataArray);
      setCursor(nextCursor);
      setTotalCount(totalCount);
    } catch (err) {
      console.error('데이터 호출 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  // 무한 스크롤용
  const fetchMoreKeyboardList = async () => {
    if (cursor === null) return;
    if (isLoading) return;

    try {
      setIsLoading(true);
      const q = getQueryString();
      const data = await getKeyboardList(q, cursor);

      const { list, nextCursor, totalCount } = data;

      const dataArray: KeyboardItemType[] = list || [];
      setKeyboardList((prev) => [...(prev ?? []), ...dataArray]);
      setCursor(nextCursor);
      setTotalCount(totalCount);
    } catch (err) {
      console.error('데이터 호출 실패:', err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchKeyboardList();
  }, []);

  const targetRef = useIntersectionObserver(fetchMoreKeyboardList);

  if (keyboardList === null) return <MyListLoading />;

  return (
    <div>
      {/* 검색 영역 :: S */}
      <div className='flex gap-4 mt-5'>
        {/* 필터 열기 버튼 - 모바일/태블릿에서만 */}
        <FilterOpenButton onClick={() => setIsFilterOpen(true)} />
        {/* 검색창 */}
        <KeyboardsSearchBar handleApplyFilters={fetchKeyboardList} ref={searchBarRef} />
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
        <FilterContent
          open={isFilterOpen}
          onClose={() => setIsFilterOpen(false)}
          onReset={handleResetFilters}
          onApply={fetchKeyboardList}
          setKeyboardOpen={setKeyboardOpen}
        />

        {/* 리스트 영역 :: S */}
        <div className='grow-1'>
          <KeyboardList
            keyboardList={keyboardList}
            endRef={targetRef}
            hasNextPage={keyboardList.length !== totalCount && cursor !== null}
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
  );
};

export default KeyboardBottom;
