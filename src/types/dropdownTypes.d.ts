import { ReactNode } from 'react';

// 드랍다운 Props
export interface DropdownWrapProps {
  children: ReactNode;
  size?: 'sm' | 'md';
  wide?: boolean;
  className?: string;
}

// 드랍다운 트리거 버튼 Props
export interface DropdownTriggerProps {
  children: ReactNode;
  className?: string;
}

// 드랍다운 리스트 Props
export interface DropdownListProps {
  children: ReactNode;
  align?: 'right' | 'left';
  className?: string;
}

// 드랍다운 아이템 Props
export interface DropdownItemBaseProps {
  children: ReactNode;
  className?: string;
}

export interface DropdownButtonItemProps extends DropdownItemBaseProps {
  onClick: () => void;
  disabled?: boolean;
}

export interface DropdownLinkItemProps extends DropdownItemBaseProps {
  variant: 'link';
  href: string;
}

export type DropdownItemProps = DropdownButtonItemProps | DropdownLinkItemProps;
