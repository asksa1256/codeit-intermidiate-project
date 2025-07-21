// 공용 컨펌 모달창 컴포넌트

import { Dialog, Transition } from '@headlessui/react';
import { Fragment, ReactNode } from 'react';

import CloseIcon from '../../assets/icons/CloseIcon.svg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  size?: 'sm' | 'md' | 'lg';
  children: ReactNode;
  footer?: ReactNode; // 추가: 모달 하단에 버튼 등을 넣을 수 있는 props 하단의 버튼 까지 children으로 처리하지 않도록 하기 위해서 입니다.
}

export default function Modal({
  open,
  onClose,
  title,
  showCloseButton = true,
  size = 'md',
  children,
  footer,
}: ModalProps) {
  const sizeClasses = {
    sm: 'max-w-xs',
    md: 'max-w-lg',
    lg: 'max-w-3xl',
  };

  return (
    // Transition: 모달 열림/닫힘 시 애니메이션을 주기 위해 Fragment로 감쌈
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onClose}>
        {/* 모달 배경 */}
        <Transition
          show={open}
          enter='ease-out duration-200'
          enterFrom='opacity-0'
          enterTo='opacity-100'
          leave='ease-in duration-150'
          leaveFrom='opacity-100'
          leaveTo='opacity-0'
        >
          <div className='fixed inset-0 bg-black/50 backdrop-blur-sm' />
        </Transition>

        {/* {모달 박스 위치} */}
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            {/* {모달 본체} */}
            <Transition
              show={open}
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`relative w-full ${sizeClasses[size]} transform overflow-hidden rounded-2xl bg-white
                 p-6 shadow-xl transition-all`}
              >
                {/* {title 있으면 렌더링} */}
                {title && <Dialog.Title className='text-lg font-bold mb-4'>{title}</Dialog.Title>}

                {/* {닫기 x버튼 있으면 렌더링} */}
                {showCloseButton && (
                  <button
                    onClick={onClose}
                    className='absolute top-4 right-4 text-gray-500 hover:text-gray-600'
                    aria-label='닫기'
                  >
                    <CloseIcon className='w-6 h-6 text-gray-500 hover:text-gray-700' />
                  </button>
                )}

                {/* {모달 내부 컨텐츠} */}
                <div className='mb-4'>{children}</div>

                {/* footer 영역 */}
                {footer && <div className='mt-4 flex justify-end gap-2'>{footer}</div>}
              </Dialog.Panel>
            </Transition>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
}
