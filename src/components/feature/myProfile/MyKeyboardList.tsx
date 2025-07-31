import { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import MyKeyboardItem from '@/components/feature/myProfile/MyKeyboardItem';
import ScrollLoading from '@/components/ui/ScrollLoading';
import { MyKeyboardItemType } from '@/types/keyboardTypes';

interface Props {
  keyboardList: MyKeyboardItemType[];
  onDelete: (value: number) => void;
  onEdit: (keyboardId: number, value: KeyboardFormValues) => void;
  endRef: React.ForwardedRef<HTMLDivElement>;
  hasNextPage: boolean;
}

const MyKeyboardList = ({ keyboardList, onDelete, onEdit, endRef, hasNextPage }: Props) => {
  return (
    <>
      <ul>
        {keyboardList.map((keyboard) => (
          <MyKeyboardItem
            key={keyboard.id}
            keyboard={keyboard}
            onDelete={onDelete}
            onEdit={onEdit}
          />
        ))}
      </ul>
      <ScrollLoading endRef={endRef} hasNextPage={hasNextPage} />
    </>
  );
};

export default MyKeyboardList;
