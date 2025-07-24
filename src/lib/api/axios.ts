import axios from 'axios';
export type SocialProvider = 'GOOGLE' | 'NAVER' | 'KAKAO';
import { AxiosInstance } from 'axios';

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
   * @description 이메일 기반 회원가입을 처리합니다.
   *              제공된 사용자 정보를 사용하여 백엔드 API에 회원가입 요청을 보냅니다.
   * @param {string} email - 사용자의 이메일 주소입니다.
   * @param {string} nickname - 사용자의 닉네임입니다.
   * @param {string} password - 사용자의 비밀번호입니다.
   * @param {string} passwordConfirmation - 비밀번호 확인을 위한 값입니다.
   * @returns {Promise<any>} - 회원가입 요청의 응답 데이터를 반환합니다.
   *                            성공 시 백엔드에서 반환하는 데이터, 실패 시 에러 응답 데이터를 포함합니다.
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 해당 에러를 던집니다.
   */
  async signUpByEmail(
    email: string,
    nickname: string,
    password: string,
    passwordConfirmation: string,
  ) {
    try {
      const response = await axios.post(
        `${this.requestUrl}/signUp`,
        { email, nickname, password, passwordConfirmation },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우, 서버에서 받은 에러 응답 데이터를 반환합니다.
        return error.response?.data;
      }
      // 그 외의 예상치 못한 에러는 다시 던집니다.
      throw error;
    }
  }

  /**
   * @method signInByEmail
   * @description 이메일 기반 로그인을 처리합니다.
   *              제공된 사용자 정보를 사용하여 백엔드 API에 로그인 요청을 보냅니다.
   * @param {string} email - 사용자의 이메일 주소입니다.
   * @param {string} password - 사용자의 비밀번호입니다.
   * @returns {Promise<any>} - 로그인 요청의 응답 데이터를 반환합니다.
   *                            성공 시 백엔드에서 반환하는 데이터, 실패 시 에러 응답 데이터를 포함합니다.
   * @throws {Error} - 로그인 폼에서 상태 코드에 따른 에러 메시지 처리를 위해 전체 에러를 던집니다.
   */
  async signInByEmail(email: string, password: string) {
    try {
      const response = await axios.post(
        `${this.requestUrl}/signIn`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );

      const { accessToken, refreshToken } = response.data;
      tokenService.setAccessToken(accessToken);
      tokenService.setRefreshToken(refreshToken);

      return response.data;
    } catch (error) {
      // 로그인 폼에서 상태 코드에 따른 에러 메시지 처리를 위해 전체 error throw
      throw error;
    }
  }

  /**
   * @method refreshToken
   * @description RefreshToken을 사용하여 새로운 AccessToken을 발급받습니다.
   * @param {string} refreshToken - 사용자의 리프레시 토큰입니다.
   * @returns {Promise<any>} - 새로운 AccessToken을 포함한 응답 데이터를 반환합니다.
   *                            성공 시 백엔드에서 반환하는 데이터, 실패 시 에러 응답 데이터를 포함합니다.
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 해당 에러를 던집니다.
   */
  async refreshToken(refreshToken: string | null) {
    try {
      const response = await axios.post(
        `${this.requestUrl}/refresh-token`,
        { refreshToken },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      if (axios.isAxiosError(error)) {
        // Axios 에러인 경우, 서버에서 받은 에러 응답 데이터를 반환합니다.
        return error.response?.data;
      }
      // 그 외의 예상치 못한 에러는 다시 던집니다.
      throw error;
    }
  }

  /**
   * @method signInBySocial
   * @description 소셜 로그인을 처리합니다.
   * @param {SocialProvider} provider - 소셜 로그인 제공자입니다. (GOOGLE, NAVER, KAKAO)
   * @param {string} state - 상태 토큰입니다. Naver 의 경우에는 필수입니다. code를 얻을 때 사용하였던 state 값을 그대로 사용합니다.
   * @param {string} redirectUri - 리다이렉트 URI입니다. Kakao 의 경우에는 필수입니다. 인가 코드를 얻을 때 사용하였던 redirect_uri 값을 그대로 사용합니다.
   * @param {string} token - 인증 토큰입니다. Google 의 경우에는 Google Id 토큰(JWT) 입니다. Kakao 의 경우에는 인가 코드 입니다. Naver 의 경우에는 code 입니다.
   * @returns {Promise<any>} - 로그인 요청의 응답 데이터를 반환합니다.
   *                            성공 시 백엔드에서 반환하는 데이터, 실패 시 에러 응답 데이터를 포함합니다.
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 해당 에러를 던집니다.
   */
  async signInBySocial(
    provider: SocialProvider,
    state: string,
    redirectUri: string,
    token: string,
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
        // Axios 에러인 경우, 서버에서 받은 에러 응답 데이터를 반환합니다.
        return error.response?.data;
      }
      // 그 외의 예상치 못한 에러는 다시 던집니다.
      throw error;
    }
  }

  /**
   * @method signOut
   * @description 로그인 계정을 로그아웃 처리합니다.
   * @returns {void} - 저장해둔 토큰 정보를 삭제합니다.
   */
  signOut() {
    tokenService.clearTokens();
  }
}
