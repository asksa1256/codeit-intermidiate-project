import Image from 'next/image';

import { useState } from 'react';

import ImageUploadButton from '@/components/feature/ImageUpload/ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';

const ImageUploader = () => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();
  const [imgUrl, setImgUrl] = useState('');

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  return (
    <div className='flex'>
      <ImageUploadButton onClick={handleImageUpload} isUploading={isUploading} />
      <input
        type='file'
        className='hidden'
        ref={fileRef}
        onChange={async (e) => {
          const url = await handleChangeImage(e);
          if (url) {
            setImgUrl(url);
          }
        }}
      />
      <figure className='relative w-[140px] aspect-square rounded-2xl overflow-hidden ml-2 border-2 border-primary'>
        {/* {imgUrl} 한글 파일 등록 시 인코딩 오류로 이미지 엑박뜸 */}
        {imgUrl && (
          <Image
            src={imgUrl}
            alt='이미지'
            width={140}
            height={140}
            className='object-cover h-full'
          />
        )}
      </figure>
    </div>
  );
};

export default ImageUploader;
