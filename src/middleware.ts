import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // API Proxy 설정
  if (pathname.startsWith('/api/proxy')) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const teamId = process.env.NEXT_PUBLIC_TEAM;

    // '/api/proxy/v1/auth' -> 'BACKEND_URL/TEAM_ID/v1/auth'
    const targetPath = pathname.replace('/api/proxy', '');

    // 만약 targetPath가 이미 /TEAM_ID로 시작한다면 중복 추가 방지
    const teamPrefix = `/${teamId}`;
    const path = targetPath.startsWith(teamPrefix)
      ? targetPath
      : `${teamPrefix}${targetPath}`;

    const url = new URL(`${backendUrl}${path}${request.nextUrl.search}`);

    const requestHeaders = new Headers(request.headers);
    if (accessToken) {
      requestHeaders.set('Authorization', `Bearer ${accessToken}`);
    }

    return NextResponse.rewrite(url, {
      request: {
        headers: requestHeaders,
      },
    });
  }

  // 페이지별 권한 제어
  const protectedRoutes = ['/profile', '/mypage', '/keyboards/add'];
  const authRoutes = ['/signin', '/signUp'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/api/proxy/:path*',
    '/((?!api/auth|_next/static|_next/image|favicon.ico).*)',
  ],
};
