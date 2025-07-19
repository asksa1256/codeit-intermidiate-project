import { MenuItems } from '@headlessui/react';

import { getDropdownListStyle } from '@/styles/dropdownStyles';
import { DropdownListProps } from '@/types/dropdownTypes';

const DropdownList = ({ children, align = 'right', className }: DropdownListProps) => {
  const mergedClassName = getDropdownListStyle({ align, className });

  return (
    <MenuItems className={mergedClassName} transition={true}>
      {children}
    </MenuItems>
  );
};

export default DropdownList;
