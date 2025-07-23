// -- RangeSlider 타입 --

// className: 슬라이더 컨테이너에 들어갈 className -> 슬라이더 너비 or 여백 등 커스텀 용도
// valueUpdater: 슬라이더의 state인 value를 전달하는 함수
export interface RangeSliderProps {
  className?: string;
  valueUpdater: (value: number) => void;
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
// valueUpdater: 슬라이더의 state인 value를 전달하는 함수
export interface MultihandleSliderProps {
  className?: string;
  valueUpdater: (minPrice: number, maxPrice: number) => void;
}
