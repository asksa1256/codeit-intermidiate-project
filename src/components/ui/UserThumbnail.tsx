import Image from 'next/image';

import React from 'react';

import { cn } from '@/utils/style';

interface UserThumbnailProps {
  imgSrc: string | null;
  userName?: string;
  className?: string;
}

const DEFAULT_IMAGE_SIZE = 100; /* Image 컴포넌트 사용시 필수로 넣어줘야 하는 width/height 값 */
const DEFAULT_FIGURE_STYLE = `w-15 border border-gray-300 aspect-square rounded-full overflow-hidden`;

const UserThumbnail = ({ imgSrc, userName, className }: UserThumbnailProps) => {
  const src = imgSrc ?? '/images/UserThumbEmpty.svg';
  const alt = userName ? `${userName}님의` : '유저';

  const mergedClassName = cn(DEFAULT_FIGURE_STYLE, className);

  return (
    <figure className={mergedClassName}>
      <Image
        src={src}
        alt={`${alt} 프로필 사진`}
        className='w-[100%] h-[100%] object-cover'
        width={DEFAULT_IMAGE_SIZE}
        height={DEFAULT_IMAGE_SIZE}
      />
    </figure>
  );
};

export default UserThumbnail;
