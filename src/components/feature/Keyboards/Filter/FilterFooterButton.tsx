// 목록 페이지 필터 모달 푸터 초기화, 적용 버튼
import ButtonDefault from '@/components/ui/ButtonDefault';

interface FilterFooterButtonProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterFooterButton = ({ onReset, onApply }: FilterFooterButtonProps) => {
  return (
    <div className='flex gap-2 lg:gap-3'>
      {/* 초기화 버튼 */}
      <ButtonDefault
        onClick={onReset}
        className='w-[96px] h-[54px] text-base font-bold shrink-0 rounded-xl text-primary bg-primary-10 hover:bg-primary-10 lg:h-[50px] lg:border lg:border-gray-300 lg:rounded-2xl lg:bg-white lg:text-gray-800 lg:hover:bg-white'
      >
        초기화
      </ButtonDefault>

      {/* 필터 적용하기 버튼 */}
      <ButtonDefault
        onClick={onApply}
        className='w-full h-[54px] text-base font-bold grow-1 rounded-xl lg:h-[50px] lg:rounded-2xl lg:text-primary lg:bg-primary-10 hover:bg-primary-10'
      >
        필터 적용하기
      </ButtonDefault>
    </div>
  );
};

export default FilterFooterButton;
