'use client';
import Image from 'next/image';

import { Button } from '@headlessui/react';
import { useState } from 'react';

import { cn } from '@/utils/style';

interface Props {
  onClick: () => void;
  isPending: boolean;
  isLiked: boolean;
}

const LikeButton = ({ onClick, isPending, isLiked }: Props) => {
  const [isAnimationOnProcess, setIsAnimationOnProcess] = useState(false);
  const HEART_ICON_URL = '/images/HeartIcon.svg';
  const FILLED_HEART_ICON = '/images/FilledHeartIcon.svg';

  const handleClickAnimation = () => {
    setIsAnimationOnProcess(true);
    setTimeout(() => {
      setIsAnimationOnProcess(false);
    }, 200);
  };

  return (
    <Button
      onClick={() => {
        onClick();
        handleClickAnimation();
      }}
      disabled={isPending}
    >
      <Image
        className={cn('transition-all duration-300 ease-in-out md:w-[38px] md:h-[38px]', {
          'rotate-15 scale-120': isAnimationOnProcess,
        })}
        src={isLiked ? FILLED_HEART_ICON : HEART_ICON_URL}
        alt='좋아요 버튼'
        width={32}
        height={32}
      />
    </Button>
  );
};

export default LikeButton;
