import { ReactNode } from 'react';
import { v4 } from 'uuid';
import { create } from 'zustand';

/**
 * @typedef {Object} Toast
 * @property {string} id - 토스트 메시지의 고유 ID
 * @property {React.ReactNode} message - 토스트에 표시될 메시지 (JSX 또는 문자열 등 ReactNode)
 * @property {'success' | 'error'} [type] - 토스트의 타입 (성공 또는 에러)
 * @property {number} [duration] - 토스트가 자동으로 사라지기까지의 시간(ms). 생략 시 자동 제거되지 않음
 * @property {boolean} [isClosing] - 토스트가 사라지는 중인지 여부 (애니메이션 처리용)
 */
interface Toast {
  id: string;
  message: ReactNode;
  type?: 'success' | 'error';
  duration?: number;
  isClosing?: boolean;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
  startRemoving: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({ toasts: [...state.toasts, { ...toast, id: v4() }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
  startRemoving: (id) =>
    set((state) => ({
      toasts: state.toasts.map((t) => (t.id === id ? { ...t, isClosing: true } : t)),
    })),
}));

export default useToastStore;
