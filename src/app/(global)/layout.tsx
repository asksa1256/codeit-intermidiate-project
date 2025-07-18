export default function Layout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <>
      <header>헤더</header>
      <main>{children}</main>
    </>
  );
}
