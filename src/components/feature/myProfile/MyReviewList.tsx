import MyReviewItem from '@/components/feature/myProfile/MyReviewItem';
import { MyReviewItemType } from '@/types/reviewTypes';

interface Props {
  reviewList: MyReviewItemType[];
  onReviewDelete: (value: number) => void;
}

const MyReviewList = ({ reviewList, onReviewDelete }: Props) => {
  return (
    <>
      <ul>
        {reviewList.map((review) => (
          <MyReviewItem key={review.id} review={review} onDelete={onReviewDelete} />
        ))}
      </ul>
    </>
  );
};

export default MyReviewList;
