import Image from 'next/image';

import { ChangeEvent } from 'react';

import ImageUploadButton from '@/components/feature/ImageUpload/ImageUploadButton';
import useImageUpload from '@/hooks/useImageUpload';
import useToastStore from '@/stores/toastStore';
import { AxiosError } from 'axios';

interface ImageUploaderProps {
  value: string;
  error?: string;
  onChange?: (url: string) => void;
}

const ImageUploader = ({ value, error, onChange }: ImageUploaderProps) => {
  const { handleChangeImage, fileRef, isUploading } = useImageUpload();
  const addToast = useToastStore((state) => state.addToast);

  const handleImageUpload = () => {
    fileRef.current?.click();
  };

  const handleImageUrl = async (e: ChangeEvent<HTMLInputElement>) => {
    try {
      const url = await handleChangeImage(e);
      if (url) {
        onChange?.(url);
      }
    } catch (err) {
      const error = err as AxiosError;
      if (error.status === 401) {
        addToast({ message: '로그인이 필요합니다.', type: 'error', duration: 2000 });
      } else {
        addToast({ message: '문제가 발생했습니다.', type: 'error', duration: 2000 });
      }
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
        <figure className='relative flex justify-center items-center w-[140px] aspect-square rounded-2xl overflow-hidden ml-2 border-2 border-primary bg-primary-10'>
          <Image
            src={value}
            alt='이미지'
            width={140}
            height={140}
            className='object-contain rotate-90 h-full w-4/5 drop-shadow-[4px_4px_6px_rgba(0,0,0,0.15)]'
          />
        </figure>
      )}
    </div>
  );
};

export default ImageUploader;
