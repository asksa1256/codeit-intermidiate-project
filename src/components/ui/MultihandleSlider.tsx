'use client';

import Image from 'next/image';

import { useCallback, useRef, useState } from 'react';

import { MultihandleSliderProps } from '@/types/rangeSliderTypes';
import { formatPrice } from '@/utils/formatters';

import KeyCap from '../../../public/images/keyCap.png';

const MultihandleSlider = ({
  className = 'w-65 h-5 mx-2 mt-6 mb-6',
  priceRef,
}: MultihandleSliderProps) => {
  const [minValue, setminValue] = useState(0);
  const [maxValue, setmaxValue] = useState(300);
  const activeHandleRef = useRef<string | null>(null);
  const RangesliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);
  const minHandleStyle = { left: `${(minValue / 300) * 100}%` };
  const maxHandleStyle = { left: `${(maxValue / 300) * 100}%` };
  const minPrice = `￦ ${formatPrice(1000 * minValue)}`;
  const maxPrice = `￦ ${formatPrice(1000 * maxValue)}`;

  const handleMouseDown = (event: React.MouseEvent | MouseEvent) => {
    isDragging.current = true;
    const handleType = (event.currentTarget as HTMLDivElement).dataset.handleType;

    if (handleType === 'min' || handleType === 'max') {
      activeHandleRef.current = handleType;
    } else {
      return;
    }

    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
    handleMouseMove(event);
  };

  const handleMouseMove = useCallback(
    (event: React.MouseEvent | MouseEvent) => {
      if (!isDragging.current || !RangesliderRef.current) {
        return;
      }

      const RangesliderRect = RangesliderRef.current.getBoundingClientRect();
      const newX = event.clientX - RangesliderRect.left; //트랙 내 마우스 x 좌표
      let mappedValue = (newX / RangesliderRect.width) * 300; //(트랙 내 마우스 x좌표 / 트랙의 길이) * 100 -> 백분율
      console.log(newX / RangesliderRect.width);
      mappedValue = Math.max(0, Math.min(300, mappedValue)); //0~300 사이 값으로 매핑 -> 최대 30만원 천원단위로 끊기
      const value = Math.round(mappedValue); //정수값으로 변경한 최종 value

      if (activeHandleRef.current === 'min') {
        if (Math.abs(value - maxValue) <= 19) {
          isDragging.current = false;
          return;
        }
        //핸들이 트랙의 끝에 있을 때, 드래그를 해도 값이 바뀌지 않으면 상태 업데이트를 하지않도록 설정
        setminValue((prev) => (prev === value ? prev : value));
        priceRef.current.minPrice = value;
      } else if (activeHandleRef.current === 'max') {
        if (Math.abs(value - minValue) <= 19) {
          isDragging.current = false;
          return;
        }
        setmaxValue((prev) => (prev === value ? prev : value));
        priceRef.current.maxPrice = value;
      }
    },
    [minValue, maxValue, priceRef],
  );

  const handleMouseUp = useCallback(() => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  }, [handleMouseMove]);

  //아래로는 모바일 환경의 터치 이벤트를 위한 핸들러이며 로직은 같음
  const handleTouchStart = (event: React.TouchEvent | TouchEvent) => {
    isDragging.current = true;
    const handleType = (event.currentTarget as HTMLDivElement).dataset.handleType;

    if (handleType === 'min' || handleType === 'max') {
      activeHandleRef.current = handleType;
    } else {
      return;
    }

    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
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

      if (activeHandleRef.current === 'min') {
        if (Math.abs(value - maxValue) <= 9) {
          isDragging.current = false;
          return;
        }
        setminValue((prev) => (prev === value ? prev : value));
        priceRef.current.minPrice = value;
      } else if (activeHandleRef.current === 'max') {
        if (Math.abs(value - minValue) <= 9) {
          isDragging.current = false;
          return;
        }
        setmaxValue((prev) => (prev === value ? prev : value));
        priceRef.current.maxPrice = value;
      }
    },
    [minValue, maxValue, priceRef],
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
      <div className='w-full h-[6px] rounded-[50px] bg-gray-100 relative' ref={RangesliderRef}>
        <div
          className='absolute -top-px w-full h-[6px] bg-primary'
          style={{ width: `${(maxValue - minValue) / 3}%`, ...minHandleStyle }}
        />
        <div
          className={'absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'}
          data-handle-type='min'
          style={minHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className='absolute -bottom-5 -left-[30px] w-20 text-primary whitespace-nowrap'>
            {minPrice}
          </div>
          <Image src={KeyCap} alt='슬라이더 핸들을 나타내는 키캡 이미지' draggable='false' />
        </div>
        <div
          className={'absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'}
          data-handle-type='max'
          style={maxHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className='absolute -top-5 -left-[30px] w-20 text-primary whitespace-nowrap'>
            {maxPrice}
          </div>
          <Image src={KeyCap} alt='슬라이더 핸들을 나타내는 키캡 이미지' draggable='false' />
        </div>
      </div>
    </div>
  );
};

export default MultihandleSlider;
