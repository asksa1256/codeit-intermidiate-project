import React from 'react';

import { cn } from '@/utils/style';

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
 * // 기본 스타일이 적용된 버튼 (Figma 명세에 따른 기본 크기, 색상)
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
   * - `w-[400px]`: 버튼의 기본 너비를 400px로 설정합니다.
   * - `h-[50px]`: 버튼의 기본 높이를 50px로 설정합니다.
   * - `flex flex-row justify-center items-center`: flexbox를 사용하여 자식 요소를 가로 방향으로 중앙에 정렬합니다.
   * - `py-4 px-[50px]`: 상하 패딩(py-4)과 좌우 패딩(px-[50px])을 설정합니다.
   * - `gap-[10px]`: flex 아이템(자식 요소)들 사이의 간격을 10px로 설정합니다.
   * - `bg-[#8642DB]`: 버튼의 배경색을 Figma 명세에 따른 보라색으로 설정합니다.
   * - `rounded-2xl`: 버튼의 모서리를 둥글게 만듭니다 (radius 16px).
   * - `text-white`: 텍스트 색상을 흰색으로 설정합니다.
   * - `font-semibold`: 텍스트의 폰트 두께를 세미볼드(600)로 설정합니다.
   * - `disabled:bg-gray-400`: 버튼이 `disabled` 상태일 때 배경색을 회색(gray-400)으로 변경합니다.
   * - `disabled:cursor-not-allowed`: 버튼이 `disabled` 상태일 때 마우스 커서를 '금지' 아이콘으로 변경합니다.
   * - `transition-colors duration-200`: 배경색 변경 시 200ms 동안 부드러운 전환 효과를 적용합니다.
   */
  const baseStyles = `
    w-[400px] h-[50px]
    flex flex-row justify-center items-center
    py-4 px-[20px] gap-[10px]
    bg-[#8642DB] rounded-2xl
    text-white font-semibold
    disabled:bg-gray-400 disabled:cursor-not-allowed
    transition-colors duration-200
  `;

  /**
   * 기본 스타일(`baseStyles`)과 `className` prop으로 전달된 커스텀 스타일을 결합합니다.
   * `className`에 정의된 스타일은 Tailwind CSS의 우선순위 규칙에 따라 `baseStyles`의 동일한 속성을 덮어씁니다.
   * 예를 들어, `baseStyles`에 `w-[400px]`가 있고 `className`에 `w-[100px]`가 있다면, 최종적으로 `w-[100px]`가 적용됩니다.
   */
  const buttonClasses = cn(baseStyles, className);

  return (
    /**
     * HTML <button> 요소를 렌더링합니다.
     * - `type`: 버튼의 동작을 정의합니다. (예: 폼 제출, 일반 버튼 등)
     * - `onClick`: 버튼 클릭 시 실행될 콜백 함수를 연결합니다.
     * - `disabled`: 불리언 값에 따라 버튼의 활성화 상태를 제어합니다. `true`이면 버튼이 비활성화됩니다.
     * - `className`: 최종적으로 계산된 Tailwind CSS 클래스 문자열을 적용하여 버튼의 시각적 스타일을 결정합니다.
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
