'use client';

import { Dispatch, SetStateAction, useOptimistic, useState, useTransition } from 'react';

import ContentFoldButton from '@/components/ui/Button/ContentFoldButton';
import ContentUnFoldButton from '@/components/ui/Button/ContentUnfoldButton';
import KebabMenu from '@/components/ui/Dropdown/KebabMenu/KebabMenu';
import KeyboardColorTags from '@/components/ui/KeyboardColorTags';
import KeyboardProperties from '@/components/ui/RangeSlider/KeyboardProperties';
import RatingAndPrice from '@/components/ui/RatingAndPrice';
import UserThumbnail from '@/components/ui/UserThumbnail';
import { apiClient } from '@/lib/api/apiClient';
import useAuthStore from '@/stores/authStore';
import useToastStore from '@/stores/toastStore';
import { ReviewItemType } from '@/types/reviewTypes';
import { formatRelativeTime } from '@/utils/formatters';

import LikeButton from './LikeButton';
import ConfirmModal from '../ConfirmModal';
import Modal from '../Modal';
import ReviewForm, { ReviewFormValues } from '../reviewForm/ReviewForm';

interface Props {
  review: ReviewItemType;
  keyboardName: string;
  keyboardImage: string;
  updateTrigger: Dispatch<SetStateAction<number>>;
}

const ReviewCard = ({ review, keyboardName, keyboardImage, updateTrigger }: Props) => {
  const {
    id: reviewId,
    user,
    isLiked,
    createdAt,
    updatedAt,
    aroma,
    content,
    lightBold,
    smoothTannic,
    drySweet,
    softAcidic,
    rating,
  } = review;
  const { id: userId, image, nickname } = user;
  const [isReviewFolded, setIsReviewFolded] = useState(false);
  const [isLikedReview, setIsLikedReview] = useState(isLiked);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [isPending, startTransition] = useTransition();
  const [optimisticIsLiked, toggleOptimisticLiked] = useOptimistic(
    isLikedReview,
    (currentState, changedState: boolean) => changedState,
  );
  const me = useAuthStore((state) => state.user);
  const addToast = useToastStore((state) => state.addToast);
  const isMyReview = userId === me?.id;

  const addLike = (reviewId: number) => {
    startTransition(async () => {
      toggleOptimisticLiked(true);
      try {
        await apiClient.post(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);

        setIsLikedReview(true);
      } catch (e) {
        console.log('좋아요 등록 실패 ', e);
      }
    });
  };

  const removeLike = async (reviewId: number) => {
    startTransition(async () => {
      toggleOptimisticLiked(false);
      try {
        await apiClient.delete(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}/like`);

        setIsLikedReview(false);
      } catch (e) {
        console.log('좋아요 삭제 실패 ', e);
      }
    });
  };

  const toggleLike = () => {
    if (optimisticIsLiked) {
      removeLike(reviewId);
    } else {
      addLike(reviewId);
    }
  };

  const handleEditReview = async (formValues: ReviewFormValues) => {
    try {
      await apiClient.patch(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}`, formValues);
      updateTrigger((prev) => prev + 1);
      setIsEditModalOpen(false);
      addToast({ message: '리뷰 수정 성공', type: 'success', duration: 2000 });
    } catch (e) {
      console.log('리뷰 수정 실패', e);
      addToast({ message: '리뷰 수정 실패', type: 'error', duration: 2000 });
    }
  };

  const handleDeleteReview = async () => {
    try {
      await apiClient.delete(`/${process.env.NEXT_PUBLIC_TEAM}/reviews/${reviewId}`);
      updateTrigger((prev) => prev + 1);
      addToast({ message: '리뷰 삭제 성공', type: 'success', duration: 2000 });
    } catch (e) {
      console.log('리뷰 삭제 실패', e);
      addToast({ message: '리뷰 삭제 실패', type: 'error', duration: 2000 });
    }
  };

  return (
    <section className='relative border-1 border-gray-300 rounded-xl p-4 pb-2 md:px-10 md:pt-8 md:pb-5 w-full md:max-w-285 lg:max-w-200'>
      <div className='flex justify-between items-start'>
        <div className='flex items-center gap-4'>
          <UserThumbnail className='w-[42px] md:w-16 h-[42px] md:h-16' imgSrc={image} />
          <div className='flex flex-col'>
            <span className='font-semibold md:text-lg'>{nickname}</span>
            <span className='text-md md:text-base text-gray-500'>
              {formatRelativeTime(updatedAt)}
              {createdAt !== updatedAt ? '(수정됨)' : ''}
            </span>
          </div>
        </div>
        {isMyReview ? (
          <KebabMenu
            onEdit={() => {
              setIsEditModalOpen(true);
            }}
            onDelete={() => {
              setIsDeleteModalOpen(true);
            }}
            className='inline-block ml-auto z-1'
            iconSize='w-8 md:w-[38px] h-8 md:h-[38px]'
          />
        ) : (
          <LikeButton onClick={toggleLike} isPending={isPending} isLiked={optimisticIsLiked} />
        )}
      </div>
      <KeyboardColorTags aroma={aroma}>
        <RatingAndPrice
          className='absolute right-4 md:right-10 shadow-[10px_0_0_white,-20px_0_15px_white]'
          label='rating'
          value={rating}
        />
      </KeyboardColorTags>
      {isReviewFolded ? (
        <ContentUnFoldButton onClick={setIsReviewFolded} />
      ) : (
        <>
          <div className='whitespace-pre-line text-md md:text-base'>{content}</div>
          <KeyboardProperties
            lightBold={lightBold}
            smoothTannic={smoothTannic}
            drySweet={drySweet}
            softAcidic={softAcidic}
          />
          <ContentFoldButton onClick={setIsReviewFolded} />
        </>
      )}
      <ConfirmModal
        open={isDeleteModalOpen}
        onCancel={() => {
          setIsDeleteModalOpen(false);
        }}
        onConfirm={handleDeleteReview}
      />
      {/* 리뷰 수정 모달 */}
      <Modal
        open={isEditModalOpen}
        onClose={() => {
          setIsEditModalOpen(false);
        }}
        size='lg'
        title='수정하기'
      >
        <ReviewForm
          keyboardImage={keyboardImage}
          keyboardTitle={keyboardName}
          initReview={review}
          onSubmit={handleEditReview}
        />
      </Modal>
    </section>
  );
};

export default ReviewCard;
