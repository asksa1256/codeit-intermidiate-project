import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  reviewList: MyReviewItemType[];
  onReviewDelete: (value: number) => void;
  onReviewEdit: (reviewId: number, formValues: ReviewFormValues) => void;
}

const MyReviewList = ({ reviewList, onReviewDelete, onReviewEdit }: Props) => {
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
    </>
  );
};

export default MyReviewList;
