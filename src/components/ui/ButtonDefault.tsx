import React from 'react';

type ButtonDefaultProps = {
  /**
   * 버튼 내부에 렌더링될 내용을 정의합니다. 텍스트, 아이콘 또는 다른 React 컴포넌트가 될 수 있습니다.
   */
  children: React.ReactNode;
  /**
   * 버튼 클릭 시 실행될 이벤트 핸들러 함수입니다.
   */
  onClick?: React.MouseEventHandler<HTMLButtonElement>;
  /**
   * 버튼의 HTML `type` 속성을 지정합니다.
   * - `'button'`: 일반적인 클릭 가능한 버튼 (기본값).
   * - `'submit'`: 폼 제출 버튼.
   * - `'reset'`: 폼 필드를 초기화하는 버튼.
   */
  type?: 'button' | 'submit' | 'reset';
  /**
   * 버튼의 활성화/비활성화 상태를 제어합니다. `true`로 설정하면 버튼이 비활성화되고 클릭할 수 없게 됩니다.
   */
  disabled?: boolean;
  /**
   * Tailwind CSS 클래스 문자열을 통해 버튼의 기본 스타일을 재정의하거나 확장합니다.
   * 크기, 색상, 폰트, 테두리 반경 등 모든 CSS 속성을 커스텀할 수 있습니다.
   * 이 클래스들은 기본 스타일보다 우선 적용됩니다.
   */
  className?: string;
};

/**
 * `ButtonDefault` 컴포넌트는 Figma 디자인 시스템에 정의된 기본 스타일을 따르는 재사용 가능한 버튼입니다.
 * 이 컴포넌트는 일관된 UI/UX를 제공하며, `className` prop을 통해 유연하게 스타일을 커스터마이징할 수 있습니다.
 *
 * @example
 * // 기본 스타일이 적용된 버튼 (Figma 명세에 따른 기본 크기, 색상, 위치)
 * <ButtonDefault>클릭</ButtonDefault>
 *
 * @example
 * // 너비를 100%로 확장하고 배경색을 변경하는 커스텀 버튼
 * <ButtonDefault className="w-full bg-green-500 text-white">
 *   전체 너비 버튼
 * </ButtonDefault>
 *
 * @example
 * // 둥근 모서리와 볼드체 폰트를 적용한 버튼
 * <ButtonDefault className="rounded-full font-bold">
 *   둥근 버튼
 * </ButtonDefault>
 *
 * @example
 * // 비활성화된 버튼
 * <ButtonDefault disabled>
 *   비활성화 버튼
 * </ButtonDefault>
 */
const ButtonDefault = ({
  children,
  onClick,
  type = 'button',
  disabled = false,
  className = '',
}: ButtonDefaultProps) => {
  /**
   * Figma에서 제공된 디자인 명세를 기반으로 하는 버튼의 기본 스타일입니다.
   * 이 스타일들은 `className` prop을 통해 전달되는 커스텀 클래스에 의해 재정의될 수 있습니다.
   *
   * - `absolute top-[20px] left-[20px]`: 이 버튼은 특정 레이아웃 컨텍스트(예: 부모 요소 내에서 절대 위치)를 위해
   *   초기 위치가 지정되어 있습니다. 이 위치는 `className`을 통해 쉽게 재정의할 수 있습니다.
   * - `w-[400px] h-[50px]`: 버튼의 기본 너비와 높이입니다.
   * - `flex flex-row justify-center items-center`: flexbox를 사용하여 자식 요소를 중앙에 정렬합니다.
   * - `py-4 px-[172px] gap-[10px]`: 내부 패딩과 자식 요소 간의 간격입니다.
   * - `bg-[#8642DB] rounded-2xl`: 기본 배경색과 모서리 둥글기입니다.
   * - `text-white font-semibold`: 텍스트 색상과 폰트 두께입니다.
   * - `disabled:bg-gray-400 disabled:cursor-not-allowed`: 버튼이 비활성화되었을 때 적용되는 스타일입니다.
   *   배경색이 회색으로 변하고 마우스 커서가 '금지' 아이콘으로 변경됩니다.
   * - `transition-colors duration-200`: 배경색 변경 시 부드러운 전환 효과를 제공합니다.
   */
  const baseStyles = `
    absolute top-[20px] left-[20px]
    w-[400px] h-[50px]
    flex flex-row justify-center items-center
    py-4 px-[172px] gap-[10px]
    bg-[#8642DB] rounded-2xl
    text-white font-semibold
    disabled:bg-gray-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  /**
   * 기본 스타일(`baseStyles`)과 `className` prop으로 전달된 커스텀 스타일을 결합합니다.
   * `className`에 정의된 스타일은 `baseStyles`의 동일한 속성을 덮어씁니다.
   */
  const buttonClasses = `${baseStyles} ${className}`;

  return (
    /**
     * HTML <button> 요소를 렌더링합니다.
     * - `type`: 버튼의 동작을 정의합니다.
     * - `onClick`: 클릭 이벤트 핸들러를 연결합니다.
     * - `disabled`: 버튼의 활성화 상태를 제어합니다.
     * - `className`: 최종적으로 계산된 Tailwind CSS 클래스를 적용하여 버튼의 시각적 스타일을 결정합니다.
     *   `.trim().replace(/\s+/g, ' ')`는 여러 공백을 단일 공백으로 정리하여 클래스 문자열을 최적화합니다.
     */
    <button
      type={type}
      onClick={onClick}
      disabled={disabled}
      className={buttonClasses.trim().replace(/\s+/g, ' ')}
    >
      {children}
    </button>
  );
};

export default ButtonDefault;
