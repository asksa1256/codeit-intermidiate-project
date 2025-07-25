import { ChangeEvent, useEffect, useRef, useState } from 'react';

import { apiClient } from '@/lib/api/apiClient';

const MAX_SIZE = 1024 * 1024 * 5; // 5MB

const useImageUpload = () => {
  const [isUploading, setIsUploading] = useState(false);
  const fileRef = useRef<null | HTMLInputElement>(null);
  const [uploadImage, setUploadImage] = useState<File | null>(null);

  // 이미지 업로드 함수
  const fetchImage = async (file: File): Promise<string | undefined> => {
    try {
      const URL = `/${process.env.NEXT_PUBLIC_TEAM}/images/upload`;

      // 한글 파일명 오류 방지 인코딩
      const encodingFileName = encodeURIComponent(file.name);
      const encodingFile = new File([file], encodingFileName, {
        type: file.type,
      });

      const formData = new FormData();
      formData.append('image', encodingFile);

      const { data } = await apiClient.post(URL, formData);

      return data.url;
    } catch (error) {
      console.error(error);
    } finally {
      // setIsUploading(false);
      setIsUploading(() => false);
    }
  };

  // input file onChange
  const handleChangeImage = (
    e: ChangeEvent<HTMLInputElement>,
  ): Promise<string | undefined> | undefined => {
    if (!e.target.files) return; // 파일 객체 없을 때
    if (!e.target.files.length) return; // 이미지 업로드 취소시

    const file = e.target.files[0];

    // 이미지 용량 검증
    if (file.size > MAX_SIZE) {
      alert('사진 최대 용량은 5MB입니다.'); // 추후에 토스트로 적용해봐도 좋을 것 같음.
      return;
    }

    setUploadImage(file);
    setIsUploading(() => true);
    return fetchImage(file);
  };

  useEffect(() => {
    // 인풋 초기화
    if (fileRef.current?.value) fileRef.current.value = '';
  }, [uploadImage]);

  return { uploadImage, handleChangeImage, fileRef, isUploading };
};

export default useImageUpload;
