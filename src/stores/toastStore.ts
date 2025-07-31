import { v4 } from 'uuid';
import { create } from 'zustand';

interface Toast {
  id: string;
  message: string;
  type?: 'success' | 'error';
  duration?: number;
}

interface ToastStore {
  toasts: Toast[];
  addToast: (toast: Omit<Toast, 'id'>) => void;
  removeToast: (id: string) => void;
}

const useToastStore = create<ToastStore>((set) => ({
  toasts: [],
  addToast: (toast) => {
    set((state) => ({ toasts: [...state.toasts, { ...toast, id: v4() }] }));
  },
  removeToast: (id) => {
    set((state) => ({ toasts: state.toasts.filter((t) => t.id !== id) }));
  },
}));

export default useToastStore;
