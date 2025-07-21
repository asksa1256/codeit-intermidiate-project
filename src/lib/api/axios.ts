import axios from 'axios';

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
   * @throws {Error} - Axios 에러가 아닌 다른 종류의 에러 발생 시 해당 에러를 던집니다.
   */
  async signInByEmail(email: string, password: string) {
    try {
      const response = await axios.post(
        `${this.requestUrl}/signIn`,
        { email, password },
        { headers: { 'Content-Type': 'application/json' } },
      );
      return response.data;
    } catch (error) {
      throw error;
    }
  }
}
