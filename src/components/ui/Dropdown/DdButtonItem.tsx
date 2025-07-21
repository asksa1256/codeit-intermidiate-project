import { MenuItem } from '@headlessui/react';

import { DropdownButtonItemProps } from '@/types/dropdownTypes';

const DdButtonItem = ({ children, ...props }: DropdownButtonItemProps) => {
  return (
    <MenuItem as='button' {...props}>
      {children}
    </MenuItem>
  );
};

export default DdButtonItem;
