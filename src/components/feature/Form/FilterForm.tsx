'use client';

import { Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

import ButtonDefault from '@/components/ui/ButtonDefault';
import FilterRating from '@/components/ui/FilterRating';
import MultihandleSlider from '@/components/ui/RangeSlider/MultihandleSlider';

const KEYBOARD_TYPE = [
  { name: '기계식', value: 'RED' },
  { name: '멤브레인', value: 'WHITE' },
  { name: '펜타그래프', value: 'SPARKLING' },
];

const FilterForm = () => {
  const [keyboardType, setKeyboardType] = useState<string | null>(null); // 임시로 추가한 상태. page 컴포넌트에서 프롭스로 내려주는 selectedType, setSelectedType 타입 사용해주시면 될거 같아요!

  return (
    <>
      {/* TYPES */}
      <div>
        <h3 className='text-xl font-bold uppercase'>types</h3>
        <div className='mt-[18px]'>
          <RadioGroup
            value={keyboardType}
            onChange={setKeyboardType}
            className='flex gap-[10px] flex-wrap'
          >
            {/* RadioGroup의 value와 Radio의 value가 매칭되면, checked 됩니다. */}
            {KEYBOARD_TYPE.map((plan) => (
              <Radio
                key={plan.value}
                value={plan.value}
                className='py-2 px-[18px] border border-gray-300 font-medium rounded-[100px] data-checked:border-primary data-checked:text-white data-checked:bg-primary cursor-pointer'
              >
                {plan.name}
              </Radio>
            ))}
          </RadioGroup>
        </div>
      </div>

      {/* PRICE */}
      <div className='mt-6 pt-6 border-t border-gray-100 lg:mt-15 lg:pt-0 lg:border-white'>
        <h3 className='text-xl font-bold uppercase'>price</h3>
        <div className='mt-5 pl-[20px]'>
          <MultihandleSlider
            valueUpdater={() => {}}
            initialRange={[0, 300000]}
            className='lg:w-[80%]'
          />
        </div>
      </div>

      {/* RATING */}
      <div className='mt-6 pt-6 border-t border-gray-100 lg:mt-15 lg:pt-0 lg:border-none'>
        <h3 className='text-xl font-bold uppercase'>rating</h3>
        <div className='mt-[10px]'>
          <FilterRating value={null} onChange={() => {}} />
        </div>
      </div>

      {/* Buttons */}
      <div className='flex gap-2 mt-10 lg:gap-3'>
        <ButtonDefault className='w-[96px] h-[54px] text-base font-bold shrink-0 rounded-xl text-primary bg-primary-10 hover:bg-primary-10 lg:h-[50px] lg:border lg:border-gray-300 lg:rounded-2xl lg:bg-white lg:text-gray-800 lg:hover:bg-white'>
          초기화
        </ButtonDefault>
        <ButtonDefault className='w-full h-[54px] text-base font-bold grow-1 rounded-xl lg:h-[50px] lg:rounded-2xl lg:text-primary lg:bg-primary-10 hover:bg-primary-10'>
          필터 적용하기
        </ButtonDefault>
      </div>
    </>
  );
};

export default FilterForm;
