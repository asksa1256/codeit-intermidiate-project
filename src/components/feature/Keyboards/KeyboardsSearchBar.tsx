// 목록 페이지 검색바 컴포넌트
'use client';

import { useImperativeHandle, useRef } from 'react';

import { KeyboardListQueryParams } from '@/components/feature/Keyboards/KeyboardBottom';

export interface KeyboardsSearchBarHandle {
  resetInput: () => void;
}
interface KeyboardsSearchBarProps {
  handleApplyFilters: (value: Partial<KeyboardListQueryParams>) => void;
  ref: React.ForwardedRef<KeyboardsSearchBarHandle>;
}

const KeyboardsSearchBar = ({ handleApplyFilters, ref }: KeyboardsSearchBarProps) => {
  const searchRef = useRef<HTMLInputElement | null>(null);

  useImperativeHandle(ref, () => {
    return {
      resetInput() {
        if (searchRef.current) {
          searchRef.current.value = '';
        }
      },
    };
  }, []);

  // 검색 트리거 이벤트
  const handleTriggerSearch = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (!searchRef.current) return;
    if (e.key !== 'Enter') return;
    handleApplyFilters({ name: searchRef.current.value.trim() });
  };

  return (
    <>
      {/* 검색바 */}
      <>
        <input
          type='text'
          ref={searchRef}
          onKeyDown={handleTriggerSearch}
          placeholder='키보드를 검색해보세요'
          className='h-[38px] border border-gray-300 rounded-[50px] grow-1 pl-[45px] pr-[15px] bg-[url(/images/SearchIcon.svg)] bg-position-[center_left_15px] bg-no-repeat text-md outline-none focus:ring-2 focus:ring-primary hover:border-primary md:h-12 md:pl-[55px] md:pr-5 md:bg-position-[center_left_20px] md:text-base lg:max-w-200 lg:ml-auto'
        />
      </>
    </>
  );
};

export default KeyboardsSearchBar;
