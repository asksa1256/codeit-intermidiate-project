import MyKeyboardItem from '@/components/feature/myProfile/MyKeyboardItem';
import { MyKeyboardItemType } from '@/types/keyboardTypes';

interface Props {
  keyboardList: MyKeyboardItemType[];
  onDelete: (value: number) => void;
}

const MyKeyboardList = ({ keyboardList, onDelete }: Props) => {
  return (
    <>
      <ul>
        {keyboardList.map((keyboard) => (
          <MyKeyboardItem key={keyboard.id} keyboard={keyboard} onDelete={onDelete} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyboardList;
