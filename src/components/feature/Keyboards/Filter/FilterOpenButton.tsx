// 태블릿, 모바일 일때 필터 불러오기 버튼
import Image from 'next/image';

import ButtonDefault from '@/components/ui/ButtonDefault';

interface FilterOpenButtonProps {
  onClick: () => void;
}

const FilterOpenButton = ({ onClick }: FilterOpenButtonProps) => {
  return (
    <ButtonDefault
      onClick={onClick}
      className='
        w-[38px] h-[38px] md:w-[48px] md:h-[48px] p-0 rounded-md bg-white
        border border-gray-300 text-gray-700
        flex items-center justify-center
        hover:bg-gray-100
      '
    >
      <Image
        src='/images/FilterIcon.svg'
        alt='필터 열기'
        width={20}
        height={20}
        className='w-[22px] h-[22px] md:w-[26px] md:h-[26px]'
      />
    </ButtonDefault>
  );
};

export default FilterOpenButton;
