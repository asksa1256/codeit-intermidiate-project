'use client';
import { useCallback, useEffect, useState } from 'react';
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

  const removeWithAnim = useCallback(
    (id: string, duration: number) => {
      const timer = setTimeout(() => {
        startRemoving(id);

        setTimeout(() => {
          removeToast(id);
        }, 300);
      }, duration);
      return () => clearTimeout(timer);
    },
    [startRemoving, removeToast],
  );

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    toasts.forEach((t) => {
      if (t.duration && t.duration > 0) {
        removeWithAnim(t.id, t.duration);
      }
    });
  }, [toasts, removeToast, startRemoving, removeWithAnim]);

  if (!mounted) return null; // hydration 이후 overlayRoot에 접근

  const overlayRoot = document.querySelector('#overlay-root');
  if (!overlayRoot) return null;

  return createPortal(
    <div className='fixed flex flex-col gap-2 left-1/2 -translate-x-1/2 bottom-9 z-60 whitespace-nowrap'>
      {toasts.map((t) => (
        <div
          key={t.id}
          className={`flex gap-4 py-4 px-6 rounded-xl shadow-lg text-gray-800 bg-white ${t.isClosing ? 'fade-down' : 'bounce-in'}`}
        >
          {t.type === 'success' ? (
            <SuccessIcon className='shrink-0 w-6 h-6 text-emerald-500' />
          ) : t.type === 'error' ? (
            <WarningIcon className='shrink-0 w-6 h-6 text-red-500' />
          ) : (
            <InfoIcon className='shrink-0 w-6 h-6 text-gray-500' />
          )}
          {t.message}
          <button className='ml-4' onClick={() => removeWithAnim(t.id, 0)}>
            <CloseIcon className='text-gray-500' />
          </button>
        </div>
      ))}
    </div>,
    overlayRoot,
  );
};

export default ToastContainer;
