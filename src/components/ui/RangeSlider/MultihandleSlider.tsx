'use client';

import Image from 'next/image';

import clsx from 'clsx';
import { useRef } from 'react';

import { formatPrice } from '@/utils/formatters';

import keyCap from '../../../../public/images/KeyCap.png';

interface MultihandleSliderProps {
  className?: string;
  value: [number, number]; // 예: [0, 300000]
  onChange: (range: [number, number]) => void;
}

const MIN = 0;
const MAX = 300;
const MINIMUM_HANDLE_GAP = 20; // 천원 단위: 2만원

const MultihandleSlider = ({ className, value, onChange }: MultihandleSliderProps) => {
  const minValue = value[0] / 1000;
  const maxValue = value[1] / 1000;

  const activeHandleRef = useRef<'min' | 'max' | null>(null);
  const RangesliderRef = useRef<HTMLDivElement | null>(null);
  const isDragging = useRef(false);

  const minHandleStyle = { left: `${(minValue / MAX) * 100}%` };
  const maxHandleStyle = { left: `${(maxValue / MAX) * 100}%` };

  const minPrice = `￦ ${formatPrice(minValue * 1000)}`;
  const maxPrice = `￦ ${formatPrice(maxValue * 1000)}`;

  const updateValue = (newMin: number, newMax: number) => {
    onChange([newMin * 1000, newMax * 1000]);
  };

  const handleMove = (clientX: number) => {
    if (!RangesliderRef.current || !activeHandleRef.current) return;

    const rect = RangesliderRef.current.getBoundingClientRect();
    let mappedValue = ((clientX - rect.left) / rect.width) * MAX;
    mappedValue = Math.max(MIN, Math.min(MAX, Math.round(mappedValue)));

    if (activeHandleRef.current === 'min') {
      if (Math.abs(mappedValue - maxValue) < MINIMUM_HANDLE_GAP) return;
      updateValue(mappedValue, maxValue);
    } else if (activeHandleRef.current === 'max') {
      if (Math.abs(mappedValue - minValue) < MINIMUM_HANDLE_GAP) return;
      updateValue(minValue, mappedValue);
    }
  };

  const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
    isDragging.current = true;
    activeHandleRef.current = e.currentTarget.dataset.handleType as 'min' | 'max';
    window.addEventListener('mousemove', handleMouseMove);
    window.addEventListener('mouseup', handleMouseUp);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging.current) return;
    handleMove(e.clientX);
  };

  const handleMouseUp = () => {
    isDragging.current = false;
    activeHandleRef.current = null;
    window.removeEventListener('mousemove', handleMouseMove);
    window.removeEventListener('mouseup', handleMouseUp);
  };

  const handleTouchStart = (e: React.TouchEvent<HTMLButtonElement>) => {
    isDragging.current = true;
    activeHandleRef.current = e.currentTarget.dataset.handleType as 'min' | 'max';
    window.addEventListener('touchmove', handleTouchMove);
    window.addEventListener('touchend', handleTouchEnd);
  };

  const handleTouchMove = (e: TouchEvent) => {
    if (!isDragging.current) return;
    handleMove(e.touches[0].clientX);
  };

  const handleTouchEnd = () => {
    isDragging.current = false;
    activeHandleRef.current = null;
    window.removeEventListener('touchmove', handleTouchMove);
    window.removeEventListener('touchend', handleTouchEnd);
  };

  return (
    <div className={clsx('flex items-center w-66 h-15', className)}>
      <div className='w-full h-[6px] rounded-[50px] bg-gray-100 relative' ref={RangesliderRef}>
        <div
          className='absolute h-[6px] bg-primary'
          style={{
            left: `${(minValue / MAX) * 100}%`,
            width: `${((maxValue - minValue) / MAX) * 100}%`,
          }}
        />

        {/* 최소 핸들 */}
        <button
          className='absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'
          type='button'
          data-handle-type='min'
          style={minHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className='absolute -bottom-[150%] left-[50%] translate-[-50%] font-medium text-primary whitespace-nowrap'>
            {minPrice}
          </div>
          <Image src={keyCap} alt='슬라이더 핸들' draggable={false} />
        </button>

        {/* 최대 핸들 */}
        <button
          className='absolute top-[50%] translate-[-50%] w-6 h-6 cursor-grab'
          type='button'
          data-handle-type='max'
          style={maxHandleStyle}
          onMouseDown={handleMouseDown}
          onTouchStart={handleTouchStart}
        >
          <div className='absolute -top-[50%] left-[50%] translate-[-50%] font-medium text-primary whitespace-nowrap'>
            {maxPrice}
          </div>
          <Image src={keyCap} alt='슬라이더 핸들' draggable={false} />
        </button>
      </div>
    </div>
  );
};

export default MultihandleSlider;
