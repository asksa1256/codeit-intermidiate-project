'use client';

import Modal from '@/components/feature/Modal';
import FilterRating from '@/components/ui/FilterRating';
import MultihandleSlider from '@/components/ui/RangeSlider/MultihandleSlider';

import FilterCheckbox from './FilterCheckbox';
import FilterFooterButton from './FilterFooterButton';

import type { KeyboardCategoryType } from '@/types/keyboardTypes';

interface FilterModalProps {
  open: boolean;
  onClose: () => void;
  selectedTypes: KeyboardCategoryType[];
  onToggleType: (type: KeyboardCategoryType) => void;
  onReset: () => void;
  onApply: () => void;
}

const FilterModal = ({
  open,
  onClose,
  selectedTypes,
  onToggleType,
  onReset,
  onApply,
}: FilterModalProps) => {
  return (
    <Modal open={open} onClose={onClose} title='필터'>
      <div className='p-4 text-gray-700' />

      <div className='w-[327px] h-[590px] p-4 flex flex-col gap-y-6 text-gray-800'>
        {/* 키보드 타입 필터 */}
        <section>
          <h3 className='text-[16px] leading-[26px] font-semibold text-gray-800'>KEYBOARD TYPES</h3>
          <div className='w-[296px] flex gap-[10px] mt-[34px]'>
            <FilterCheckbox
              label='멤브레인'
              value='WHITE'
              isChecked={selectedTypes.includes('WHITE')}
              onChange={onToggleType}
            />
            <FilterCheckbox
              label='기계식'
              value='RED'
              isChecked={selectedTypes.includes('RED')}
              onChange={onToggleType}
            />
            <FilterCheckbox
              label='펜타그래프'
              value='SPARKLING'
              isChecked={selectedTypes.includes('SPARKLING')}
              onChange={onToggleType}
            />
          </div>
        </section>

        <div className='w-full h-px bg-gray-100' />

        {/* 가격 슬라이더 필터 */}
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

      <div className='flex justify-center'>
        <FilterFooterButton onReset={onReset} onApply={onApply} />
      </div>
    </Modal>
  );
};

export default FilterModal;
