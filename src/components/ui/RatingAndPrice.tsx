import { formatPrice, formatRating } from '@/utils/formatters';

interface Props {
  label: 'price' | 'rating';
  value: number;
}

const RatingAndPrice = ({ label, value }: Props) => {
  const content = label === 'price' ? `￦ ${formatPrice(value)}` : `★ ${formatRating(value)}`;

  return (
    <div className='inline-flex items-center px-[10px] py-[6px] md:px-[15px] md:py-2 rounded-xl bg-primary-10 text-primary text-md md:text-lg font-bold'>
      {content}
    </div>
  );
};

export default RatingAndPrice;
