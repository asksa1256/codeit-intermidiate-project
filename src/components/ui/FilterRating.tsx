'use client';

import { Field, Label, Radio, RadioGroup } from '@headlessui/react';

interface RatingOption {
  label: string;
  value: number | null;
}

const FilterRatingItem = ({ rating }: { rating: RatingOption }) => {
  const { label, value } = rating;

  return (
    <Field className='flex items-center gap-[15px] cursor-pointer'>
      <Radio
        value={value as number | null}
        className='group peer flex size-5 items-center justify-center rounded-md border border-gray-300 bg-gray-100 outline-none'
      >
        <span className='invisible size-2.5 rounded-[3px] bg-primary group-data-checked:visible' />
      </Radio>
      <Label className='text-lg font-medium peer-data-checked:text-primary cursor-pointer'>
        {label}
      </Label>
    </Field>
  );
};

const RATING_LIST: { label: string; value: number | null }[] = [
  { label: '전체', value: null },
  { label: '4.5 - 5.0', value: 4.5 },
  { label: '4.0 - 4.5', value: 4.0 },
  { label: '3.5 - 4.0', value: 3.5 },
  { label: '3.0 - 3.5', value: 3.0 },
];

interface FilterRatingProps {
  value: number | null;
  onChange: (value: number | null) => void;
}

const FilterRating = ({ value, onChange }: FilterRatingProps) => {
  return (
    <RadioGroup name='rating' value={value} onChange={onChange} className='flex flex-col gap-2.5'>
      {RATING_LIST.map((rating, idx) => (
        <FilterRatingItem key={idx} rating={rating} />
      ))}
    </RadioGroup>
  );
};

export default FilterRating;
