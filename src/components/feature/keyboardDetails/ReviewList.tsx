import { ReviewItemType } from '@/types/reviewTypes';

import ReviewCard from './ReviewCard';

interface Props {
  reviewList: ReviewItemType[];
}

const ReviewList = ({ reviewList }: Props) => {
  return (
    <section className='flex flex-col items-center lg:items-start gap-4 md:gap-6 lg:gap-5 mt-[10px] md:mt-[18px] lg:mt-0'>
      <div className='hidden lg:block text-xl font-bold mt-5 mb-[10px]'>리뷰 목록</div>
      {reviewList?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </section>
  );
};

export default ReviewList;
