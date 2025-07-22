'use client';

import { useState } from 'react';

import ConfirmModal from '@/components/feature/ConfirmModal';
export default function KeyboardsPage() {
  // 모달 열림/닫힘 상태
  const [open, setOpen] = useState(false);

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

      {/* 컨펌 모달 */}
      <ConfirmModal
        open={open}
        onCancel={() => setOpen(false)}
        onConfirm={() => {
          // 삭제 로직
          setOpen(false);
        }}
      />
    </section>
  );
}
