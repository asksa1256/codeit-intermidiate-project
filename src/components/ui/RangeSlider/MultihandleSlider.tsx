'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { useEffect, useRef, useState } from 'react';

import { MultihandleSliderProps } from '@/types/rangeSliderTypes';
import { formatPrice } from '@/utils/formatters';

import keyCap from '../../../../public/images/KeyCap.png';

const MINIMUM_HANDLE_GAP = 20; // 전체 트랙 길이 300중 20

const MultihandleSlider = ({
  className,
  valueUpdater,
  initialRange = [0, 300000],
}: MultihandleSliderProps) => {
  const initialMinValue = initialRange[0] / 1000;
  const initialMaxValue = initialRange[1] / 1000;
  const [minValue, setMinValue] = useState(initialMinValue);
  const [maxValue, setMaxValue] = useState(initialMaxValue);
  // 초기값 설정 보내주기용
  useEffect(() => {
    setMinValue(initialRange[0] / 1000);
    setMaxValue(initialRange[1] / 1000);
  }, [initialRange]);

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

  const handleMouseMove = (event: React.MouseEvent | MouseEvent) => {
    if (!isDragging.current || !RangesliderRef.current) {
      return;
    }

    const RangesliderRect = RangesliderRef.current.getBoundingClientRect();
    const newX = event.clientX - RangesliderRect.left; //트랙 내 마우스 x 좌표
    let mappedValue = (newX / RangesliderRect.width) * 300; //(트랙 내 마우스 x좌표 / 트랙의 길이) * 100 -> 백분율
    mappedValue = Math.max(0, Math.min(300, mappedValue)); //0~300 사이 값으로 매핑 -> 최대 30만원 천원단위로 끊기
    const value = Math.round(mappedValue); //정수값으로 변경한 최종 value

    if (activeHandleRef.current === 'min') {
      if (Math.abs(value - maxValue) < MINIMUM_HANDLE_GAP) {
        isDragging.current = false;
        return;
      }
      //핸들이 트랙의 끝에 있을 때, 드래그를 해도 값이 바뀌지 않으면 상태 업데이트를 하지않도록 설정
      setMinValue((prev) => (prev === value ? prev : value));
    } else if (activeHandleRef.current === 'max') {
      if (Math.abs(value - minValue) < MINIMUM_HANDLE_GAP) {
        isDragging.current = false;
        return;
      }
      setMaxValue((prev) => (prev === value ? prev : value));
    }
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

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

  const handleTouchMove = (event: React.TouchEvent | TouchEvent) => {
    if (!isDragging.current || !RangesliderRef.current) {
      return;
    }

    const RangesliderRect = RangesliderRef.current.getBoundingClientRect();
    const newX = event.touches[0].clientX - RangesliderRect.left; //touches[0]로 변경
    let mappedValue = (newX / RangesliderRect.width) * 300;

    mappedValue = Math.max(0, Math.min(300, mappedValue));
    const value = Math.round(mappedValue);

    if (activeHandleRef.current === 'min') {
      if (Math.abs(value - maxValue) < MINIMUM_HANDLE_GAP) {
        isDragging.current = false;
        return;
      }
      setMinValue((prev) => (prev === value ? prev : value));
    } else if (activeHandleRef.current === 'max') {
      if (Math.abs(value - minValue) < MINIMUM_HANDLE_GAP) {
        isDragging.current = false;
        return;
      }
      setMaxValue((prev) => (prev === value ? prev : value));
    }
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  //마운트시 초기값 전달
  useEffect(() => {
    valueUpdater(1000 * minValue, 1000 * maxValue);
  }, [minValue, maxValue]);

  if (!RangesliderRef) {
    return;
  }

  return (
    <div className={clsx('flex items-center w-66 h-15', className)}>
      <div className='w-full h-[6px] rounded-[50px] bg-gray-100 relative' ref={RangesliderRef}>
        <div
          className='absolute w-full h-[6px] bg-primary'
          style={{ width: `${(maxValue - minValue) / 3}%`, ...minHandleStyle }}
        />
        <button
          className='absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'
          type='button'
          data-handle-type='min'
          style={minHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className='absolute -bottom-[150%] left-[50%] translate-[-50%] font-medium text-primary whitespace-nowrap'
            draggable={false}
          >
            {minPrice}
          </div>
          <Image src={keyCap} alt='슬라이더 핸들' draggable='false' />
        </button>
        <button
          className='absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'
          type='button'
          data-handle-type='max'
          style={maxHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div
            className='absolute -top-[50%] left-[50%] translate-[-50%] font-medium text-primary whitespace-nowrap'
            draggable={false}
          >
            {maxPrice}
          </div>
          <Image src={keyCap} alt='슬라이더 핸들' draggable='false' />
        </button>
      </div>
    </div>
  );
};

export default MultihandleSlider;
