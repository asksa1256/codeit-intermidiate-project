import { KeyboardColorType } from '@/types/keyboardTypes';

const KEYBOARD_COLOR_MAP = {
  CHERRY: '레드',
  BERRY: '퍼플',
  OAK: '브라운',
  VANILLA: '베이지',
  PEPPER: '블랙',
  BAKING: '연노랑',
  GRASS: '그린',
  APPLE: '라임',
  PEACH: '핑크',
  CITRUS: '오렌지',
  TROPICAL: '레인보우',
  MINERAL: '투명',
  FLOWER: '연보라',
  TOBACCO: '그레이',
  EARTH: '블루',
  CHOCOLATE: '스카이',
  SPICE: '옐로우',
  CARAMEL: '반투명',
  LEATHER: '화이트',
};

const convertToColorArray = (arr: KeyboardColorType[]) => {
  return arr.map((item) => KEYBOARD_COLOR_MAP[item]);
};

export default convertToColorArray;
