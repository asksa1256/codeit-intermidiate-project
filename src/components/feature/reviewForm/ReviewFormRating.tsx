import { useController, UseControllerProps } from 'react-hook-form';

import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import StarRatingInput from '@/components/ui/StarRatingInput';

interface Props extends UseControllerProps<ReviewFormValues> {
  name: 'rating';
}

const ReviewFormRating = ({ name, control }: Props) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: {
      min: {
        value: 1,
        message: '1점 이상 선택 해주세요',
      },
      required: true,
    },
  });

  return (
    <StarRatingInput updater={(rating) => onChange(rating)} value={value} className='mt-2 flex' />
  );
};

export default ReviewFormRating;
