'use client';

import DdButtonItem from '@/components/ui/Dropdown/DdButtonItem';
import DdLinkItem from '@/components/ui/Dropdown/DdLinkItem';
import { useDropdownSize } from '@/components/ui/Dropdown/DropdownContext';
import { DropdownItemProps, DropdownLinkItemProps } from '@/types/dropdownTypes';
import { cn } from '@/utils/style';

const defaultStyle =
  'flex justify-center items-center w-full font-medium text-gray-800 rounded-[12px] mb-[3px] last:mb-[0px]! hover:transition hover:text-primary hover:bg-primary-10';

const normalStyle = {
  sm: 'min-w-[93px] min-h-[40px] py-[8px] px-[8px] text-[14px] md:min-w-[118px] md:min-h-[46px] md:py-[10px] md:px-[12px] md:text-[16px]',
  md: 'min-w-[118px] min-h-[46px] py-[10px] px-[12px] text-[16px]',
};

const wideCommonStyle = 'justify-start rounded-[10px] px-[16px]';

const wideStyle = {
  sm: 'min-h-[36px] py-[6px] mb-[5px] text-[14px] md:min-h-[40px] md:py-[7px] md:mb-[6px] md:text-[16px]',
  md: 'min-h-[40px] py-[7px] mb-[6px] text-[16px]',
};

const isLinkProps = (props: DropdownItemProps): props is DropdownLinkItemProps =>
  'variant' in props && props.variant === 'link';

const DropdownItem = (props: DropdownItemProps) => {
  const { size, wide } = useDropdownSize();
  const checkSize = size ?? 'sm';

  const isSizeStyle = wide ? cn(wideCommonStyle, wideStyle[checkSize]) : normalStyle[checkSize];

  const mergedClassName = cn(defaultStyle, isSizeStyle, props.className ?? null);

  if (isLinkProps(props)) {
    const newProps = { ...props, className: mergedClassName };
    return <DdLinkItem {...newProps} />;
  }

  const newProps = { ...props, className: mergedClassName };
  return <DdButtonItem {...newProps} />;
};

export default DropdownItem;
