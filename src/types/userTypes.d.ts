export interface UserType {
  id: number;
  nickname: string;
  teamId: string;
  createdAt: string;
  updatedAt: string;
  image: string | null;
}

// 사용자 정보 인터페이스
export interface UserData {
  id: string;
  nickname: string;
  email: string;
  image: string;
}

// 로그인 성공 시 서버 응답 인터페이스
export interface AuthResponseData {
  user: UserData;
  accessToken?: string;
  refreshToken?: string;
}

// authStore 상태 인터페이스
export interface AuthStoreState {
  user: UserData | null | undefined;
  isLoggedIn: boolean;
}

// authStore 액션 인터페이스
export interface AuthStoreActions {
  signIn: (userData: AuthResponseData) => void;
  signOut: () => void;
  updateUser: (updatedData: Partial<User>) => void;
}

// authStore 최종 타입
export type AuthStore = AuthStoreState & AuthStoreActions;
