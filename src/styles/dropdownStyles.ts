import { cn } from '@/utils/style';

export const getDropdownItemStyle = <T extends { className?: string }>(props: T) => {
  const defaultStyle =
    'flex justify-center items-center w-full font-medium text-gray-800 rounded-[12px] mb-[3px] last:mb-[0px]! hover:transition hover:text-primary hover:bg-primary-10';

  const SIZE_DEFAULT = {
    sm: {
      base: 'dd-sm:min-w-[93px] dd-sm:min-h-[40px] dd-sm:py-[8px] dd-sm:px-[8px] dd-sm:text-[14px]',
      md: 'md:dd-sm:min-w-[118px] md:dd-sm:min-h-[46px] md:dd-sm:py-[10px] md:dd-sm:px-[12px] md:dd-sm:text-[16px]',
    },
    md: {
      base: 'dd-md:min-w-[118px] dd-md:min-h-[46px] dd-md:py-[10px] dd-md:px-[12px] dd-md:text-[16px]',
    },
  };

  const SIZE_WIDE = {
    base: 'justify-start dd-wide:w-full dd-wide:rounded-[10px] dd-wide:px-[16px]',
    small: {
      base: 'dd-wideS:min-h-[36px] dd-wideS:py-[6px] dd-wideS:mb-[5px] dd-wideS:text-[14px]',
      md: 'md:dd-wideS:min-h-[40px] md:dd-wideS:py-[7px] md:dd-wideS:mb-[6px] md:dd-wideS:text-[16px]',
    },
    large: {
      base: 'dd-wideL:min-h-[40px] dd-wideL:py-[7px] dd-wideL:mb-[6px] dd-wideL:text-[16px]',
    },
  };

  const SIZE_STYLE = {
    sm: `${SIZE_DEFAULT.sm.base} ${SIZE_DEFAULT.sm.md}`,
    md: `${SIZE_DEFAULT.md.base}`,
    wideBase: `${SIZE_WIDE.base}`,
    wideS: `${SIZE_WIDE.small.base} ${SIZE_WIDE.small.md}`,
    wideL: `${SIZE_WIDE.large.base}`,
  };

  const mergedClassName = cn(
    defaultStyle,
    SIZE_STYLE['sm'],
    SIZE_STYLE['md'],
    SIZE_STYLE['wideBase'],
    SIZE_STYLE['wideS'],
    SIZE_STYLE['wideL'],
    props.className && props.className,
  );

  return {
    ...props,
    className: mergedClassName,
  };
};
