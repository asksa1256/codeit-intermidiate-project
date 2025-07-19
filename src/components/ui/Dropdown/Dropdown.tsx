import { Menu } from '@headlessui/react';

import DropdownItem from '@/components/ui/Dropdown/DropdownItem';
import DropdownList from '@/components/ui/Dropdown/DropdownList';
import DropdownTrigger from '@/components/ui/Dropdown/DropdownTrigger';
import { getDropdownWrapStyle } from '@/styles/dropdownStyles';
import { DropdownWrapProps } from '@/types/dropdownTypes';

const Dropdown = ({ children, size = 'sm', wide = false, className }: DropdownWrapProps) => {
  const mergedClassName = getDropdownWrapStyle({ className, wide });

  return (
    <div data-size={size} data-wide={wide} className={mergedClassName}>
      <Menu>{children}</Menu>
    </div>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
