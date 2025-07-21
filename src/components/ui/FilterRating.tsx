'use client';

import { Field, Label, Radio, RadioGroup } from '@headlessui/react';
import { useState } from 'react';

interface FilterRatingProps {
  label: string;
  value: number | null;
}

const FilterRatingItem = ({ rating }: { rating: FilterRatingProps }) => {
  const { label, value } = rating;

  return (
    <Field className='flex items-center gap-[15px] cursor-pointer'>
      <Radio
        value={value}
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

const RATING_LIST: FilterRatingProps[] = [
  { label: '전체', value: null },
  { label: '4.5 - 5.0', value: 4.5 },
  { label: '4.0 - 4.5', value: 4.0 },
  { label: '3.5 - 4.0', value: 3.5 },
  { label: '3.0 - 3.5', value: 3.0 },
];

const FilterRating = () => {
  const [selected, setSelected] = useState(RATING_LIST[0].value);

  return (
    <RadioGroup
      name='rating'
      value={selected}
      onChange={setSelected}
      className='flex flex-col gap-2.5'
    >
      {RATING_LIST.map((rating, idx) => (
        <FilterRatingItem key={idx} rating={rating} />
      ))}
    </RadioGroup>
  );
};

export default FilterRating;
