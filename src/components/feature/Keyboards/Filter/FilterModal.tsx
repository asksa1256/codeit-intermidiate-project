// 모바일/태블릿용 필터 모달
'use client';

import { Radio, RadioGroup, Transition, TransitionChild } from '@headlessui/react';
import { useEffect } from 'react';

import CloseIcon from '@/assets/icons/CloseIcon.svg';
import ButtonDefault from '@/components/ui/ButtonDefault';
import FilterRating from '@/components/ui/FilterRating';
import MultihandleSlider from '@/components/ui/RangeSlider/MultihandleSlider';
import useOutsideClick from '@/hooks/useClickOutside';
import useWindowWidth from '@/hooks/useWindowWidth';
import { cn } from '@/utils/style';

import FilterCheckbox from './FilterCheckbox';
import FilterFooterButton from './FilterFooterButton';

import type { KeyboardCategoryType } from '@/types/keyboardTypes';

interface FilterModalProps {
  open: boolean;
  onClose: (trigger: boolean) => void;
  selectedType: KeyboardCategoryType | null;
  onToggleType: (type: KeyboardCategoryType) => void;
  onReset: () => void;
  onApply: () => void;
  priceRange: [number, number];
  onChangePrice: (range: [number, number]) => void;
  selectedRating: number | null;
  onChangeRating: (value: number | null) => void;
  setKeyboardOpen: (toggle: boolean) => void;
}

const KEYBOARD_TYPE = [
  { name: '기계식', value: 'RED' },
  { name: '멤브레인', value: 'WHITE' },
  { name: '펜타그래프', value: 'SPARKLING' },
];

const FilterModal = ({
  open,
  onClose,
  selectedType,
  onToggleType,
  onReset,
  onApply,
  priceRange,
  onChangePrice,
  selectedRating,
  onChangeRating,
  setKeyboardOpen,
}: FilterModalProps) => {
  const innerWidth = useWindowWidth();
  const isWeb = innerWidth > 1280;
  const isModalOpenOrWeb = open || isWeb;
  const handleClose = () => {
    if (isWeb) return;
    onClose(false);
  };
  const ref = useOutsideClick(handleClose);

  useEffect(() => {
    const htmlElement = document.documentElement;
    if (open) {
      htmlElement.classList.add('modal-open');
    } else {
      htmlElement.classList.remove('modal-open');
    }
  }, [open]);

  useEffect(() => {
    if (open && isWeb) {
      onClose(false);
    }
  }, [isWeb, open, onClose]);

  return (
    <>
      <Transition show={isModalOpenOrWeb} appear={isWeb}>
        <div className='fixed top-0 left-0 h-dvh w-full z-50 flex items-end justify-center md:items-center lg:static lg:block lg:w-[300px] lg:h-auto lg:shrink-0 lg:bg-transparent lg:z-auto lg:pb-4'>
          <TransitionChild>
            <div
              className={cn(
                'absolute top-0 left-0 w-full h-full bg-black/30 backdrop-blur-sm lg:hidden',
                'transition duration-300 ease-in data-closed:opacity-0 data-closed:delay-100',
              )}
            />
          </TransitionChild>
          <TransitionChild>
            <div
              className={cn(
                'flex flex-col w-full max-h-[85dvh] bg-white rounded-t-2xl z-[1] md:max-w-[375px] md:rounded-2xl md:overflow-hidden lg:rounded-none lg:max-h-none lg:overflow-visible',
                'transition duration-300 delay-100 data-closed:delay-0 data-closed:translate-y-full md:data-closed:translate-y-0 md:data-closed:scale-[0.9] md:data-closed:opacity-0 lg:duration-0 lg:transition-none',
              )}
              ref={ref}
            >
              {/* filter modal header */}
              <div className='flex justify-between shrink-0 p-6 pb-0 mb-8 lg:hidden'>
                <h3 className='text-xl font-bold'>필터</h3>
                <button type='button' onClick={handleClose}>
                  <CloseIcon className='w-6 h-6 text-gray-500 hover:text-gray-700' />
                </button>
              </div>
              {/* filter modal body */}
              <div className='flex flex-col w-full max-h-[85dvh] bg-white rounded-t-2xl overflow-hidden md:rounded-2xl'>
                <div className='p-6 pt-0 grow-1 overflow-y-auto lg:p-0'>
                  {/* 키보드 타입 필터 */}
                  <section>
                    <h3 className='text-xl font-bold uppercase'>types</h3>
                    <div className='mt-[18px]'>
                      <RadioGroup
                        value={selectedType}
                        onChange={onToggleType}
                        className='flex gap-[10px] flex-wrap'
                      >
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
                      {/* <FilterCheckbox
                        label='멤브레인'
                        value='WHITE'
                        isChecked={selectedType === 'WHITE'}
                        onChange={onToggleType}
                      />
                      <FilterCheckbox
                        label='기계식'
                        value='RED'
                        isChecked={selectedType === 'RED'}
                        onChange={onToggleType}
                      />
                      <FilterCheckbox
                        label='펜타그래프'
                        value='SPARKLING'
                        isChecked={selectedType === 'SPARKLING'}
                        onChange={onToggleType}
                      /> */}
                    </div>
                  </section>

                  {/* 가격 슬라이더 필터 */}
                  <section className='mt-6 pt-6 border-t border-gray-100 lg:mt-15 lg:pt-0 lg:border-white'>
                    <h3 className='text-xl font-bold uppercase'>price</h3>
                    <div className='mt-5 pl-[20px]'>
                      <MultihandleSlider
                        value={priceRange}
                        onChange={onChangePrice}
                        className='lg:w-[80%]'
                      />
                    </div>
                  </section>

                  {/* 평점 필터 */}
                  <section className='mt-6 pt-6 border-t border-gray-100 lg:mt-15 lg:pt-0 lg:border-none'>
                    <h3 className='text-xl font-bold uppercase'>rating</h3>
                    <div className='mt-[10px]'>
                      <FilterRating value={selectedRating} onChange={onChangeRating} />
                    </div>
                  </section>
                </div>
                <div className='shrink-0 m-6 lg:m-0 lg:mt-15'>
                  <FilterFooterButton onReset={onReset} onApply={onApply} />
                  <ButtonDefault
                    onClick={() => setKeyboardOpen(true)}
                    className='hidden w-full h-[50px] mt-4 font-bold lg:block'
                  >
                    키보드 등록하기
                  </ButtonDefault>
                </div>
              </div>
            </div>
          </TransitionChild>
        </div>
      </Transition>
    </>
  );
};

export default FilterModal;
