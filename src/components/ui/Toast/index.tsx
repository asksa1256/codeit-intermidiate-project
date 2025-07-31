'use client';
import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import { useShallow } from 'zustand/shallow';

import CloseIcon from '@/assets/icons/CloseIcon.svg';
import InfoIcon from '@/assets/icons/InfoIcon.svg';
import SuccessIcon from '@/assets/icons/SuccessIcon.svg';
import WarningIcon from '@/assets/icons/WarningIcon.svg';
import useToastStore from '@/stores/toastStore';

const ToastContainer = () => {
  const [mounted, setMounted] = useState(false);
  const { toasts, removeToast, startRemoving } = useToastStore(
    useShallow((state) => ({
      toasts: state.toasts,
      removeToast: state.removeToast,
      startRemoving: state.startRemoving,
    })),
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.duration && t.duration > 0) {
        const timer = setTimeout(() => {
          startRemoving(t.id);

          setTimeout(() => {
            removeToast(t.id);
          }, 300);
        }, t.duration);
        return () => clearTimeout(timer);
      }
    });
  }, [toasts, removeToast, startRemoving]);

  if (!mounted) return null; // hydration 이후 overlayRoot에 접근

  const overlayRoot = document.querySelector('#overlay-root');
  if (!overlayRoot) return null;

  return createPortal(
    <div className='fixed left-1/2 -translate-x-1/2 bottom-9 z-60'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex gap-4 py-4 px-6 rounded-xl shadow-lg text-gray-800 bg-white ${t.isClosing ? 'fade-down' : 'bounce-in'}`}
        >
          {t.type === 'success' ? (
            <SuccessIcon className='w-6 h-6 text-emerald-500' />
          ) : t.type === 'error' ? (
            <WarningIcon className='w-6 h-6 text-red-500' />
          ) : (
            <InfoIcon className='w-6 h-6 text-gray-500' />
          )}
          {t.message}
          <button className='ml-4' onClick={() => removeToast}>
            <CloseIcon className='text-gray-500' />
          </button>
        </div>
      ))}
    </div>,
    overlayRoot,
  );
};

export default ToastContainer;
