'use client';

import { DropdownWrapProps } from '@/types/dropdownTypes';

import Dropdown from '../Dropdown';
import DropdownSelectButton from './DropdownSelectButton';
import DropdownTrigger from '../DropdownTrigger';

interface DropdownSelectItem {
  value: string;
}

interface DropdownWithSelectProps extends Omit<DropdownWrapProps, 'children'> {
  items: DropdownSelectItem[];
  value: string;
  onChange: (v: string) => void;
}

const DropdownWithSelectButton = ({
  items,
  value,
  size,
  className,
  onChange,
}: DropdownWithSelectProps) => {
  const handleChange = (value: string) => {
    onChange(value);
  };

  return (
    <Dropdown size={size} wide className={`z-10 mb-7 ${className}`}>
      <DropdownTrigger className='w-full text-left'>
        <DropdownSelectButton value={value ?? items[0].value} />
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
