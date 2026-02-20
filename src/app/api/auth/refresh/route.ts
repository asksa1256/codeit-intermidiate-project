import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import axios from 'axios';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: '리프레쉬 토큰 없음' }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const team = process.env.NEXT_PUBLIC_TEAM;
  const requestUrl = `${baseUrl}/${team}/auth/refresh-token`;

  try {
    const response = await axios.post(
      requestUrl,
      { refreshToken },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { accessToken } = response.data;

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true, // 클라이언트에서 접근 불가 (보안)
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24, // 24시간
    });

    return NextResponse.json({ accessToken });
  } catch {
    return NextResponse.json({ message: '토큰 갱신 실패' }, { status: 401 });
  }
}
