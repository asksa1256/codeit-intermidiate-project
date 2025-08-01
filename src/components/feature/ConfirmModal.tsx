// 공용 컨펌 모달창 컴포넌트

import { Dialog, Transition } from '@headlessui/react';
import { Fragment } from 'react';

interface ConfirmModalProps {
  open: boolean;
  onCancel: () => void;
  onConfirm: () => void;
}

const ConfirmModal = ({ open, onCancel, onConfirm }: ConfirmModalProps) => {
  return (
    <Transition appear show={open} as={Fragment}>
      <Dialog as='div' className='relative z-50' onClose={onCancel}>
        {/* 모달 배경 */}
        <div className='fixed inset-0'>
          <Transition.Child
            as={Fragment}
            enter='ease-out duration-300'
            enterFrom='opacity-0'
            enterTo='opacity-100'
            leave='ease-in duration-200'
            leaveFrom='opacity-100'
            leaveTo='opacity-0'
          >
            <div className='fixed inset-0 bg-black/30 backdrop-blur-sm transition-all' />
          </Transition.Child>
        </div>

        {/* {모달 박스 위치} */}
        <div className='fixed inset-0 overflow-y-auto'>
          <div className='flex min-h-full items-center justify-center p-4'>
            {/* {모달 본체} */}
            <Transition.Child
              as={Fragment}
              enter='ease-out duration-200'
              enterFrom='opacity-0 scale-95'
              enterTo='opacity-100 scale-100'
              leave='ease-in duration-150'
              leaveFrom='opacity-100 scale-100'
              leaveTo='opacity-0 scale-95'
            >
              <Dialog.Panel
                className={`relative w-[353px] transform overflow-hidden rounded-2xl bg-white p-6 shadow-xl transition-all`}
              >
                <Dialog.Title className='text-xl font-bold mb-6 text-center'>
                  정말 삭제하시겠습니까?
                </Dialog.Title>
                {/* 버튼 영역 */}
                <div className='w-full h-[50px] lg:h-[54px] flex justify-center gap-[10px] mt-4'>
                  {/* 취소 버튼 */}
                  <button
                    onClick={onCancel}
                    className='w-[156px] h-[50px] lg:w-[156px] lg:h-[54px] rounded-[12px] border border-gray-300 text-gray-500 hover:bg-gray-100'
                  >
                    취소
                  </button>

                  {/* 삭제하기 버튼 */}
                  <button
                    onClick={onConfirm}
                    className='w-[156px] h-[50px] lg:w-[156px] lg:h-[54px] rounded-[12px] border border-gray-300 text-white bg-primary hover:bg-primary-dark'
                  >
                    삭제하기
                  </button>
                </div>
              </Dialog.Panel>
            </Transition.Child>
          </div>
        </div>
      </Dialog>
    </Transition>
  );
};

export default ConfirmModal;
