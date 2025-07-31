import { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import MyKeyboardItem from '@/components/feature/myProfile/MyKeyboardItem';
import { MyKeyboardItemType } from '@/types/keyboardTypes';

interface Props {
  keyboardList: MyKeyboardItemType[];
  onDelete: (value: number) => void;
  onEdit: (keyboardId: number, value: KeyboardFormValues) => void;
}

const MyKeyboardList = ({ keyboardList, onDelete, onEdit }: Props) => {
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
    </>
  );
};

export default MyKeyboardList;
