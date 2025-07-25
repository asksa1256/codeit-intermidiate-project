import { create } from 'zustand';
import { createJSONStorage, persist } from 'zustand/middleware';

import * as Auth from '@/types/userTypes';

const useAuthStore = create<Auth.AuthStore>()(
  persist(
    // persist set
    (set) => ({
      // 초기 사용자 상태
      user: null,
      isLoggedIn: false,
      accessToken: null,
      refreshToken: null,

      // 액션: 로그인
      signIn: (data) =>
        set({
          user: data.user,
          isLoggedIn: true,
          accessToken: data.accessToken,
          refreshToken: data.refreshToken,
        }),

      // 액션: 로그아웃
      signOut: () =>
        set({
          user: null,
          isLoggedIn: false,
          accessToken: null,
          refreshToken: null,
        }),

      // 액션: 유저 정보 수정
      updateUser: (updatedData: Auth.UserData) =>
        set((state: Auth.AuthStoreState) => ({
          user: state.user ? { ...state.user, ...updatedData } : null,
        })),

      // 액션: 토큰 재발급
      setTokens: (accessToken, refreshToken) =>
        set({
          accessToken,
          refreshToken,
        }),
    }),

    // persist option
    {
      name: 'auth-store', // 로컬 스토리지 key name
      storage: createJSONStorage(() => localStorage), // 로컬 스토리지에 유저 정보 저장
    },
  ),
);

export default useAuthStore;
