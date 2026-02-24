import { create } from 'zustand';

import * as Auth from '@/types/userTypes';

const useAuthStore = create<Auth.AuthStore>((set) => ({
  // 초기 사용자 상태
  user: null,
  isLoggedIn: false,

  // 액션: 로그인
  signIn: (data) =>
    set({
      user: data.user,
      isLoggedIn: true,
    }),

  // 액션: 로그아웃
  signOut: () =>
    set({
      user: null,
      isLoggedIn: false,
    }),

  // 액션: 유저 정보 수정
  updateUser: (updatedData: Auth.UserData) =>
    set((state: Auth.AuthStoreState) => ({
      user: state.user ? { ...state.user, ...updatedData } : null,
    })),
}));

export default useAuthStore;
