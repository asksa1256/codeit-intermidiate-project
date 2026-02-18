import axios from 'axios';
export type SocialProvider = 'KAKAO';
import { AxiosInstance } from 'axios';

import { SIGNUP_PAGE } from '@/constants';

import { tokenService } from './tokenService';

/**
 * @class AxiosApiAuth
 * @description 인증 관련 API 요청을 처리하는 클래스입니다.
 *              환경 변수에서 팀 이름과 백엔드 기본 URL을 가져와 요청 URL을 구성합니다.
 */
export class AxiosApiAuth {
  /**
   * @private
   * @property {string | undefined} team - 환경 변수에서 가져온 팀 이름입니다.
   */
  private team = process.env.NEXT_PUBLIC_TEAM;

  /**
   * @private
   * @property {string | undefined} baseUrl - 환경 변수에서 가져온 백엔드 API의 기본 URL입니다.
   */
  private baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;

  /**
   * @private
   * @property {string} requestUrl - 인증 관련 API 요청의 기본 URL입니다.
   *                                 `baseUrl`, `team`, 그리고 `/auth` 경로를 조합하여 생성됩니다.
   */
  private requestUrl = this.baseUrl + '/' + this.team + '/auth';

  private api: AxiosInstance;

  constructor() {
    this.api = axios.create({ baseURL: this.baseUrl });
  }

  /**
   * @method signUpByEmail
   * @param {string} email 
   * @param {string} nickname 
   * @param {string} password 
   * @param {string} passwordConfirmation 
   * @returns {Promise<any>} 
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 해당 에러 throw
   */
  async signUpByEmail(
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string,
  ) {
    try {
      const response = await axios.post(
        `${this.requestUrl}${SIGNUP_PAGE}`,
        { email, nickname, password, passwordConfirmation },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }

  /**
   * @method signInByEmail
   * @param {string} email 
   * @param {string} password 
   * @returns {Promise<any>} 
   * @throws {Error} - 로그인 폼에서 상태 코드에 따른 에러 메시지 처리를 위해 전체 에러 throw
   */
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
      if (axios.isAxiosError(error)) {
        return error.response?.data;
      }
      throw error;
    }
  }

  /**
   * @method signInBySocial
   * @param {SocialProvider} provider - 소셜 로그인 제공자 (KAKAO)
   * @param {string} state - 상태 토큰. code를 얻을 때 사용한 state 값 그대로 사용
   * @param {string} redirectUri - 리다이렉트 URI. 인가 코드를 얻을 때 사용한 redirect_uri 값 그대로 사용
   * @param {string} token - 인증 토큰. Kakao 의 경우에는 인가 코드.
   * @returns {Promise<any>} 
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 throw
   */
  async signInBySocial(
    provider: SocialProvider,
    redirectUri: string | undefined,
    token: string,
    state?: string,
  ) {
    try {
      const response = await axios.post(
        `${this.requestUrl}/signIn/${provider}`,
        { state, redirectUri, token },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우, 서버에서 받은 에러 응답 반환
        return error.response?.data;
      }
      throw error;
    }
  }

  async signOut() {
    try {
      await axios.post('/api/auth/logout');
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      tokenService.clearTokens();
    }
  }
}

// Authorization이 포함되어야 하는 API 요청시 사용
interface WithAuthRequestData<U> {
  path: string;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
  headers?: HeadersInit;
  body?: BodyInit | U;
  cache?: 'string';
}

export class FetchApiWithAuth {
  private BASE_URL = `${process.env.NEXT_PUBLIC_BACKEND_URL}/${process.env.NEXT_PUBLIC_TEAM}`;

  // fetch
  async request<T, U = null>(requestData: WithAuthRequestData<U>): Promise<T> {
    const accessToken = tokenService.getAccessToken();
    const { path, method, headers, body } = requestData;

    const fetchUrl = `${this.BASE_URL}${path}`;

    const bodyIsFormData = body instanceof FormData;
    const contentType = bodyIsFormData ? null : { 'Content-Type': 'application/json' };

    const headersOption = {
      Authorization: `Bearer ${accessToken}`,
      ...contentType,
      ...headers,
    };

    const fetchOption: RequestInit = {
      method,
      headers: headersOption,
    };

    if (method !== 'GET') {
      // POST / PUT / PATCH / DELETE 일 때,
      fetchOption.body = bodyIsFormData ? body : JSON.stringify(body);
    }

    try {
      const res = await fetch(fetchUrl, fetchOption);

      if (res.status === 401) {
        // 액세스 토큰 만료시,
        return await this.fetchWithTokenHandling(requestData);
      }

      if (!res.ok) throw new Error(res.statusText);

      return await res.json();
    } catch (error) {
      console.error(error);
      throw error;
    }
  }

  // 토큰 재발급 및 요청 재시도 함수
  private async fetchWithTokenHandling<T, U>(requestData: WithAuthRequestData<U>): Promise<T> {
    try {
      // 액세스 토큰 재발급
      const refreshTk = tokenService.getRefreshToken();

      const auth = new AxiosApiAuth(); // 인스턴스 생성
      const resetToken = await auth.refreshToken(); // AxiosApiAuth의 refreshToken 함수 사용

      // 로컬 스토리지 갱신
      tokenService.setAccessToken(resetToken.accessToken);

      // 요청 재시도
      return this.request(requestData);
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}
