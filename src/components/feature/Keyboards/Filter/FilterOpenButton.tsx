// 태블릿, 모바일 일때 필터 불러오기 버튼
import Image from 'next/image';

interface FilterOpenButtonProps {
  onClick: () => void;
}

const FilterOpenButton = ({ onClick }: FilterOpenButtonProps) => {
  return (
    <button
      onClick={onClick}
      className='
        w-[38px] border border-gray-300 aspect-square rounded-lg shrink-0 grow-0 basis-auto md:w-12 lg:hidden
        hover:bg-gray-100
      '
    >
      <Image
        src='/images/FilterIcon.svg'
        alt='필터 열기'
        width={22}
        height={22}
        className='w-[22px] h-[22px] m-auto md:w-[26px] md:h-[26px]'
      />
    </button>
  );
};

export default FilterOpenButton;
