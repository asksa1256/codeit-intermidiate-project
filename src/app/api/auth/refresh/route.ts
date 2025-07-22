import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import { BASE_URL, TEAM_ID } from '@/constants';

export async function POST() {
  const cookieStore = await cookies();
  const refreshToken = cookieStore.get('refreshToken')?.value;

  if (!refreshToken) {
    return NextResponse.json({ message: 'No refresh token' }, { status: 401 });
  }

  // 외부 API로 토큰 재발급 요청
  try {
    const res = await fetch(`${BASE_URL}/${TEAM_ID}/auth/refresh-token`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ refreshToken }),
    });

    if (!res.ok) {
      return NextResponse.json({ message: 'Token refresh failed' });
    }

    const responseData = await res.json();
    const { accessToken } = responseData;

    if (!accessToken) {
      return NextResponse.json({ message: 'No new accessToken from external API' });
    }

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 10,
    });

    // 백엔드가 새 refreshToken도 반환한다면 함께 저장
    if (responseData.refreshToken) {
      cookieStore.set('refreshToken', responseData.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }
    return NextResponse.json({ accessToken });
  } catch (error) {
    console.error(' 오류: 외부 API 요청 중 예외 발생:', error);
    return NextResponse.json({ message: 'Internal Server Error during refresh' }, { status: 500 });
  }
}
