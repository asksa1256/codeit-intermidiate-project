import { NextRequest, NextResponse } from 'next/server';

const middleware = (req: NextRequest) => {
  const accessToken = req.cookies.get('accessToken')?.value;

  const isLoggedIn = !!accessToken;
  const isLoginPage = req.nextUrl.pathname === '/login';

  if (!isLoggedIn && !isLoginPage) {
    return NextResponse.redirect(new URL('/login', req.url));
  }

  if (isLoggedIn && isLoginPage) {
    return NextResponse.redirect(new URL('/', req.url));
  }

  return NextResponse.next();
};

export default middleware;

/**
 * 미들웨어 적용 경로 정의
 * 모든 요청 경로에 미들웨어를 적용합니다.
 * 단, 다음 패턴은 제외합니다:
 * - `_next/static` (정적 파일)
 * - `_next/image` (Next.js 이미지 최적화)
 * - `favicon.ico`
 * - 기타 정적 파일 (예: `.svg`, `.png`, `.jpg`, `.jpeg`, `.gif`, `.webp`, `.css`, `.js` 등)
 * - `/api` 경로 (선택 사항, API 라우트에도 미들웨어 적용 필요 시 제거)
 */
export const config = {
  matcher: [
    '/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp|css|js)$|api/auth/signIn|api/auth/refresh|api/auth/signOut).*)',
  ],
};
