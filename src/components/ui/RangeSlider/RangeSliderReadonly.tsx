import Image from 'next/image';

import clsx from 'clsx';

import { RangeSliderReadonlyProps } from '@/types/rangeSliderTypes';

import keyCap from '../../../../public/images/KeyCap.png';

const RangeSliderReadonly = ({ className, value }: RangeSliderReadonlyProps) => {
  const handleStyle = { left: `${(value / 10) * 100}%` };

  return (
    <div className={clsx('flex items-center w-28 h-4 md:w-99', className)}>
      <div className='w-full h-[6px] rounded-[50px] border-1 border-gray-300 bg-gray-100 relative'>
        <div className='absolute top-[50%] translate-[-50%] w-6 h-6' style={handleStyle}>
          <Image src={keyCap} alt='슬라이더 핸들' draggable='false' />
        </div>
      </div>
    </div>
  );
};

export default RangeSliderReadonly;
