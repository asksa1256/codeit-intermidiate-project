'use client';

import { MenuItems } from '@headlessui/react';

import { useDropdownSize } from '@/components/ui/Dropdown/DropdownContext';
import { DropdownListProps } from '@/types/dropdownTypes';
import { cn } from '@/utils/style';

const defaultStyle = `absolute border border-gray-300 bg-white whitespace-nowrap outline-none rounded-[16px]`;
const animationStyle = `transition duration-200 ease-out data-closed:scale-95 data-closed:opacity-0`;
const alignStyle = {
  right: 'end-0 origin-top-right',
  left: 'start-0 origin-top-left',
};
const normalStyle = `px-[4px] py-[3px]`;
const wideStyle = {
  sm: 'w-full start-0 origin-top px-[6px] py-[5px] md:py-[6px]',
  md: 'w-full start-0 origin-top px-[6px] py-[6px]',
};

const DropdownList = ({ children, align = 'right', className }: DropdownListProps) => {
  const { size, wide } = useDropdownSize();

  const isStyle = wide ? wideStyle[size ?? 'sm'] : normalStyle;

  const mergedClassName = cn(defaultStyle, animationStyle, alignStyle[align], isStyle, className);

  return (
    <MenuItems className={mergedClassName} transition={true}>
      {children}
    </MenuItems>
  );
};

export default DropdownList;
