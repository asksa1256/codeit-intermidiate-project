import Image from 'next/image';

interface StarRatingProps {
  value: number; // 0 ~ 5 사이의 평점
}

const StarRating = ({ value }: StarRatingProps) => {
  // 별 5개를 만들어서 채울지 비울지 결정, 소수점 처리
  const filledStars = Math.floor(value);
  const stars = Array.from({ length: 5 }, (_, i) => {
    return i < filledStars ? '/images/StarRatingIcon.svg' : '/images/EmptyStarIcon.svg';
  });

  return (
    <div className='flex gap-1'>
      {stars.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt='별 아이콘'
          width={14}
          height={14}
          className='w-[14px] h-[14px]'
        />
      ))}
    </div>
  );
};

export default StarRating;
