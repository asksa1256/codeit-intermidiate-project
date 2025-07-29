'use client';

import { useController, UseControllerProps } from 'react-hook-form';

import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import ReviewFormCheckboxItem from '@/components/feature/reviewForm/ReviewFormCheckboxItem';
import { KEYBOARD_COLOR_MAP } from '@/constants';
import { KeyboardColorType } from '@/types/keyboardTypes';

interface Props extends UseControllerProps<ReviewFormValues> {
  name: 'aroma';
}

const ReviewFormCheckbox = ({ name, control }: Props) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: {
      minLength: {
        value: 1,
        message: '1개 이상을 선택해주세요',
      },
      required: true,
    },
  });

  console.log(value);

  return (
    <>
      {(Object.entries(KEYBOARD_COLOR_MAP) as [KeyboardColorType, string][]).map(
        ([color, label]) => (
          <ReviewFormCheckboxItem
            key={color}
            color={color}
            label={label}
            value={value}
            onChange={onChange}
          />
        ),
      )}
    </>
  );
};

export default ReviewFormCheckbox;
