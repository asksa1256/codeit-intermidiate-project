import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.delete({ name: 'accessToken', path: '/' });
  cookieStore.delete({ name: 'refreshToken', path: '/' });
  cookieStore.delete({ name: 'isLoggedIn', path: '/' });

  return NextResponse.json({ message: '로그아웃 되었습니다.' });
}
