import { KEYBOARD_TYPES_MAP } from '@/constants';

const convertToTypeArray = (value: string) =>
  KEYBOARD_TYPES_MAP.find((item) => item.value === value)?.type ?? value;

export const convertToTypeValueArray = (value: string) =>
  KEYBOARD_TYPES_MAP.find((item) => item.type === value)?.value ?? value;

export default convertToTypeArray;
