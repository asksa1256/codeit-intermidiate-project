import { KEYBOARD_TYPES_MAP } from '@/constants';

const convertToTypeArray = (value: string) =>
  KEYBOARD_TYPES_MAP.find((item) => item.value === value)?.type ?? value;

export default convertToTypeArray;
