'use client';

import { useRef } from 'react';

import { KeyboardColorType } from '@/types/keyboardTypes';

interface Props {
  color: KeyboardColorType;
  label: string;
}

const ReviewColorCheckbox = ({ color, label }: Props) => {
  const checkRef = useRef<HTMLInputElement | null>(null);

  const onClick = () => {
    if (!checkRef.current) return;
    checkRef.current.checked = !checkRef.current?.checked;
  };

  return (
    <>
      <label
        htmlFor={color}
        className='py-[5px] px-[10px] border border-gray-300 font-medium text-md rounded-4xl has-[:checked]:text-white has-[:checked]:border-primary has-[:checked]:bg-primary'
        onClick={onClick}
      >
        <input
          type='checkbox'
          name='aroma'
          id={color}
          className='hidden'
          value={color}
          ref={checkRef}
          defaultChecked={false}
        />
        {label}
      </label>
    </>
  );
};

export default ReviewColorCheckbox;
