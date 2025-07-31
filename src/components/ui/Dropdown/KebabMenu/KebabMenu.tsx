import Image from 'next/image';

import React from 'react';

import Dropdown from '@/components/ui/Dropdown/Dropdown';
import { cn } from '@/utils/style';

interface Props {
  onEdit: () => void;
  onDelete: () => void;
  className?: string;
  iconSize?: string;
}

const KebabMenu = ({ onEdit, onDelete, className, iconSize }: Props) => {
  return (
    <Dropdown className={className}>
      <Dropdown.Trigger className='block'>
        <Image
          src='/images/KebabIcon.svg'
          width={40}
          height={40}
          alt='케밥 메뉴 아이콘'
          className={cn('w-6 md:w-[26px]', iconSize)}
        />
      </Dropdown.Trigger>
      <Dropdown.List className='mt-2 lg:mt-4'>
        <Dropdown.Item onClick={onEdit}>수정하기</Dropdown.Item>
        <Dropdown.Item onClick={onDelete}>삭제하기</Dropdown.Item>
      </Dropdown.List>
    </Dropdown>
  );
};

export default KebabMenu;
