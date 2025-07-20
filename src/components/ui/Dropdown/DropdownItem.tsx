import DdButtonItem from '@/components/ui/Dropdown/DdButtonItem';
import DdLinkItem from '@/components/ui/Dropdown/DdLinkItem';
import { getDropdownItemStyle } from '@/styles/dropdownStyles';
import { DropdownItemProps, DropdownLinkItemProps } from '@/types/dropdownTypes';

const isLinkProps = (props: DropdownItemProps): props is DropdownLinkItemProps =>
  'variant' in props && props.variant === 'link';

const DropdownItem = (props: DropdownItemProps) => {
  if (isLinkProps(props)) {
    return <DdLinkItem {...getDropdownItemStyle(props)} />;
  }

  return <DdButtonItem {...getDropdownItemStyle(props)} />;
};

export default DropdownItem;
