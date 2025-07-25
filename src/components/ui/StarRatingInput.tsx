'use client';

import Image from 'next/image';

import { Button } from '@headlessui/react';
import { useState } from 'react';

interface Props {
  className?: string;
  updater: (rating: number) => void;
}

const StarRatingInput = ({ className, updater }: Props) => {
  const [rating, setRating] = useState(0);
  const [hoveringRating, setHoveringRating] = useState(0);
  const [isHovering, setIsHovering] = useState(false);

  const STAR_VALUES = [1, 2, 3, 4, 5];
  const FILLED_STAR_URL = '/images/StarRatingIcon.svg';
  const EMPTY_STAR_URL = '/images/EmptyStarIcon.svg';

  const chooseComparedValue = (rating: number, hoveringRating: number): number =>
    isHovering ? hoveringRating : rating;

  const rateStar = (value: number): string => {
    return value <= chooseComparedValue(rating, hoveringRating) ? FILLED_STAR_URL : EMPTY_STAR_URL;
  };

  return (
    <div className={className}>
      {STAR_VALUES.map((star) => (
        <Button
          key={star}
          onClick={() => {
            setRating(star);
            updater(star);
          }}
          onMouseOver={() => {
            setIsHovering(true);
            setHoveringRating(star);
          }}
          onMouseOut={() => {
            setIsHovering(false);
          }}
        >
          <Image
            src={rateStar(star)}
            alt={rateStar(star) === FILLED_STAR_URL ? '채워진 별 아이콘' : '빈 별 아이콘'}
            width={32}
            height={32}
          />
        </Button>
      ))}
    </div>
  );
};

export default StarRatingInput;
