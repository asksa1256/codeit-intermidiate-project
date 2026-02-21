import { NextRequest, NextResponse } from 'next/server';

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  // API Proxy 설정
  if (pathname.startsWith('/api/proxy')) {
    const backendUrl = process.env.NEXT_PUBLIC_BACKEND_URL;
    const teamId = process.env.NEXT_PUBLIC_TEAM;

    // '/api/proxy/v1/auth' -> 'BACKEND_URL/TEAM_ID/v1/auth' (백엔드 서버로 보내는 요청: Next.js 'proxy' 서버 사용)
    // '/api/login', '/api/signup' 등 Next.js 서버에서 자체 처리해야 하는 API와 백엔드 요청용 API를 구분하기 위함
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

  // '/api/auth' api는 가로채기 X (해당 페이지, 컴포넌트에서 자체 리디렉션 처리) 
  if (pathname.startsWith('/api/auth')) {
    return NextResponse.next();
  }

  // 페이지 권한 제어 라우팅
  const PUBLIC_PATHS = ['/', '/keyboards']; // 메인, 키보드 목록 페이지: 전체 접근 
  const AUTH_PATHS = ['/signin', '/signUp', '/oauth/kakao']; // 로그인, 회원가입 페이지

  const isPublicRoute = PUBLIC_PATHS.includes(pathname);
  const isAuthRoute = AUTH_PATHS.includes(pathname);

  // 이미 로그인한 유저가 로그인/회원가입 페이지로 접근할 경우, 메인('/')으로 리다이렉트
  if (isAuthRoute && accessToken) {
    return NextResponse.redirect(new URL('/', request.url));
  }

  // PUBLIC_PATH, AUTH_PATH를 제외한 모든 페이지는 회원 전용 페이지 처리
  if (!isPublicRoute && !isAuthRoute && !accessToken) {
    return NextResponse.redirect(new URL('/signin', request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * 아래 경로들은 가로채기 제외
     * - _next/static (정적 파일)
     * - _next/image (이미지 최적화 파일)
     * - favicon.ico (파비콘)
     * - images/ (public/images 폴더 내 파일)
     */
    '/((?!_next/static|_next/image|favicon.ico|images/).*)',
  ],
};
