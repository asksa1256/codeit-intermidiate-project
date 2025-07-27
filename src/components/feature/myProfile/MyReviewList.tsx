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

  // 나중에 사용할 상태값들입니다. 빌드시 에러가 뜨는거 같아서 임시로 추가해둘게요!
  console.log(currentReview);

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
      {/* open={modalOpen} */}
      <Modal open={true} onClose={handleCloseModal} title='수정하기'>
        <ReviewForm review={currentReview} />
      </Modal>
    </>
  );
};

export default MyReviewList;
