'use client';

import { useState } from 'react';

import AddKeyboardForm from '@/components/feature/Form/AddKeyboardForm';
import Modal from '@/components/feature/Modal';

export default function KeyboardsPage() {
  // 모달 열림/닫힘 상태
  const [open, setOpen] = useState(false);
  const [addKeyboardOpen, setAddKeyboardOpen] = useState(false);

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
          onClick={() => setAddKeyboardOpen(true)}
          className='px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700'
        >
          키보드 등록 모달 열기
        </button>

        {/* 키보드 등록 모달 */}
        <Modal
          open={addKeyboardOpen}
          onClose={() => setAddKeyboardOpen(false)}
          title='키보드 등록'
          size='md'
          showCloseButton={true}
        >
          <AddKeyboardForm />
        </Modal>
      </section>
    </section>
  );
}
