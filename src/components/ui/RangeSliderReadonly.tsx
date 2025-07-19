import Image from 'next/image';

import KeyCap from '../../../public/icons/keyCap3.png';

interface Props {
  //슬라이더 컨테이너에 들어갈 className -> 슬라이더 길이 or 여백 등 커스텀 용도
  className?: string;
  //handle의 left 퍼센테이지를 정하기 위한 value
  value: number;
}

const RangeSliderReadonly = ({ className = 'w-65 h-4 px-2 pt-3 pb-4', value }: Props) => {
  const handleStyle = { left: `${(value / 100) * 100}%` };

  return (
    <div className={className}>
      <div className='w-full h-[6px] rounded-[50px] border-1 border-gray-300 bg-gray-100 relative'>
        <div className={'absolute top-[50%] translate-[-50%] w-6 h-6'} style={handleStyle}>
          <Image src={KeyCap} alt='슬라이더 핸들을 나타내는 키캡 이미지' draggable='false' />
        </div>
      </div>
    </div>
  );
};

export default RangeSliderReadonly;
