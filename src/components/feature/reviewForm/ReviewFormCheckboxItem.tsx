'use client';

import { useRef } from 'react';

import { KeyboardColorType } from '@/types/keyboardTypes';

interface Props {
  color: KeyboardColorType;
  label: string;
  value: KeyboardColorType[];
  onChange: (value: KeyboardColorType[]) => void;
}

const ReviewFormCheckboxItem = ({ color, label, value, onChange }: Props) => {
  const checkRef = useRef<HTMLInputElement | null>(null);

  const handleChange = () => {
    const isChecked = checkRef.current?.checked ?? false;

    const updateValue = isChecked ? [...value, color] : value.filter((c) => c !== color);

    onChange(updateValue);
  };

  return (
    <>
      <label className='py-[5px] px-[10px] border border-gray-300 font-medium text-md rounded-4xl has-[:checked]:text-white has-[:checked]:border-primary has-[:checked]:bg-primary'>
        <input
          type='checkbox'
          className='hidden'
          value={color}
          ref={checkRef}
          defaultChecked={value.includes(color)}
          onChange={handleChange}
        />
        {label}
      </label>
    </>
  );
};

export default ReviewFormCheckboxItem;
