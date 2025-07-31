import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  reviewList: MyReviewItemType[];
  onReviewDelete: (value: number) => void;
  onReviewEdit: (reviewId: number, formValues: ReviewFormValues) => void;
  endRef: React.ForwardedRef<HTMLDivElement>;
  cursor: number | null;
}

const MyReviewList = ({ reviewList, onReviewDelete, onReviewEdit, endRef, cursor }: Props) => {
  console.log(cursor !== null);
  return (
    <>
      <ul>
        {reviewList.map((review) => (
          <MyReviewItem
            key={review.id}
            review={review}
            onDelete={onReviewDelete}
            onEdit={onReviewEdit}
          />
        ))}
      </ul>
      <div ref={endRef}>
        {cursor !== null ? (
          <div className='w-8 h-8 mx-auto border-4 border-gray-300 border-t-primary rounded-full animate-spin' />
        ) : null}
      </div>
    </>
  );
};

export default MyReviewList;
