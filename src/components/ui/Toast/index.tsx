'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/shallow';

import useToastStore from '@/stores/toastStore';

const ToastContainer = () => {
  const [mounted, setMounted] = useState(false);
  const { toasts, removeToast } = useToastStore(
    useShallow((state) => ({ toasts: state.toasts, removeToast: state.removeToast })),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.duration && t.duration > 0) {
        const timer = setTimeout(() => {
          removeToast(t.id);
        }, t.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast]);

  if (!mounted) return null; // hydration 이후 overlayRoot에 접근

  const overlayRoot = document.querySelector('#overlay-root');
  if (!overlayRoot) return null;

  return createPortal(
    <div className='fixed left-1/2 -translate-x-1/2 bottom-9 z-10'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex py-3 px-6 rounded-xl text-white ${t.type === 'success' ? 'bg-emerald-700' : t.type === 'error' ? 'bg-red-500' : 'bg-gray-600'}`}
        >
          {t.message}
          <button className='ml-4 text-sm text-white' onClick={() => removeToast}>
            x
          </button>
        </div>
      ))}
    </div>,
    overlayRoot,
  );
};

export default ToastContainer;
