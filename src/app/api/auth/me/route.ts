import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';

import axios from 'axios';

export async function GET() {
  const cookieStore = await cookies();
  const accessToken = cookieStore.get('accessToken')?.value;

  if (!accessToken) {
    return NextResponse.json({ user: null }, { status: 401 });
  }

  const baseUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
  const team = process.env.NEXT_PUBLIC_TEAM;
  const requestUrl = `${baseUrl}/${team}/users/me`;

  try {
    const response = await axios.get(requestUrl, {
      headers: {
        Authorization: `Bearer ${accessToken}`,
      },
    });

    return NextResponse.json({ user: response.data });
  } catch {
    return NextResponse.json({ user: null }, { status: 401 });
  }
}
