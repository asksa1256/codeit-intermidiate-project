//필터 타입용 체크박스
'use client';

import { Checkbox } from '@headlessui/react';

import { KeyboardCategoryType } from '@/types/keyboardTypes';

interface FilterCheckboxProps {
  label: string;
  value: KeyboardCategoryType;
  isChecked: boolean;
  onChange: (value: KeyboardCategoryType) => void;
}

const FilterCheckbox = ({ label, value, isChecked, onChange }: FilterCheckboxProps) => {
  return (
    <Checkbox
      checked={isChecked}
      onChange={() => onChange(value)}
      className={({ checked }) =>
        `
        w-auto h-[42px] px-4 rounded-full text-md font-medium border flex items-center
        ${checked ? 'bg-primary text-white border-primary' : 'bg-white text-gray-800 border-gray-300'}
        transition-colors duration-200
      `
      }
    >
      {label}
    </Checkbox>
  );
};

export default FilterCheckbox;
