import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
  const { email, password } = body;

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const team = process.env.NEXT_PUBLIC_TEAM;
  const requestUrl = `${baseUrl}/${team}/auth/signIn`;

  try {
    const response = await axios.post(
      requestUrl,
      { email, password },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { user, accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();

    // 액세스 토큰 쿠키 설정
    cookieStore.set('accessToken', accessToken, {
      httpOnly: true, // XSS 보호
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1일
    });

    // 클라이언트 사이드 마커 (UI 상태 Hydration용)
    cookieStore.set('isLoggedIn', 'true', {
      httpOnly: false,  // 클라이언트에서 읽기 가능
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 1일
    });

    // 리프레쉬 토큰이 있을 경우, 리프레쉬 토큰 갱신
    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7, // 7일
      });
    }

    return NextResponse.json({ user });
  } catch (error) {
    if (axios.isAxiosError(error)) {
      const status = error.response?.status || 500;
      const message = error.response?.data?.message || '로그인에 실패했습니다.';
      return NextResponse.json({ message }, { status });
    }
    return NextResponse.json({ message: '로그인에 실패했습니다.' }, { status: 500 });
  }
}
