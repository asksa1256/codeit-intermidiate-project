'use client';

import { useRouter } from 'next/navigation';

import { useEffect, useState } from 'react';

import KeyboardForm from '@/components/feature/Form/KeyboardForm';
import { KeyboardFormValues } from '@/components/feature/Form/KeyboardForm';
import Modal from '@/components/feature/Modal';
import { TEAM_ID } from '@/constants';
import { KEYBOARD_TYPES_MAP } from '@/constants';
import { apiClient } from '@/lib/api/apiClient';

export default function KeyboardsPage() {
  // 모달 열림/닫힘 상태
  const [open, setOpen] = useState(false);
  const [keyboardOpen, setKeyboardOpen] = useState(false);
  const [tempInitialValues, setTempInitialValues] = useState<KeyboardFormValues>();

  const router = useRouter();

  const handleSubmit = async (formData: KeyboardFormValues) => {
    const payload = {
      ...formData,
      price: +formData.price,
      type: formData.type ?? KEYBOARD_TYPES_MAP[0].type,
    };
    // const updatePayload = { ...payload, avgRating: 4 };

    // 키보드 등록 api
    try {
      const res = await apiClient.post(`/${TEAM_ID}/wines`, payload);
      const data = res?.data;

      router.replace(`/keyboards/${data.id}`);
    } catch (err) {
      throw err; // 폼에 에러 전달
    }

    // 키보드 수정 api
    // try {
    //   const res = await apiClient.patch(`/${TEAM_ID}/wines/1398`, updatePayload);
    //   const data = res?.data;

    //   router.replace(`/keyboards/${data.id}`);
    // } catch (err) {
    //   throw err; // 폼에 에러 전달
    // }
  };

  useEffect(() => {
    const getValues = async () => {
      const res = await apiClient.get(`/${TEAM_ID}/wines/1398`);
      const data = res.data;

      const sanitizedData: KeyboardFormValues = {
        name: data.name,
        price: data.price,
        region: data.region,
        type: data.type,
        image: data.image,
      };

      setTempInitialValues(sanitizedData);
    };
    getValues();
  }, []);

  return (
    <section className='p-8'>
      <h1 className='text-2xl font-bold mb-4'>키보드 목록 페이지</h1>

      {/* 모달 열기 버튼 */}
      <button
        onClick={() => setOpen(true)}
        className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
      >
        모달 열기
      </button>

      {/* 공용 모달 */}
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        title='테스트 모달'
        size='md'
        showCloseButton={true}
      >
        <p className='mb-4'>이것은 테스트 모달입니다.</p>
        <button
          onClick={() => setOpen(false)}
          className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600'
        >
          삭제하기
        </button>
      </Modal>

      <section className='mt-8'>
        {/* 키보드 등록 모달 열기 버튼 */}
        <button
          onClick={() => setKeyboardOpen(true)}
          className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
        >
          키보드 등록 모달 열기
        </button>

        {/* 키보드 등록 모달 */}
        <Modal
          open={keyboardOpen}
          onClose={() => setKeyboardOpen(false)}
          title='키보드 등록'
          size='md'
          showCloseButton={true}
        >
          <KeyboardForm onSubmit={handleSubmit} onClose={() => setKeyboardOpen(false)} />
        </Modal>
      </section>
    </section>
  );
}
