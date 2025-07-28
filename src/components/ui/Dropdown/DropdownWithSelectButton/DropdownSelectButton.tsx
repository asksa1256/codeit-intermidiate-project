import Image from 'next/image';

import { Input } from '@headlessui/react';

const DropdownSelectButton = ({ value }: { value: string }) => {
  return (
    <>
      <div className='w-full relative'>
        <Input
          value={value ?? ''}
          className={`input border-gray-300 cursor-pointer outline-none focus:ring-2 focus:primary hover:border-primary`}
          readOnly
        />
        <Image
          src='/images/ArrowDownIcon.svg'
          alt='드롭다운 열기/닫기'
          width={24}
          height={24}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        />
      </div>
    </>
  );
};

export default DropdownSelectButton;
