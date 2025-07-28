'use client';

import { useState } from 'react';

import { DropdownWrapProps } from '@/types/dropdownTypes';

import Dropdown from '../Dropdown';
import DropdownSelectButton from './DropdownSelectButton';
import DropdownTrigger from '../DropdownTrigger';

interface DropdownSelectItem {
  value: string;
}

interface DropdownWithSelectProps extends Omit<DropdownWrapProps, 'children'> {
  items: DropdownSelectItem[];
  onChange: (v: string) => void;
}

const DropdownWithSelectButton = ({
  items,
  size,
  className,
  onChange,
}: DropdownWithSelectProps) => {
  const [value, setValue] = useState(items[0].value);

  const handleChange = (value: string) => {
    setValue(value);
    onChange(value);
  };

  return (
    <Dropdown size={size} wide className={`z-10 mb-7 ${className}`}>
      <DropdownTrigger className='w-full text-left'>
        <DropdownSelectButton value={value} />
      </DropdownTrigger>
      <Dropdown.List className='mt-4'>
        {items.map((item) => (
          <Dropdown.Item key={item.value} onClick={() => handleChange(`${item.value}`)}>
            {item.value}
          </Dropdown.Item>
        ))}
      </Dropdown.List>
    </Dropdown>
  );
};

export default DropdownWithSelectButton;
