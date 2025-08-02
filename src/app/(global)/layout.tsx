import HeaderComponent from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <HeaderComponent />
      <main>{children}</main>
      <Footer />
    </>
  );
}
