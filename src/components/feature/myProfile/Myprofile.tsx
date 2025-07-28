'use client';

import dynamic from 'next/dynamic';

import MyListLoading from '@/components/feature/myProfile/MyListLoading';

const MyProfileContents = dynamic(
  () => import('@/components/feature/myProfile/MyProfileContents'),
  {
    ssr: false, // 클라이언트 컴포넌트에서만 사용 가능
    loading: () => <MyListLoading />,
  },
);

const Myprofile = () => {
  return <MyProfileContents />;
};

export default Myprofile;
