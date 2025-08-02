import localFont from 'next/font/local';
import Head from 'next/head';
import './globals.css';

import RequireAuth from '@/components/feature/RequireAuth';
import ScrollToTopButton from '@/components/feature/ScrollToTopButton';
import ToastContainer from '@/components/ui/Toast';

import type { Metadata } from 'next';

const pretendard = localFont({
  src: [
    {
      path: '../../public/fonts/Pretendard-Regular.woff',
      weight: '400',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Medium.woff',
      weight: '500',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-SemiBold.woff',
      weight: '600',
      style: 'normal',
    },
    {
      path: '../../public/fonts/Pretendard-Bold.woff',
      weight: '700',
      style: 'normal',
    },
  ],
  variable: '--font-nanumSquare',
  display: 'swap',
});

export const metadata: Metadata = {
  title: 'tadak - 다양한 키보드 추천과 리뷰!',
  description: '키보드 뭐 사지? 이달의 추천 키보드, 키보드 리뷰로 알아보기',
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang='ko'>
      <Head>
        <meta
          name='viewport'
          content='width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=0'
        />
      </Head>
      <body className={pretendard.className}>
        <RequireAuth>{children}</RequireAuth>
        <ScrollToTopButton />
        <ToastContainer />
        <div id='overlay-root'></div>
      </body>
    </html>
  );
}
