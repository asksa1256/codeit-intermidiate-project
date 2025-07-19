import { MenuItem } from '@headlessui/react';

import { DropdownTextItemProps } from '@/types/dropdownTypes';

const DdTextItem = ({ children, ...props }: DropdownTextItemProps) => {
  return (
    <MenuItem as='div' {...props}>
      {children}
    </MenuItem>
  );
};

export default DdTextItem;
