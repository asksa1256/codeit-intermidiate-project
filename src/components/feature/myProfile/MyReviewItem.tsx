'use client';

import Image from 'next/image';

import { useState } from 'react';

import ConfirmModal from '@/components/feature/ConfirmModal';
import Modal from '@/components/feature/Modal';
import ReviewForm from '@/components/feature/reviewForm/ReviewForm';
import Dropdown from '@/components/ui/Dropdown/Dropdown';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import { MyReviewItemType } from '@/types/reviewTypes';
import { formatRelativeTime } from '@/utils/formatters';

interface MyReviewItemProps {
  review: MyReviewItemType;
  onDelete: (id: number) => void;
}

const MyReviewItem = ({ review, onDelete }: MyReviewItemProps) => {
  const [isDeleteConfirm, setIsDeleteConfirm] = useState(false);
  const [isEditModal, setIsEditModal] = useState(false);

  const { rating, content, updatedAt, wine } = review;

  // 삭제하기
  const handleDeleteReview = () => {
    onDelete(review.id);
    setIsDeleteConfirm(false);
  };
  // 삭제 확인 모달 열기
  const handleDeleteConfirmOpen = () => setIsDeleteConfirm(true);
  // 삭제 확인 모달 닫기
  const handleDeleteConfirmClose = () => setIsDeleteConfirm(false);

  // 수정 모달 열기
  const handleEditModalOpen = () => setIsEditModal(true);
  // 수정 모달 닫기
  const handleEditModalClose = () => setIsEditModal(false);

  return (
    <>
      <li className='border border-gray-300 py-4 px-5 bg-white rounded-2xl mb-4 md:py-6 md:px-10 lg:mb-2 lg:pb-7'>
        <div className='flex items-center gap-[15px] mb-[17px] md:mb-5'>
          <RatingAndPrice
            label='rating'
            value={rating}
            className='text-md py-1 md:py-[6px] lg:py-2'
          />
          <span className='text-md text-gray-500 md:text-base'>
            {formatRelativeTime(updatedAt)}
          </span>
          <Dropdown className='inline-block ml-auto'>
            <Dropdown.Trigger className='block'>
              <Image
                src='/images/KebabIcon.svg'
                width={40}
                height={40}
                alt='케밥 메뉴 아이콘'
                className='w-6 md:w-[26px]'
              />
            </Dropdown.Trigger>
            <Dropdown.List className='mt-2 lg:mt-4'>
              <Dropdown.Item onClick={handleEditModalOpen}>수정하기</Dropdown.Item>
              <Dropdown.Item onClick={handleDeleteConfirmOpen}>삭제하기</Dropdown.Item>
            </Dropdown.List>
          </Dropdown>
        </div>
        <h3 className='mb-[10px] text-md text-gray-500 line-clamp-1 md:text-base'>{wine.name}</h3>
        <p className='text-md text-ellipsis break-keep md:text-base'>{content}</p>
      </li>
      {/* 삭제 컨펌 모달 */}
      <ConfirmModal
        open={isDeleteConfirm}
        onCancel={handleDeleteConfirmClose}
        onConfirm={handleDeleteReview}
      />
      {/* 리뷰 모달 */}
      <Modal open={isEditModal} onClose={handleEditModalClose} title='수정하기'>
        <ReviewForm />
      </Modal>
    </>
  );
};

export default MyReviewItem;
