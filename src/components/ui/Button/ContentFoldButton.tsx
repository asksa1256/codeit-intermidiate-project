import Image from 'next/image';

import { Button } from '@headlessui/react';
import { Dispatch, SetStateAction } from 'react';

interface Props {
  onClick: Dispatch<SetStateAction<boolean>>;
}

const ContentFoldButton = ({ onClick }: Props) => {
  return (
    <div className='text-center h-[30px]'>
      <Button
        className='transition-all duration-200 ease-in-out hover:scale-150'
        onClick={() => {
          onClick(true);
        }}
      >
        <Image
          className='w-[30px] h-[30px]'
          src={'/images/UpArrowIcon.svg'}
          alt='리뷰 상세 접기 버튼'
          width={30}
          height={30}
        />
      </Button>
    </div>
  );
};

export default ContentFoldButton;
