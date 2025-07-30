import { KEYBOARD_COLOR_MAP } from '@/constants';
import { KeyboardColorType } from '@/types/keyboardTypes';

const convertToColorArray = (arr: KeyboardColorType[]) => {
  return arr.map((item) => KEYBOARD_COLOR_MAP[item]);
};

export default convertToColorArray;
