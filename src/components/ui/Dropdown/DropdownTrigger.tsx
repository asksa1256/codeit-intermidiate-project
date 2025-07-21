import { MenuButton } from '@headlessui/react';

import { DropdownTriggerProps } from '@/types/dropdownTypes';

const DropdownTrigger = ({ children, className }: DropdownTriggerProps) => {
  return <MenuButton className={className}>{children}</MenuButton>;
};

export default DropdownTrigger;
