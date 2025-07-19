import DdButtonItem from '@/components/ui/Dropdown/DdButtonItem';
import DdLinkItem from '@/components/ui/Dropdown/DdLinkItem';
import DdTextItem from '@/components/ui/Dropdown/DdTextItem';
import { getDropdownItemStyle } from '@/styles/dropdownStyles';
import {
  DropdownItemProps,
  DropdownLinkItemProps,
  DropdownTextItemProps,
} from '@/types/dropdownTypes';

const isLinkProps = (props: DropdownItemProps): props is DropdownLinkItemProps =>
  'variant' in props && props.variant === 'link';
const isTextProps = (props: DropdownItemProps): props is DropdownTextItemProps =>
  'variant' in props && props.variant === 'text';

const DropdownItem = (props: DropdownItemProps) => {
  if (isLinkProps(props)) {
    return <DdLinkItem {...getDropdownItemStyle(props)} />;
  }

  if (isTextProps(props)) {
    return <DdTextItem {...getDropdownItemStyle(props)} />;
  }

  return <DdButtonItem {...getDropdownItemStyle(props)} />;
};

export default DropdownItem;
