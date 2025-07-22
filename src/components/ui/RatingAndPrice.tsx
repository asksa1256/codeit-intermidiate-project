import Image from 'next/image';

import { formatPrice, formatRating } from '@/utils/formatters';
import { cn } from '@/utils/style';

interface Props {
  className?: string;
  label: 'price' | 'rating';
  value: number;
}

const RatingAndPrice = ({ className, label, value }: Props) => {
  const DEFAULT_CONTAINER_STYLE =
    'inline-flex gap-[2px] items-center px-[10px] py-[6px] md:px-[15px] md:py-2 rounded-xl bg-primary-10 text-primary text-md md:text-lg font-bold';
  const mergedClassName = cn(DEFAULT_CONTAINER_STYLE, className);
  const content =
    label === 'price' ? (
      `￦ ${formatPrice(value)}`
    ) : (
      <>
        <Image src={'/images/StarIcon.svg'} alt='별 아이콘' width={14} height={14} />
        <span>{`${formatRating(value)}`}</span>
      </>
    );

  return <div className={mergedClassName}>{content}</div>;
};

export default RatingAndPrice;
