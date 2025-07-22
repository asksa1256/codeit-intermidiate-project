import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

export async function POST() {
  const cookieStore = await cookies();

  cookieStore.set('accessToken', '', { path: '/', maxAge: 0 });
  cookieStore.set('refreshToken', '', { path: '/', maxAge: 0 });

  return NextResponse.json({ success: true });
}
