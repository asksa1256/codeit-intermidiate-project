import IndexKeyboardsCard from '@/components/feature/Keyboards/IndexKeyboardsCard';
import EmptyList from '@/components/ui/EmptyList';
import ScrollLoading from '@/components/ui/ScrollLoading';
import { KeyboardItemType } from '@/types/keyboardTypes';

interface Props {
  keyboardList: KeyboardItemType[];
  endRef: React.ForwardedRef<HTMLDivElement>;
  hasNextPage: boolean;
}

const KeyboardList = ({ keyboardList, endRef, hasNextPage }: Props) => {
  return (
    <>
      {keyboardList.length === 0 ? (
        <EmptyList desc='검색 결과가 없습니다.' />
      ) : (
        <div>
          {keyboardList.map((item) => (
            <IndexKeyboardsCard
              key={item.id}
              name={item.name}
              region={item.region}
              image={item.image}
              price={item.price}
              avgRating={item.avgRating}
              reviewCount={item.reviewCount}
              recentReview={item.recentReview}
              keyboardId={item.id}
            />
          ))}
          <ScrollLoading endRef={endRef} hasNextPage={hasNextPage} />
        </div>
      )}
    </>
  );
};

export default KeyboardList;
