import Link from 'next/link';

import { MenuItem } from '@headlessui/react';

import { DropdownLinkItemProps } from '@/types/dropdownTypes';

const DdLinkItem = ({ children, ...props }: DropdownLinkItemProps) => {
  return (
    <MenuItem as={Link} {...props}>
      {children}
    </MenuItem>
  );
};

export default DdLinkItem;
