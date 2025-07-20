import { Menu } from '@headlessui/react';

import DropdownProvider from '@/components/ui/Dropdown/DropdownContext';
import DropdownItem from '@/components/ui/Dropdown/DropdownItem';
import DropdownList from '@/components/ui/Dropdown/DropdownList';
import DropdownTrigger from '@/components/ui/Dropdown/DropdownTrigger';
import { DropdownWrapProps } from '@/types/dropdownTypes';
import { cn } from '@/utils/style';

const Dropdown = ({ children, size, wide, className }: DropdownWrapProps) => {
  const defaultStyle = `relative`;
  const mergedClassName = cn(defaultStyle, className ?? null);

  return (
    <DropdownProvider size={size} wide={wide}>
      <div className={mergedClassName}>
        <Menu>{children}</Menu>
      </div>
    </DropdownProvider>
  );
};

Dropdown.Trigger = DropdownTrigger;
Dropdown.List = DropdownList;
Dropdown.Item = DropdownItem;

export default Dropdown;
