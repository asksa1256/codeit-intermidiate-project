'use client';

import React, { useState } from 'react';

import ConfirmModal from '@/components/feature/ConfirmModal';
import Modal from '@/components/feature/Modal';
import KebabMenu from '@/components/ui/Dropdown/KebabMenu/KebabMenu';
import KeyboardThumbnail from '@/components/ui/KeyboardThumbnail';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import { MyKeyboardItemType } from '@/types/keyboardTypes';

interface MyKeyboardItemProps {
  keyboard: MyKeyboardItemType;
  onDelete: (id: number) => void;
}

const MyKeyboardItem = ({ keyboard, onDelete }: MyKeyboardItemProps) => {
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const { id, name, image, region, price } = keyboard;

  // 리뷰 삭제
  const handleDelete = async () => {
    try {
      await onDelete(id);
      // 에러 발생시 모달창 유지
      setIsConfirmOpen(false);
    } catch (error) {
      console.error(error);
    }
  };
  // 삭제 모달 열기
  const handleDeleteConfirmOpen = () => setIsConfirmOpen(true);
  // 삭제 모달 닫기
  const handleDeleteConfirmClose = () => setIsConfirmOpen(false);

  // 수정 모달 열기
  const handleEditOpen = () => setIsEditModal(true);
  // 수정 모달 닫기
  const handleEditClose = () => setIsEditModal(false);

  return (
    <>
      <li className='flex mb-[10px] border border-gray-300 rounded-xl'>
        <div className='relative shrink-0 w-[108px] px-[14px] md:w-[176px] md:px-5 self-center md:self-end'>
          <KeyboardThumbnail imgSrc={image} keyboardName={name} className='md:w-[70%] md:mx-auto' />
        </div>

        <div className='relative grow pt-[25px] pr-12 pb-6 md:py-[30px] md:pr-[86px] lg:pr-[124px]'>
          <h3 className='mb-[10px] text-lg font-semibold break-keep md:text-[28px] md:leading-[1.17] md:mb-[20px]'>
            {name}
          </h3>
          <p className='mb-[10px] text-md text-gray-500 md:text-base md:mb-[20px]'>{region}</p>
          <RatingAndPrice label='price' value={price} className='md:py-[5.5px]' />
          <KebabMenu
            onEdit={handleEditOpen}
            onDelete={handleDeleteConfirmOpen}
            className='absolute top-5 right-5 md:top-[30px] md:right-10'
          />
        </div>
      </li>
      {/* portal에 생성됨 */}
      {/* 삭제 확인 모달 */}
      <ConfirmModal
        open={isConfirmOpen}
        onConfirm={handleDelete}
        onCancel={handleDeleteConfirmClose}
      />
      {/* 수정 모달 */}
      <Modal open={isEditModal} onClose={handleEditClose} title='내가 등록한 와인'>
        여기에 상달님이 만들어준 모달을 넣어주거나, 폼을 넣어줄거 같음.
      </Modal>
    </>
  );
};

export default MyKeyboardItem;
