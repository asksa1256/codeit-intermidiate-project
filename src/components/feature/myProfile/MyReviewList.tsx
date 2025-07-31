import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import ScrollLoading from '@/components/ui/ScrollLoading';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  reviewList: MyReviewItemType[];
  onReviewDelete: (value: number) => void;
  onReviewEdit: (reviewId: number, formValues: ReviewFormValues) => void;
  endRef: React.ForwardedRef<HTMLDivElement>;
  hasNextPage: boolean;
}

const MyReviewList = ({ reviewList, onReviewDelete, onReviewEdit, endRef, hasNextPage }: Props) => {
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
      <ScrollLoading endRef={endRef} hasNextPage={hasNextPage} />
    </>
  );
};

export default MyReviewList;
