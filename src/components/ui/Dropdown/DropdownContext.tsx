'use client';

import { createContext, useContext } from 'react';

import { DropdownContextProps, DropdownContextValue } from '@/types/dropdownTypes';

const DropdownContext = createContext<DropdownContextValue | undefined>(undefined);

const DropdownProvider = ({ size = 'sm', wide = false, children }: DropdownContextProps) => {
  return <DropdownContext.Provider value={{ size, wide }}>{children}</DropdownContext.Provider>;
};

export const useDropdownSize = () => {
  const context = useContext(DropdownContext);

  if (!context) throw new Error('Dropdown context 내에서 사용해주세요.');

  return context;
};

export default DropdownProvider;
