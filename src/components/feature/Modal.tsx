// 공용 모달창 컴포넌트

import { CloseButton, Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { ReactNode } from 'react';

import CloseIcon from '@/assets/icons/CloseIcon.svg';

interface ModalProps {
  open: boolean;
  onClose: () => void;
  title?: string;
  showCloseButton?: boolean;
  size?: 'md' | 'lg';
  children: ReactNode;
}

const Modal = ({ open, onClose, title, showCloseButton = true, children }: ModalProps) => {
  return (
    <Dialog open={open} className='relative z-50' onClose={onClose}>
      {/* 모달 배경 */}
      <DialogBackdrop
        transition
        className='fixed inset-0 bg-black/50 backdrop-blur-sm transition duration-300 ease-out data-closed:opacity-0 data-closed:delay-300'
      />

      {/* {모달 박스 위치} */}
      <div className='fixed inset-0 flex w-screen items-end justify-center md:items-center'>
        {/* {모달 본체} */}
        <DialogPanel
          transition
          className='flex flex-col w-full max-h-[85dvh] bg-white rounded-t-2xl transition duration-300 ease-out data-closed:translate-y-full md:max-w-[460px] md:rounded-2xl md:overflow-hidden md:data-closed:translate-y-0 md:data-closed:scale-[0.9] md:data-closed:opacity-0'
        >
          {(title || showCloseButton) && (
            <div className='flex justify-between shrink-0 p-6 pb-0 mb-8'>
              {/* {title 있으면 렌더링} */}
              {title && <DialogTitle className='text-xl font-bold'>{title}</DialogTitle>}

              {/* {닫기 x버튼 있으면 렌더링} */}
              {showCloseButton && (
                <CloseButton
                  onClick={onClose}
                  className='ml-auto text-gray-500 hover:text-gray-600'
                  aria-label='닫기'
                >
                  <CloseIcon className='w-6 h-6 text-gray-500 hover:text-gray-700' />
                </CloseButton>
              )}
            </div>
          )}

          {/* {모달 내부 컨텐츠} */}
          <div className='p-6 pt-0 overflow-y-auto grow-1'>{children}</div>
        </DialogPanel>
      </div>
    </Dialog>
  );
};

export default Modal;
