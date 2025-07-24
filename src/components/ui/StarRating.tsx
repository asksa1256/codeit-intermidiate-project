import Image from 'next/image';

interface StarRatingProps {
  value: number; // 0 ~ 5 사이의 평점
  className?: string; // 쓰이는 페이지, 모달에 따라 글로벌 css에서 클래스를 가져다 써주시면 됩니다.
}

const StarRating = ({ value }: StarRatingProps) => {
  // 별 5개를 만들어서 채울지 비울지 결정, 소수점 처리
  const filledStars = Math.floor(value);
  const stars = Array.from({ length: 5 }, (_, i) => {
    return i < filledStars ? '/images/StarRatingIcon.svg' : '/images/EmptyStarIcon.svg';
  });

  return (
    <div className='flex'>
      {stars.map((src, idx) => (
        <Image
          key={idx}
          src={src}
          alt='별 아이콘'
          width={24}
          height={24}
          className={`list-star md:recommend-star`}
        />
      ))}
    </div>
  );
};

export default StarRating;
