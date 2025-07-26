'use client';

import { Input } from '@headlessui/react';
import { AxiosError } from 'axios';
import { ChangeEvent, FocusEvent, useEffect, useRef, useState } from 'react';

import CameraIcon from '@/assets/icons/CameraIcon.svg';
import ButtonDefault from '@/components/ui/ButtonDefault';
import UserThumbnail from '@/components/ui/UserThumbnail';
import useImageUpload from '@/hooks/useImageUpload';
import { apiClient } from '@/lib/api/apiClient';
import { UserType } from '@/types/userTypes';

const MyprofileSidebar = () => {
  const nicknameRef = useRef<HTMLInputElement | null>(null);
  const [isSameNickname, setIsSameNickname] = useState(true);
  const [user, setUser] = useState<UserType | null>(null);
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();

  // 유저 프로필 업데이트 함수
  const handleUserUpdate = async (updateData: Partial<Pick<UserType, 'nickname' | 'image'>>) => {
    if (!user) return;

    const currentUserData = {
      nickname: user.nickname,
      image: user.image,
    };

    const updateUserData = {
      ...currentUserData,
      ...updateData,
    };

    try {
      const URL = `/${process.env.NEXT_PUBLIC_TEAM}/users/me`;

      const res = await apiClient.patch(URL, updateUserData);

      setUser(res.data);
    } catch (error) {
      const err = error as AxiosError;

      if (err.response?.status === 400) {
        alert('이미 사용중인 닉네임입니다.');
        return;
      }

      alert('프로필 수정에 실패하였습니다.');
      console.error();
    }
  };

  // 유저 썸네일 변경시 이미지 업로드후 patch
  const handleUploadImage = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);

      if (url) await handleUserUpdate({ image: url });
    } catch (error) {
      alert('이미지 업로드에 실패하였습니다.');
      console.error(error);
      return;
    }
  };

  const handleUpdateNickname = async () => {
    if (!nicknameRef.current) return;

    if (nicknameRef.current.value === user?.nickname) {
      alert('기존 닉네임과 동일합니다.');
      nicknameRef.current!.value = '';
      return;
    }

    await handleUserUpdate({ nickname: nicknameRef.current.value });
    nicknameRef.current.value = '';
    setIsSameNickname(true);
  };

  // onBlur일 때 닉네임 체크후 버튼 비활성화
  const checkSameNickname = (e: FocusEvent<HTMLInputElement>) => {
    // 입력값 없으면, 20자 초과하면 return
    if (e.target.value.length <= 0 || e.target.value.length > 20) {
      setIsSameNickname(true);
      return;
    }
    const isSame = e.target.value === user?.nickname;
    setIsSameNickname(isSame);
  };

  useEffect(() => {
    // GET :: 유저 정보
    const getUser = async () => {
      try {
        const { data } = await apiClient.get(`/${process.env.NEXT_PUBLIC_TEAM}/users/me`);
        setUser(data);
      } catch (error) {
        console.error(error);
      }
    };

    getUser();
  }, []);

  if (!user) return null;

  const { nickname, image } = user;

  return (
    <article className='p-5 border border-gray-300 bg-white rounded-2xl shadow-[0_2px_20px_rgba(0,0,0,0.04)] md:px-10 md:pt-[23px] md:pb-[30px] lg:w-[280px] lg:shrink-0 lg:px-5 lg:py-[39px]'>
      <div className='flex items-center gap-4 md:items-start md:gap-8 lg:flex-col lg:items-center'>
        <div className='relative'>
          <UserThumbnail imgSrc={image} userName={nickname} className='md:w-20 lg:w-[164px]' />
          <input
            type='file'
            name='imgFileUpload'
            id='imgFileUpload'
            accept='image/*'
            className='hidden'
            onChange={handleUploadImage}
            ref={fileRef}
          />
          <label
            htmlFor='imgFileUpload'
            className='absolute top-[65%] left-[65%] w-[40%] p-1 flex items-center justify-center bg-primary rounded-full cursor-pointer lg:top-0 lg:left-0 lg:w-full lg:h-full lg:bg-primary/30 lg:opacity-0 lg:hover:opacity-100 lg:transition-opacity'
          >
            <CameraIcon className='text-white w-[100%] h-[100%] lg:w-10 lg:h-10' />
          </label>
          {isUploading && (
            <div className='absolute top-0 left-0 w-full h-full flex items-center justify-center'>
              <div className=' w-8 h-8 border-4 mb-4 border-gray-300 border-t-primary rounded-full animate-spin' />
            </div>
          )}
        </div>
        <span className='grow text-xl font-bold text-center md:pt-[7px] md:text-2xl lg:pt-0 lg:min-h-[74px]'>
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
          ref={nicknameRef}
          onBlur={checkSameNickname}
        />
        <ButtonDefault
          onClick={handleUpdateNickname}
          disabled={isSameNickname}
          className='w-[89px] h-[42px] py-0 px-0 ml-auto text-md font-bold rounded-xl md:w-[116px] md:h-[48px] md:text-base lg:w-[96px] lg:h-[42px]'
        >
          변경하기
        </ButtonDefault>
      </div>
    </article>
  );
};

export default MyprofileSidebar;
