'use client';

import { Transition, TransitionChild } from '@headlessui/react';
import { useEffect, useState } from 'react';

import CloseIcon from '@/assets/icons/CloseIcon.svg';
import FilterForm from '@/components/feature/Form/FilterForm';
import ButtonDefault from '@/components/ui/ButtonDefault';
import useOutsideClick from '@/hooks/useClickOutside';
import useWindowWidth from '@/hooks/useWindowWidth';
import { cn } from '@/utils/style';

interface Props {
  open: boolean;
  onClose: (trigger: boolean) => void;
}

const FilterModalBack = ({ open, onClose }: Props) => {
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

  console.log(isModalOpenOrWeb);

  return (
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
            <div className='flex justify-between shrink-0 p-6 pb-0 mb-8 lg:hidden'>
              <h3 className='text-xl font-bold'>필터</h3>
              <button type='button' onClick={handleClose}>
                <CloseIcon className='w-6 h-6 text-gray-500 hover:text-gray-700' />
              </button>
            </div>
            <div className='p-6 pt-0 overflow-y-auto grow-1 lg:p-0 lg:pb-4'>
              <FilterForm />
              <ButtonDefault className='hidden w-full h-[50px] mt-4 font-bold lg:block'>
                키보드 등록하기
              </ButtonDefault>
            </div>
          </div>
        </TransitionChild>
      </div>
    </Transition>
  );
};

export default FilterModalBack;
