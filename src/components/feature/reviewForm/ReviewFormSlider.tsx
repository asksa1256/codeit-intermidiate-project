import { useController, UseControllerProps } from 'react-hook-form';

import { ReviewFormValues } from '@/components/feature/reviewForm/ReviewForm';
import RangeSlider from '@/components/ui/RangeSlider/RangeSlider';

interface Props extends UseControllerProps<ReviewFormValues> {
  name: 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic';
  title: string;
  minLabel: string;
  maxLabel: string;
}

const ReviewFormSlider = ({ title, minLabel, maxLabel, name, control }: Props) => {
  const {
    field: { value, onChange },
  } = useController({
    name,
    control,
    rules: { required: true },
  });

  return (
    <>
      <div className='flex items-center gap-[20px] md:gap-6 overflow-hidden'>
        <strong className='w-12 p-[2px] text-center text-xs font-semibold text-gray-500 bg-gray-100 rounded-md shrink-0 md:w-[54px] md:text-md md:py-[0.5px]'>
          {title}
        </strong>
        <div className='flex items-center grow overflow-hidden'>
          <span className='shrink-0 text-md font-medium w-[60px] md:text-base md:w-[70px]'>
            {minLabel}
          </span>
          <RangeSlider valueUpdater={onChange} initValue={value} className='grow' />
          <span className='shrink-0 text-md font-medium w-[60px] text-right md:text-base md:w-[70px]'>
            {maxLabel}
          </span>
        </div>
      </div>
    </>
  );
};

export default ReviewFormSlider;
