'use client';

import { Input } from '@headlessui/react';

import CameraIcon from '@/assets/icons/CameraIcon.svg';
import ButtonDefault from '@/components/ui/ButtonDefault';
import UserThumbnail from '@/components/ui/UserThumbnail';

const userData = {
  id: 1642,
  nickname: '테스트163',
  teamId: '16-3',
  createdAt: '2025-07-21T05:03:11.906Z',
  updatedAt: '2025-07-21T05:03:11.906Z',
  image: null,
};

const MyprofileSidebar = () => {
  const { nickname, image } = userData;

  return (
    <article className='p-5 border border-gray-300 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:px-10 md:pt-[23px] md:pb-[30px] lg:w-[280px] lg:shrink lg:px-5 lg:py-[39px]'>
      <div className='flex items-center gap-4 md:items-start md:gap-8 lg:flex-col lg:items-center'>
        <div className='relative'>
          <UserThumbnail imgSrc={image} userName={nickname} className='md:w-20 lg:w-[164px]' />
          <input
            type='file'
            name='imgFileUpload'
            id='imgFileUpload'
            accept='image/*'
            className='hidden'
          />
          <label
            htmlFor='imgFileUpload'
            className='absolute top-[65%] left-[65%] w-[40%] p-1 flex items-center justify-center bg-primary rounded-full cursor-pointer lg:top-0 lg:left-0 lg:w-full lg:h-full lg:bg-primary/30 lg:opacity-0 lg:hover:opacity-100 lg:transition-opacity'
          >
            <CameraIcon className='text-white w-[100%] h-[100%] lg:w-10 lg:h-10' />
          </label>
        </div>
        <span className='grow text-xl font-bold md:pt-[7px] md:text-2xl lg:pt-0 lg:min-h-[74px]'>
          {nickname}
        </span>
      </div>
      <div className='mt-5 md:flex md:flex-wrap md:mt-[30px] lg:mt-[48px]'>
        <span className='block mb-2 text-md font-medium md:w-full md:mb-[10px] md:shrink md:text-base'>
          닉네임
        </span>
        <Input
          placeholder={nickname}
          className='input h-[42px] py-[9px] mb-1.5 border-gray-300 shadow-none md:grow md:shrink md:basis-0 md:h-[48px] md:py-[11px] md:mb-0 md:mr-6 lg:grow-0 lg:shrink-0 lg:basis-full lg:mr-0 lg:mb-2'
        />
        <ButtonDefault className='w-[89px] h-[42px] py-0 px-0 ml-auto text-md font-bold rounded-xl md:w-[116px] md:h-[48px] md:text-base lg:w-[96px] lg:h-[42px]'>
          변경하기
        </ButtonDefault>
      </div>
    </article>
  );
};

export default MyprofileSidebar;
