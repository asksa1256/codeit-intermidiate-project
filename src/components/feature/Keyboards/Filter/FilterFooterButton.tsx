// 목록 페이지 필터 모달 푸터 초기화, 적용 버튼
import ButtonDefault from '@/components/ui/ButtonDefault';

interface FilterFooterButtonProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterFooterButton = ({ onReset, onApply }: FilterFooterButtonProps) => {
  return (
    <div className='flex justify-between gap-2'>
      {/* 초기화 버튼 */}
      <ButtonDefault
        onClick={onReset}
        className='
          w-[96px] h-[54px] px-4 py-2 
          rounded-md text-md font-semibold cursor-pointer
          bg-primary-10 text-primary hover:bg-[#E2D9FB]
        '
      >
        초기화
      </ButtonDefault>

      {/* 필터 적용하기 버튼 */}
      <ButtonDefault
        onClick={onApply}
        className='
          w-[223px] h-[54px] px-4 py-2
          rounded-md text-md font-semibold cursor-pointer
          bg-primary text-white hover:bg-primary-dark
        '
      >
        필터 적용하기
      </ButtonDefault>
    </div>
  );
};

export default FilterFooterButton;
