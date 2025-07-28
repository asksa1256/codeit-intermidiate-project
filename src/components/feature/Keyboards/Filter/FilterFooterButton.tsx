// 목록 페이지 필터 모달 푸터 초기화, 적용 버튼
import ButtonDefault from '@/components/ui/ButtonDefault';

interface FilterFooterButtonProps {
  onReset: () => void;
  onApply: () => void;
}

const FilterFooterButton = ({ onReset, onApply }: FilterFooterButtonProps) => {
  return (
    <div className='flex justify-end gap-2'>
      {/* 초기화 버튼 */}
      <ButtonDefault
        onClick={onReset}
        className='
          w-auto h-auto px-4 py-2
          bg-white text-gray-700 border border-gray-300
          rounded-md cursor-pointer
          hover:bg-gray-100
        '
      >
        초기화
      </ButtonDefault>

      {/* 필터 적용하기 버튼 */}
      <ButtonDefault
        onClick={onApply}
        className='
          w-auto h-auto px-4 py-2
          bg-purple-600 text-white
          rounded-md cursor-pointer
          hover:bg-purple-700
        '
      >
        필터 적용하기
      </ButtonDefault>
    </div>
  );
};

export default FilterFooterButton;
