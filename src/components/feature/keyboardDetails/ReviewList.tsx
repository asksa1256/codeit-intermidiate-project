import ButtonDefault from '@/components/ui/ButtonDefault';
import EmptyList from '@/components/ui/EmptyList';
import { ReviewItemType } from '@/types/reviewTypes';

import ReviewCard from './ReviewCard';

interface Props {
  reviewList: ReviewItemType[];
}

const ReviewList = ({ reviewList }: Props) => {
  return (
    <section className='flex flex-col lg:grow-1 items-center lg:items-start gap-4 md:gap-6 lg:gap-5 mt-[10px] md:mt-[18px] lg:mt-0'>
      <div className='hidden lg:block text-xl font-bold mt-5 mb-[10px]'>리뷰 목록</div>
      {reviewList[0] ? (
        reviewList.map((review) => <ReviewCard key={review.id} review={review} />)
      ) : (
        <div className='lg:mt-38 lg:w-275 mb-30 lg:mb-63'>
          <EmptyList desc='작성된 리뷰가 없어요'>
            <ButtonDefault className='font-medium w-34 md:w-42 h-12 px-7 py-[14px] rounded-xl'>
              리뷰 남기기
            </ButtonDefault>
          </EmptyList>
        </div>
      )}
    </section>
  );
};

export default ReviewList;
