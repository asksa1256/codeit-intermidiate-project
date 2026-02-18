import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const accessToken = request.cookies.get('accessToken');
  const { pathname } = request.nextUrl;

  // 권한 페이지
  const protectedRoutes = ['/profile', '/mypage', '/keyboards/add'];

  // 로그인 페이지
  const authRoutes = ['/signin', '/signUp'];

  const isProtectedRoute = protectedRoutes.some(route => pathname.startsWith(route));
  const isAuthRoute = authRoutes.some(route => pathname.startsWith(route));

  // 권한 페이지인데 토큰이 없을 경우: 로그인 페이지로 이동
  if (isProtectedRoute && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  // 로그인 페이지인데 토큰이 있을 경우: 메인 페이지로 이동
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ['/((?!api|_next/static|_next/image|favicon.ico).*)'],
};
