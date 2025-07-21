'use client';

import Image from 'next/image';

import { useCallback, useRef, useState } from 'react';

import { RangeSliderProps } from '@/types/rangeSliderTypes';

import KeyCap from '../../../public/images/keyCap.png';

const INITIAL_HANDLE_STATE = 5;

const RangeSlider = ({
  className = 'w-65 h-4 px-2 pt-3 pb-4',
  label,
  valueRef,
}: RangeSliderProps) => {
  const [value, setValue] = useState(INITIAL_HANDLE_STATE);
  const RangesliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const handleStyle = { left: `${(value / 10) * 100}%` };

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    isDragging.current = true;
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    // 트랙을 클릭했을 때 바로 해당 위치로 이동시키려면 여기에서 handleMouseMove(e)를 호출
    handleMouseMove(event);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isDragging.current || !RangesliderRef.current) {
        return;
      }

      const RangesliderRect = RangesliderRef.current.getBoundingClientRect();
      const newX = event.clientX - RangesliderRect.left; //트랙 내 마우스 x 좌표
      let mappedValue = (newX / RangesliderRect.width) * 100; //(트랙 내 마우스 x좌표 / 트랙의 길이) * 100 -> 백분율

      mappedValue = Math.max(0, Math.min(100, mappedValue)); //0~100 사이 값으로 매핑
      const value = Math.round(mappedValue / 10); //정수값으로 변경한 최종 value
      setValue(value); //디바운싱을 넣는다면 여기에
      valueRef.current[`${label}`] = value; //Ref current의 정의는 type파일에
    },
    [label, valueRef],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  //아래로는 모바일 환경의 터치 이벤트를 위한 핸들러이며 로직은 같음
  const handleTouchStart = (event: React.TouchEvent | TouchEvent) => {
    isDragging.current = true;
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
    // 트랙을 클릭했을 때 바로 해당 위치로 이동시키려면 여기에서 handleMouseMove(e)를 호출
    handleTouchMove(event);
  };

  const handleTouchMove = useCallback(
    (event: React.TouchEvent | TouchEvent) => {
      if (!isDragging.current || !RangesliderRef.current) {
        return;
      }

      const RangesliderRect = RangesliderRef.current.getBoundingClientRect();
      const newX = event.touches[0].clientX - RangesliderRect.left; //touches[0]로 변경
      let mappedValue = (newX / RangesliderRect.width) * 100;

      mappedValue = Math.max(0, Math.min(100, mappedValue));
      const value = Math.round(mappedValue);
      setValue(value);
      valueRef.current[`${label}`] = value; //Ref current의 정의는 type파일에
    },
    [label, valueRef],
  );

  const handleTouchEnd = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  }, [handleTouchMove]);

  if (!RangesliderRef) {
    return;
  }

  return (
    <div className={className}>
      <div
        className='w-full h-[6px] rounded-[50px] border-1 border-gray-300 bg-gray-100 relative'
        ref={RangesliderRef}
        onMouseDown={handleMouseDown}
        onTouchStart={handleTouchStart}
      >
        <div
          className={'absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'}
          style={handleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <Image src={KeyCap} alt='슬라이더 핸들을 나타내는 키캡 이미지' draggable='false' />
        </div>
      </div>
    </div>
  );
};

export default RangeSlider;
