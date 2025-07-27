'use client';

import { useState } from 'react';

import Modal from '@/components/feature/Modal';
import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import ReviewForm from '@/components/feature/ReviewForm';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  reviewList: MyReviewItemType[];
  onReviewDelete: (valud: number) => void;
}

const MyReviewList = ({ reviewList, onReviewDelete }: Props) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentReview, setCurrentReview] = useState<MyReviewItemType | null>(null);

  // 리뷰 수정 모달 열기
  const handleOpenModal = (review: MyReviewItemType) => {
    setModalOpen(true);
    setCurrentReview(review);
  };

  // 리뷰 수정 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentReview(null);
  };

  return (
    <>
      <ul>
        {reviewList.map((review) => (
          <MyReviewItem
            key={review.id}
            review={review}
            onDelete={onReviewDelete}
            onEdit={handleOpenModal}
          />
        ))}
      </ul>
      <Modal open={modalOpen} onClose={handleCloseModal} title='수정하기'>
        <ReviewForm review={currentReview} />
      </Modal>
    </>
  );
};

export default MyReviewList;
