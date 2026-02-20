import { NextResponse } from 'next/server';
import { cookies } from 'next/headers';
import axios from 'axios';

export async function POST(request: Request) {
  const body = await request.json();
  const { provider, redirectUri, token, state } = body;

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const team = process.env.NEXT_PUBLIC_TEAM;
  const requestUrl = `${baseUrl}/${team}/auth/signIn/${provider}`;

  try {
    const response = await axios.post(
      requestUrl,
      { state, redirectUri, token },
      { headers: { 'Content-Type': 'application/json' } }
    );

    const { user, accessToken, refreshToken } = response.data;

    const cookieStore = await cookies();

    cookieStore.set('accessToken', accessToken, {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    cookieStore.set('isLoggedIn', 'true', {
      httpOnly: false,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'lax',
      path: '/',
      maxAge: 60 * 60 * 24,
    });

    if (refreshToken) {
      cookieStore.set('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'lax',
        path: '/',
        maxAge: 60 * 60 * 24 * 7,
      });
    }

    return NextResponse.json({ user });
  } catch (error: any) {
    const status = error.response?.status || 500;
    const message = error.response?.data?.message || '간편 로그인 실패';
    return NextResponse.json({ message }, { status });
  }
}
