import RangeSlider from '@/components/ui/RangeSlider/RangeSlider';

interface Props {
  title: string;
  onUpdate: (value: number) => void;
  minLabel: string;
  maxLabel: string;
}

const ReviewAttributeSlider = ({ title, onUpdate, minLabel, maxLabel }: Props) => {
  return (
    <div className='flex items-center gap-[20px] md:gap-6 overflow-hidden'>
      <strong className='w-12 p-[2px] text-center text-xs font-semibold text-gray-500 bg-gray-100 rounded-md shrink-0 md:w-[54px] md:text-md md:py-[0.5px]'>
        {title}
      </strong>
      <div className='flex items-center grow overflow-hidden'>
        <span className='shrink-0 text-md font-medium w-[60px] md:text-base md:w-[70px]'>
          {minLabel}
        </span>
        <RangeSlider valueUpdater={onUpdate} className='grow' />
        <span className='shrink-0 text-md font-medium w-[60px] text-right md:text-base md:w-[70px]'>
          {maxLabel}
        </span>
      </div>
    </div>
  );
};

export default ReviewAttributeSlider;
