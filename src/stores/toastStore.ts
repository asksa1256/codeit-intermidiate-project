import { ReactNode } from 'react';
import { v4 } from 'uuid';
import { create } from 'zustand';

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
