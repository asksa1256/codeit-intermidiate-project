// -- RangeSlider 타입 --

type Label = 'lightBold' | 'smoothTannic' | 'drySweet' | 'softAcidic';

type ReviewDataRefCurrent = {
  [key in Label]: number;
};

// className: 슬라이더 컨테이너에 들어갈 className -> 슬라이더 너비 or 여백 등 커스텀 용도
// label: formData key에 대응하기 위한 label
// valueRef: 슬라이더 value값을 저장할 부모의 ref객체
export interface RangeSliderProps {
  className?: string;
  label: Label;
  valueRef: RefObject<ReviewDataRefCurrent>;
}

// -- RangeSliderReadonly 타입 --

// className: 슬라이더 컨테이너에 들어갈 className -> 슬라이더 너비 or 여백 등 커스텀 용도
// value: handle의 left 스타일 속성 퍼센테이지를 정하기 위한 value
export interface RangeSliderReadonlyProps {
  className?: string;
  value: number;
}

// -- MultihandleSlider 타입 --

type PriceDataRefCurrent = {
  minPrice: number;
  maxPrice: number;
};

// className: 슬라이더 컨테이너에 들어갈 className -> 슬라이더 너비 or 여백 등 커스텀 용도
// priceRef: 쿼리에 사용될 가격의 최소, 최대값을 저장할 부모의 ref객체
export interface MultihandleSliderProps {
  className?: string;
  priceRef: RefObject<PriceDataRefCurrent>;
}
