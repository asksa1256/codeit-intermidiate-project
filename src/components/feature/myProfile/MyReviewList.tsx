'use client';

import Link from 'next/link';

import { AxiosError } from 'axios';
import { useEffect, useState } from 'react';

import Modal from '@/components/feature/Modal';
import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import EmptyList from '@/components/ui/EmptyList';
import { apiClient } from '@/lib/api/apiClient';
import { MyReviewItemType, MyReviewListType } from '@/types/reviewTypes';

const TEAM = process.env.NEXT_PUBLIC_TEAM;
const DEFAULT_LIMIT = 10;

const MyReviewList = () => {
  const [modalOpen, setModalOpen] = useState(false);
  const [currentEditReview, setCurrentEditReview] = useState<MyReviewItemType | null>(null);
  const [reviewList, setReviewList] = useState<MyReviewItemType[]>([]);
  const [nextCursor, setNextCursor] = useState<number | null>(null);
  const [totalCount, setTotalCount] = useState<number>(0);

  useEffect(() => {
    const getReviewList = async () => {
      try {
        const res = await apiClient.get(`/${TEAM}/users/me/reviews?limit=${DEFAULT_LIMIT}`);
        const data: MyReviewListType = res.data;
        const { list, nextCursor, totalCount } = data;

        setReviewList(list);
        setTotalCount(totalCount);
        setNextCursor(nextCursor);
      } catch (error) {
        console.error(error);
      }
    };

    getReviewList();
  }, []);

  // 리뷰 삭제
  const handleDeleteReview = async (reviewId: number) => {
    try {
      await apiClient.delete(`/${TEAM}/reviews/${reviewId}`);

      setReviewList((prev) => prev.filter((review) => review.id !== reviewId));
      setTotalCount((totalCount) => totalCount - 1);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 403) {
        alert('본인이 작성한 리뷰만 삭제 가능합니다.');
        return;
      }

      alert('리뷰 삭제에 실패 하였습니다.');
      console.error(err.response?.statusText);
    }
  };

  // 리뷰 수정 모달 열기
  const handleOpenModal = (review: MyReviewItemType) => {
    setModalOpen(true);
    setCurrentEditReview(review);
  };

  // 리뷰 수정 모달 닫기
  const handleCloseModal = () => {
    setModalOpen(false);
    setCurrentEditReview(null);
  };

  // 나중에 사용할 상태값들입니다. 빌드시 에러가 뜨는거 같아서 임시로 추가해둘게요!
  console.log(currentEditReview);
  console.log(nextCursor);

  return (
    <>
      <span className='rounded-2xl absolute bottom-[calc(100%+16px)] right-0 text-xs text-primary leading-[26px] md:text-md md:leading-[32px] md:bottom-[calc(100%+22px)]'>
        총 {totalCount}개
      </span>
      <div>
        {reviewList.length === 0 ? (
          <EmptyList desc='작성된 리뷰가 없어요'>
            <Link
              href='/keyboards'
              className='inline-flex items-center justify-center px-[15px] h-[48px] font-semibold text-white bg-primary rounded-xl md:px-[24px]'
            >
              키보드 구경 하러 가기
            </Link>
          </EmptyList>
        ) : (
          <ul>
            {reviewList.map((review) => (
              <MyReviewItem
                key={review.id}
                review={review}
                onDelete={handleDeleteReview}
                onEdit={handleOpenModal}
              />
            ))}
          </ul>
        )}
      </div>
      <Modal open={modalOpen} onClose={handleCloseModal} size='lg' title='수정하기'>
        수정모달
      </Modal>
    </>
  );
};

export default MyReviewList;
