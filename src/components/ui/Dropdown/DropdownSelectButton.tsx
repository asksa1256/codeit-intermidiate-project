import Image from 'next/image';

import { Input } from '@headlessui/react';

const DropdownSelectButton = ({ value, error }: { value: string; error?: string | null }) => {
  return (
    <>
      <div className='w-full relative'>
        <Input
          value={value}
          className={`input ${error ? 'border-red-500' : 'border-gray-300'} cursor-pointer`}
          disabled={true}
        />
        <Image
          src='/images/ArrowDownIcon.svg'
          alt='드롭다운 열기/닫기'
          width={24}
          height={24}
          className='absolute right-5 top-1/2 -translate-y-1/2'
        />
      </div>
      <p className={`mt-1 text-sm md:text-md text-red-500 h-6`}>{error ? error : ''}</p>
    </>
  );
};

export default DropdownSelectButton;
