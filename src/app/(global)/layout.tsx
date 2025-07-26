import HeaderComponent from '@/components/layout/Header';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <main>{children}</main>
    </>
  );
}
