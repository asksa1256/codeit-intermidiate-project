import MyKeyboardItem from '@/components/feature/myProfile/MyKeyboardItem';
import { MyKeyboardItemType } from '@/types/keyboardTypes';

interface Props {
  keyboardList: MyKeyboardItemType[];
}

const MyKeyboardList = ({ keyboardList }: Props) => {
  return (
    <>
      <ul>
        {keyboardList.map((keyboard) => (
          <MyKeyboardItem key={keyboard.id} keyboard={keyboard} />
        ))}
      </ul>
    </>
  );
};

export default MyKeyboardList;
