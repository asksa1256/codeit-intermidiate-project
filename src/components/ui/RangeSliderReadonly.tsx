import Image from 'next/image';

import clsx from 'clsx';

import { RangeSliderReadonlyProps } from '@/types/rangeSliderTypes';

import KeyCap from '../../../public/images/keyCap.png';

const RangeSliderReadonly = ({ className = 'w-28', value }: RangeSliderReadonlyProps) => {
  const handleStyle = { left: `${(value / 10) * 100}%` };

  return (
    <div className={clsx('flex items-center h-4', className)}>
      <div className='w-full h-[6px] rounded-[50px] border-1 border-gray-300 bg-gray-100 relative'>
        <div className={'absolute top-[50%] translate-[-50%] w-6 h-6'} style={handleStyle}>
          <Image src={KeyCap} alt='슬라이더 핸들을 나타내는 키캡 이미지' draggable='false' />
        </div>
      </div>
    </div>
  );
};

export default RangeSliderReadonly;
