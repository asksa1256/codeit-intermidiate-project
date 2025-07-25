import { AvgRatings } from '@/types/keyboardTypes';

interface Props {
  reviewCount: number;
  avgRatings: AvgRatings;
}

const RatingRangeBars = ({ reviewCount, avgRatings }: Props) => {
  const RATING_LABEL = ['5', '4', '3', '2', '1'];
  const FLEX_STYLE = 'flex gap-4 items-center my-2';
  const calcPercentage = (label: keyof AvgRatings): number => {
    return (avgRatings[label] / reviewCount) * 100;
  };

  return (
    <div className='whitespace-nowrap text-gray-500 font-medium leading-[26px] w-full md:w-70'>
      {RATING_LABEL.map((label) => (
        <div key={label} className={FLEX_STYLE}>
          {label}점 <RangeBar percentage={calcPercentage(label as keyof AvgRatings)} />
        </div>
      ))}
    </div>
  );
};

export default RatingRangeBars;

const RangeBar = ({ percentage }: { percentage: number }) => {
  return (
    <div className='w-full'>
      <div className='relative w-full h-[6px] rounded-[50px] bg-gray-100'>
        <div
          className='absolute w-full h-[6px] rounded-[50px] bg-primary'
          style={{ width: `${percentage}%` }}
        />
      </div>
    </div>
  );
};
