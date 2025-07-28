import { ReactNode } from 'react';

import { KeyboardColorType } from '@/types/keyboardTypes';
import convertToColorArray from '@/utils/convertToColorArray';

interface Props {
  aroma: KeyboardColorType[];
  children?: ReactNode;
}

const KeyboardColorTags = ({ aroma, children }: Props) => {
  const keyboardColors = convertToColorArray(aroma);

  return (
    <div className='whitespace-nowrap flex flex-none gap-[6px] md:gap-3 overflow-x-scroll hide-scrollbar py-4 md:py-5'>
      {keyboardColors.map((color) => (
        <span
          className='text-md md:text-base font-medium rounded-[100px] border-1 border-gray-300 px-[10px] md:px-[15px] py-[6px] md:py-2 h-9 md:h-[42px]'
          key={color}
        >
          {color}
        </span>
      ))}
      {children}
    </div>
  );
};

export default KeyboardColorTags;
