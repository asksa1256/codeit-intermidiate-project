import Image from 'next/image';

import { ChangeEvent } from 'react';

import ImageUploadButton from '@/components/feature/ImageUpload/ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';

interface ImageUploaderProps {
  value: string;
  error?: string;
  onChange?: (url: string) => void;
}

const ImageUploader = ({ value, error, onChange }: ImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    const url = await handleChangeImage(e);
    if (url) {
      onChange?.(url);
    }
  };

  return (
    <div className='flex'>
      <ImageUploadButton
        onClick={handleImageUpload}
        isUploading={isUploading}
        className={error ? 'border-red-500' : ''}
      />
      <input type='file' className='hidden' ref={fileRef} onChange={handleImageUrl} />

      {value && (
        <figure className='relative w-[140px] aspect-square rounded-2xl overflow-hidden ml-2 border-2 border-primary bg-primary-10'>
          <Image
            src={value}
            alt='이미지'
            width={140}
            height={140}
            className='object-contain rotate-90 h-full w-4/5 drop-shadow-[4_4px_6px_rgba(0,0,0,0.15)]'
          />
        </figure>
      )}
    </div>
  );
};

export default ImageUploader;
