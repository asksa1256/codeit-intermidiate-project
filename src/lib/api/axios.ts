import axios from 'axios';
export type SocialProvider = 'KAKAO';

/**
 * @class AxiosApiAuth
 * @description 인증 관련 API 요청을 처리하는 클래스입니다.
 *              브라우저 쿠키를 사용하는 Next.js API Routes를 호출합니다.
 */
export class AxiosApiAuth {
  private team = process.env.NEXT_PUBLIC_TEAM;
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  private backendAuthUrl = this.baseUrl + '/' + this.team + '/auth';

  /**
   * @method signUpByEmail
   * @description 회원가입은 토큰이 필요 없으므로 직접 백엔드 API를 호출하거나 프록시를 사용할 수 있습니다.
   * 여기서는 프록시 경로(/api/proxy)를 활용하여 일관성을 유지합니다.
   */
  async signUpByEmail(
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string,
  ) {
    try {
      const response = await axios.post(
        `/api/proxy/auth/signUp`,
        { email, nickname, password, passwordConfirmation },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signInByEmail(email: string, password: string) {
    try {
      const response = await axios.post(
        `/api/auth/login`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );

      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async refreshToken() {
    try {
      const response = await axios.post(`/api/auth/refresh`);
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signInBySocial(
    provider: SocialProvider,
    redirectUri: string | undefined,
    token: string,
    state?: string,
  ) {
    try {
      const response = await axios.post(
        `/api/auth/social`,
        { provider, state, redirectUri, token },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  async signOut() {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    }
  }
}
